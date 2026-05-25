import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ConceptPage" });
  return { title: t("title") };
}

export default async function ConceptPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ConceptPage" });

  const sections = [
    { titleKey: "section1Title", bodyKey: "section1Body" },
    { titleKey: "section2Title", bodyKey: "section2Body" },
    { titleKey: "section3Title", bodyKey: "section3Body" },
  ] as const;

  return (
    <>
      {/* Page header */}
      <section
        className="px-6"
        style={{
          background: "var(--color-void)",
          color: "var(--color-cream)",
          paddingTop: "var(--spacing-section)",
          paddingBottom: "var(--spacing-section)",
        }}
      >
        <div className="mx-auto" style={{ maxWidth: "var(--max-w-container)" }}>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-4xl)",
              marginBottom: "1.25rem",
            }}
          >
            {t("title")}
          </h1>
          <p
            style={{
              fontSize: "var(--text-lg)",
              opacity: 0.75,
              maxWidth: "36rem",
              lineHeight: 1.75,
            }}
          >
            {t("intro")}
          </p>
        </div>
      </section>

      {/* Content sections */}
      <section
        className="px-6"
        style={{
          paddingTop: "var(--spacing-section)",
          paddingBottom: "var(--spacing-section)",
        }}
      >
        <div
          className="mx-auto"
          style={{ maxWidth: "var(--max-w-container)" }}
        >
          <dl
            className="grid gap-16"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(22rem, 1fr))" }}
          >
            {sections.map(({ titleKey, bodyKey }) => (
              <div key={titleKey}>
                <dt
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "var(--text-2xl)",
                    color: "var(--color-forest)",
                    marginBottom: "1rem",
                  }}
                >
                  {t(titleKey)}
                </dt>
                <dd
                  style={{
                    color: "var(--color-ink-soft)",
                    lineHeight: 1.8,
                    margin: 0,
                  }}
                >
                  {t(bodyKey)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
