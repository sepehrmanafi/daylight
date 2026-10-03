import { test, expect } from "@playwright/test";

const introKey = "daylight.intro.completed.v1";

async function openFresh(page) {
  await page.goto("/");
  await expect(page.locator(".intro-slider")).toBeVisible();
}

test("first visit shows the welcome story before the questionnaire", async ({
  page,
}) => {
  await openFresh(page);
  await expect(
    page.getByRole("heading", { name: "Clear the mental clutter" }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Back" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Next", exact: true })).toBeVisible();

  await page.getByRole("button", { name: "Next", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Make today feel doable" }),
  ).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("heading", { name: "See your progress grow" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Get Started", exact: true }).click();
  await expect(page.locator(".setup-journey")).toBeVisible();
  expect(await page.evaluate((key) => localStorage.getItem(key), introKey)).toBe(
    "true",
  );

  await page.reload();
  await expect(page.locator(".intro-slider")).toHaveCount(0);
  await expect(page.locator(".setup-journey")).toBeVisible();
});

test("skip completes the intro from the current slide and exposes the questionnaire", async ({
  page,
}) => {
  await openFresh(page);
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await page.getByRole("button", { name: "Skip", exact: true }).click();
  await expect(page.locator(".setup-journey")).toBeVisible();
  expect(await page.evaluate((key) => localStorage.getItem(key), introKey)).toBe(
    "true",
  );
  await page.reload();
  await expect(page.locator(".intro-slider")).toHaveCount(0);
});

test("settings can replay the welcome without deleting the workspace", async ({
  page,
}) => {
  await openFresh(page);
  await page.getByRole("button", { name: "Skip", exact: true }).click();
  await page.getByLabel("What should we call you?").fill("Replay");
  for (let i = 0; i < 3; i++) {
    await page.getByRole("button", { name: "Continue", exact: true }).click();
  }
  await page.getByRole("button", { name: "Let the good days begin" }).click();
  await page.getByLabel("Open profile settings").click();
  await page.getByRole("button", { name: "Replay intro", exact: true }).click();
  await expect(page.locator(".intro-slider")).toBeVisible();
  await page.getByRole("button", { name: "Skip", exact: true }).click();
  await expect(page.locator(".app")).toBeVisible();
  await expect(page.getByRole("heading", { name: /Replay/ })).toBeVisible();
});

test("keyboard, swipe, analytics, and reduced motion remain available", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const analytics = [];
  await page.exposeFunction("recordDaylightEvent", (event) => analytics.push(event));
  await page.addInitScript(() => {
    window.addEventListener("daylight:analytics", (event) => {
      window.recordDaylightEvent(event.detail);
    });
  });
  await openFresh(page);
  await expect(page.locator(".intro-slide-art")).toHaveCSS(
    "animation-name",
    "intro-simple-fade",
  );
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("heading", { name: "Make today feel doable" }),
  ).toBeVisible();
  await page.locator(".intro-main").dispatchEvent("pointerdown", {
    clientX: 320,
    clientY: 300,
    pointerId: 1,
    button: 0,
  });
  await page.locator(".intro-main").dispatchEvent("pointerup", {
    clientX: 60,
    clientY: 303,
    pointerId: 1,
    button: 0,
  });
  await expect(
    page.getByRole("heading", { name: "See your progress grow" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator(".setup-journey")).toBeVisible();
  await expect
    .poll(() => analytics.map((event) => event.name))
    .toEqual(expect.arrayContaining(["intro_viewed", "slide_viewed", "intro_skipped"]));
});
