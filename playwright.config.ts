import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  // "github" alone posts inline annotations but writes no report to disk —
  // pairing it with "html" is what actually produces playwright-report/ for
  // the CI workflow's "Upload Playwright report" step to pick up.
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  // In CI the production server is already running (started for Lighthouse,
  // right before this suite runs — see .github/workflows/pull-request-test-lint.yml).
  // Locally, Playwright spins up `next dev` automatically.
  webServer: process.env.CI
    ? undefined
    : {
        command: "yarn dev",
        url: "http://localhost:3000",
        reuseExistingServer: true,
        timeout: 60_000,
      },
});
