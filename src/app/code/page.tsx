export default function CodePage() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1.25rem" }}>
      <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.9rem", marginBottom: "0.5rem" }}>
        CODE / GITHUB
      </div>
      <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.45rem", opacity: 0.6, marginBottom: "2rem" }}>
        TECHNICAL ACCESS
      </div>

      {/* Repo cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
        {[
          {
            name: "haptic-atlas",
            desc: "Web platform — Next.js, Tailwind, Web Bluetooth API, Leaflet, Recharts",
            tag: "WEB",
            color: "var(--purple)",
          },
          {
            name: "haptic-atlas-hardware",
            desc: "Belt firmware and controller — Arduino/ESP32, BLE, vibration motor drivers",
            tag: "HARDWARE",
            color: "var(--pink)",
          },
        ].map(({ name, desc, tag, color }) => (
          <div key={name} className="pixel-card" style={{ padding: "1.25rem 1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.6rem", flexWrap: "wrap", gap: "0.5rem" }}>
              <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.65rem", color: "white" }}>
                {name}
              </div>
              <span
                style={{
                  fontFamily: '"Press Start 2P"', fontSize: "0.38rem",
                  background: color, color: "white",
                  border: "2px solid var(--dark)",
                  padding: "0.2rem 0.5rem",
                }}
              >
                {tag}
              </span>
            </div>
            <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.4rem", color: "rgba(255,255,255,0.55)", lineHeight: 2, marginBottom: "1rem" }}>
              {desc}
            </div>
            <div
              style={{
                fontFamily: '"Press Start 2P"', fontSize: "0.4rem",
                color: "rgba(255,255,255,0.3)",
                border: "2px dashed var(--dark3)",
                padding: "0.5rem 0.75rem",
              }}
            >
              github.com/[username]/{name}
            </div>
          </div>
        ))}
      </div>

      {/* Stack */}
      <div className="pixel-card" style={{ padding: "1.25rem 1rem" }}>
        <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.55rem", color: "white", marginBottom: "1rem" }}>
          TECH STACK
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "0.5rem" }}>
          {[
            ["NEXT.JS 16", "Framework"],
            ["REACT 19", "UI"],
            ["TAILWIND CSS", "Styling"],
            ["WEB BLUETOOTH", "BLE hardware"],
            ["LEAFLET", "Map / traces"],
            ["RECHARTS", "Data charts"],
            ["GEOLOCATION API", "Route tracking"],
            ["LOCALSTORAGE", "Session data"],
          ].map(([tech, role]) => (
            <div
              key={tech}
              style={{
                background: "var(--dark3)",
                border: "2px solid var(--dark)",
                padding: "0.5rem 0.6rem",
              }}
            >
              <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.4rem", color: "var(--pink)", marginBottom: "0.3rem" }}>
                {tech}
              </div>
              <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.35rem", color: "rgba(255,255,255,0.4)" }}>
                {role}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
