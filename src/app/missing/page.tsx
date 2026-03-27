export default function MissingPage() {
  const missing = [
    {
      category: "HARDWARE",
      items: [
        { label: "Refined wearable form factor", priority: "high" },
        { label: "Improved motor mounting for clearer directional feel", priority: "high" },
        { label: "Longer battery life / USB-C charging", priority: "med" },
        { label: "Weatherproofing for outdoor sessions", priority: "low" },
      ],
    },
    {
      category: "TRAINING LEVELS",
      items: [
        { label: "Additional route scenarios beyond 3 levels", priority: "high" },
        { label: "Multi-turn navigation sequences", priority: "med" },
        { label: "Obstacle avoidance training mode", priority: "med" },
        { label: "Timed challenge mode", priority: "low" },
      ],
    },
    {
      category: "DATA & TESTING",
      items: [
        { label: "More testing sessions with external participants", priority: "high" },
        { label: "Pre/post comparison data to show learning curve", priority: "high" },
        { label: "Video evidence of testing sessions", priority: "med" },
        { label: "Quantitative improvement metrics across weeks", priority: "med" },
      ],
    },
    {
      category: "WEB PLATFORM",
      items: [
        { label: "Media gallery with hardware photos and videos", priority: "med" },
        { label: "Session detail pages with route thumbnail", priority: "med" },
        { label: "Backend storage for persistent multi-device data", priority: "low" },
        { label: "Export session data as CSV or JSON", priority: "low" },
      ],
    },
  ];

  const PRIORITY_COLORS: Record<string, string> = {
    high: "#E84DC0",
    med: "#7B52CC",
    low: "#2A2A2A",
  };

  const PRIORITY_LABELS: Record<string, string> = {
    high: "HIGH",
    med: "MED",
    low: "LOW",
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1.25rem" }}>
      <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.9rem", marginBottom: "0.5rem" }}>
        MISSING FOR FINAL
      </div>
      <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.45rem", opacity: 0.6, marginBottom: "0.5rem" }}>
        WHAT IS NOT COMPLETE YET
      </div>
      <div className="pixel-card" style={{ padding: "0.6rem 1rem", marginBottom: "2rem", background: "var(--dark3)", display: "inline-block" }}>
        <span style={{ fontFamily: '"Press Start 2P"', fontSize: "0.4rem", color: "rgba(255,255,255,0.5)" }}>
          ALL ITEMS BELOW WILL BE ADDRESSED FOR FINAL REVIEW
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {missing.map(({ category, items }) => (
          <div key={category} className="pixel-card" style={{ padding: "1.25rem 1rem" }}>
            <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.55rem", color: "var(--pink)", marginBottom: "1rem" }}>
              {category}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {items.map(({ label, priority }) => (
                <div
                  key={label}
                  style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
                >
                  <span
                    style={{
                      fontFamily: '"Press Start 2P"', fontSize: "0.32rem",
                      background: PRIORITY_COLORS[priority],
                      color: "white",
                      border: "2px solid var(--dark)",
                      padding: "0.15rem 0.35rem",
                      flexShrink: 0,
                      minWidth: 36,
                      textAlign: "center",
                    }}
                  >
                    {PRIORITY_LABELS[priority]}
                  </span>
                  <span style={{ fontFamily: '"Press Start 2P"', fontSize: "0.42rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.9 }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
