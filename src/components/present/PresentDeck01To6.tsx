import type { CSSProperties, ReactNode } from "react";
import MeaningStrip from "@/components/MeaningStrip";
import PresentReferencesCarousel from "@/components/present/PresentReferencesCarousel";
import PresentSlide from "./PresentSlide";
import { assetUrl, LOGO_MARK_PATH, LOGO_MARK_MONO_PATH, MAIN_LOGO_PATH } from "@/lib/assetUrl";

const SPEC_INNER: CSSProperties = {
  background: "#0a0a0a",
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "2rem 1.1rem",
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
          fontWeight: 500,
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
          fontWeight: 500,
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
  padding: "2rem 1.1rem",
  minHeight: 400,
};

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
          fontWeight: 500,
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
          fontWeight: 500,
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

function Section({ children }: { children: ReactNode }) {
  return <div className="present-slide__block">{children}</div>;
}

/**
 * Present vertical deck: §01–06 as separate slides.
 */
export default function PresentDeck01To6() {
  return (
    <>
        <PresentSlide id="present-01">
        <div className="present-hero present-hero--cover">
          <div className="present-hero__bg" aria-hidden>
            <img
              className="present-hero__bgImg"
              src={assetUrl("/images/present-context-hero-bg.png")}
              alt=""
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
            <div className="present-hero__scrim" />
          </div>
          <div className="present-hero__text">
            <div className="dash-section-label">01 / Context</div>
            <h1 className="dash-title present-hero__title">Haptic Atlas</h1>
            <div className="present-hero__copy">
              <p className="dash-body" style={{ margin: 0 }}>
                Learn navigation by feel: a haptic belt for blind and low-vision users. Vibration is trained as
                spatial language—repeated, learnable—beside or instead of vision- and sound-heavy tools.
              </p>
            </div>
          </div>
        </div>
        </PresentSlide>

        <PresentSlide id="present-02">
        <Section>
          <div className="dash-section-label">02 / Problem + Questions</div>
          <div className="dash-card" style={{ padding: "1.5rem 1.25rem", marginBottom: "1.75rem" }}>
            <p
              className="dash-body"
              style={{
                margin: "0 0 1.35rem",
                lineHeight: 1.72,
                color: "rgba(255, 255, 255, 0.9)",
              }}
            >
              Navigation is still mostly designed for vision, while audio alternatives can add listening overload. Haptic
              cues offer another path, but they need to be designed as something people can learn through repeated
              movement, not just feel as isolated alerts.
            </p>
            <div className="dash-label" style={{ marginBottom: "0.65rem" }}>
              Key questions
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div className="dash-list-item">
                <span className="dash-list-bullet">—</span>
                <span className="dash-list-text">How can direction be felt on the body?</span>
              </div>
              <div className="dash-list-item">
                <span className="dash-list-bullet">—</span>
                <span className="dash-list-text">How can tactile cues be learned through training?</span>
              </div>
              <div className="dash-list-item">
                <span className="dash-list-bullet">—</span>
                <span className="dash-list-text">How can sessions be recorded without becoming surveillance?</span>
              </div>
            </div>
          </div>
        </Section>
        </PresentSlide>

        <PresentSlide id="present-03" flow>
        <Section>
          <div className="dash-section-label">03 / References &amp; previous work</div>
          <p className="dash-body" style={{ margin: "0 0 1.25rem" }}>
            Recent work on bioelastic haptic sensory substitution shows how wearable tactile interfaces can translate
            digital or spatial information into sensations on the skin. Haptic Atlas works in a lower-fidelity,
            prototyping context, using vibration motors and a belt-based form to ask a related question: how can tactile
            signals become learnable cues for navigation?
          </p>
          <PresentReferencesCarousel />
        </Section>
        </PresentSlide>

        <PresentSlide id="present-04" flow>
        <Section>
          <div className="dash-section-label">04 / Technical Method</div>
          <div className="present-tech-method">
            <p className="dash-body present-tech-method-lede" style={{ lineHeight: 1.72 }}>
              Haptic Atlas sits alongside browser-mediated haptics, wearable tactile displays, and
              accessibility-oriented HCI. It connects Web APIs, wearable vibration hardware, cloud data, and map-based
              visualization into one training system.
            </p>
            <div className="present-tech-method-hero">
              <div className="present-tech-method-hero__bg" aria-hidden>
                <img
                  className="present-tech-method-hero__bgImg"
                  src={assetUrl("/images/technical-method-hardware-annotate.png")}
                  alt="Annotated prototype: coin vibration motors on a hex 3D-printed plate, DRV2605L driver boards, PCA9548A I2C multiplexer, I2C and power wiring, and ESP32 controller."
                  loading="lazy"
                  decoding="async"
                />
                <div className="present-tech-method-hero__scrim" />
              </div>
              <div className="present-tech-method-hero__text">
                <div className="present-tech-method-hero__panels">
                  <div className="present-tech-method-hero__panel">
                    <div className="dash-label">Hardware layer</div>
                    <p className="dash-body" style={{ margin: 0, lineHeight: 1.72 }}>
                      The hardware layer uses Arduino / ESP32, BLE, vibration motors, and motor driver circuits to produce
                      directional cues on the body.
                    </p>
                  </div>
                  <div className="present-tech-method-hero__panel">
                    <div className="dash-label">Web layer</div>
                    <ul className="present-tech-method-list dash-body">
                      <li>Web Bluetooth API — device communication</li>
                      <li>Geolocation API — walking traces</li>
                      <li>Leaflet — route maps</li>
                      <li>Recharts — data visualization</li>
                      <li>Firebase Firestore — cloud session records</li>
                    </ul>
                  </div>
                </div>
                <p className="present-tech-method-hero__caption">
                  Fig. — Belt prototype electronics: motors, per-motor haptic drivers, I2C mux, and ESP32.
                </p>
              </div>
            </div>
            <p className="dash-body present-tech-method-footer" style={{ lineHeight: 1.72 }}>
              This allows the project to treat each navigation test not only as an experience, but also as data that can
              be documented, compared, and reviewed.
            </p>
          </div>
        </Section>
        </PresentSlide>

        <PresentSlide id="present-05" flow>
        <Section>
          <div className="dash-section-label" id="logo-design">
            05 / Logo design
          </div>
          <p className="dash-body" style={{ marginBottom: "1.5rem" }}>
            Layout matches the brand card: primary lockup, three lockup types, application (icon / dark / light), then
            meaning of the mark.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
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
            <div>
              <div style={SPEC_SUBHEAD}>Meaning</div>
              <MeaningStrip present />
            </div>
          </div>
        </Section>
        </PresentSlide>

        <PresentSlide id="present-06">
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
                  padding: "2rem 1.2rem",
                }}
              >
                <div style={{ fontSize: "1.5rem", color: "#fff", marginBottom: "1.1rem", opacity: 0.3 }}>{icon}</div>
                <div style={{ fontSize: "1.15rem", fontWeight: 500, color: "#fff", marginBottom: "0.75rem" }}>
                  {title}
                </div>
                <div className="dash-body" style={{ fontSize: "1.02rem", lineHeight: 1.62 }}>
                  {desc}
                </div>
              </div>
            ))}
          </div>
        </Section>
        </PresentSlide>
    </>
  );
}
