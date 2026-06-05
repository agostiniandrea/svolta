import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "NotFound" });

  return (
    <div
      className="flex flex-col items-center justify-center text-center px-6"
      style={{ flex: 1, minHeight: "60svh", gap: "1.5rem" }}
    >
      <p
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "var(--text-5xl)",
          color: "var(--color-forest)",
          lineHeight: 1,
          margin: 0,
        }}
      >
        404
      </p>
      <h1
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "var(--text-2xl)",
          color: "var(--color-ink)",
          margin: 0,
        }}
      >
        {t("title")}
      </h1>
      <p style={{ color: "var(--color-ink-soft)", margin: 0 }}>{t("body")}</p>
      <Link
        href={`/${locale}`}
        className="btn-primary"
        style={{
          marginTop: "0.5rem",
          display: "inline-block",
          padding: "0.75rem 2rem",
          borderRadius: "var(--radius-pill)",
          background: "var(--color-forest)",
          color: "var(--color-cream)",
          fontSize: "var(--text-sm)",
          fontWeight: 600,
          textDecoration: "none",
          letterSpacing: "0.03em",
        }}
      >
        {t("cta")}
      </Link>
    </div>
  );
}
