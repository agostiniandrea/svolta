import { test, expect } from "@playwright/test";

/**
 * OpenNowBadge.tsx computes open/closed itself from the browser clock,
 * converted to Bangkok time (UTC+7) regardless of the runner's local
 * timezone: open Tue-Sun 11:30-21:00, closed all day Monday. It's rendered
 * once, in the footer (Footer.tsx: <OpenNowBadge dark />).
 *
 * The four fixed instants below are the same ones
 * src/components/OpenNowBadge/OpenNowBadge.test.tsx already uses for the
 * equivalent Jest/RTL coverage — reused here on purpose so this suite is
 * checking the same logic end-to-end in a real browser, not inventing new
 * cases. Copy is the real en.json OpenNow strings ("Open now" / "Closed"),
 * not the shorter stand-ins the Jest test's mocked provider uses.
 */

const cases: Array<{ label: string; utc: string; expected: "Open now" | "Closed" }> = [
  { label: "Tuesday afternoon Bangkok time", utc: "2025-01-07T06:00:00Z", expected: "Open now" },
  { label: "Monday (closed all day)", utc: "2025-01-06T06:00:00Z", expected: "Closed" },
  { label: "Tuesday before 11:30 opening", utc: "2025-01-07T02:00:00Z", expected: "Closed" },
  { label: "Tuesday after 21:00 closing", utc: "2025-01-07T14:30:00Z", expected: "Closed" },
];

for (const { label, utc, expected } of cases) {
  test(`footer badge shows "${expected}" on ${label}`, async ({ page }) => {
    await page.clock.install({ time: new Date(utc) });
    await page.goto("/en");

    const footer = page.locator("footer");
    await expect(footer.getByText(expected, { exact: true })).toBeVisible();
  });
}
