import { test, expect } from "@playwright/test";
import { routing } from "../src/i18n/routing";

/**
 * routing.ts pins locales to ["th", "en", "it"] with defaultLocale "th" and
 * localePrefix: "always" — every real page lives under an explicit /th, /en
 * or /it prefix, and "/" is expected to redirect to the default locale.
 * middleware.ts's matcher is ["/", "/(th|en|it)/:path*"], so a locale
 * segment outside that set (e.g. /fr) never reaches the middleware at all —
 * it falls straight through to src/app/[locale]/layout.tsx, which calls
 * notFound() for any locale not in routing.locales. That's the 404 case
 * covered here; the "valid locale, unknown page" 404 is covered separately
 * in not-found.spec.ts.
 */

test("/ redirects to the default locale (/th)", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/th\/?$/);
});

for (const locale of routing.locales) {
  test(`/${locale} serves the homepage`, async ({ page }) => {
    const response = await page.goto(`/${locale}`);
    expect(response?.status()).toBe(200);

    // Header renders on every locale route (src/app/[locale]/layout.tsx).
    await expect(page.getByRole("link", { name: "SVOLTA" }).first()).toBeVisible();
    await expect(page.locator("main#main-content")).toBeVisible();
  });
}

test("an unconfigured locale segment 404s", async ({ page }) => {
  // /fr isn't in routing.locales and isn't matched by the middleware, so it
  // reaches [locale]/layout.tsx with locale="fr" and hits notFound().
  const response = await page.goto("/fr");
  expect(response?.status()).toBe(404);
});
