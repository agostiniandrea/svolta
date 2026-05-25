import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const NAV_LINKS = [
  { href: "/menu" as const, label: "menu" as const },
  { href: "/concept" as const, label: "about" as const },
  { href: "/delivery" as const, label: "delivery" as const },
  { href: "/contact" as const, label: "contact" as const },
];

export default async function Footer() {
  const t = await getTranslations("Footer");
  const tNav = await getTranslations("Nav");
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
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
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
