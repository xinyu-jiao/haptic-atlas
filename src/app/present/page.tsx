import type { CSSProperties, ReactNode } from "react";
import IterationProcess from "@/components/IterationProcess";
import MeaningStrip from "@/components/MeaningStrip";
import { assetUrl, LOGO_MARK_PATH, LOGO_MARK_MONO_PATH, MAIN_LOGO_PATH } from "@/lib/assetUrl";

/** Flavin et al., Nature (2024) — Fig. 1 source for Related Work. */
const NATURE_BIOELASTIC_HAPTIC_ARTICLE_URL = "https://www.nature.com/articles/s41586-024-08155-9";

const SPEC_INNER: CSSProperties = {
  background: "#0a0a0a",
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "2rem 1.35rem",
  minHeight: 400,
};

const SPEC_LABEL: CSSProperties = {
  textAlign: "center",
  margin: 0,
  padding: "0.85rem 0.65rem",
  color: "var(--dash-text-muted)",
};

const horizontalLockupDark = (
  <>
    <img
      src={assetUrl(LOGO_MARK_PATH)}
      alt=""
      style={{ display: "block", width: 142, height: 142, objectFit: "contain", flexShrink: 0 }}
    />
    <div style={{ width: 1, alignSelf: "stretch", minHeight: 124, background: "#4a4a4e", flexShrink: 0 }} aria-hidden />
    <div>
      <div
        style={{
          fontSize: "1.22rem",
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
          fontSize: "0.98rem",
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
      style={{ display: "block", width: 126, height: 126, objectFit: "contain", flexShrink: 0 }}
    />
    <div style={{ width: 1, alignSelf: "stretch", minHeight: 108, background: "#a89bb5", flexShrink: 0 }} aria-hidden />
    <div>
      <div
        style={{
          fontSize: "1.08rem",
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
          fontSize: "0.88rem",
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
  fontSize: "1.05rem",
  fontWeight: 500,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "var(--dash-text-muted)",
  margin: "0 0 0.75rem",
};

const SPEC_VARIATION_INNER: CSSProperties = {
  background: "#0a0a0a",
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "2rem 1.35rem",
  minHeight: 400,
};

/** Horizontal lockup: mark + rule + HAPTIC / ATLAS + tagline (on black, like Application dark row). */
const horizontalLockupVariations = (
  <>
    <img
      src={assetUrl(LOGO_MARK_PATH)}
      alt=""
      style={{ display: "block", width: 142, height: 142, objectFit: "contain", flexShrink: 0 }}
    />
    <div style={{ width: 1, alignSelf: "stretch", minHeight: 152, background: "#4a4a4e", flexShrink: 0 }} aria-hidden />
    <div>
      <div
        style={{
          fontSize: "1.08rem",
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
          fontSize: "1.08rem",
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
          fontSize: "0.88rem",
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

export default function PresentPage() {
  return (
    <div className="dash-page present-page">
      <div className="dash-container">
        <div className="present-hero">
          <Section>
            <div className="dash-section-label">01 / Context</div>
            <h1 className="dash-title">Haptic Atlas</h1>
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
        </div>

        <div className="dash-divider" />

        <Section>
          <div className="dash-section-label">02 / Problem + Questions</div>
          <div className="dash-card" style={{ padding: "1.5rem 1.75rem", marginBottom: "1.75rem" }}>
            <p
              className="dash-body"
              style={{
                margin: "0 0 1.35rem",
                lineHeight: 1.72,
                color: "rgba(255, 255, 255, 0.92)",
              }}
            >
              Navigation is still mostly designed for <strong style={{ color: "#fff", fontWeight: 600 }}>vision</strong>
              , while audio alternatives can add{" "}
              <strong style={{ color: "#fff", fontWeight: 600 }}>listening overload</strong>.{" "}
              <strong style={{ color: "#fff", fontWeight: 600 }}>Haptic cues</strong> offer another path, but they need
              to be designed as something people can{" "}
              <strong style={{ color: "#fff", fontWeight: 600 }}>learn through repeated movement</strong>, not just feel
              as <strong style={{ color: "#fff", fontWeight: 600 }}>isolated alerts</strong>.
            </p>
            <div className="dash-label" style={{ marginBottom: "0.65rem" }}>
              Key questions:
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
              <div className="dash-list-item">
                <span className="dash-list-bullet">—</span>
                <span className="dash-list-text">
                  How can <strong style={{ color: "#fff", fontWeight: 600 }}>direction</strong> be felt on the{" "}
                  <strong style={{ color: "#fff", fontWeight: 600 }}>body</strong>?
                </span>
              </div>
              <div className="dash-list-item">
                <span className="dash-list-bullet">—</span>
                <span className="dash-list-text">
                  How can <strong style={{ color: "#fff", fontWeight: 600 }}>tactile cues</strong> be learned through{" "}
                  <strong style={{ color: "#fff", fontWeight: 600 }}>training</strong>?
                </span>
              </div>
              <div className="dash-list-item">
                <span className="dash-list-bullet">—</span>
                <span className="dash-list-text">
                  How can <strong style={{ color: "#fff", fontWeight: 600 }}>sessions</strong> be recorded without
                  becoming <strong style={{ color: "#fff", fontWeight: 600 }}>surveillance</strong>?
                </span>
              </div>
            </div>
          </div>
        </Section>

        <div className="dash-divider" />

        <Section>
          <div className="dash-section-label">03 / References &amp; Related Work</div>
          <p className="dash-body" style={{ margin: "0 0 1.25rem" }}>
            Recent work on{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>bioelastic haptic sensory substitution</strong> shows how{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>wearable tactile interfaces</strong> can translate{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>digital or spatial information</strong> into sensations on
            the skin. <strong style={{ color: "#fff", fontWeight: 600 }}>Haptic Atlas</strong> works in a{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>lower-fidelity, prototyping context</strong>, using{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>vibration motors</strong> and a{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>belt-based form</strong> to ask a related question: how can{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>tactile signals</strong> become{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>learnable cues for navigation</strong>?
          </p>
          <figure
            style={{
              margin: "0 0 1.5rem",
              border: "1px solid var(--dash-border)",
              background: "#0a0a0a",
              padding: "1.15rem 1.15rem 1.25rem",
              borderRadius: 2,
            }}
          >
            <img
              src={assetUrl("/images/bioelastic-haptic-related-work.png")}
              alt="Fig. 1 from Nature (2024): multisensory wearable haptic array — skin mechanoreceptors, transducer design, flexible array on the arm, Bluetooth to smartphone, application context."
              style={{
                width: "100%",
                maxWidth: "min(100%, 92vw)",
                height: "auto",
                display: "block",
                margin: "0 auto",
              }}
            />
            <figcaption
              className="dash-body"
              style={{
                margin: "1rem 0 0",
                fontSize: "1.02rem",
                lineHeight: 1.55,
                color: "var(--dash-text-muted)",
              }}
            >
              <div
                style={{
                  marginBottom: "0.5rem",
                  fontSize: "0.95rem",
                  letterSpacing: "0.06em",
                  color: "var(--dash-text-muted)",
                }}
              >
                Article · Published: 06 November 2024
              </div>
              <a
                href={NATURE_BIOELASTIC_HAPTIC_ARTICLE_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  color: "#e8e0f0",
                  fontWeight: 600,
                  textDecoration: "underline",
                  textUnderlineOffset: "0.18em",
                  marginBottom: "0.5rem",
                }}
              >
                Bioelastic state recovery for haptic sensory substitution
              </a>
              <div style={{ marginTop: "0.55rem", fontWeight: 400 }}>
                Fig. 1 — Multisensory feedback with a battery-powered array of biointegrated, bistable transducers
                (illustration from the article linked above; contrast with this project&apos;s belt prototype).
              </div>
            </figcaption>
          </figure>
        </Section>

        <div className="dash-divider" />

        <Section>
          <div className="dash-section-label">04 / Technical Method</div>
          <div className="dash-card present-tech-method" style={{ padding: "1.65rem 1.85rem", marginBottom: 0 }}>
            <p className="dash-body present-tech-method-lede" style={{ lineHeight: 1.68 }}>
              <strong style={{ color: "#fff", fontWeight: 600 }}>Haptic Atlas</strong> sits alongside{" "}
              <strong style={{ color: "#fff", fontWeight: 600 }}>browser-mediated haptics</strong>,{" "}
              <strong style={{ color: "#fff", fontWeight: 600 }}>wearable tactile displays</strong>, and{" "}
              <strong style={{ color: "#fff", fontWeight: 600 }}>accessibility-oriented HCI</strong>. It connects{" "}
              <strong style={{ color: "#fff", fontWeight: 600 }}>Web APIs</strong>,{" "}
              <strong style={{ color: "#fff", fontWeight: 600 }}>wearable vibration hardware</strong>,{" "}
              <strong style={{ color: "#fff", fontWeight: 600 }}>cloud data</strong>, and{" "}
              <strong style={{ color: "#fff", fontWeight: 600 }}>map-based visualization</strong> into{" "}
              <strong style={{ color: "#fff", fontWeight: 600 }}>one training system</strong>.
            </p>

            <div className="present-tech-method-grid">
              <div className="present-tech-method-panel">
                <div className="dash-label">Hardware layer</div>
                <p className="dash-body" style={{ lineHeight: 1.68 }}>
                  The <strong style={{ color: "#fff", fontWeight: 600 }}>hardware layer</strong> uses Arduino / ESP32,{" "}
                  <strong style={{ color: "#fff", fontWeight: 600 }}>BLE</strong>,{" "}
                  <strong style={{ color: "#fff", fontWeight: 600 }}>vibration motors</strong>, and{" "}
                  <strong style={{ color: "#fff", fontWeight: 600 }}>motor driver circuits</strong> to produce{" "}
                  <strong style={{ color: "#fff", fontWeight: 600 }}>directional cues</strong> on the body.
                </p>
              </div>
              <div className="present-tech-method-panel">
                <div className="dash-label">Web layer</div>
                <ul className="present-tech-method-list dash-body">
                  <li>
                    <strong style={{ color: "#fff", fontWeight: 600 }}>Web Bluetooth API</strong> — device communication
                  </li>
                  <li>
                    <strong style={{ color: "#fff", fontWeight: 600 }}>Geolocation API</strong> — walking traces
                  </li>
                  <li>
                    <strong style={{ color: "#fff", fontWeight: 600 }}>Leaflet</strong> — route maps
                  </li>
                  <li>
                    <strong style={{ color: "#fff", fontWeight: 600 }}>Recharts</strong> — data visualization
                  </li>
                  <li>
                    <strong style={{ color: "#fff", fontWeight: 600 }}>Firebase Firestore</strong> — cloud session records
                  </li>
                </ul>
              </div>
            </div>

            <p className="dash-body present-tech-method-footer" style={{ lineHeight: 1.68 }}>
              This allows the project to treat each navigation test not only as an experience, but also as{" "}
              <strong style={{ color: "#fff", fontWeight: 600 }}>data</strong> that can be{" "}
              <strong style={{ color: "#fff", fontWeight: 600 }}>documented, compared, and reviewed</strong>.
            </p>
          </div>
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
                  padding: "2.25rem 0 0",
                }}
              >
                <img
                  src={assetUrl(MAIN_LOGO_PATH)}
                  alt="Haptic Atlas: symbol, wordmark HAPTIC ATLAS, and tagline NAVIGATE BY FEEL"
                  style={{ display: "block", width: "100%", maxWidth: "min(100%, 92vw)", height: "auto" }}
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
                      style={{ display: "block", width: "min(100%, 19rem)", height: "auto", objectFit: "contain" }}
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
                        width: "min(100%, 19rem)",
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
                        width: 198,
                        height: 198,
                        borderRadius: 36,
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
                        style={{ width: 118, height: 88, objectFit: "contain" }}
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
                        maxWidth: 620,
                        borderRadius: 12,
                        background: "#0a0a0a",
                        border: "1px solid #2a2a2a",
                        padding: "1.55rem 1.15rem",
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
                        maxWidth: 600,
                        background: "#fff",
                        borderRadius: 10,
                        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                        padding: "1.25rem 0.95rem",
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
              <MeaningStrip present />
            </div>
          </div>
        </Section>

        <div className="dash-divider" />

        <Section>
          <div className="dash-section-label">06 / System Components</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1px",
              marginTop: "1.75rem",
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
                  padding: "2rem 1.75rem",
                }}
              >
                <div style={{ fontSize: "1.5rem", color: "#fff", marginBottom: "1.1rem", opacity: 0.3 }}>{icon}</div>
                <div style={{ fontSize: "1.15rem", fontWeight: 600, color: "#fff", marginBottom: "0.75rem" }}>
                  {title}
                </div>
                <div className="dash-body" style={{ fontSize: "1.02rem", lineHeight: 1.62 }}>
                  {desc}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <div className="dash-divider" />

        <Section>
          <div className="dash-section-label">07 / Experiments / Development</div>
          <p className="dash-body" style={{ marginBottom: "1.75rem" }}>
            This section tracks how <strong style={{ color: "#fff", fontWeight: 600 }}>Haptic Atlas</strong> evolved
            through <strong style={{ color: "#fff", fontWeight: 600 }}>hardware tests</strong>,{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>body-based experiments</strong>,{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>control interfaces</strong>, and{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>web documentation</strong>. It is closer to a{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>lab notebook</strong> than a{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>software changelog</strong>: each stage records{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>what changed</strong>,{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>what was tested</strong>, and how the system became{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>more specific</strong>.
          </p>
          <IterationProcess />
        </Section>

        <div className="dash-divider" />

        <Section>
          <div className="dash-section-label">08 / Findings and Open Directions</div>
          <p className="dash-body" style={{ margin: "0 0 1rem" }}>
            The project shows that <strong style={{ color: "#fff", fontWeight: 600 }}>touch-based navigation</strong> is
            not only a <strong style={{ color: "#fff", fontWeight: 600 }}>hardware problem</strong>. It is also a{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>training and data problem</strong>. Each session can
            produce useful records: <strong style={{ color: "#fff", fontWeight: 600 }}>route traces</strong>, timing,
            corrections, help requests, and notes about how the user responded to{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>haptic cues</strong>.
          </p>
          <p className="dash-body" style={{ margin: "0 0 1rem" }}>
            In the current system, this data helps make the non-visual experience{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>visible and reviewable</strong>. In a future version,
            these session records could also be used to <strong style={{ color: "#fff", fontWeight: 600 }}>train AI models</strong>
            . The model could learn from repeated navigation sessions and gradually predict what kind of{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>haptic cue</strong> should be sent to the belt in
            different <strong style={{ color: "#fff", fontWeight: 600 }}>spatial situations</strong>.
          </p>
          <p className="dash-body" style={{ margin: 0 }}>
            The longer-term direction is to reduce dependence on a{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>human Guide</strong>. Instead of someone manually sending
            every cue, the belt could connect with sensing systems, such as a{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>camera</strong> or{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>location input</strong>, and use an{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>AI model</strong> to generate{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>haptic feedback</strong> more independently. This is
            not a finished claim yet, but an <strong style={{ color: "#fff", fontWeight: 600 }}>open direction</strong>:
            using <strong style={{ color: "#fff", fontWeight: 600 }}>training data</strong> to move from{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>guided practice</strong> toward more{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>independent use</strong> of the{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>wearable belt</strong>.
          </p>
        </Section>
      </div>
    </div>
  );
}

function Section({ children }: { children: ReactNode }) {
  return <div style={{ marginBottom: "1.35rem" }}>{children}</div>;
}
