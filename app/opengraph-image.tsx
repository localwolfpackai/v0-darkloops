import { ImageResponse } from "next/og"
import { SPIRAL_PATH, SPIRAL_STROKE } from "@/components/logo"

export const alt = "DarkLup — a calm, dark design system built for humans and readable by AI agents"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const BLUE = "#45a3ff"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0b0b0b",
          color: "#f5f5f5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 32 32" fill="none">
            <rect x="1" y="1" width="30" height="30" rx="8" fill="rgba(69,163,255,0.15)" stroke="rgba(69,163,255,0.35)" strokeWidth="1.5" />
            <path d={SPIRAL_PATH} stroke={BLUE} strokeWidth={SPIRAL_STROKE} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: 40, fontWeight: 600, letterSpacing: -1 }}>DarkLup</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05 }}>
            Built for humans. Readable by agents.
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "rgba(245,245,245,0.55)" }}>
            A calm, accessible dark design system.
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 22, fontFamily: "monospace", color: BLUE }}>
          tokens · components · agent context
        </div>
      </div>
    ),
    size,
  )
}
