"use client";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { routing } from "@/i18n/routing";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const rawPathname = usePathname(); // e.g. "/it/menu"
  const t = useTranslations("Nav");

  // Strip the current locale prefix to get the bare path
  const basePath = rawPathname.startsWith(`/${locale}`)
    ? rawPathname.slice(`/${locale}`.length) || "/"
    : rawPathname;

  return (
    <div role="group" aria-label={t("switchLocale")} className="flex items-center gap-0.5">
      {routing.locales.map((loc) => {
        const isCurrent = loc === locale;
        // /{loc}/menu, /{loc}/concept, or just /{loc} for the root
        const href = `/${loc}${basePath === "/" ? "" : basePath}`;

        return isCurrent ? (
          <span
            key={loc}
            aria-current="true"
            className="px-2 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--color-forest)" }}
          >
            {loc}
          </span>
        ) : (
          <Link
            key={loc}
            href={href}
            className="px-2 py-1 text-xs font-semibold uppercase tracking-wider rounded transition-colors"
            style={{ color: "var(--color-ink-dim)", textDecoration: "none" }}
          >
            {loc}
          </Link>
        );
      })}
    </div>
  );
}
