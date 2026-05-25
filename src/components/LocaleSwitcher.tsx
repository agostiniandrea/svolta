"use client";
import { useLocale, useTranslations } from "next-intl";
import { usePathname as useNextPathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function LocaleSwitcher() {
  const locale = useLocale();
  // Raw Next.js pathname includes the locale prefix, e.g. "/it/menu"
  const rawPathname = useNextPathname();
  const t = useTranslations("Nav");

  // Strip the locale segment so Link can add the target locale cleanly
  const basePath = rawPathname.startsWith(`/${locale}`)
    ? rawPathname.slice(`/${locale}`.length) || "/"
    : rawPathname;

  return (
    <div role="group" aria-label={t("switchLocale")} className="flex items-center gap-0.5">
      {routing.locales.map((loc) => {
        const isCurrent = loc === locale;
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
            href={basePath}
            locale={loc}
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
