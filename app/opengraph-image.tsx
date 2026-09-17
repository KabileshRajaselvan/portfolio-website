import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0b0a08",
          fontFamily: "sans-serif",
        }}
      >
        <span
          style={{
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#8a8375",
          }}
        >
          Full-Stack AI Engineer
        </span>
        <span
          style={{
            marginTop: 24,
            fontSize: 96,
            fontWeight: 900,
            color: "#ffffff",
            lineHeight: 1,
          }}
        >
          Kabilesh
        </span>
        <span
          style={{
            fontSize: 64,
            fontStyle: "italic",
            color: "#ff7a3d",
            lineHeight: 1.1,
          }}
        >
          Rajaselvan
        </span>
        <span
          style={{
            marginTop: 32,
            fontSize: 26,
            color: "#b0aa9c",
            maxWidth: 800,
          }}
        >
          Building production systems that ship, scale, and hold up under
          real traffic.
        </span>
      </div>
    ),
    { ...size }
  );
}
