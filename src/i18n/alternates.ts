import { routing } from "./routing";

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://svolta-bkk.vercel.app";
const siteUrl = rawSiteUrl.startsWith("http") ? rawSiteUrl : `https://${rawSiteUrl}`;

/**
 * Builds the `alternates` block for a page's generateMetadata so every
 * localized route emits a self-referencing canonical plus a full set of
 * hreflang tags (one per locale, plus x-default) pointing at its sibling
 * translations.
 *
 * Without this, nothing tells Google that e.g. /en/menu and /it/menu are
 * the same page in different languages rather than separate or duplicate
 * content — which can cause the wrong locale to rank for a given search,
 * or the variants to compete with each other instead of reinforcing the
 * same page.
 *
 * `pathname` is the locale-less path: "" for the homepage, "/menu",
 * "/concept", "/delivery", "/contact" for the rest — the same list
 * sitemap.ts uses, so the two stay in sync by construction.
 */
export function buildAlternates(locale: string, pathname: string) {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = `${siteUrl}/${l}${pathname}`;
  }
  // x-default: what to serve a visitor whose browser locale doesn't match
  // any of the above — point it at the same locale the root "/" redirects to.
  languages["x-default"] = `${siteUrl}/${routing.defaultLocale}${pathname}`;

  return {
    canonical: `${siteUrl}/${locale}${pathname}`,
    languages,
  };
}
