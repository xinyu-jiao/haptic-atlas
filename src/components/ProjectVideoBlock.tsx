"use client";

/** Default demo: https://youtu.be/xGtBlA2bqwk — override ID via NEXT_PUBLIC_YOUTUBE_EMBED_ID if needed. */
const DEFAULT_YOUTUBE_ID = "xGtBlA2bqwk";

function youtubeEmbedId(): string {
  return typeof process.env.NEXT_PUBLIC_YOUTUBE_EMBED_ID === "string" && process.env.NEXT_PUBLIC_YOUTUBE_EMBED_ID.trim()
    ? process.env.NEXT_PUBLIC_YOUTUBE_EMBED_ID.trim()
    : DEFAULT_YOUTUBE_ID;
}

/**
 * Embedded YouTube demo (responsive 16:9).
 */
export default function ProjectVideoBlock() {
  const id = youtubeEmbedId();
  const embedSrc = `https://www.youtube-nocookie.com/embed/${id}`;

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
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1120px",
          margin: "0 auto",
          paddingBottom: "56.25%",
          height: 0,
          overflow: "hidden",
          background: "#000",
          borderRadius: 4,
        }}
      >
        <iframe
          src={embedSrc}
          title="Haptic Atlas demo video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: 0,
          }}
        />
      </div>
    </div>
  );
}
