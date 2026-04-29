import Link from "next/link";

const REPOS: {
  name: string;
  desc: string;
  tag: string;
  url: string;
  touchPadHref?: string;
}[] = [
  {
    name: "haptic-atlas",
    desc: "Web platform — Next.js, session flow, maps, charts, optional Firestore sync, voice / long-press access, getUserMedia + TensorFlow.js (Interface), Leaflet, Recharts",
    tag: "WEB",
    url: "https://github.com/xinyu-jiao/haptic-atlas",
  },
  {
    name: "haptic-atlas-hardware",
    desc: "14-motor DRV2605 haptic belt — Arduino firmware, serial logger, gamepad controller",
    tag: "HARDWARE",
    url: "https://github.com/Jerry6063/vibe-belt",
    touchPadHref: "/touch-pad",
  },
];

const TECH_ROWS: [string, string][] = [
  ["Next.js 16", "Framework"],
  ["React 19", "UI"],
  ["Tailwind CSS", "Styling"],
  ["Leaflet", "Map / Traces"],
  ["Recharts", "Data Charts"],
  ["Geolocation API", "Route Tracking"],
  ["getUserMedia", "Camera stream (Interface)"],
  ["TensorFlow.js", "COCO-SSD / MobileNet (in-browser)"],
  ["Firebase Firestore", "Optional cloud sync"],
  ["Web Speech API", "Voice prompts / commands"],
  ["Web Bluetooth API", "BLE device link"],
  ["Web Serial", "Touch pad ↔ belt"],
  ["GitHub Pages", "Static export deploy"],
];

/** Repos + tech stack (on Map page with walk trace; formerly standalone /code). */
export default function AboutCodeSection() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1px",
          marginBottom: "2.5rem",
          marginTop: "0.5rem",
          background: "var(--dash-border)",
        }}
      >
        {REPOS.map((item) => (
          <div key={item.name} style={{ background: "var(--dash-bg)", padding: "1.75rem 1.5rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "0.75rem",
                flexWrap: "wrap",
                gap: "0.75rem",
              }}
            >
              <div style={{ fontSize: "1rem", fontWeight: 600, color: "#fff" }}>{item.name}</div>
              <span className="dash-badge">{item.tag}</span>
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--dash-text-secondary)", lineHeight: 1.7, marginBottom: "1.25rem" }}>
              {item.desc}
            </div>
            <div style={{ borderTop: "1px solid var(--dash-border)", paddingTop: "0.75rem" }}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "0.8rem",
                  color: "var(--dash-text-secondary)",
                  fontFamily: "monospace",
                  letterSpacing: "0.02em",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--dash-border)",
                  paddingBottom: "0.15rem",
                }}
              >
                {item.url.replace("https://", "")}
              </a>
              {item.touchPadHref && (
                <div style={{ marginTop: "0.85rem" }}>
                  <Link
                    href={item.touchPadHref}
                    style={{
                      fontSize: "0.8rem",
                      color: "#fff",
                      letterSpacing: "0.06em",
                      textDecoration: "none",
                      borderBottom: "1px solid var(--dash-border)",
                      paddingBottom: "0.15rem",
                    }}
                  >
                    Open Touch Pad (Web Serial) →
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="dash-card">
        <div
          style={{
            fontSize: "0.75rem",
            fontWeight: 500,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--dash-text-muted)",
            marginBottom: "1.5rem",
          }}
        >
          Tech Stack
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "1px",
            background: "var(--dash-border)",
            margin: "-1.5rem",
            marginTop: 0,
          }}
        >
          {TECH_ROWS.map(([tech, role]) => (
            <div key={tech} style={{ background: "var(--dash-bg)", padding: "1rem 1.25rem" }}>
              <div style={{ fontSize: "0.85rem", fontWeight: 500, color: "#fff", marginBottom: "0.3rem" }}>{tech}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--dash-text-muted)" }}>{role}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
