import { ImageResponse } from "next/og";
import { getProfile } from "@/lib/get-profile";

export const runtime = "edge";
export const alt = "Christopher Perussina professional profile";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const profile = getProfile();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          background: "linear-gradient(145deg, #0b1120 0%, #1a2744 55%, #111a2e 100%)",
          color: "#e8edf4",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#7eb3dc",
            marginBottom: 24,
          }}
        >
          Wealth Advisory · Fintech
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.05,
            marginBottom: 20,
          }}
        >
          {profile.name}
        </div>
        <div
          style={{
            fontSize: 34,
            color: "#a8b8cc",
            fontStyle: "italic",
            marginBottom: 28,
          }}
        >
          {profile.title}
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#8fa4be",
            maxWidth: 760,
            lineHeight: 1.45,
          }}
        >
          {profile.bio ?? profile.featuredCTA.description}
        </div>
      </div>
    ),
    { ...size },
  );
}
