import { test, expect } from "@playwright/test";

/**
 * LocaleSwitcher.tsx strips the current locale prefix from the pathname and
 * rebuilds the same path under each locale, so switching language from a
 * subpage should land on the equivalent subpage, not the homepage. The
 * current locale renders as a non-interactive <span aria-current="true">,
 * the others as links — both are asserted here.
 */

test("switching locale from a subpage preserves the path", async ({ page }) => {
  await page.goto("/en/menu");

  const switcher = page.getByRole("group", { name: "Switch language" });
  await expect(switcher.locator('[aria-current="true"]')).toHaveText("en");

  await switcher.getByRole("link", { name: "it", exact: true }).click();
  await expect(page).toHaveURL("/it/menu");
  await expect(switcher.locator('[aria-current="true"]')).toHaveText("it");
});

test("switching locale from the homepage stays on the homepage", async ({ page }) => {
  await page.goto("/th");

  const switcher = page.getByRole("group", { name: "เปลี่ยนภาษา" });
  await switcher.getByRole("link", { name: "en", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/?$/);
});
