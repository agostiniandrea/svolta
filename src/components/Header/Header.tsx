"use client";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import LocaleSwitcher from "../LocaleSwitcher";

const NAV_PATHS = [
  { path: "menu", label: "menu" as const },
  { path: "concept", label: "about" as const },
  { path: "delivery", label: "delivery" as const },
  { path: "contact", label: "contact" as const },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-40"
      style={{
        background: "var(--color-page)",
        borderBottom: "1px solid color-mix(in srgb, var(--color-ink) 10%, transparent)",
      }}
    >
      <div
        className="mx-auto px-6 flex items-center justify-between"
        style={{ maxWidth: "var(--max-w-container)", height: "4rem" }}
      >
        {/* Logo — always links to locale home */}
        <Link
          href={`/${locale}`}
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "var(--text-xl)",
            color: "var(--color-forest)",
            fontWeight: 600,
            letterSpacing: "0.05em",
            textDecoration: "none",
          }}
        >
          SVOLTA
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
          {NAV_PATHS.map(({ path, label }) => {
            const href = `/${locale}/${path}`;
            const isActive = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={path}
                href={href}
                aria-current={isActive ? "page" : undefined}
                style={{
                  fontSize: "var(--text-sm)",
                  fontWeight: 500,
                  textDecoration: "none",
                  color: isActive ? "var(--color-forest)" : "var(--color-ink-soft)",
                  transition: "color 150ms",
                }}
              >
                {t(label)}
              </Link>
            );
          })}
        </nav>

        {/* Right side: locale switcher + mobile toggle */}
        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <button
            className="md:hidden p-1"
            aria-label={isOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsOpen((v) => !v)}
            style={{ color: "var(--color-ink)" }}
          >
            {isOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {isOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          style={{
            borderTop: "1px solid color-mix(in srgb, var(--color-ink) 10%, transparent)",
            background: "var(--color-page)",
          }}
        >
          <ul style={{ padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem", listStyle: "none", margin: 0 }}>
            {NAV_PATHS.map(({ path, label }) => {
              const href = `/${locale}/${path}`;
              const isActive = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <li key={path}>
                  <Link
                    href={href}
                    onClick={() => setIsOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    style={{
                      fontSize: "var(--text-base)",
                      fontWeight: 500,
                      textDecoration: "none",
                      color: isActive ? "var(--color-forest)" : "var(--color-ink)",
                    }}
                  >
                    {t(label)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
