import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3100",
    browserName: "chromium",
    reducedMotion: "reduce",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "chromium-mobile", use: { viewport: { width: 360, height: 800 } } },
    {
      name: "chromium-desktop",
      use: { viewport: { width: 1280, height: 900 } },
    },
  ],
  webServer: {
    command: "npm run start -- --hostname 127.0.0.1 --port 3100",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
