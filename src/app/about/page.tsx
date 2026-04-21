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
            Haptic Atlas explores how navigation can be learned through touch, especially for blind and
            low-vision users. While most navigation systems depend on vision or audio, this project focuses
            on{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>haptic cues as a spatial language</strong>{" "}
            that can be felt on the body. Rather than treating touch as a simple alert, the project asks how
            tactile feedback can be{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>trained, repeated, and understood</strong> as
            part of movement through space.
          </p>
        </Section>

        <div className="dash-divider" />

        <Section>
          <div className="dash-section-label">02 / Problem and questions</div>
          <div className="dash-card" style={{ padding: "1.25rem 1.5rem", marginBottom: "1.5rem" }}>
            <p
              className="dash-body"
              style={{
                margin: "0 0 1rem",
                fontSize: "0.9375rem",
                lineHeight: 1.78,
                color: "rgba(255, 255, 255, 0.92)",
              }}
            >
              Haptic Atlas asks how navigation can be{" "}
              <strong style={{ color: "#fff", fontWeight: 600 }}>learned, practiced, and documented</strong>{" "}
              through <strong style={{ color: "#fff", fontWeight: 600 }}>touch rather than vision</strong>.
            </p>
            <p
              className="dash-body"
              style={{
                margin: 0,
                fontSize: "0.9375rem",
                lineHeight: 1.78,
                color: "rgba(255, 255, 255, 0.92)",
              }}
            >
              It focuses on how{" "}
              <strong style={{ color: "#fff", fontWeight: 600 }}>
                haptic cues, training structure, and session evidence
              </strong>{" "}
              can work together as <strong style={{ color: "#fff", fontWeight: 600 }}>one system</strong>.
            </p>
          </div>
          <div className="dash-label" style={{ marginBottom: "0.75rem" }}>
            Open questions
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <div className="dash-list-item">
              <span className="dash-list-bullet">—</span>
              <span className="dash-list-text">
                How can{" "}
                <strong style={{ color: "#fff", fontWeight: 600 }}>left/right body-centered cues</strong> be
                learned without relying on visual maps or{" "}
                <strong style={{ color: "#fff", fontWeight: 600 }}>constant audio instruction</strong>?
              </span>
            </div>
            <div className="dash-list-item">
              <span className="dash-list-bullet">—</span>
              <span className="dash-list-text">
                What counts as <strong style={{ color: "#fff", fontWeight: 600 }}>evidence</strong> of a
                navigation session — time, corrections, traces, notes, or{" "}
                <strong style={{ color: "#fff", fontWeight: 600 }}>repeated performance over time</strong>?
              </span>
            </div>
            <div className="dash-list-item">
              <span className="dash-list-bullet">—</span>
              <span className="dash-list-text">
                How can <strong style={{ color: "#fff", fontWeight: 600 }}>guidance, support, and safety</strong>{" "}
                be built into the system without turning navigation into{" "}
                <strong style={{ color: "#fff", fontWeight: 600 }}>surveillance</strong>?
              </span>
            </div>
          </div>
        </Section>

        <div className="dash-divider" />

        <Section>
          <div className="dash-section-label">03 / Related Work &amp; Method</div>
          <p className="dash-body" style={{ margin: 0 }}>
            The project sits alongside{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>browser-mediated haptics</strong> (Web APIs as
            bridges to devices), <strong style={{ color: "#fff", fontWeight: 600 }}>wearable tactile displays</strong>{" "}
            (belts, sleeves, arrays), and{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>accessibility-oriented HCI</strong> (participatory
            design, multimodal redundancy, critical takes on “assistive” tech).
          </p>
        </Section>

        <div className="dash-divider" />

        <Section>
          <div className="dash-section-label">04 / What This Site Is</div>
          <p className="dash-body">
            A <strong style={{ color: "#fff", fontWeight: 600 }}>documentation and evidence layer</strong>{" "}
            around a haptic navigation training slice: the Interface session launcher (
            <code style={{ fontSize: "0.82em", color: "var(--dash-text-secondary)" }}>/interface</code>
            ); a demo <strong style={{ color: "#fff", fontWeight: 600 }}>video</strong> on{" "}
            <code style={{ fontSize: "0.82em", color: "var(--dash-text-secondary)" }}>/video</code> (between
            launcher and archive); Sessions &amp; Data (history + charts on{" "}
            <code style={{ fontSize: "0.82em", color: "var(--dash-text-secondary)" }}>/history</code>
            ); Walk Trace and <strong style={{ color: "#fff", fontWeight: 600 }}>Code</strong> (repositories and
            tech stack) on{" "}
            <code style={{ fontSize: "0.82em", color: "var(--dash-text-secondary)" }}>/map</code>; Touch in
            the nav for desk serial control. Context and the design–research timeline are consolidated{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>on this page</strong> instead of a separate
            Process route.
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
          <p className="dash-body" style={{ marginBottom: "1rem" }}>
            Iteration process is kept here so context, system overview, and how the slice actually evolved
            stay adjacent — closer to a lab notebook than a detached changelog.
          </p>
          <p className="dash-body" style={{ marginBottom: "1.75rem" }}>
            Recent hardware work includes <strong style={{ color: "#fff", fontWeight: 600 }}>3D-printed shells</strong>{" "}
            (FDM) for the handheld controller and related parts: printed housings, post-print cleanup, and{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>assembly</strong> passes that check board clearance,
            cable routing, fasteners, and how the device sits in the hand before longer field-style trials. The
            timeline below picks up earlier circuit and control milestones; the enclosure thread runs in parallel
            with those decisions rather than after a “final” PCB.
          </p>
          <IterationProcess />
        </Section>

        <div className="dash-divider" />

        <Section>
          <div className="dash-section-label">07 / How to Read What Follows</div>
          <p className="dash-body" style={{ margin: 0 }}>
            Use the nav for the rest of this slice (order matches the bar):{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>Touch</strong> for Web Serial bench control,{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>Interface</strong> (pixel launcher at{" "}
            <code style={{ fontSize: "0.82em", color: "var(--dash-text-secondary)" }}>/interface</code>
            ), <strong style={{ color: "#fff", fontWeight: 600 }}>Video</strong> (
            <code style={{ fontSize: "0.82em", color: "var(--dash-text-secondary)" }}>/video</code>
            ), <strong style={{ color: "#fff", fontWeight: 600 }}>Sessions · Data</strong> for grouped history and
            evidence charts on <code style={{ fontSize: "0.82em", color: "var(--dash-text-secondary)" }}>/history</code>
            , <strong style={{ color: "#fff", fontWeight: 600 }}>Map · Code</strong> for walk traces, saved
            polylines, repositories, and tech stack (see bottom of{" "}
            <code style={{ fontSize: "0.82em", color: "var(--dash-text-secondary)" }}>/map</code>
            ).
          </p>
        </Section>
      </div>
    </div>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return <div style={{ marginBottom: "1rem" }}>{children}</div>;
}
