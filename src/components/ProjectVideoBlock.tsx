"use client";

import { useMemo } from "react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function resolveVideoSrc(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_PROJECT_VIDEO_SRC?.trim() ??
    process.env.NEXT_PUBLIC_INTERFACE_VIDEO_SRC?.trim();
  if (!fromEnv) {
    return `${BASE}/videos/interface.mp4`;
  }
  if (fromEnv.startsWith("http://") || fromEnv.startsWith("https://")) {
    return fromEnv;
  }
  const path = fromEnv.startsWith("/") ? fromEnv : `/${fromEnv}`;
  return `${BASE}${path}`;
}

/** Standalone demo clip — default `public/videos/interface.mp4`, or set NEXT_PUBLIC_PROJECT_VIDEO_SRC. */
export default function ProjectVideoBlock() {
  const src = useMemo(() => resolveVideoSrc(), []);

  return (
    <div
      className="dash-card"
      style={{
        padding: "1rem",
        overflow: "hidden",
        background: "#0a0a0a",
        border: "1px solid var(--dash-border)",
      }}
    >
      <video
        controls
        playsInline
        preload="metadata"
        style={{
          width: "100%",
          maxHeight: "min(70vh, 520px)",
          display: "block",
          objectFit: "contain",
          background: "#000",
        }}
        src={src}
      />
    </div>
  );
}
