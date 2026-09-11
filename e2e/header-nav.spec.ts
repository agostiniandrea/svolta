import { test, expect } from "@playwright/test";

/**
 * Header.tsx renders two navs: a desktop one (`hidden md:flex`, always in
 * the DOM but only visible at md+ widths) and a mobile dropdown that's only
 * mounted when its toggle button is open. Both share the same NAV_PATHS and
 * mark the active link with aria-current="page".
 */

test.describe("desktop nav", () => {
  test("marks the current page and links to the right locale paths", async ({ page }) => {
    await page.goto("/en/menu");

    const nav = page.getByRole("navigation", { name: "Main navigation" });
    const menuLink = nav.getByRole("link", { name: "Menu" });
    await expect(menuLink).toHaveAttribute("aria-current", "page");
    await expect(menuLink).toHaveAttribute("href", "/en/menu");

    const aboutLink = nav.getByRole("link", { name: "About" });
    await expect(aboutLink).toHaveAttribute("href", "/en/concept");
    await expect(aboutLink).not.toHaveAttribute("aria-current", "page");
  });
});

test.describe("mobile nav", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("toggle button opens and closes the mobile menu", async ({ page }) => {
    await page.goto("/en");

    const toggle = page.getByRole("button", { name: "Open navigation menu" });
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    // Desktop nav exists in the DOM but is hidden below the md breakpoint.
    await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeHidden();

    await toggle.click();
    const mobileNav = page.getByRole("navigation", { name: "Mobile navigation" });
    await expect(mobileNav).toBeVisible();
    await expect(mobileNav.getByRole("link", { name: "Delivery" })).toHaveAttribute(
      "href",
      "/en/delivery"
    );

    const closeToggle = page.getByRole("button", { name: "Close navigation menu" });
    await expect(closeToggle).toHaveAttribute("aria-expanded", "true");
    await closeToggle.click();
    await expect(mobileNav).toBeHidden();
  });

  test("picking a link in the mobile menu navigates and closes it", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "Contact" })
      .click();

    await expect(page).toHaveURL("/en/contact");
    await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeHidden();
  });
});
