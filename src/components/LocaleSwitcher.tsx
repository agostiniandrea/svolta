"use client";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Nav");

  function switchLocale(next: string) {
    router.replace(pathname, { locale: next as (typeof routing.locales)[number] });
  }

  return (
    <div role="group" aria-label={t("switchLocale")} className="flex items-center gap-0.5">
      {routing.locales.map((loc) => {
        const isCurrent = loc === locale;
        return (
          <button
            key={loc}
            onClick={() => switchLocale(loc)}
            aria-current={isCurrent ? "true" : undefined}
            className="px-2 py-1 text-xs font-semibold uppercase tracking-wider rounded transition-colors"
            style={{
              color: isCurrent
                ? "var(--color-forest)"
                : "var(--color-ink-dim)",
            }}
          >
            {loc}
          </button>
        );
      })}
    </div>
  );
}
