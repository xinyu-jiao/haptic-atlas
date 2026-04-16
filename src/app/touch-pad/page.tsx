import Link from "next/link";

const UPSTREAM =
  "https://github.com/Jerry6063/vibe-belt/blob/master/touch_pad.html";

export default function TouchPadPage() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const src = `${base}/hardware/touch-pad.html`;

  return (
    <div className="dash-page" style={{ padding: 0, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div
        className="dash-container"
        style={{
          padding: "1.25rem 1.5rem",
          borderBottom: "1px solid var(--dash-border)",
          flexShrink: 0,
        }}
      >
        <div style={{ fontSize: "0.65rem", letterSpacing: "0.12em", color: "var(--dash-text-muted)", marginBottom: "0.5rem", textTransform: "uppercase" }}>
          Hardware · Web Serial
        </div>
        <h1 className="dash-title" style={{ marginBottom: "0.35rem" }}>
          Vibe Belt Touch Pad
        </h1>
        <div className="dash-subtitle" style={{ marginBottom: "0.75rem" }}>
          14-motor grid — same UI as upstream vibe-belt (serial 115200)
        </div>
        <p style={{ fontSize: "0.8rem", color: "var(--dash-text-secondary)", lineHeight: 1.6, maxWidth: 720, marginBottom: "0.75rem" }}>
          Use <strong style={{ color: "#fff" }}>Chrome or Edge on desktop</strong> and click <strong style={{ color: "#fff" }}>Connect serial</strong> to pair your Arduino. Web Serial does not work in Safari or on mobile browsers.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
          <Link
            href="/code"
            style={{
              fontSize: "0.75rem",
              color: "var(--dash-text-secondary)",
              textDecoration: "none",
              borderBottom: "1px solid var(--dash-border)",
              paddingBottom: "0.1rem",
            }}
          >
            ← Code / GitHub
          </Link>
          <a
            href={UPSTREAM}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "0.75rem",
              color: "var(--dash-text-muted)",
              fontFamily: "monospace",
              textDecoration: "none",
              borderBottom: "1px solid var(--dash-border)",
              paddingBottom: "0.1rem",
            }}
          >
            Source: Jerry6063/vibe-belt
          </a>
        </div>
      </div>

      <iframe
        title="Vibe Belt Touch Pad"
        src={src}
        allow="serial"
        style={{
          flex: 1,
          width: "100%",
          minHeight: "min(70vh, 640px)",
          border: "none",
          background: "#111",
        }}
      />
    </div>
  );
}
