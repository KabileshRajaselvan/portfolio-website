import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0a08",
          borderRadius: 12,
          fontFamily: "sans-serif",
        }}
      >
        <span
          style={{
            fontSize: 30,
            fontWeight: 800,
            color: "#ff7a3d",
            letterSpacing: -1,
          }}
        >
          KR
        </span>
      </div>
    ),
    { ...size }
  );
}
