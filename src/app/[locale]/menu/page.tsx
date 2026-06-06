import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { activeMenuQuery, type ActiveMenu, type SanityDish } from "@/sanity/queries";

export const revalidate = 3600;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "MenuPage" });
  return { title: t("title"), description: t("metaDescription") };
}

export default async function MenuPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "MenuPage" });
  const tCat = await getTranslations({ locale, namespace: "MenuCategories" });
  const tAllergen = await getTranslations({ locale, namespace: "Allergens" });

  const menu = await client.fetch<ActiveMenu | null>(
    activeMenuQuery,
    {},
    { next: { tags: ["menu"] } }
  );

  const allDishes = (menu?.dishes ?? []).filter((d) => d.isAvailable);

  const categories = [
    "antipasto",
    "primo",
    "secondo",
    "contorno",
    "dolce",
    "pranzo",
  ] as const;

  type Category = (typeof categories)[number];

  const byCategory = categories.reduce<Record<Category, SanityDish[]>>(
    (acc, cat) => {
      acc[cat] = allDishes.filter((d) => d.category === cat);
      return acc;
    },
    {} as Record<Category, SanityDish[]>
  );

  const loc = locale as "th" | "en" | "it";

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
          {menu?.note?.[loc] ?? t("intro")}
        </p>
      </header>

      <div
        className="grid gap-10"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr))" }}
      >
        {categories
          .filter((cat) => byCategory[cat].length > 0)
          .map((cat) => {
            const dishes = byCategory[cat];
            return (
              <section key={cat} aria-labelledby={`cat-${cat}`}>
                <h2
                  id={`cat-${cat}`}
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "var(--text-xl)",
                    color: "var(--color-ink)",
                    marginBottom: "1rem",
                    paddingBottom: "0.5rem",
                    borderBottom:
                      "1px solid color-mix(in srgb, var(--color-ink) 12%, transparent)",
                  }}
                >
                  {tCat(cat)}
                </h2>

                <ul
                  style={{
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.25rem",
                  }}
                >
                  {dishes.map((dish) => (
                    <li key={dish._id}>
                      <div
                        style={{
                          position: "relative",
                          aspectRatio: "3/2",
                          borderRadius: "var(--radius-lg)",
                          overflow: "hidden",
                          marginBottom: "0.6rem",
                          background: dish.imageUrl
                            ? undefined
                            : "linear-gradient(135deg, color-mix(in srgb, var(--color-forest) 18%, var(--color-card)) 0%, color-mix(in srgb, var(--color-forest) 10%, var(--color-card)) 100%)",
                        }}
                      >
                        {dish.imageUrl && (
                          <Image
                            src={dish.imageUrl}
                            alt={dish.name[loc] ?? dish.name.en ?? ""}
                            fill
                            style={{ objectFit: "cover" }}
                            sizes="(max-width: 640px) 100vw, 50vw"
                          />
                        )}
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: dish.imageUrl
                              ? "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)"
                              : "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 60%)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                            padding: "1rem 1.1rem",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "baseline",
                              gap: "0.75rem",
                            }}
                          >
                            <p style={{ fontWeight: 600, color: "#fff", margin: 0 }}>
                              {dish.name[loc] ?? dish.name.en ?? ""}
                            </p>
                            {dish.price != null && (
                              <p
                                style={{
                                  fontWeight: 600,
                                  color: "rgba(255,255,255,0.85)",
                                  fontSize: "var(--text-sm)",
                                  whiteSpace: "nowrap",
                                  margin: 0,
                                }}
                              >
                                ฿{dish.price}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      {dish.description?.[loc] && (
                        <p
                          style={{
                            fontSize: "var(--text-sm)",
                            color: "var(--color-ink-soft)",
                            lineHeight: 1.6,
                            marginBottom: "0.35rem",
                          }}
                        >
                          {dish.description[loc]}
                        </p>
                      )}
                      {dish.allergens && dish.allergens.length > 0 && (
                        <p
                          style={{
                            fontSize: "var(--text-xs)",
                            color: "var(--color-ink-dim)",
                            letterSpacing: "0.02em",
                          }}
                        >
                          {dish.allergens
                            .map((a) =>
                              tAllergen(
                                a as "Gluten" | "Soy" | "Tree nuts" | "Peanuts" | "Sesame" | "Celery" | "Mustard" | "Lupin"
                              )
                            )
                            .join(", ")}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}

        {allDishes.length === 0 && (
          <p style={{ color: "var(--color-ink-dim)", fontSize: "var(--text-sm)" }}>
            {t("noItems")}
          </p>
        )}
      </div>
    </div>
  );
}
