import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "DeliveryPage" });
  return { title: t("title"), description: t("metaDescription") };
}

export default async function DeliveryPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "DeliveryPage" });

  const blocks = [
    { titleKey: "zoneTitle", bodyKey: "zoneDetail" },
    { titleKey: "hoursTitle", bodyKey: "hoursDetail" },
    { titleKey: "orderTitle", bodyKey: "orderDetail" },
  ] as const;

  const grabUrl = process.env.NEXT_PUBLIC_GRABFOOD_URL ?? null;
  const linemanUrl = process.env.NEXT_PUBLIC_LINEMAN_URL ?? null;
  const hasOrderLinks = grabUrl !== null || linemanUrl !== null;

  return (
    <div
      className="mx-auto px-6"
      style={{
        maxWidth: "var(--max-w-container)",
        paddingTop: "var(--spacing-section)",
        paddingBottom: "var(--spacing-section)",
      }}
    >
      <header style={{ marginBottom: "3.5rem", maxWidth: "40rem" }}>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "var(--text-4xl)",
            color: "var(--color-forest)",
            marginBottom: "1rem",
          }}
        >
          {t("title")}
        </h1>
        <p style={{ color: "var(--color-ink-soft)", lineHeight: 1.75 }}>
          {t("intro")}
        </p>
      </header>

      <div
        className="grid gap-10"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr))" }}
      >
        {blocks.map(({ titleKey, bodyKey }) => (
          <article
            key={titleKey}
            style={{
              background: "var(--color-card)",
              borderRadius: "var(--radius-lg)",
              padding: "2rem",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-xl)",
                color: "var(--color-ink)",
                marginBottom: "0.75rem",
              }}
            >
              {t(titleKey)}
            </h2>
            <p
              style={{
                color: "var(--color-ink-soft)",
                lineHeight: 1.75,
                whiteSpace: "pre-line",
              }}
            >
              {t(bodyKey)}
            </p>
          </article>
        ))}
      </div>

      {/* Order CTAs — shown only when store URLs are configured */}
      {hasOrderLinks && (
        <div style={{ marginTop: "3rem" }}>
          <p
            style={{
              fontSize: "var(--text-xs)",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-ink-dim)",
              marginBottom: "1rem",
            }}
          >
            {t("orderNowLabel")}
          </p>
          <div className="flex flex-wrap gap-3">
            {grabUrl && (
              <Link
                href={grabUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{
                  display: "inline-block",
                  padding: "0.75rem 1.75rem",
                  borderRadius: "var(--radius-pill)",
                  background: "var(--color-forest)",
                  color: "var(--color-cream)",
                  fontSize: "var(--text-sm)",
                  fontWeight: 600,
                  textDecoration: "none",
                  letterSpacing: "0.03em",
                }}
              >
                {t("orderGrab")}
              </Link>
            )}
            {linemanUrl && (
              <Link
                href={linemanUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{
                  display: "inline-block",
                  padding: "0.75rem 1.75rem",
                  borderRadius: "var(--radius-pill)",
                  border: "2px solid var(--color-forest)",
                  color: "var(--color-forest)",
                  fontSize: "var(--text-sm)",
                  fontWeight: 600,
                  textDecoration: "none",
                  letterSpacing: "0.03em",
                }}
              >
                {t("orderLineman")}
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
