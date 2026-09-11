import { test, expect } from "@playwright/test";

/**
 * LocaleSwitcher.tsx strips the current locale prefix from the pathname and
 * rebuilds the same path under each locale, so switching language from a
 * subpage should land on the equivalent subpage, not the homepage. The
 * current locale renders as a non-interactive <span aria-current="true">,
 * the others as links.
 *
 * The switcher's own group has role="group" with an aria-label from the
 * "Nav.switchLocale" message, which is itself translated ("Switch language"
 * / "Cambia lingua" / "เปลี่ยนภาษา") — so a locator built against one
 * locale's label stops matching anything the moment the locale (and the
 * label) changes. There's exactly one such group per page, so re-querying
 * getByRole("group") with no name filter after navigating is what actually
 * stays valid across the switch.
 */

test("switching locale from a subpage preserves the path", async ({ page }) => {
  await page.goto("/en/menu");

  const switcherBefore = page.getByRole("group");
  await expect(switcherBefore.locator('[aria-current="true"]')).toHaveText("en");

  await switcherBefore.getByRole("link", { name: "it", exact: true }).click();
  await expect(page).toHaveURL("/it/menu");

  const switcherAfter = page.getByRole("group");
  await expect(switcherAfter.locator('[aria-current="true"]')).toHaveText("it");
});

test("switching locale from the homepage stays on the homepage", async ({ page }) => {
  await page.goto("/th");

  await page.getByRole("group").getByRole("link", { name: "en", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/?$/);
});
