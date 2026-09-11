import { test, expect } from "@playwright/test";

/**
 * src/app/robots.ts and src/app/sitemap.ts are pure, CMS-independent
 * functions (no Sanity fetch), so their output is fully deterministic:
 * robots.ts disallows /studio/ (the Sanity Studio route) and points at
 * /sitemap.xml; sitemap.ts is routing.locales (3) x a fixed page list (5:
 * home, /menu, /concept, /delivery, /contact) = 15 <url> entries.
 */

test("robots.txt disallows /studio/ and points at the sitemap", async ({ request }) => {
  const response = await request.get("/robots.txt");
  expect(response.status()).toBe(200);

  const body = await response.text();
  expect(body).toContain("Disallow: /studio/");
  expect(body).toMatch(/Sitemap:\s*\S+\/sitemap\.xml/);
});

test("sitemap.xml lists every locale x page combination", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("xml");

  const body = await response.text();
  const locCount = (body.match(/<loc>/g) ?? []).length;
  expect(locCount).toBe(15); // 3 locales x 5 pages

  for (const path of ["/th", "/en/menu", "/it/concept", "/th/delivery", "/en/contact"]) {
    expect(body).toContain(path);
  }
});
