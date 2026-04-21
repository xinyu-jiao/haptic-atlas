import Link from "next/link";
import IterationProcess from "@/components/IterationProcess";

export default function AboutPage() {
  return (
    <div className="dash-page">
      <div className="dash-container">
        <Section>
          <div className="dash-section-label">01 / Context</div>
          <h1 className="dash-title" style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>
            Haptic Atlas
          </h1>
          <p className="dash-body">
            Many people navigate with reduced or no reliance on vision — temporarily (low light, glare,
            divided attention) or as a stable condition. Training for{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>non-visual spatial movement</strong> is
            still unevenly supported: audio turn-by-turn competes with environmental sound and social
            listening load; screen-based maps assume a visual fix.{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>Tactile navigation cues</strong> offer a
            parallel channel: spatial, discreet, and bodily — but they must be learned, tuned, and
            evidenced like any other skill.
          </p>
        </Section>

        <div className="dash-divider" />

        <Section>
          <div className="dash-section-label">02 / Problem and questions</div>
          <p className="dash-body" style={{ marginBottom: "1rem" }}>
            Haptic Atlas asks how a small team can hold together{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>training</strong>,{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>recording</strong>, and{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>collaboration / safety</strong> in one loop:
          </p>
          <ul
            style={{
              margin: "0 0 0 1.1rem",
              padding: 0,
              color: "var(--dash-text-secondary)",
              fontSize: "0.875rem",
              lineHeight: 1.85,
            }}
          >
            <li>How do you rehearse left/right body-centered cues without overloading hearing?</li>
            <li>What counts as evidence that a session happened — timers, corrections, traces, sync?</li>
            <li>When someone is moving outside lab conditions, how might others follow along without treating it as surveillance theater?</li>
          </ul>
        </Section>

        <div className="dash-divider" />

        <Section>
          <div className="dash-section-label">03 / Related Work &amp; Method</div>
          <p className="dash-body" style={{ marginBottom: "1rem" }}>
            The project sits alongside{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>browser-mediated haptics</strong> (Web APIs as
            bridges to devices), <strong style={{ color: "#fff", fontWeight: 600 }}>wearable tactile displays</strong>{" "}
            (belts, sleeves, arrays), and{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>accessibility-oriented HCI</strong> (participatory
            design, multimodal redundancy, critical takes on “assistive” tech). Methodologically it is framed
            as a <strong style={{ color: "#fff", fontWeight: 600 }}>vertical slice</strong>: not every feature
            of a finished system, but a connected path from hardware intent through software behavior to
            something you can point at in review.
          </p>
          <div className="dash-card" style={{ padding: "1.25rem 1.5rem" }}>
            <p className="dash-body" style={{ margin: 0, lineHeight: 1.8 }}>
              This site is written for an <strong style={{ color: "#fff", fontWeight: 600 }}>academic</strong>{" "}
              reader: messy iterations, partial instrumentation, and explicit trade-offs (e.g. Bluetooth
              removed from the public Interface demo to reduce friction, while belt firmware and a{" "}
              <Link href="/touch-pad" style={{ color: "var(--dash-text-secondary)", borderBottom: "1px solid var(--dash-border)" }}>
                Web Serial touch pad
              </Link>{" "}
              remain available for hardware-side work). It is not positioned as a product pitch.
            </p>
          </div>
        </Section>

        <div className="dash-divider" />

        <Section>
          <div className="dash-section-label">04 / What This Site Is</div>
          <p className="dash-body">
            A <strong style={{ color: "#fff", fontWeight: 600 }}>documentation and evidence layer</strong>{" "}
            around a haptic navigation training slice: the Interface flow for structured sessions; Session
            History and Data for aggregates; Walk Trace for geolocated movement; Code and Touch for
            repository access and desk-level serial control of the belt stack. The design–research timeline
            on this page (below) replaces a separate Process route: hardware, control, and web co-evolution in
            one place.
          </p>
        </Section>

        <div className="dash-divider" />

        <Section>
          <div className="dash-section-label">05 / System Components</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1px",
              marginTop: "1.5rem",
              background: "var(--dash-border)",
            }}
          >
            {[
              {
                icon: "◉",
                title: "Haptic belt (vibe-belt)",
                desc: "14-motor DRV2605 belt — Arduino-side firmware, serial logging, and gamepad-style paths. Browser control via Web Serial on the Touch page.",
              },
              {
                icon: "⊞",
                title: "Guide controller",
                desc: "Handheld path for the Guide role in live sessions: directional signals to the Seeker’s belt in the training narrative.",
              },
              {
                icon: "◈",
                title: "Web layer",
                desc: "Next.js app: session flow, maps, charts, optional cloud sync (Firestore), voice / long-press access experiments, and embedded touch pad for lab use.",
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
          <div className="dash-section-label">06 / Design and research path</div>
          <p className="dash-body" style={{ marginBottom: "1.75rem" }}>
            Iteration process is kept here so context, system overview, and how the slice actually evolved
            stay adjacent — closer to a lab notebook than a detached changelog.
          </p>
          <IterationProcess />
        </Section>

        <div className="dash-divider" />

        <Section>
          <div className="dash-section-label">07 / How to Read What Follows</div>
          <p className="dash-body" style={{ margin: 0 }}>
            After the Interface hero, the remaining sections move from{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>recorded practice</strong> (sessions, map,
            data) through <strong style={{ color: "#fff", fontWeight: 600 }}>implementation</strong> (touch
            pad, code). A short reflective block sits at the end of the Code page — the natural end of the
            scroll through this slice.
          </p>
        </Section>
      </div>
    </div>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return <div style={{ marginBottom: "1rem" }}>{children}</div>;
}
