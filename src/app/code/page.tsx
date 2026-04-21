import Link from "next/link";
import SiteClosing from "@/components/SiteClosing";

export default function CodePage() {
  return (
    <div className="dash-page">
      <div className="dash-container">
        <h1 className="dash-title">Code / GitHub</h1>
        <div className="dash-subtitle">Technical Access</div>

        {/* Repo cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1px", marginBottom: "2.5rem", background: "var(--dash-border)" }}>
          {[
            {
              name: "haptic-atlas",
              desc: "Web platform — Next.js, session flow, maps, charts, optional Firestore sync, voice / long-press access, Leaflet, Recharts",
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
          ].map((item) => {
            const { name, desc, tag, url } = item;
            const touchPadHref = "touchPadHref" in item ? item.touchPadHref : undefined;
            return (
            <div key={name} style={{ background: "var(--dash-bg)", padding: "1.75rem 1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.75rem" }}>
                <div style={{ fontSize: "1rem", fontWeight: 600, color: "#fff" }}>
                  {name}
                </div>
                <span className="dash-badge">{tag}</span>
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--dash-text-secondary)", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                {desc}
              </div>
              <div style={{ borderTop: "1px solid var(--dash-border)", paddingTop: "0.75rem" }}>
                {url ? (
                  <a
                    href={url}
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
                    {url.replace("https://", "")}
                  </a>
                ) : (
                  <span style={{ fontSize: "0.8rem", color: "var(--dash-text-muted)", fontFamily: "monospace" }}>
                    Private repository
                  </span>
                )}
                {touchPadHref && (
                  <div style={{ marginTop: "0.85rem" }}>
                    <Link
                      href={touchPadHref}
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
            );
          })}
        </div>

        {/* Stack */}
        <div className="dash-card">
          <div style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--dash-text-muted)", marginBottom: "1.5rem" }}>
            Tech Stack
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1px", background: "var(--dash-border)", margin: "-1.5rem", marginTop: 0 }}>
            {[
              ["Next.js 16", "Framework"],
              ["React 19", "UI"],
              ["Tailwind CSS", "Styling"],
              ["Web Bluetooth", "BLE Hardware"],
              ["Leaflet", "Map / Traces"],
              ["Recharts", "Data Charts"],
              ["Geolocation API", "Route Tracking"],
              ["Firebase Firestore", "Optional cloud sync"],
              ["Web Speech API", "Voice prompts / commands"],
              ["Web Serial", "Touch pad ↔ belt"],
            ].map(([tech, role]) => (
              <div
                key={tech}
                style={{
                  background: "var(--dash-bg)",
                  padding: "1rem 1.25rem",
                }}
              >
                <div style={{ fontSize: "0.85rem", fontWeight: 500, color: "#fff", marginBottom: "0.3rem" }}>
                  {tech}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--dash-text-muted)" }}>
                  {role}
                </div>
              </div>
            ))}
          </div>
        </div>

        <SiteClosing />
      </div>
    </div>
  );
}
