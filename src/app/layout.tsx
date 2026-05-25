import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { getLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://svolta.it";

export const metadata: Metadata = {
  title: {
    default: "SVOLTA — Cucina stagionale",
    template: "%s | SVOLTA",
  },
  description:
    "Cucina stagionale curata. Pochi piatti, materie prime serie, zero sprechi.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    siteName: "SVOLTA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body
        className={`${dmSans.variable} ${playfair.variable}`}
        style={{ display: "flex", flexDirection: "column", minHeight: "100svh" }}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
