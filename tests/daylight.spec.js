import { test, expect } from "@playwright/test";
async function onboard(page, { examples = true } = {}) {
  await page.goto("/");
  await page.getByLabel("What should we call you?").fill("Alex");
  for (let i = 0; i < 3; i++)
    await page.getByRole("button", { name: "Continue", exact: true }).click();
  if (!examples) await page.getByRole("checkbox").uncheck();
  await page.getByRole("button", { name: "Let the good days begin" }).click();
  await expect(
    page.getByRole("heading", { name: "Hello, Alex" }),
  ).toBeVisible();
}
const data = (page) =>
  page.evaluate(() =>
    JSON.parse(localStorage.getItem("daylight.workspace.v1")),
  );
const nav = (page, name) =>
  page.locator(".sidebar").getByRole("button", { name, exact: true }).click();
test("First-run answers configure the workspace and persist", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await page.getByLabel("What should we call you?").fill("Mina");
  await page.getByRole("button", { name: "Work & projects" }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.locator(".area-choice.selected")).toHaveCount(3);
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("button", { name: "3 tasks Easy does it" }).click();
  await page.getByRole("button", { name: "50 min Deep work" }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("button", { name: "Blossom Soft & expressive" }).click();
  await page.getByRole("checkbox").uncheck();
  await page.getByRole("button", { name: "Let the good days begin" }).click();
  let d = await data(page);
  expect(d.profile).toMatchObject({
    name: "Mina",
    goal: 3,
    focus: 50,
    theme: "blossom",
    purpose: "Work & projects",
  });
  expect(d.projects.map((p) => p.name)).toEqual([
    "Work",
    "Learning",
    "Creative",
  ]);
  expect(d.tasks).toHaveLength(0);
  await expect(page.locator(".focus-clock")).toContainText("50:00");
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Hello, Mina" }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});
test("Create, edit, search, complete, undo, delete a task with subtasks", async ({
  page,
}) => {
  await onboard(page, { examples: false });
  await page.keyboard.press("n");
  await page.getByLabel("Task title").fill("Ship my app tomorrow p1");
  await page.getByLabel("Task notes").fill("Use the pastel theme.");
  await page.getByLabel("Tags", { exact: true }).fill("release, creative");
  await page.getByLabel("New subtask").fill("Test the installer");
  await page.getByLabel("New subtask").press("Enter");
  await expect(page.locator(".subtask")).toHaveCount(1);
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Add task", exact: true })
    .click();
  let d = await data(page);
  expect(d.tasks[0]).toMatchObject({
    title: "Ship my app",
    priority: "high",
    tags: ["release", "creative"],
  });
  expect(d.tasks[0].subtasks).toHaveLength(1);
  await nav(page, "Upcoming");
  await expect(page.locator(".task-title")).toHaveText("Ship my app");
  await page.keyboard.press("Control+k");
  await page.getByLabel("Search tasks and projects").fill("ship");
  await page
    .locator(".search-results")
    .getByRole("button", { name: /Ship my app/ })
    .click();
  await page.getByLabel("Task title").fill("Ship Daylight");
  await page.getByLabel("Complete subtask Test the installer").check();
  await page.getByRole("button", { name: "Save changes" }).click();
  await page.getByLabel("Complete Ship Daylight", { exact: true }).click();
  expect((await data(page)).tasks[0].status).toBe("done");
  await page.getByRole("button", { name: "Undo", exact: true }).click();
  expect((await data(page)).tasks[0].status).toBe("todo");
  await page.locator(".task-content").click();
  await page.getByLabel("Delete task", { exact: true }).click();
  await page.getByLabel("Confirm delete task").click();
  expect((await data(page)).tasks).toHaveLength(0);
});
test("Recurring tasks and board status transitions", async ({ page }) => {
  await onboard(page, { examples: false });
  await page.keyboard.press("n");
  await page.getByLabel("Task title").fill("Weekly review");
  await page.getByLabel("Repeat", { exact: true }).selectOption("weekly");
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Add task", exact: true })
    .click();
  await page.getByRole("button", { name: "Board view", exact: true }).click();
  await page.getByLabel("Status of Weekly review").selectOption("doing");
  expect((await data(page)).tasks[0].status).toBe("doing");
  await page.getByLabel("Status of Weekly review").selectOption("done");
  let d = await data(page);
  expect(d.tasks).toHaveLength(2);
  expect(d.tasks[1].due > d.tasks[0].due).toBe(true);
  await expect(
    page.locator(".board-column").nth(2).locator(".board-task"),
  ).toHaveCount(1);
  await page.getByLabel("Status of Weekly review").selectOption("todo");
  expect((await data(page)).tasks).toHaveLength(1);
});
test("Project creation, covers, task association, and safe project removal", async ({
  page,
}) => {
  await onboard(page, { examples: false });
  await page.getByRole("button", { name: "New project", exact: true }).click();
  await page.getByLabel("Project name").fill("Side project");
  await page.getByLabel("forest cover").click();
  await page
    .getByRole("button", { name: "Create project", exact: true })
    .click();
  await expect(page.locator(".page-heading h1")).toHaveText("Side project");
  await page.keyboard.press("n");
  await page.getByLabel("Task title").fill("Create a prototype");
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Add task", exact: true })
    .click();
  let d = await data(page);
  expect(d.tasks[0].projectId).toBe(d.projects.at(-1).id);
  expect(d.projects.at(-1).image).toBe("forest");
  await page.getByRole("button", { name: "Edit project", exact: true }).click();
  await page
    .getByRole("button", { name: "Remove project", exact: true })
    .click();
  await page.getByRole("button", { name: "Confirm remove project?" }).click();
  d = await data(page);
  expect(d.projects.some((p) => p.name === "Side project")).toBe(false);
  expect(d.tasks[0].projectId).toBe("");
});
test("Calendar date selection and task planning", async ({ page }) => {
  await onboard(page, { examples: false });
  await nav(page, "Calendar");
  await page.getByLabel("Next month").click();
  const add = page
    .locator(".calendar-cell:not(.outside)")
    .nth(9)
    .locator(".calendar-add");
  const date = (await add.getAttribute("aria-label")).replace(
    "Add task on ",
    "",
  );
  await add.click();
  await expect(page.getByLabel("Date", { exact: true })).toHaveValue(date);
  await page.getByLabel("Task title").fill("A future plan");
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Add task", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "A future plan", exact: true }),
  ).toBeVisible();
  expect((await data(page)).tasks[0].due).toBe(date);
});
test("Habit CRUD, daily check-ins, week navigation, and persistence", async ({
  page,
}) => {
  await onboard(page, { examples: false });
  await nav(page, "Habits");
  await page.getByRole("button", { name: "New ritual", exact: true }).click();
  await page.getByLabel("Habit name").fill("Drink water");
  await page.getByLabel("coffee icon").click();
  await page.getByRole("button", { name: "Save ritual" }).click();
  const check = page.locator(".ritual-check:not([disabled])").last();
  await check.click();
  expect((await data(page)).habits[0].history).toHaveLength(1);
  await page.reload();
  await nav(page, "Habits");
  await expect(page.locator(".ritual-check.checked")).toHaveCount(1);
  await page.getByLabel("Previous week").click();
  await expect(page.getByLabel("Next week")).toBeEnabled();
  await page.locator(".habit-name").click();
  await page.getByLabel("Habit name").fill("Enjoy a glass of water");
  await page.getByRole("button", { name: "Save ritual" }).click();
  expect((await data(page)).habits[0].title).toBe("Enjoy a glass of water");
});
test("Focus timer pauses, survives reload, and records a completed session", async ({
  page,
}) => {
  await onboard(page, { examples: false });
  await nav(page, "Focus");
  await page.clock.install();
  await page
    .getByRole("button", { name: "Start session", exact: true })
    .click();
  await page.clock.fastForward(61000);
  await expect(page.locator(".big-clock")).toHaveText("23:59");
  await page
    .getByRole("button", { name: "Pause session", exact: true })
    .click();
  await page.clock.fastForward(30000);
  await expect(page.locator(".big-clock")).toHaveText("23:59");
  await page
    .getByRole("button", { name: "Start session", exact: true })
    .click();
  await page.clock.fastForward(24 * 60 * 1000);
  await expect(page.locator(".big-clock")).toHaveText("00:00");
  expect((await data(page)).sessions).toHaveLength(1);
  expect((await data(page)).sessions[0].minutes).toBe(25);
  await page.getByRole("button", { name: "Short break", exact: true }).click();
  await expect(page.locator(".big-clock")).toHaveText("05:00");
  await page.reload();
  await nav(page, "Focus");
  await expect(page.locator(".big-clock")).toHaveText("05:00");
});
test("Backups export, validate and restore with confirmation", async ({
  page,
}) => {
  await onboard(page);
  await page.getByLabel("Open profile settings").click();
  const downloadEvent = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export backup" }).click();
  const download = await downloadEvent;
  expect(download.suggestedFilename()).toMatch(/daylight-backup-.*\.json/);
  const d = await data(page);
  d.profile.name = "Restored";
  await page
    .locator("input[type=file]")
    .setInputFiles({
      name: "invalid.json",
      mimeType: "application/json",
      buffer: Buffer.from("{}"),
    });
  await expect(page.getByRole("alert")).toBeVisible();
  await page
    .locator("input[type=file]")
    .setInputFiles({
      name: "backup.json",
      mimeType: "application/json",
      buffer: Buffer.from(JSON.stringify(d)),
    });
  await expect(page.getByText("Replace this workspace?")).toBeVisible();
  await page.getByRole("button", { name: "Yes, restore backup" }).click();
  await expect(
    page.getByRole("heading", { name: "Hello, Restored" }),
  ).toBeVisible();
});
test("Installed production app shell works offline with local assets", async ({
  page,
  context,
}) => {
  await onboard(page);
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload();
  await expect
    .poll(() => page.evaluate(() => !!navigator.serviceWorker.controller))
    .toBe(true);
  await context.setOffline(true);
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Hello, Alex" }),
  ).toBeVisible();
  await nav(page, "Focus");
  await expect(page.locator(".big-clock")).toHaveText("25:00");
  expect(
    await page.evaluate(async () => {
      const r = await fetch("/images/forest.jpg");
      return r.ok;
    }),
  ).toBe(true);
});
test("Responsive onboarding and dashboard fit a phone viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await onboard(page);
  await page.waitForTimeout(250);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.getByLabel("Open menu").click();
  await nav(page, "Habits");
  await page.waitForTimeout(300);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({ path: "qa/mobile-habits.png", fullPage: true });
});
test("Monthly recurrence clamps month-end and reopening via editor removes successor", async ({
  page,
}) => {
  await onboard(page, { examples: false });
  await page.keyboard.press("n");
  await page.getByLabel("Task title").fill("Month-end review");
  await page.getByLabel("Date", { exact: true }).fill("2027-01-31");
  await page.getByLabel("Repeat", { exact: true }).selectOption("monthly");
  await page.getByLabel("Status", { exact: true }).selectOption("done");
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Add task", exact: true })
    .click();
  let d = await data(page);
  expect(d.tasks).toHaveLength(2);
  expect(d.tasks[1].due).toBe("2027-02-28");
  await nav(page, "Completed");
  await page.locator(".task-content").click();
  await page.getByLabel("Status", { exact: true }).selectOption("todo");
  await page.getByRole("button", { name: "Save changes" }).click();
  expect((await data(page)).tasks).toHaveLength(1);
});
test("Filtering, sorting, and reflection all save real changes", async ({
  page,
}) => {
  await onboard(page);
  await page.getByRole("button", { name: "Filters", exact: true }).click();
  await page.getByLabel("Filter priority").selectOption("medium");
  await expect(page.locator(".task-row")).toHaveCount(1);
  await page.getByRole("button", { name: "Reset", exact: true }).click();
  await expect(page.locator(".task-row")).toHaveCount(4);
  await page.getByLabel("Sort tasks").selectOption("name");
  await expect(page.locator(".task-title").first()).toHaveText(
    "Choose this week’s top priorities",
  );
  await page.locator(".daily-spark").click();
  await page.getByLabel("Today's reflection").fill("I made space to create.");
  await page.getByRole("button", { name: "Keep this moment" }).click();
  expect(Object.values((await data(page)).reflections)).toContain(
    "I made space to create.",
  );
  await page.reload();
  await page.locator(".daily-spark").click();
  await expect(page.getByLabel("Today's reflection")).toHaveValue(
    "I made space to create.",
  );
});
