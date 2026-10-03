import { test, expect } from "@playwright/test";
test.use({
  viewport: { width: 390, height: 844 },
  hasTouch: true,
  isMobile: true,
});
const stored = (p) =>
  p.evaluate(() => JSON.parse(localStorage.getItem("daylight.workspace.v1")));
const dock = (p, name) =>
  p
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("button", { name, exact: true });
async function skipIntro(p) {
  const skip = p.getByRole("button", { name: "Skip", exact: true });
  await skip.click();
}
const browse = async (p, name) => {
  await p.getByLabel("Browse workspace").click();
  await p
    .getByRole("dialog")
    .getByRole("button", { name, exact: true })
    .click();
};
async function onboard(p, examples = true) {
  await p.goto("/");
  await skipIntro(p);
  await p.getByLabel("What should we call you?").fill("Sepehr");
  for (let i = 0; i < 3; i++)
    await p.getByRole("button", { name: "Continue", exact: true }).click();
  if (!examples) await p.getByRole("checkbox").uncheck();
  await p.getByRole("button", { name: "Let the good days begin" }).click();
  await expect(p.getByRole("heading", { name: "Hi, Sepehr" })).toBeVisible();
  await p.getByLabel("Dismiss notification").click();
}
test("Distinct mobile hierarchy, safe viewport widths, and desktop switch", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await onboard(page);
  await expect(page.locator(".sidebar")).toHaveCount(0);
  expect(await page.evaluate(() => scrollY)).toBe(0);
  for (const width of [320, 360, 390, 430, 600, 767]) {
    await page.setViewportSize({ width, height: 844 });
    for (const name of ["Home", "Plan", "You", "Focus"]) {
      await dock(page, name).click();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        `${name} fits ${width}`,
      ).toBe(true);
    }
    await browse(page, "Calendar");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(page.locator(".sidebar")).toBeVisible();
  await expect(page.locator(".glass-dock")).toHaveCount(0);
  expect(errors).toEqual([]);
});
test("Selected-day quick capture, immediate recurrence completion, celebration and Undo", async ({
  page,
}) => {
  await onboard(page, false);
  const day = await page
    .locator(".m-week-days>button")
    .last()
    .getAttribute("aria-label");
  const date = day.replace("Select ", "");
  await page.getByRole("button", { name: day, exact: true }).click();
  await dock(page, "Add a task").click();
  await expect(page.getByLabel("Date", { exact: true })).toHaveValue(date);
  await page
    .getByPlaceholder("What would you like to do?")
    .fill("A lovely daily walk");
  await page.getByLabel("Repeat", { exact: true }).selectOption("daily");
  await page.getByRole("button", { name: "Add task", exact: true }).click();
  await page
    .getByRole("button", { name: "Complete A lovely daily walk", exact: true })
    .click();
  let d = await stored(page);
  expect(d.tasks.filter((t) => t.status === "done")).toHaveLength(1);
  expect(d.tasks).toHaveLength(2);
  await expect(page.locator(".completion-burst")).toHaveCount(1);
  await expect(page.locator(".just-completed")).toHaveCount(1);
  await page.getByRole("button", { name: "Undo", exact: true }).click();
  d = await stored(page);
  expect(d.tasks).toHaveLength(1);
  expect(d.tasks[0].status).toBe("todo");
  await expect(page.locator(".completion-burst")).toHaveCount(0);
  await page
    .getByRole("button", { name: "Complete A lovely daily walk", exact: true })
    .click();
  await expect(page.locator(".m-task-card")).toHaveCount(0);
  await page.reload();
  expect((await stored(page)).tasks).toHaveLength(2);
  await expect(page.getByLabel("What should we call you?")).toHaveCount(0);
});
test("Personal check-in, truthful weekly chart, habits and reflection persist", async ({
  page,
}) => {
  await onboard(page);
  await page.locator(".m-task-card .m-task-check").first().click();
  await dock(page, "You").click();
  await page.getByRole("button", { name: "Great", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Great", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".m-wins-top strong")).toContainText("1");
  await page
    .getByRole("button", { name: "Save check-in", exact: true })
    .click();
  expect(Object.values((await stored(page)).moods)).toEqual(["great"]);
  await page
    .getByRole("button", { name: "Write a little", exact: true })
    .click();
  await page
    .getByLabel("Today's reflection")
    .fill("A calm moment and a completed task.");
  await page.getByRole("button", { name: "Keep this moment" }).click();
  await browse(page, "Rituals");
  await page.locator(".m-habit-days button:not([disabled])").first().click();
  expect((await stored(page)).habits[0].history.length).toBe(1);
  await page.reload();
  await dock(page, "You").click();
  await expect(page.locator(".mood-saved")).toContainText("great");
  expect(Object.values((await stored(page)).reflections)).toEqual([
    "A calm moment and a completed task.",
  ]);
});
test("Calendar planning and touch-friendly board status changes share the same tasks", async ({
  page,
}) => {
  await onboard(page, false);
  await browse(page, "Calendar");
  await page.getByLabel("Next month").click();
  const dayButton = page.locator(".m-month-grid>button:not(.outside)").nth(14);
  const date = (await dayButton.getAttribute("aria-label")).replace(
    "Select ",
    "",
  );
  await dayButton.click();
  await page.getByRole("button", { name: "Plan a task", exact: true }).click();
  await expect(page.getByLabel("Date", { exact: true })).toHaveValue(date);
  await page
    .getByPlaceholder("What would you like to do?")
    .fill("Calendar to board");
  await page.getByRole("button", { name: "Add task", exact: true }).click();
  expect((await stored(page)).tasks[0].due).toBe(date);
  await dock(page, "Plan").click();
  await page.getByLabel("Board view").click();
  await page.getByLabel("Status of Calendar to board").selectOption("done");
  expect((await stored(page)).tasks[0].status).toBe("done");
  await page.getByLabel("List view").click();
  await page.getByRole("button", { name: "Done", exact: true }).click();
  await page
    .getByRole("button", { name: "Reopen Calendar to board", exact: true })
    .click();
  expect((await stored(page)).tasks[0].status).toBe("todo");
});
test("Reduced motion and solid-glass preferences preserve function and persist", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await onboard(page);
  await page.locator(".m-task-card .m-task-check").first().click();
  await expect(page.locator(".completion-burst")).toHaveCount(0);
  await expect(page.locator(".just-completed")).toHaveCount(0);
  await page.getByLabel("Open profile settings").click();
  await page.getByRole("checkbox", { name: /Solid mobile navigation/ }).check();
  await page
    .getByRole("checkbox", { name: /Celebrate the little wins/ })
    .uncheck();
  await page.getByRole("button", { name: "Save preferences" }).click();
  await expect(page.locator(".solid-glass")).toHaveCount(1);
  await expect(page.locator(".less-motion")).toHaveCount(1);
  await page.reload();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator(".solid-glass")).toHaveCount(1);
  await page.locator(".m-task-card .m-task-check").first().click();
  await expect(page.locator(".completion-burst")).toHaveCount(0);
  expect((await stored(page)).profile.celebrations).toBe(false);
});
test("Bottom sheets lock the background, retain focus, use readable fields and reset safely", async ({
  page,
}) => {
  await onboard(page, false);
  await dock(page, "Add a task").click();
  await expect(page.locator(".app-body")).toHaveAttribute("inert", "");
  expect(
    await page
      .getByPlaceholder("What would you like to do?")
      .evaluate((el) => parseFloat(getComputedStyle(el).fontSize)),
  ).toBeGreaterThanOrEqual(16);
  expect(
    await page
      .getByLabel("Date", { exact: true })
      .evaluate((el) => parseFloat(getComputedStyle(el).fontSize)),
  ).toBeGreaterThanOrEqual(16);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(dock(page, "Add a task")).toBeFocused();
  await dock(page, "Add a task").click();
  await page.getByPlaceholder("What would you like to do?").fill("not saved");
  await page.getByLabel("Close dialog").click();
  expect((await stored(page)).tasks).toHaveLength(0);
});
test("Running focus session stays reachable across mobile navigation and reload", async ({
  page,
}) => {
  await onboard(page);
  await dock(page, "Focus").click();
  await page
    .getByRole("button", { name: "Start session", exact: true })
    .click();
  await dock(page, "Home").click();
  await expect(page.locator(".m-live-focus")).toBeVisible();
  await page.locator(".m-live-focus").click();
  await page
    .getByRole("button", { name: "Pause session", exact: true })
    .click();
  await expect(page.locator(".m-live-focus")).toHaveCount(0);
  await page.reload();
  await dock(page, "Focus").click();
  await expect(page.locator(".big-clock")).not.toHaveText("00:00");
  await expect(
    page.getByRole("button", { name: "Start session", exact: true }),
  ).toBeVisible();
});
