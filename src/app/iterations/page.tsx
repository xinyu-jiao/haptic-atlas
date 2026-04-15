const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function IterationsPage() {
  const iterations: { version: string; label: string; date: string; images?: string[]; notes: string[] }[] = [
    {
      version: "01",
      label: "Early Hardware Demo",
      date: "January 2026",
      images: ["/images/1.png", "/images/3.png"],
      notes: [
        "Single vibration motor proof-of-concept",
        "Arduino-based prototype wired directly to belt",
        "Navigation tested over 5m straight corridor",
      ],
    },
    {
      version: "02",
      label: "Circuit + Control Testing",
      date: "February 2026",
      images: ["/images/2.png", "/images/4.png", "/images/9.png", "/images/10.JPG"],
      notes: [
        "Left/right differentiation added",
        "First BLE pairing attempt with iOS app",
        "Revised belt mounting position for clearer tactile feedback",
      ],
    },
    {
      version: "03",
      label: "Wearable Scenario Exploration",
      date: "March 2026",
      images: ["/images/5.png", "/images/6.png", "/images/7.png", "/images/8.png"],
      notes: [
        "Handheld controller replaces phone as Guide interface",
        "Multi-scenario testing in indoor and outdoor environments",
        "Iterative refinement of motor placement and signal patterns",
      ],
    },
    {
      version: "04",
      label: "System Reframing: Controller + Web Layer",
      date: "Late March 2026",
      notes: [
        "Web platform launched as documentation and evidence layer",
        "Session flow: Level → Role → Setup → Active → Result",
        "Web Bluetooth API integration",
        "Walk trace recording with Geolocation API",
      ],
    },
  ];

  const milestone = {
    functioning: [
      "Complete session flow: Level → Role → Setup → Active → Result",
      "Real-time timer and state updates",
      "Voice control via long-press anywhere on screen",
      "Simulation mode fallback for demo contexts",
      "Guide view: mark corrections and assistance in real-time",
      "Seeker view: live consistency score, haptic direction feedback",
      "Session results synced to Firebase Firestore",
      "Session history with grouping by date",
      "Walk trace map with Geolocation API tracking",
      "Live location sharing during sessions",
    ],
    incomplete: [
      "Physical hardware form factor refinement",
      "More levels and route scenarios",
      "Real BLE pairing with physical belt (requires hardware present)",
      "Multi-session analytics and comparisons",
      "Additional test scenarios and external user testing",
      "Expanded data visualization and export capabilities",
    ],
  };

  return (
    <div className="dash-page">
      <div className="dash-container">
        <h1 className="dash-title">Iteration Process</h1>
        <div className="dash-subtitle">Development Archive</div>

        <div style={{ position: "relative" }}>
          {/* Timeline line */}
          <div
            style={{
              position: "absolute",
              left: 7,
              top: 12,
              bottom: 12,
              width: 1,
              background: "var(--dash-border)",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {iterations.map((iter, i) => (
              <div key={iter.version} style={{ display: "flex", gap: "1.75rem", alignItems: "flex-start" }}>
                {/* Node */}
                <div
                  style={{
                    width: 15,
                    height: 15,
                    background: i === iterations.length - 1 ? "#fff" : "#333",
                    border: "1px solid",
                    borderColor: i === iterations.length - 1 ? "#fff" : "var(--dash-border)",
                    borderRadius: "50%",
                    flexShrink: 0,
                    marginTop: "1.5rem",
                    zIndex: 1,
                  }}
                />

                {/* Card */}
                <div className="dash-card" style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem", flexWrap: "wrap", gap: "0.75rem" }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem" }}>
                      <span style={{ fontSize: "0.7rem", letterSpacing: "0.1em", color: "var(--dash-text-muted)" }}>
                        {iter.version}
                      </span>
                      <span style={{ fontSize: "1rem", fontWeight: 600, color: "#fff" }}>
                        {iter.label}
                      </span>
                    </div>
                    <span style={{ fontSize: "0.7rem", color: "var(--dash-text-muted)" }}>
                      {iter.date}
                    </span>
                  </div>
                  {iter.notes.map((note) => (
                    <div key={note} className="dash-list-item">
                      <span className="dash-list-bullet">—</span>
                      <span className="dash-list-text">{note}</span>
                    </div>
                  ))}
                  {iter.images && iter.images.length > 0 && (
                    <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.25rem", flexWrap: "wrap" }}>
                      {iter.images.map((src) => (
                        <div key={src} style={{ width: 180, height: 180, border: "1px solid var(--dash-border)", overflow: "hidden", flexShrink: 0 }}>
                          <img
                            src={`${BASE}${src}`}
                            alt=""
                            style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "3rem", borderTop: "1px solid var(--dash-border)", paddingTop: "2.5rem" }}>
          <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: "var(--dash-text-muted)", marginBottom: "2rem", textTransform: "uppercase" }}>
            Vertical Slice — Milestone 2
          </div>

          <div className="dash-card" style={{ marginBottom: "1.5rem" }}>
            <div style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.1em", color: "#fff", marginBottom: "1.25rem", textTransform: "uppercase" }}>
              Functioning Now
            </div>
            {milestone.functioning.map((item) => (
              <div key={item} className="dash-list-item">
                <span className="dash-list-bullet">—</span>
                <span className="dash-list-text">{item}</span>
              </div>
            ))}
          </div>

          <div className="dash-card">
            <div style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.1em", color: "var(--dash-text-muted)", marginBottom: "1.25rem", textTransform: "uppercase" }}>
              Still Incomplete
            </div>
            {milestone.incomplete.map((item) => (
              <div key={item} className="dash-list-item">
                <span className="dash-list-bullet" style={{ color: "#333" }}>—</span>
                <span className="dash-list-text" style={{ color: "var(--dash-text-muted)" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
