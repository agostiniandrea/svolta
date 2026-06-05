type Props = {
  locale: string;
  siteUrl: string;
};

export default function JsonLd({ locale, siteUrl }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "SVOLTA",
    description: "Plant-forward restaurant in Ari, Bangkok.",
    url: siteUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ari",
      addressLocality: "Bangkok",
      addressRegion: "Bangkok",
      postalCode: "10400",
      addressCountry: "TH",
    },
    servesCuisine: ["Italian", "Japanese", "Middle Eastern", "Plant-based"],
    priceRange: "฿฿",
    menu: `${siteUrl}/${locale}/menu`,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "11:30",
        closes: "21:00",
      },
    ],
    hasMap: `${siteUrl}/${locale}/contact`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
