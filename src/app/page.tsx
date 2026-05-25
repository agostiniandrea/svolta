export default function HomePage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100svh",
        gap: "1rem",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "var(--text-5xl)",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: "var(--color-forest)",
          margin: 0,
        }}
      >
        SVOLTA
      </h1>
      <p
        style={{
          fontSize: "var(--text-lg)",
          color: "var(--color-ink-soft)",
          maxWidth: "28rem",
          margin: 0,
        }}
      >
        Cucina stagionale curata. Pochi piatti, materie prime serie, zero
        sprechi.
      </p>
    </div>
  );
}
