import Link from "next/link";
import { getTranslations } from "next-intl/server";

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
              marginBottom: "0.75rem",
            }}
          >
            SVOLTA
          </p>
          <p style={{ fontSize: "var(--text-sm)", opacity: 0.6, lineHeight: 1.7 }}>
            {t("tagline")}
          </p>
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
        <div style={{ fontSize: "var(--text-xs)", opacity: 0.4, alignSelf: "flex-end" }}>
          <p>{t("rights", { year })}</p>
        </div>
      </div>
    </footer>
  );
}
