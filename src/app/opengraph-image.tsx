import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SVOLTA — Plant-forward restaurant in Ari, Bangkok";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1a1a1a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          padding: "0 80px",
        }}
      >
        <p
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 120,
            fontWeight: 700,
            color: "#faf9f4",
            letterSpacing: "0.08em",
            margin: 0,
            lineHeight: 1,
          }}
        >
          SVOLTA
        </p>
        <p
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 32,
            color: "#2c5016",
            letterSpacing: "0.12em",
            margin: 0,
            textTransform: "uppercase",
          }}
        >
          Ari · Bangkok
        </p>
        <div
          style={{
            width: 60,
            height: 2,
            background: "#2c5016",
            marginTop: 8,
          }}
        />
        <p
          style={{
            fontSize: 24,
            color: "#faf9f4",
            opacity: 0.5,
            margin: 0,
            letterSpacing: "0.04em",
          }}
        >
          Plant-forward cuisine
        </p>
      </div>
    ),
    size
  );
}
