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

        <div className="dash-divider" />

        <Section>
          <div className="dash-section-label">04 / Vertical Slice — Milestone 2</div>

          <div className="dash-card" style={{ marginBottom: "1.5rem" }}>
            <div style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.1em", color: "#fff", marginBottom: "1.25rem", textTransform: "uppercase" }}>
              Functioning Now
            </div>
            {[
              "Complete session flow: Level → Role → Setup → Active → Result",
              "Real-time timer and state updates",
              "BLE haptic belt connection (Web Bluetooth API)",
              "Simulation mode fallback for demo contexts",
              "Guide view: mark corrections and assistance in real-time",
              "Seeker view: live consistency score, haptic direction feedback",
              "Session results saved to localStorage",
              "Session history with grouping by date",
              "Walk trace map with Geolocation API tracking",
            ].map((item) => (
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
            {[
              "Physical hardware form factor refinement",
              "More levels and route scenarios",
              "Real BLE pairing with physical belt (requires hardware present)",
              "Multi-session analytics and comparisons",
              "Additional test scenarios and external user testing",
              "Expanded data visualization and export capabilities",
            ].map((item) => (
              <div key={item} className="dash-list-item">
                <span className="dash-list-bullet" style={{ color: "#333" }}>—</span>
                <span className="dash-list-text" style={{ color: "var(--dash-text-muted)" }}>{item}</span>
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
