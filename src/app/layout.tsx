import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <body className={`${dmSans.variable} ${playfair.variable}`}>
        <a href="#main-content" className="skip-link">
          Vai al contenuto principale
        </a>
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
