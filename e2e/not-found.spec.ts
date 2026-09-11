import { test, expect } from "@playwright/test";

/**
 * src/app/[locale]/not-found.tsx renders a translated 404 (title/body/CTA
 * from the NotFound message namespace) and links back to `/${locale}`. It's
 * only reachable with a *valid* locale in the URL — an unconfigured locale
 * segment (e.g. /fr) is covered in locale-routing.spec.ts instead, since
 * that never resolves a locale to translate the page with.
 *
 * Strings below are copied verbatim from messages/en.json and messages/it.json
 * (NotFound namespace) rather than guessed, so this breaks loudly if the copy
 * changes rather than silently matching on English text under an /it URL.
 */

test("an unknown path under /en renders the translated 404 page", async ({ page }) => {
  const response = await page.goto("/en/this-page-does-not-exist");
  expect(response?.status()).toBe(404);

  await expect(page.getByText("404", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
  await expect(page.getByText("This page doesn't exist or has moved.")).toBeVisible();

  const cta = page.getByRole("link", { name: "Back to home" });
  await expect(cta).toBeVisible();
  await expect(cta).toHaveAttribute("href", "/en");
});

test("an unknown path under /it renders the Italian 404 page and its CTA returns home", async ({
  page,
}) => {
  const response = await page.goto("/it/questa-pagina-non-esiste");
  expect(response?.status()).toBe(404);

  await expect(page.getByRole("heading", { name: "Pagina non trovata" })).toBeVisible();
  await expect(page.getByText("Questa pagina non esiste o è stata spostata.")).toBeVisible();

  await page.getByRole("link", { name: "Torna alla home" }).click();
  await expect(page).toHaveURL(/\/it\/?$/);
});
