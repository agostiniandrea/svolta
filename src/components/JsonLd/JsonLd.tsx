type Props = {
  siteUrl: string;
};

/* SVOLTA is a concept: the restaurant does not exist.
 *
 * This used to emit schema.org/Restaurant with an address, opening hours and a
 * map link, which tells search engines there is a business operating in Ari,
 * Bangkok — the kind of record that can surface in local results and send a
 * real person to a real street. WebSite is the honest description of what this
 * actually is, and it keeps the site name and search-friendly identity. */
export default function JsonLd({ siteUrl }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SVOLTA",
    description:
      "Concept restaurant website — a self-directed design and engineering project.",
    url: siteUrl,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
