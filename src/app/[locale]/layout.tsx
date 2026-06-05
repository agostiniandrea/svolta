import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!(routing.locales as ReadonlyArray<string>).includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "Layout" });
  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://svolta.it";
  const siteUrl = rawSiteUrl.startsWith("http") ? rawSiteUrl : `https://${rawSiteUrl}`;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <JsonLd locale={locale} siteUrl={siteUrl} />
      <a href="#main-content" className="skip-link">
        {t("skipToContent")}
      </a>
      <Header />
      <main id="main-content" style={{ flex: 1 }}>
        {children}
      </main>
      <Footer locale={locale} />
    </NextIntlClientProvider>
  );
}
