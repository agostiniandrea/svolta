import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import "./globals.css";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "Layout" });

  return (
    <html lang={locale}>
      <body className={`${dmSans.variable} ${playfair.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <a href="#main-content" className="skip-link">
            {t("skipToContent")}
          </a>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
