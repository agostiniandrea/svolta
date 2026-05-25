import { getTranslations, setRequestLocale } from "next-intl/server";
import Map from "@/components/Map";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage" });
  return { title: t("title") };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "ContactPage" });

  const address = process.env.NEXT_PUBLIC_CONTACT_ADDRESS ?? t("address");
  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE;
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

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

      <div
        className="grid gap-12"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr))" }}
      >
        {/* Contact details */}
        <dl style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <dt
              style={{
                fontSize: "var(--text-xs)",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-ink-dim)",
                marginBottom: "0.25rem",
              }}
            >
              {t("addressLabel")}
            </dt>
            <dd style={{ color: "var(--color-ink)", margin: 0 }}>{address}</dd>
          </div>

          {phone && (
            <div>
              <dt
                style={{
                  fontSize: "var(--text-xs)",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-ink-dim)",
                  marginBottom: "0.25rem",
                }}
              >
                {t("phoneLabel")}
              </dt>
              <dd style={{ margin: 0 }}>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  style={{ color: "var(--color-forest)" }}
                >
                  {phone}
                </a>
              </dd>
            </div>
          )}

          {email && (
            <div>
              <dt
                style={{
                  fontSize: "var(--text-xs)",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-ink-dim)",
                  marginBottom: "0.25rem",
                }}
              >
                {t("emailLabel")}
              </dt>
              <dd style={{ margin: 0 }}>
                <a
                  href={`mailto:${email}`}
                  style={{ color: "var(--color-forest)" }}
                >
                  {email}
                </a>
              </dd>
            </div>
          )}

          <div>
            <dt
              style={{
                fontSize: "var(--text-xs)",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-ink-dim)",
                marginBottom: "0.25rem",
              }}
            >
              {t("hoursLabel")}
            </dt>
            <dd
              style={{ color: "var(--color-ink)", margin: 0, whiteSpace: "pre-line" }}
            >
              {t("hours")}
            </dd>
          </div>
        </dl>

        {/* Map */}
        <div>
          <p
            style={{
              fontSize: "var(--text-xs)",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-ink-dim)",
              marginBottom: "0.75rem",
            }}
          >
            {t("mapTitle")}
          </p>
          <Map title={t("mapTitle")} />
        </div>
      </div>
    </div>
  );
}
