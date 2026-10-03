import { test, expect } from "@playwright/test";
import fs from "node:fs/promises";
const palette = {
  sunshine: {
    bg: "rgb(255, 249, 237)",
    hero: "rgb(247, 216, 124)",
    card: "rgb(255, 227, 164)",
  },
  blossom: {
    bg: "rgb(252, 241, 247)",
    hero: "rgb(234, 185, 217)",
    card: "rgb(242, 201, 221)",
  },
  sage: {
    bg: "rgb(238, 245, 233)",
    hero: "rgb(192, 215, 164)",
    card: "rgb(202, 221, 179)",
  },
  midnight: {
    bg: "rgb(20, 24, 32)",
    hero: "rgb(48, 43, 69)",
    card: "rgb(52, 50, 74)",
  },
};
const stored = (p) =>
  p.evaluate(() => JSON.parse(localStorage.getItem("daylight.workspace.v1")));
async function skipIntro(p) {
  const skip = p.getByRole("button", { name: "Skip", exact: true });
  await skip.click();
}
async function setup(p, theme = "sunshine") {
  await p.goto("/");
  await skipIntro(p);
  await p.getByLabel("What should we call you?").fill("Mina");
  for (let i = 0; i < 3; i++)
    await p.getByRole("button", { name: "Continue", exact: true }).click();
  await p.locator(`[data-theme-option=${theme}]`).click();
}
async function finish(p) {
  await p.getByRole("button", { name: "Let the good days begin" }).click();
  await p.getByLabel("Dismiss notification").click();
}
for (const theme of Object.keys(palette))
  test(`${theme}: setup previews real colors; mobile, desktop, chrome and reload agree`, async ({
    page,
  }) => {
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.setViewportSize({ width: 390, height: 844 });
    await setup(page, theme);
    await expect(page.locator(".setup-journey")).toHaveCSS(
      "background-color",
      palette[theme].bg,
    );
    await expect(page.locator(".palette-preview-hero")).toHaveCSS(
      "background-color",
      palette[theme].hero,
    );
    await expect(page.locator(`[data-theme-option=${theme}]`)).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await page.setViewportSize({ width: 320, height: 700 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
    await finish(page);
    await expect(page.locator(".app")).toHaveCSS(
      "background-color",
      palette[theme].bg,
    );
    await expect(page.locator(".m-hero")).toHaveCSS(
      "background-color",
      palette[theme].hero,
    );
    await expect(page.locator(".m-task-card").first()).toHaveCSS(
      "background-color",
      palette[theme].card,
    );
    expect((await stored(page)).profile.theme).toBe(theme);
    await expect(page.locator("html")).toHaveCSS(
      "color-scheme",
      theme === "midnight" ? "dark" : "light",
    );
    await expect(page.locator(".simple-gray-pill")).toHaveCSS(
      "background-color",
      "rgba(110, 110, 120, 0.42)",
    );
    await expect(page.locator(".glass-nav")).toHaveCSS("height", "76px");
    await page.reload();
    await expect(page.locator(".app")).toHaveAttribute("data-theme", theme);
    await page.setViewportSize({ width: 1440, height: 1000 });
    await expect(page.locator(".day-hero")).toHaveCSS(
      "background-color",
      palette[theme].hero,
    );
    expect(errors).toEqual([]);
  });
for (const width of [390, 1440])
  test(`Settings ${width}px: preview is temporary, Escape restores, Save persists without data loss`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 1000 });
    await setup(page);
    await finish(page);
    const initial = await stored(page);
    await page.getByLabel("Open profile settings").click();
    await page.locator("[data-theme-option=midnight]").click();
    await expect(page.locator(".app")).toHaveAttribute(
      "data-theme",
      "midnight",
    );
    expect((await stored(page)).profile.theme).toBe("sunshine");
    await page.keyboard.press("Escape");
    await expect(page.locator(".app")).toHaveAttribute(
      "data-theme",
      "sunshine",
    );
    await expect(page.locator("html")).toHaveCSS("color-scheme", "light");
    await page.getByLabel("Open profile settings").click();
    await page.locator("[data-theme-option=midnight]").click();
    await page.getByRole("button", { name: "Save preferences" }).click();
    await page.reload();
    await expect(page.locator(".app")).toHaveAttribute(
      "data-theme",
      "midnight",
    );
    const saved = await stored(page);
    expect(saved.tasks).toEqual(initial.tasks);
    expect(saved.projects).toEqual(initial.projects);
    await page.getByLabel("Open profile settings").click();
    await page.locator("[data-theme-option=blossom]").click();
    await page.getByLabel("Close dialog").click();
    await expect(page.locator(".app")).toHaveAttribute(
      "data-theme",
      "midnight",
    );
  });
test("Midnight round-trips in a backup; restore overrides unsaved theme previews", async ({
  page,
}) => {
  await setup(page, "midnight");
  await finish(page);
  await page.getByLabel("Open profile settings").click();
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export backup" }).click();
  const d = await download;
  const backup = JSON.parse(await fs.readFile(await d.path(), "utf8"));
  expect(backup.profile.theme).toBe("midnight");
  await page.locator("[data-theme-option=sage]").click();
  await page
    .locator("input[type=file]")
    .setInputFiles({
      name: "backup.json",
      mimeType: "application/json",
      buffer: Buffer.from(JSON.stringify(backup)),
    });
  await page.getByRole("button", { name: "Yes, restore backup" }).click();
  await expect(page.locator(".app")).toHaveAttribute("data-theme", "midnight");
  expect((await stored(page)).tasks).toEqual(backup.tasks);
  await page.reload();
  await expect(page.locator(".app")).toHaveAttribute("data-theme", "midnight");
});
