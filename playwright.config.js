import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  timeout: 45000,
  use: {
    baseURL: process.env.TEST_URL || "http://localhost:4173",
    viewport: { width: 1440, height: 1000 },
    headless: true,
  },
  reporter: "list",
  workers: 2,
});
