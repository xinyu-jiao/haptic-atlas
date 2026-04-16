import Link from "next/link";

const UPSTREAM =
  "https://github.com/Jerry6063/vibe-belt/blob/master/touch_pad.html";

export default function TouchPadPage() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const src = `${base}/hardware/touch-pad.html`;

  return (
    <div className="dash-page">
      <div className="dash-container" style={{ paddingBottom: "1.25rem" }}>
        <div className="dash-section-label" style={{ marginBottom: "1rem" }}>
          Hardware · Web Serial
        </div>
        <h1 className="dash-title">Vibe Belt Touch Pad</h1>
        <div
          className="dash-subtitle"
          style={{ marginBottom: "1.25rem", maxWidth: "42rem", lineHeight: 1.7 }}
        >
          14-motor grid · 115200 baud · matches vibe-belt firmware
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.45rem",
            marginBottom: "1.35rem",
          }}
        >
          <span className="dash-pill">115200 baud</span>
          <span className="dash-pill">Desktop Chrome / Edge</span>
          <span className="dash-pill">Web Serial</span>
        </div>

        <p
          className="dash-body"
          style={{ maxWidth: "40rem", marginBottom: 0, lineHeight: 1.75 }}
        >
          Use <strong style={{ color: "#fff", fontWeight: 600 }}>Chrome or Edge on desktop</strong>{" "}
          and tap <strong style={{ color: "#fff", fontWeight: 600 }}>Connect serial</strong> to pair
          your belt controller. Safari and mobile browsers do not support Web Serial.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.25rem",
            alignItems: "center",
            marginTop: "1.5rem",
          }}
        >
          <Link href="/code" className="touch-pad-doc-link">
            ← Code / GitHub
          </Link>
          <a
            href={UPSTREAM}
            target="_blank"
            rel="noopener noreferrer"
            className="touch-pad-doc-link"
            style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.72rem" }}
          >
            Source: Jerry6063/vibe-belt
          </a>
        </div>
      </div>

      <div className="touch-pad-band">
        <div className="touch-pad-iframe-wrap">
          <iframe
            title="Vibe Belt Touch Pad"
            src={src}
            allow="serial"
            style={{
              width: "100%",
              minHeight: "min(72vh, 680px)",
              border: "none",
              background: "var(--dash-bg)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
