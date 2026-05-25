type Props = {
  title: string;
};

export default function Map({ title }: Props) {
  const query =
    process.env.NEXT_PUBLIC_MAP_QUERY ?? "Ari BTS Station, Bangkok, Thailand";
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed&z=15`;

  return (
    <div
      className="w-full overflow-hidden"
      style={{ borderRadius: "var(--radius-lg)", aspectRatio: "16/9" }}
    >
      <iframe
        title={title}
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0, display: "block" }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        aria-label={title}
      />
    </div>
  );
}
