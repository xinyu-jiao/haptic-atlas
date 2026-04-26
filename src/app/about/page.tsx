import type { CSSProperties, ReactNode } from "react";
import IterationProcess from "@/components/IterationProcess";
import MeaningStrip from "@/components/MeaningStrip";
import { assetUrl, LOGO_MARK_PATH, LOGO_MARK_MONO_PATH, MAIN_LOGO_PATH } from "@/lib/assetUrl";

const SPEC_INNER: CSSProperties = {
  background: "#0a0a0a",
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "1.25rem 0.75rem",
  minHeight: 200,
};

const SPEC_LABEL: CSSProperties = {
  textAlign: "center",
  margin: 0,
  padding: "0.6rem 0.5rem",
  color: "var(--dash-text-muted)",
};

const horizontalLockupDark = (
  <>
    <img
      src={assetUrl(LOGO_MARK_PATH)}
      alt=""
      style={{ display: "block", width: 72, height: 72, objectFit: "contain", flexShrink: 0 }}
    />
    <div style={{ width: 1, alignSelf: "stretch", minHeight: 64, background: "#4a4a4e", flexShrink: 0 }} aria-hidden />
    <div>
      <div
        style={{
          fontSize: "0.68rem",
          fontWeight: 600,
          letterSpacing: "0.12em",
          color: "#e8e0f0",
          lineHeight: 1.2,
        }}
      >
        HAPTIC ATLAS
      </div>
      <div
        style={{
          fontSize: "0.52rem",
          fontWeight: 500,
          letterSpacing: "0.16em",
          color: "#8f7ba8",
          marginTop: "0.35rem",
        }}
      >
        NAVIGATE BY FEEL
      </div>
    </div>
  </>
);

const horizontalLockupOnLight = (
  <>
    <img
      src={assetUrl(LOGO_MARK_PATH)}
      alt=""
      style={{ display: "block", width: 64, height: 64, objectFit: "contain", flexShrink: 0 }}
    />
    <div style={{ width: 1, alignSelf: "stretch", minHeight: 56, background: "#a89bb5", flexShrink: 0 }} aria-hidden />
    <div>
      <div
        style={{
          fontSize: "0.6rem",
          fontWeight: 600,
          letterSpacing: "0.12em",
          color: "#1e1625",
          lineHeight: 1.2,
        }}
      >
        HAPTIC ATLAS
      </div>
      <div
        style={{
          fontSize: "0.48rem",
          fontWeight: 500,
          letterSpacing: "0.16em",
          color: "#6b5b82",
          marginTop: "0.3rem",
        }}
      >
        NAVIGATE BY FEEL
      </div>
    </div>
  </>
);

const SPEC_SUBHEAD: CSSProperties = {
  fontSize: "0.7rem",
  fontWeight: 500,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "var(--dash-text-muted)",
  margin: "0 0 0.5rem",
};

const SPEC_VARIATION_INNER: CSSProperties = {
  background: "#0a0a0a",
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "1.25rem 0.75rem",
  minHeight: 200,
};

/** Horizontal lockup: mark + rule + HAPTIC / ATLAS + tagline (on black, like Application dark row). */
const horizontalLockupVariations = (
  <>
    <img
      src={assetUrl(LOGO_MARK_PATH)}
      alt=""
      style={{ display: "block", width: 72, height: 72, objectFit: "contain", flexShrink: 0 }}
    />
    <div style={{ width: 1, alignSelf: "stretch", minHeight: 88, background: "#4a4a4e", flexShrink: 0 }} aria-hidden />
    <div>
      <div
        style={{
          fontSize: "0.58rem",
          fontWeight: 700,
          letterSpacing: "0.16em",
          color: "#e8e0f0",
          lineHeight: 1.1,
        }}
      >
        HAPTIC
      </div>
      <div
        style={{
          fontSize: "0.58rem",
          fontWeight: 700,
          letterSpacing: "0.16em",
          color: "#e8e0f0",
          lineHeight: 1.1,
          marginTop: 2,
        }}
      >
        ATLAS
      </div>
      <div
        style={{
          fontSize: "0.45rem",
          fontWeight: 500,
          letterSpacing: "0.2em",
          color: "#8f7ba8",
          marginTop: "0.45rem",
        }}
      >
        NAVIGATE BY FEEL
      </div>
    </div>
  </>
);

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
            Process route. Visual identity for the same slice is under{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>Logo design</strong> (below).
          </p>
        </Section>

        <div className="dash-divider" />

        <Section>
          <div className="dash-section-label" id="logo-design">
            05 / Logo design
          </div>
          <p className="dash-body" style={{ marginBottom: "1.5rem" }}>
            Layout matches the brand card: <strong style={{ color: "#fff", fontWeight: 600 }}>primary lockup</strong>, three lockup
            types, <strong style={{ color: "#fff", fontWeight: 600 }}>application</strong> (icon / dark / light), then{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>meaning</strong> of the mark
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* 1) Hero: full mark + HAPTIC ATLAS + tagline (two text lines) */}
            <div>
              <div style={SPEC_SUBHEAD}>Primary lockup</div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  minWidth: 0,
                  padding: "2rem 0 0",
                }}
              >
                <img
                  src={assetUrl(MAIN_LOGO_PATH)}
                  alt="Haptic Atlas: symbol, wordmark HAPTIC ATLAS, and tagline NAVIGATE BY FEEL"
                  style={{ display: "block", width: "100%", maxWidth: "34rem", height: "auto" }}
                />
              </div>
            </div>

            {/* 2) Lockup variations — black field like Application */}
            <div>
              <div style={SPEC_SUBHEAD}>Lockup variations</div>
              <div
                className="logo-spec-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  border: "1px solid var(--dash-border)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    borderRight: "1px solid var(--dash-border)",
                    minWidth: 0,
                  }}
                >
                  <div className="dash-label" style={SPEC_LABEL}>
                    Icon
                  </div>
                  <div style={SPEC_VARIATION_INNER}>
                    <img
                      src={assetUrl(LOGO_MARK_PATH)}
                      alt="Icon: dot matrix and chevron only, full color"
                      style={{ display: "block", width: "min(100%, 9.5rem)", height: "auto", objectFit: "contain" }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    borderRight: "1px solid var(--dash-border)",
                    minWidth: 0,
                  }}
                >
                  <div className="dash-label" style={SPEC_LABEL}>
                    Horizontal lockup
                  </div>
                  <div
                    style={{
                      ...SPEC_VARIATION_INNER,
                      flexDirection: "row",
                      gap: "0.65rem",
                      padding: "1.25rem 0.5rem",
                      justifyContent: "center",
                    }}
                  >
                    {horizontalLockupVariations}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                  <div className="dash-label" style={SPEC_LABEL}>
                    Symbol (mono)
                  </div>
                  <div style={SPEC_VARIATION_INNER}>
                    <img
                      src={assetUrl(LOGO_MARK_MONO_PATH)}
                      alt="One-color (black) mark, inverted for display on black"
                      style={{
                        display: "block",
                        width: "min(100%, 9.5rem)",
                        height: "auto",
                        objectFit: "contain",
                        filter: "invert(1) brightness(1.1)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3) Application — dark / contrast contexts */}
            <div>
              <div style={SPEC_SUBHEAD}>Application</div>
              <div
                className="logo-spec-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  border: "1px solid var(--dash-border)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    borderRight: "1px solid var(--dash-border)",
                    minWidth: 0,
                  }}
                >
                  <div className="dash-label" style={SPEC_LABEL}>
                    App icon
                  </div>
                  <div style={SPEC_INNER}>
                    <div
                      style={{
                        width: 104,
                        height: 104,
                        borderRadius: 24,
                        background: "linear-gradient(150deg, #5b3d7e 0%, #1a0f2a 55%, #0a040e 100%)",
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={assetUrl(LOGO_MARK_PATH)}
                        alt=""
                        style={{ width: 60, height: 45, objectFit: "contain" }}
                      />
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    borderRight: "1px solid var(--dash-border)",
                    minWidth: 0,
                  }}
                >
                  <div className="dash-label" style={SPEC_LABEL}>
                    Dark background
                  </div>
                  <div style={SPEC_INNER}>
                    <div
                      style={{
                        width: "100%",
                        maxWidth: 320,
                        borderRadius: 12,
                        background: "#0a0a0a",
                        border: "1px solid #2a2a2a",
                        padding: "1.15rem 0.9rem",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.6rem",
                        boxSizing: "border-box",
                      }}
                    >
                      {horizontalLockupDark}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                  <div className="dash-label" style={SPEC_LABEL}>
                    Light background
                  </div>
                  <div style={SPEC_INNER}>
                    <div
                      style={{
                        width: "100%",
                        maxWidth: 300,
                        background: "#fff",
                        borderRadius: 10,
                        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                        padding: "1.1rem 0.8rem",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                        boxSizing: "border-box",
                      }}
                    >
                      {horizontalLockupOnLight}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4) Meaning — four motifs from the brand strip; copy set in layout (MeaningStrip) */}
            <div>
              <div style={SPEC_SUBHEAD}>Meaning</div>
              <MeaningStrip />
            </div>
          </div>
        </Section>

        <div className="dash-divider" />

        <Section>
          <div className="dash-section-label">06 / System Components</div>
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
          <div className="dash-section-label">07 / Design and research path</div>
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
          <div className="dash-section-label">08 / Future direction</div>
          <p className="dash-body" style={{ margin: "0 0 1rem" }}>
            Today the emphasis is still on{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>training and evidence</strong>: structured sessions,
            logs, and <strong style={{ color: "#fff", fontWeight: 600 }}>route- and walk-style data</strong> (how
            someone moves, how cues land, what gets corrected). That stack exists so we can{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>train models</strong> — turning those traces and
            labels into something that generalizes — not as a polished “product” claim on this site, but as the
            groundwork for a later loop where sensing and touch stay tied together.
          </p>
          <p className="dash-body" style={{ margin: 0 }}>
            The longer arc is toward{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>use without a second person steering every cue</strong>
            : a wearer could run a <strong style={{ color: "#fff", fontWeight: 600 }}>camera (or similar front sensing)</strong>
            , <strong style={{ color: "#fff", fontWeight: 600 }}>connect straight to the belt</strong>, and get{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>closed-loop haptic feedback</strong> from a model that
            learned from the same kind of session data — enough for{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>independent trips and everyday routes</strong>, with
            safety and consent still treated as design constraints rather than afterthoughts. The paired Guide role
            remains important for now; the point is to grow out of needing another human in the loop for every
            outdoor or “just use it” scenario.
          </p>
        </Section>
      </div>
    </div>
  );
}

function Section({ children }: { children: ReactNode }) {
  return <div style={{ marginBottom: "1rem" }}>{children}</div>;
}
