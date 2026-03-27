export default function AboutPage() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "2.5rem 1.5rem" }}>
      {/* Project Overview */}
      <Section>
        <SectionLabel>01 / PROJECT OVERVIEW</SectionLabel>
        <h1 style={{ fontFamily: '"Press Start 2P"', fontSize: "1.1rem", marginBottom: "0.75rem", lineHeight: 1.5 }}>
          HAPTIC ATLAS
        </h1>
        <p style={{ fontFamily: '"Press Start 2P"', fontSize: "0.5rem", lineHeight: 2.2, color: "rgba(15,15,15,0.75)" }}>
          A haptic navigation training system that teaches people to navigate in low-visibility or
          non-visual conditions using vibration-based directional cues. The system uses a wearable
          haptic belt, a handheld controller, and this web platform for documentation and testing.
        </p>
      </Section>

      <Divider />

      {/* Why */}
      <Section>
        <SectionLabel>02 / WHY IT MATTERS</SectionLabel>
        <p style={{ fontFamily: '"Press Start 2P"', fontSize: "0.5rem", lineHeight: 2.2, color: "rgba(15,15,15,0.75)" }}>
          Non-visual navigation is underserved by existing assistive tools. Most solutions rely on
          auditory feedback, which competes with environmental sound. Haptic feedback offers a
          silent, spatial, and intuitive alternative — and it can be trained.
        </p>
      </Section>

      <Divider />

      {/* System Components */}
      <Section>
        <SectionLabel>03 / SYSTEM COMPONENTS</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
          {[
            {
              icon: "◉",
              title: "HAPTIC BELT",
              desc: "Wearable device with left/right vibration motors. Outputs directional cues based on BLE commands.",
              color: "var(--purple)",
            },
            {
              icon: "⊞",
              title: "CONTROLLER",
              desc: "Handheld device for the Guide role. Sends directional signals to the belt in real-time.",
              color: "var(--pink)",
            },
            {
              icon: "◈",
              title: "WEB PLATFORM",
              desc: "Session setup, live tracking, results archive, and data visualization. The layer you are viewing now.",
              color: "var(--blue)",
            },
          ].map(({ icon, title, desc, color }) => (
            <div
              key={title}
              className="pixel-card"
              style={{ padding: "1.25rem 1rem" }}
            >
              <div style={{ fontSize: "1.5rem", color, marginBottom: "0.75rem" }}>{icon}</div>
              <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.55rem", color: "white", marginBottom: "0.6rem" }}>
                {title}
              </div>
              <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.4rem", color: "rgba(255,255,255,0.55)", lineHeight: 2 }}>
                {desc}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Divider />

      {/* Vertical Slice */}
      <Section>
        <SectionLabel>04 / VERTICAL SLICE — MILESTONE 2</SectionLabel>
        <div className="pixel-card" style={{ padding: "1.25rem 1rem", marginBottom: "1rem" }}>
          <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.5rem", color: "var(--px-green, #44CC88)", marginBottom: "0.75rem" }}>
            ✓ FUNCTIONING NOW
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
            <div key={item} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.4rem" }}>
              <span style={{ color: "var(--purple)", flexShrink: 0 }}>▸</span>
              <span style={{ fontFamily: '"Press Start 2P"', fontSize: "0.4rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.9 }}>
                {item}
              </span>
            </div>
          ))}
        </div>

        <div className="pixel-card" style={{ padding: "1.25rem 1rem" }}>
          <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.5rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.75rem" }}>
            ○ STILL INCOMPLETE
          </div>
          {[
            "Physical hardware form factor refinement",
            "More levels and route scenarios",
            "Real BLE pairing with physical belt (requires hardware present)",
            "Multi-session analytics and comparisons",
          ].map((item) => (
            <div key={item} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.4rem" }}>
              <span style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0 }}>▸</span>
              <span style={{ fontFamily: '"Press Start 2P"', fontSize: "0.4rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.9 }}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return <div style={{ marginBottom: "2rem" }}>{children}</div>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: '"Press Start 2P"',
      fontSize: "0.45rem",
      opacity: 0.5,
      letterSpacing: "0.1em",
      marginBottom: "1rem",
    }}>
      {children}
    </div>
  );
}

function Divider() {
  return (
    <div style={{
      height: 3,
      background: "var(--dark)",
      margin: "2rem 0",
      boxShadow: "2px 2px 0 rgba(0,0,0,0.1)",
    }} />
  );
}
