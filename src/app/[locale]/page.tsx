import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });
  return { title: t("tagline") };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Home" });

  return (
    <>
      {/* Hero */}
      <section
        className="flex flex-col items-center justify-center text-center px-6"
        style={{
          minHeight: "calc(100svh - 4rem)",
          background: "var(--color-page)",
          paddingTop: "var(--spacing-section)",
          paddingBottom: "var(--spacing-section)",
        }}
      >
        <div style={{ maxWidth: "44rem" }}>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-5xl)",
              color: "var(--color-forest)",
              letterSpacing: "-0.02em",
              marginBottom: "1.25rem",
            }}
          >
            {t("headline")}
          </h1>
          <p
            style={{
              fontSize: "var(--text-lg)",
              color: "var(--color-ink-soft)",
              lineHeight: 1.7,
              marginBottom: "2.5rem",
            }}
          >
            {t("tagline")}
          </p>
          <Link
            href={`/${locale}/menu`}
            className="btn-primary"
            style={{
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
            {t("heroCta")}
          </Link>
        </div>
      </section>

      {/* Concept teaser */}
      <section
        style={{
          background: "var(--color-card)",
          paddingTop: "var(--spacing-section)",
          paddingBottom: "var(--spacing-section)",
        }}
      >
        <div
          className="mx-auto px-6 grid gap-12 items-center"
          style={{
            maxWidth: "var(--max-w-container)",
            gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-3xl)",
                color: "var(--color-ink)",
                marginBottom: "1rem",
              }}
            >
              {t("conceptSectionTitle")}
            </h2>
            <p
              style={{
                color: "var(--color-ink-soft)",
                marginBottom: "1.5rem",
                lineHeight: 1.75,
              }}
            >
              {t("conceptTeaser")}
            </p>
            <Link
              href={`/${locale}/concept`}
              style={{
                fontSize: "var(--text-sm)",
                fontWeight: 600,
                color: "var(--color-forest)",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
              }}
            >
              {t("conceptCta")} →
            </Link>
          </div>
          <div
            aria-hidden="true"
            style={{
              background: "var(--color-cream)",
              borderRadius: "var(--radius-lg)",
              aspectRatio: "4/3",
              minHeight: "16rem",
            }}
          />
        </div>
      </section>

      {/* Menu teaser */}
      <section
        className="text-center"
        style={{
          background: "var(--color-page)",
          paddingTop: "var(--spacing-section)",
          paddingBottom: "var(--spacing-section)",
        }}
      >
        <div className="mx-auto px-6" style={{ maxWidth: "36rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-3xl)",
              color: "var(--color-ink)",
              marginBottom: "1rem",
            }}
          >
            {t("menuSectionTitle")}
          </h2>
          <p
            style={{
              color: "var(--color-ink-soft)",
              marginBottom: "1.5rem",
              lineHeight: 1.75,
            }}
          >
            {t("menuTeaser")}
          </p>
          <Link
            href={`/${locale}/menu`}
            style={{
              fontSize: "var(--text-sm)",
              fontWeight: 600,
              color: "var(--color-forest)",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
            }}
          >
            {t("menuCta")} →
          </Link>
        </div>
      </section>

      {/* Location teaser */}
      <section
        style={{
          background: "var(--color-void)",
          color: "var(--color-cream)",
          paddingTop: "var(--spacing-section)",
          paddingBottom: "var(--spacing-section)",
        }}
      >
        <div
          className="mx-auto px-6 grid gap-12 items-center"
          style={{
            maxWidth: "var(--max-w-container)",
            gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-3xl)",
                marginBottom: "1rem",
              }}
            >
              {t("locationSectionTitle")}
            </h2>
            <p
              style={{
                color: "var(--color-cream)",
                opacity: 0.7,
                marginBottom: "1.5rem",
                lineHeight: 1.75,
              }}
            >
              {t("locationTeaser")}
            </p>
            <Link
              href={`/${locale}/contact`}
              style={{
                fontSize: "var(--text-sm)",
                fontWeight: 600,
                color: "var(--color-cream)",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                opacity: 0.9,
              }}
            >
              {t("locationCta")} →
            </Link>
          </div>
          <div
            aria-hidden="true"
            style={{
              background: "rgba(255,255,255,0.08)",
              borderRadius: "var(--radius-lg)",
              aspectRatio: "16/9",
              minHeight: "12rem",
            }}
          />
        </div>
      </section>
    </>
  );
}
