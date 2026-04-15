export default function AboutPage() {
  return (
    <div className="dash-page">
      <div className="dash-container">
        <Section>
          <div className="dash-section-label">01 / Project Overview</div>
          <h1 className="dash-title" style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>
            Haptic Atlas
          </h1>
          <p className="dash-body">
            A haptic navigation training system that teaches people to navigate in low-visibility or
            non-visual conditions using vibration-based directional cues. The system uses a wearable
            haptic belt, a handheld controller, and this web platform for documentation and testing.
          </p>
        </Section>

        <div className="dash-divider" />

        <Section>
          <div className="dash-section-label">02 / Why It Matters</div>
          <p className="dash-body">
            Non-visual navigation is underserved by existing assistive tools. Most solutions rely on
            auditory feedback, which competes with environmental sound. Haptic feedback offers a
            silent, spatial, and intuitive alternative — and it can be trained.
          </p>
        </Section>

        <div className="dash-divider" />

        <Section>
          <div className="dash-section-label">03 / System Components</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1px", marginTop: "1.5rem", background: "var(--dash-border)" }}>
            {[
              {
                icon: "◉",
                title: "Haptic Belt",
                desc: "Wearable device with left/right vibration motors. Outputs directional cues based on BLE commands.",
              },
              {
                icon: "⊞",
                title: "Controller",
                desc: "Handheld device for the Guide role. Sends directional signals to the belt in real-time.",
              },
              {
                icon: "◈",
                title: "Web Platform",
                desc: "Session setup, live tracking, results archive, and data visualization. The layer you are viewing now.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                style={{
                  background: "var(--dash-bg)",
                  padding: "1.75rem 1.5rem",
                }}
              >
                <div style={{ fontSize: "1.25rem", color: "#fff", marginBottom: "1rem", opacity: 0.3 }}>{icon}</div>
                <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "#fff", marginBottom: "0.6rem" }}>
                  {title}
                </div>
                <div className="dash-body" style={{ fontSize: "0.8rem" }}>
                  {desc}
                </div>
              </div>
            ))}
          </div>
        </Section>

      </div>
    </div>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return <div style={{ marginBottom: "1rem" }}>{children}</div>;
}
