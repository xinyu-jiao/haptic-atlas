export default function IterationsPage() {
  const iterations = [
    {
      version: "01",
      label: "Early Hardware Demo",
      date: "January 2026",
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
