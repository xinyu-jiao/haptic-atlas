const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const ITERATIONS: {
  version: string;
  label: string;
  date: string;
  images?: string[];
  notes: string[];
}[] = [
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
      "Walk trace recording with Geolocation API; optional Firestore sync",
      "Embedded Web Serial touch pad (vibe-belt) for desk testing of motor grid",
    ],
  },
];

type Props = {
  /** Anchor id for in-page / nav deep links */
  anchorId?: string;
};

/**
 * Design / research timeline (formerly standalone Process page).
 */
export default function IterationProcess({ anchorId = "iteration-process" }: Props) {
  return (
    <div id={anchorId} style={{ scrollMarginTop: "5rem" }}>
      <div className="dash-card" style={{ marginBottom: "2.25rem", padding: "1.25rem 1.5rem" }}>
        <p className="dash-body" style={{ margin: 0, lineHeight: 1.8 }}>
          This timeline is <strong style={{ color: "#fff", fontWeight: 600 }}>not</strong> a software release
          log. It tracks how hardware scenarios, control strategies, and the web layer co-evolved — including
          dead ends, retuned motor placement, and shifts in what “counts” as a test. Images anchor specific
          moments; notes stay short and factual.
        </p>
      </div>

      <div style={{ position: "relative" }}>
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
          {ITERATIONS.map((iter, i) => (
            <div key={iter.version} style={{ display: "flex", gap: "1.75rem", alignItems: "flex-start" }}>
              <div
                style={{
                  width: 15,
                  height: 15,
                  background: i === ITERATIONS.length - 1 ? "#fff" : "#333",
                  border: "1px solid",
                  borderColor: i === ITERATIONS.length - 1 ? "#fff" : "var(--dash-border)",
                  borderRadius: "50%",
                  flexShrink: 0,
                  marginTop: "1.5rem",
                  zIndex: 1,
                }}
              />

              <div className="dash-card" style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "1rem",
                    flexWrap: "wrap",
                    gap: "0.75rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem" }}>
                    <span style={{ fontSize: "0.7rem", letterSpacing: "0.1em", color: "var(--dash-text-muted)" }}>
                      {iter.version}
                    </span>
                    <span style={{ fontSize: "1rem", fontWeight: 600, color: "#fff" }}>{iter.label}</span>
                  </div>
                  <span style={{ fontSize: "0.7rem", color: "var(--dash-text-muted)" }}>{iter.date}</span>
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
                      <div
                        key={src}
                        style={{
                          width: 180,
                          height: 180,
                          border: "1px solid var(--dash-border)",
                          overflow: "hidden",
                          flexShrink: 0,
                        }}
                      >
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
    </div>
  );
}
