export default function IterationsPage() {
  const iterations = [
    {
      version: "v0.1",
      label: "Initial Concept",
      date: "Jan 2026",
      status: "archived",
      notes: [
        "Single vibration motor proof-of-concept",
        "Arduino-based prototype wired directly to belt",
        "Navigation tested over 5m straight corridor",
      ],
    },
    {
      version: "v0.2",
      label: "Dual Motor",
      date: "Feb 2026",
      status: "archived",
      notes: [
        "Left/right differentiation added",
        "First BLE pairing attempt with iOS app",
        "Revised belt mounting position for clearer tactile feedback",
      ],
    },
    {
      version: "v0.3",
      label: "Controller + Web",
      date: "Mar 2026",
      status: "current",
      notes: [
        "Handheld controller replaces phone as Guide interface",
        "Web platform launched as documentation and evidence layer",
        "Session flow: Level → Role → Setup → Active → Result",
        "Web Bluetooth API integration",
      ],
    },
    {
      version: "v1.0",
      label: "Final Review",
      date: "Apr 2026",
      status: "planned",
      notes: [
        "Refined hardware form factor",
        "Additional test scenarios",
        "Expanded data visualization",
        "User testing with external participants",
      ],
    },
  ];

  const STATUS_LABELS: Record<string, string> = {
    archived: "ARCHIVED",
    current: "CURRENT",
    planned: "PLANNED",
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
            {iterations.map((iter) => (
              <div key={iter.version} style={{ display: "flex", gap: "1.75rem", alignItems: "flex-start" }}>
                {/* Node */}
                <div
                  style={{
                    width: 15,
                    height: 15,
                    background: iter.status === "current" ? "#fff" : iter.status === "archived" ? "#333" : "transparent",
                    border: "1px solid",
                    borderColor: iter.status === "current" ? "#fff" : "var(--dash-border)",
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
                    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                      <span style={{ fontSize: "0.7rem", color: "var(--dash-text-muted)" }}>
                        {iter.date}
                      </span>
                      <span className="dash-badge" style={{
                        borderColor: iter.status === "current" ? "#555" : "var(--dash-border)",
                        color: iter.status === "current" ? "#fff" : "var(--dash-text-muted)",
                      }}>
                        {STATUS_LABELS[iter.status]}
                      </span>
                    </div>
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
