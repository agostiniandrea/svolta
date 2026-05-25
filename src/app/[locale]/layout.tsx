import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!(routing.locales as ReadonlyArray<string>).includes(locale)) {
    notFound();
  }

  return (
    <>
      <Header />
      <main id="main-content" style={{ flex: 1 }}>{children}</main>
      <Footer />
    </>
  );
}
