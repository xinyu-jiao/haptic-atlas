export default function IterationsPage() {
  const iterations = [
    {
      version: "v0.1",
      label: "INITIAL CONCEPT",
      date: "JAN 2026",
      status: "archived",
      notes: [
        "Single vibration motor proof-of-concept",
        "Arduino-based prototype wired directly to belt",
        "Navigation tested over 5m straight corridor",
      ],
    },
    {
      version: "v0.2",
      label: "DUAL MOTOR",
      date: "FEB 2026",
      status: "archived",
      notes: [
        "Left/right differentiation added",
        "First BLE pairing attempt with iOS app",
        "Revised belt mounting position for clearer tactile feedback",
      ],
    },
    {
      version: "v0.3",
      label: "CONTROLLER + WEB",
      date: "MAR 2026",
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
      label: "FINAL REVIEW",
      date: "APR 2026",
      status: "planned",
      notes: [
        "Refined hardware form factor",
        "Additional test scenarios",
        "Expanded data visualization",
        "User testing with external participants",
      ],
    },
  ];

  const STATUS_COLORS: Record<string, string> = {
    archived: "var(--dark3)",
    current: "var(--purple)",
    planned: "transparent",
  };

  const STATUS_TEXT: Record<string, string> = {
    archived: "ARCHIVED",
    current: "CURRENT",
    planned: "PLANNED",
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1.25rem" }}>
      <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.9rem", marginBottom: "0.5rem" }}>
        ITERATION PROCESS
      </div>
      <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.45rem", opacity: 0.6, marginBottom: "2rem" }}>
        DEVELOPMENT ARCHIVE
      </div>

      <div style={{ position: "relative" }}>
        {/* Timeline line */}
        <div
          style={{
            position: "absolute",
            left: 28,
            top: 0,
            bottom: 0,
            width: 3,
            background: "var(--dark)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {iterations.map((iter) => (
            <div key={iter.version} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
              {/* Node */}
              <div
                style={{
                  width: 20,
                  height: 20,
                  background: STATUS_COLORS[iter.status] || "var(--dark2)",
                  border: "3px solid var(--dark)",
                  boxShadow: "2px 2px 0 var(--dark)",
                  flexShrink: 0,
                  marginTop: "0.75rem",
                  zIndex: 1,
                  marginLeft: 18,
                }}
              />

              {/* Card */}
              <div className="pixel-card" style={{ padding: "1rem", flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.6rem", flexWrap: "wrap", gap: "0.5rem" }}>
                  <div>
                    <span style={{ fontFamily: '"Press Start 2P"', fontSize: "0.45rem", color: "var(--pink)", marginRight: "0.6rem" }}>
                      {iter.version}
                    </span>
                    <span style={{ fontFamily: '"Press Start 2P"', fontSize: "0.65rem", color: "white" }}>
                      {iter.label}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <span style={{ fontFamily: '"Press Start 2P"', fontSize: "0.35rem", color: "rgba(255,255,255,0.4)" }}>
                      {iter.date}
                    </span>
                    <span
                      style={{
                        fontFamily: '"Press Start 2P"',
                        fontSize: "0.35rem",
                        color: iter.status === "current" ? "var(--bg)" : "rgba(255,255,255,0.5)",
                        background: STATUS_COLORS[iter.status],
                        border: "2px solid var(--dark)",
                        padding: "0.2rem 0.4rem",
                      }}
                    >
                      {STATUS_TEXT[iter.status]}
                    </span>
                  </div>
                </div>
                {iter.notes.map((note) => (
                  <div key={note} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.3rem" }}>
                    <span style={{ color: "var(--purple)", fontSize: "0.5rem", flexShrink: 0 }}>▸</span>
                    <span style={{ fontFamily: '"Press Start 2P"', fontSize: "0.4rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.9 }}>
                      {note}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
