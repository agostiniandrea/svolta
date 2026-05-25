import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SVOLTA — Cucina stagionale",
    template: "%s | SVOLTA",
  },
  description:
    "Cucina stagionale curata. Pochi piatti, materie prime serie, zero sprechi.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://svolta.it"
  ),
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!(routing.locales as ReadonlyArray<string>).includes(locale)) {
    notFound();
  }

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "Layout" });

  return (
    <html lang={locale}>
      <body className={`${dmSans.variable} ${playfair.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <a href="#main-content" className="skip-link">
            {t("skipToContent")}
          </a>
          <main id="main-content">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
