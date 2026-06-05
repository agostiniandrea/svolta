import Link from "next/link";
import { getTranslations } from "next-intl/server";
import OpenNowBadge from "../OpenNowBadge";

const NAV_PATHS = [
  { path: "menu", label: "menu" as const },
  { path: "concept", label: "about" as const },
  { path: "delivery", label: "delivery" as const },
  { path: "contact", label: "contact" as const },
];

type Props = { locale: string };

export default async function Footer({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "Footer" });
  const tNav = await getTranslations({ locale, namespace: "Nav" });
  const year = new Date().getFullYear();
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? null;

  return (
    <footer
      className="mt-auto"
      style={{ background: "var(--color-void)", color: "var(--color-cream)" }}
    >
      <div
        className="mx-auto px-6 py-16 grid gap-10"
        style={{
          maxWidth: "var(--max-w-container)",
          gridTemplateColumns: "repeat(auto-fit, minmax(14rem, 1fr))",
        }}
      >
        {/* Brand */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-xl)",
              fontWeight: 600,
              marginBottom: "0.5rem",
            }}
          >
            SVOLTA
          </p>
          <div style={{ marginBottom: "0.75rem" }}>
            <OpenNowBadge dark />
          </div>
          <p style={{ fontSize: "var(--text-sm)", opacity: 0.6, lineHeight: 1.7 }}>
            {t("tagline")}
          </p>
          {instagramUrl && (
            <Link
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                marginTop: "1rem",
                fontSize: "var(--text-sm)",
                color: "var(--color-cream)",
                opacity: 0.7,
                textDecoration: "none",
                transition: "opacity 150ms",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              Instagram
            </Link>
          )}
        </div>

        {/* Nav */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-col gap-3 list-none m-0 p-0">
            {NAV_PATHS.map(({ path, label }) => (
              <li key={path}>
                <Link
                  href={`/${locale}/${path}`}
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--color-cream)",
                    opacity: 0.7,
                    textDecoration: "none",
                    transition: "opacity 150ms",
                  }}
                >
                  {tNav(label)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Legal */}
        <div style={{ fontSize: "var(--text-xs)", opacity: 0.55, alignSelf: "flex-end" }}>
          <p>{t("rights", { year })}</p>
        </div>
      </div>
    </footer>
  );
}
