import { test, expect } from "@playwright/test";

/**
 * JsonLd.tsx is rendered once per page by [locale]/layout.tsx and emits a
 * schema.org WebSite record (deliberately not Restaurant — see the comment
 * in JsonLd.tsx: SVOLTA is a concept project, not a real business, so it
 * should never claim a physical address/hours in structured data). This
 * checks the script is present exactly once, is valid JSON, and carries the
 * fields the component actually sets — not any content that would come from
 * Sanity.
 */

test("every locale page emits exactly one WebSite JSON-LD script", async ({ page }) => {
  await page.goto("/en");

  const scripts = page.locator('script[type="application/ld+json"]');
  await expect(scripts).toHaveCount(1);

  const raw = await scripts.first().textContent();
  const schema = JSON.parse(raw ?? "{}");

  expect(schema["@context"]).toBe("https://schema.org");
  expect(schema["@type"]).toBe("WebSite");
  expect(schema.name).toBe("SVOLTA");
  expect(typeof schema.url).toBe("string");
  expect(schema.url).toMatch(/^https?:\/\//);
});
