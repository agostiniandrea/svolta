import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "MenuPage" });
  return { title: t("title") };
}

export default async function MenuPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "MenuPage" });
  const tCat = await getTranslations({ locale, namespace: "MenuCategories" });

  const categories = [
    "antipasto",
    "primo",
    "secondo",
    "contorno",
    "dolce",
    "pranzo",
  ] as const;

  return (
    <div
      className="mx-auto px-6"
      style={{
        maxWidth: "var(--max-w-container)",
        paddingTop: "var(--spacing-section)",
        paddingBottom: "var(--spacing-section)",
      }}
    >
      <header style={{ marginBottom: "3rem", maxWidth: "40rem" }}>
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

      {/* Category list — dishes will be populated from Sanity */}
      <div
        className="grid gap-10"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr))" }}
      >
        {categories.map((cat) => (
          <section key={cat} aria-labelledby={`cat-${cat}`}>
            <h2
              id={`cat-${cat}`}
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-xl)",
                color: "var(--color-ink)",
                marginBottom: "1rem",
                paddingBottom: "0.5rem",
                borderBottom: "1px solid color-mix(in srgb, var(--color-ink) 12%, transparent)",
              }}
            >
              {tCat(cat)}
            </h2>
            <p style={{ color: "var(--color-ink-dim)", fontSize: "var(--text-sm)" }}>
              {t("noItems")}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
