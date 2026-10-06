import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — freelance full-stack developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: 72,
        background: "linear-gradient(135deg, #05060A 0%, #0A0B12 55%, #141033 100%)",
        color: "#EAEEFB",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -200,
          right: -160,
          width: 640,
          height: 640,
          borderRadius: 9999,
          background: "radial-gradient(circle, rgba(124,92,255,0.55), rgba(124,92,255,0))",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -240,
          left: -140,
          width: 580,
          height: 580,
          borderRadius: 9999,
          background: "radial-gradient(circle, rgba(34,211,238,0.4), rgba(34,211,238,0))",
          display: "flex",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 18,
          fontSize: 30,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: "#22D3EE",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 56,
            height: 56,
            borderRadius: 14,
            border: "2px solid #7C5CFF",
            background: "rgba(124,92,255,0.2)",
            fontSize: 26,
            fontWeight: 700,
            color: "#A693FF",
            letterSpacing: 0,
          }}
        >
          TS
        </div>
        <div>{site.name}</div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          maxWidth: 960,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 84,
            lineHeight: 1.03,
            fontWeight: 700,
            letterSpacing: -3,
            color: "#EAEEFB",
          }}
        >
          <div>Websites that rank, convert</div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
            }}
          >
            <div>and feel&nbsp;</div>
            <div style={{ color: "#22D3EE" }}>unfair.</div>
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 32, lineHeight: 1.4, color: "#B4BAD0" }}>
          {site.owner.name} — freelance full-stack developer · AI · SEO · GTM · since 2021
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 16,
          fontSize: 26,
          color: "#838AA3",
          letterSpacing: 2,
        }}
      >
        <div
          style={{
            display: "flex",
            width: 16,
            height: 16,
            borderRadius: 9999,
            background: "#34D399",
          }}
        />
        <div>available for new projects · +91 98050 29089</div>
      </div>
    </div>,
    { ...size },
  );
}
