import { ImageResponse } from "next/og"

export const contentType = "image/png"

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "80px",
          background: "linear-gradient(135deg, #fef2e0 0%, #fef9f4 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <span style={{ fontSize: "64px", fontWeight: 800, color: "#ffbd59" }}>
            cikidu.play
          </span>
        </div>
        <div style={{ fontSize: "40px", color: "#e26334", marginBottom: "12px", fontWeight: 600 }}>
          Inspirasi Bermain Edukatif
        </div>
        <div style={{ fontSize: "36px", color: "#2d2b3a", opacity: 0.7 }}>
          untuk Anak Usia 1–6 Tahun
        </div>
        <div
          style={{
            position: "absolute",
            right: "-60px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "#4dbcc8",
            opacity: 0.2,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "120px",
            bottom: "-40px",
            width: "220px",
            height: "220px",
            borderRadius: "50%",
            background: "#ffbd59",
            opacity: 0.2,
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
