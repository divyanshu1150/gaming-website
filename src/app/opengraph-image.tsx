import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FreePlayArena — Play Free Online Games";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Background accent circles */}
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
            top: -100,
            right: -100,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
            bottom: -80,
            left: -80,
          }}
        />

        {/* Logo */}
        <div style={{ fontSize: 80, marginBottom: 24 }}>🎮</div>

        {/* Site name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-2px",
            marginBottom: 16,
          }}
        >
          FreePlayArena
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            color: "#a78bfa",
            fontWeight: 500,
            marginBottom: 40,
          }}
        >
          Play Free Online Games Instantly
        </div>

        {/* Feature pills */}
        <div style={{ display: "flex", gap: 16 }}>
          {["No Download", "No Sign-Up", "100% Free", "Mobile Friendly"].map((label) => (
            <div
              key={label}
              style={{
                background: "rgba(124,58,237,0.2)",
                border: "1px solid rgba(124,58,237,0.4)",
                borderRadius: 100,
                padding: "10px 24px",
                color: "#c4b5fd",
                fontSize: 22,
                fontWeight: 500,
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 36,
            color: "#6b7280",
            fontSize: 22,
          }}
        >
          freeplayarena.com
        </div>
      </div>
    ),
    { ...size }
  );
}
