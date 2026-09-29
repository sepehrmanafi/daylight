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
async function setup(p) {
  await p.goto("/");
  await p.getByLabel("What should we call you?").fill("Mina");
  for (let i = 0; i < 3; i++)
    await p.getByRole("button", { name: "Continue", exact: true }).click();
  await p.getByRole("button", { name: "Let the good days begin" }).click();
  await p.getByLabel("Dismiss notification").click();
}
test("Onboarding swipe, back navigation, answers and first-visit persistence", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByLabel("What should we call you?").fill("Mina");
  await page
    .getByRole("button", { name: "Everyday life", exact: true })
    .click();
  await page
    .locator(".journey-stage")
    .dispatchEvent("pointerdown", {
      clientX: 320,
      clientY: 200,
      pointerId: 1,
      button: 0,
    });
  await page
    .locator(".journey-stage")
    .dispatchEvent("pointerup", {
      clientX: 60,
      clientY: 204,
      pointerId: 1,
      button: 0,
    });
  await expect(page.locator(".area-choice.selected")).toHaveCount(3);
  await page.getByLabel("Previous onboarding slide").click();
  await expect(page.getByLabel("What should we call you?")).toHaveValue("Mina");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("button", { name: "3 tasks Easy does it" }).click();
  await page.getByRole("button", { name: "15 min A quick reset" }).click();
  await page.getByRole("button", { name: "Morning", exact: true }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("checkbox").uncheck();
  await page.getByRole("button", { name: "Let the good days begin" }).click();
  expect((await stored(page)).profile).toMatchObject({
    name: "Mina",
    purpose: "Everyday life",
    goal: 3,
    focus: 15,
    routine: "Morning",
    examples: false,
  });
  await expect(page.locator(".m-hero-copy")).toContainText(
    "YOUR MORNING MOMENT",
  );
  await page.reload();
  await expect(page.locator(".setup-journey")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Hi, Mina" })).toBeVisible();
});
test("Supplied dock dimensions, retained icons, drag-to-select, and active-tab taps", async ({
  page,
}) => {
  await setup(page);
  await expect(page.locator(".glass-nav svg")).toHaveCount(5);
  expect(
    await page
      .locator(".glass-nav")
      .evaluate((e) => Math.round(e.getBoundingClientRect().height)),
  ).toBe(76);
  expect(
    await page
      .locator(".simple-gray-pill")
      .evaluate((e) => getComputedStyle(e).backgroundColor),
  ).toBe("rgba(110, 110, 120, 0.42)");
  expect(
    await page
      .locator(".simple-gray-pill")
      .evaluate((e) => Math.round(e.getBoundingClientRect().height)),
  ).toBe(58);
  await page.getByLabel("Browse workspace").click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Calendar", exact: true })
    .click();
  await dock(page, "Plan").click();
  await expect(page.getByLabel("Board view")).toBeVisible();
  await dock(page, "Home").click();
  await expect(dock(page, "Home")).toHaveAttribute("aria-current", "page");
  const a = await dock(page, "Home").boundingBox(),
    z = await dock(page, "You").boundingBox();
  await page.mouse.move(a.x + a.width / 2, a.y + a.height / 2);
  await page.mouse.down();
  await page.mouse.move(z.x + z.width / 2, z.y + z.height / 2, { steps: 12 });
  await page.mouse.up();
  await expect(page.locator(".mood-checkin")).toBeVisible();
  await expect(dock(page, "You")).toHaveAttribute("aria-current", "page");
  await dock(page, "Plan").click();
  await expect(page.getByLabel("Board view")).toBeVisible();
});
test("Mood is a draft until saved; keyboard slider, optional context, reload and backup", async ({
  page,
}) => {
  await setup(page);
  await dock(page, "You").click();
  const range = page.getByRole("slider", { name: "How are you feeling?" });
  await range.focus();
  await range.press("ArrowRight");
  await expect(range).toHaveAttribute("aria-valuetext", "Good");
  expect((await stored(page)).moods).toBeUndefined();
  await page.getByRole("button", { name: "Add context", exact: true }).click();
  await page.getByRole("button", { name: "Rest", exact: true }).click();
  await page.getByRole("button", { name: "Outdoors", exact: true }).click();
  await page
    .getByLabel("Anything you’d like to remember?")
    .fill("A quiet afternoon outside.");
  await page.getByRole("button", { name: "Keep this little moment" }).click();
  await expect(page.locator(".mood-saved")).toContainText(
    "A quiet afternoon outside.",
  );
  let d = await stored(page);
  expect(Object.values(d.moods)).toEqual(["good"]);
  expect(Object.values(d.moodDetails)[0]).toMatchObject({
    note: "A quiet afternoon outside.",
    tags: ["Rest", "Outdoors"],
  });
  await page.reload();
  await dock(page, "You").click();
  await expect(page.locator(".mood-saved")).toContainText(
    "A quiet afternoon outside.",
  );
  await page.getByLabel("Open profile settings").click();
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export backup" }).click();
  const file = await downloadPromise;
  const fs = await import("node:fs/promises");
  const exported = JSON.parse(await fs.readFile(await file.path(), "utf8"));
  expect(exported.moodDetails).toEqual(d.moodDetails);
});
test("Legacy moods remain valid; honest gaps, date editing and confirmed removal", async ({
  page,
}) => {
  await setup(page);
  const dates = await page.evaluate(() => {
    let d = JSON.parse(localStorage.getItem("daylight.workspace.v1"));
    const days = [0, -1, -3].map((n) => {
      const t = new Date();
      t.setDate(t.getDate() + n);
      return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
    });
    d.moods = Object.fromEntries(
      days.map((k, i) => [k, ["good", "great", "low"][i]]),
    );
    delete d.moodDetails;
    localStorage.setItem("daylight.workspace.v1", JSON.stringify(d));
    return days;
  });
  await page.reload();
  await dock(page, "You").click();
  await expect(page.locator(".mood-stats")).toContainText("3");
  await expect(page.locator(".mood-chart-point")).toHaveCount(3);
  await expect(page.locator(".mood-trend-line")).toHaveCount(1);
  await page.getByRole("button", { name: "30d", exact: true }).click();
  await expect(page.locator(".mood-chart-point")).toHaveCount(3);
  await page
    .getByRole("button", { name: `${dates[2]}, Low`, exact: true })
    .click();
  await expect(page.getByRole("slider")).toHaveAttribute(
    "aria-valuetext",
    "Low",
  );
  await page.getByRole("button", { name: "Okay", exact: true }).click();
  await page
    .getByRole("button", { name: "Save check-in", exact: true })
    .click();
  expect((await stored(page)).moods[dates[2]]).toBe("okay");
  await page
    .getByRole("button", { name: "Remove check-in", exact: true })
    .click();
  await page.getByRole("button", { name: "Cancel", exact: true }).click();
  expect(Object.keys((await stored(page)).moods)).toHaveLength(3);
  await page
    .getByRole("button", { name: "Remove check-in", exact: true })
    .click();
  await page.getByRole("button", { name: "Remove", exact: true }).click();
  expect((await stored(page)).moods[dates[2]]).toBeUndefined();
  expect((await stored(page)).moodDetails[dates[2]]).toBeUndefined();
  await expect(page.locator(".mood-chart-point")).toHaveCount(2);
});
test("All slides fit narrow phones; Home entrance and reduced motion; desktop You", async ({
  page,
}) => {
  await page.goto("/");
  for (const width of [320, 360, 390, 430, 768, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
  }
  await page.setViewportSize({ width: 320, height: 700 });
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  for (let i = 0; i < 2; i++) {
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
    await page.getByRole("button", { name: "Continue", exact: true }).click();
  }
  await page.getByRole("button", { name: "Let the good days begin" }).click();
  expect(
    await page
      .locator(".m-hero")
      .evaluate((e) => getComputedStyle(e).animationName),
  ).toBe("home-rise");
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(
    await page
      .locator(".m-hero")
      .evaluate((e) => getComputedStyle(e).animationName),
  ).toBe("none");
  await dock(page, "You").click();
  await expect(page.locator(".mood-chart-point")).toHaveCount(0);
  await expect(
    page.getByText("Your story starts with one check-in.", { exact: true }),
  ).toBeVisible();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(page.locator(".desktop-feelings")).toBeVisible();
  await expect(
    page.locator(".sidebar").getByRole("button", { name: "You", exact: true }),
  ).toBeVisible();
});
