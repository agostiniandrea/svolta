import { notFound } from "next/navigation";

/**
 * Without this, an unknown path under a valid locale (e.g.
 * /en/does-not-exist) has NO matching route at all, so Next.js falls back
 * to [locale]/not-found.tsx directly — but that fallback path never runs
 * this segment's own render pass, so [locale]/layout.tsx's
 * setRequestLocale(locale) doesn't get a chance to run for it either, and
 * next-intl's getLocale() inside not-found.tsx resolves through its own
 * negotiation instead of the URL's actual locale segment. In practice this
 * showed up as /en and /it 404s both rendering the not-found copy in the
 * negotiated/default locale rather than the one in the URL.
 *
 * This catch-all turns "no route matched" into "a real page matched, and
 * it explicitly calls notFound()" for anything under /[locale]/ that isn't
 * one of the known pages. Because it's an actual route in the [locale]
 * segment, [locale]/layout.tsx (and its setRequestLocale call) runs
 * normally before notFound() throws, so not-found.tsx's getLocale() sees
 * the correct locale. This is next-intl's own documented fix for this
 * exact class of bug.
 *
 * Static/known segments (menu, concept, delivery, contact, studio) all
 * take routing precedence over this catch-all, so they're unaffected.
 */
export default function CatchAllNotFound() {
  notFound();
}
