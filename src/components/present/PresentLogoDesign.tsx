import type { CSSProperties } from "react";
import MeaningStrip from "@/components/MeaningStrip";
import { assetUrl, LOGO_MARK_PATH, LOGO_MARK_MONO_PATH, MAIN_LOGO_PATH } from "@/lib/assetUrl";

const SPEC_LABEL: CSSProperties = {
  textAlign: "center",
  margin: 0,
  padding: "0.1rem 0.16rem",
  color: "var(--dash-text-muted)",
};

/** Single-viewport logo sheet: keep cells shallow */
const CELL_INNER: CSSProperties = {
  background: "#0a0a0a",
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.14rem 0.18rem",
  minHeight: "min(6.5dvh, 3.35rem)",
};

const horizontalLockupDark = (
  <>
    <img
      src={assetUrl(LOGO_MARK_PATH)}
      alt=""
      style={{ display: "block", width: 118, height: 118, objectFit: "contain", flexShrink: 0 }}
    />
    <div style={{ width: 1, alignSelf: "stretch", minHeight: 96, background: "#4a4a4e", flexShrink: 0 }} aria-hidden />
    <div>
      <div
        style={{
          fontSize: "1.05rem",
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
          fontSize: "0.82rem",
          fontWeight: 500,
          letterSpacing: "0.16em",
          color: "#8f7ba8",
          marginTop: "0.22rem",
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
      style={{ display: "block", width: 106, height: 106, objectFit: "contain", flexShrink: 0 }}
    />
    <div style={{ width: 1, alignSelf: "stretch", minHeight: 84, background: "#a89bb5", flexShrink: 0 }} aria-hidden />
    <div>
      <div
        style={{
          fontSize: "0.95rem",
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
          fontSize: "0.75rem",
          fontWeight: 500,
          letterSpacing: "0.16em",
          color: "#6b5b82",
          marginTop: "0.2rem",
        }}
      >
        NAVIGATE BY FEEL
      </div>
    </div>
  </>
);

const horizontalLockupVariations = (
  <>
    <img
      src={assetUrl(LOGO_MARK_PATH)}
      alt=""
      style={{ display: "block", width: 118, height: 118, objectFit: "contain", flexShrink: 0 }}
    />
    <div style={{ width: 1, alignSelf: "stretch", minHeight: 108, background: "#4a4a4e", flexShrink: 0 }} aria-hidden />
    <div>
      <div
        style={{
          fontSize: "0.95rem",
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
          fontSize: "0.95rem",
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
          fontSize: "0.78rem",
          fontWeight: 500,
          letterSpacing: "0.2em",
          color: "#8f7ba8",
          marginTop: "0.28rem",
        }}
      >
        NAVIGATE BY FEEL
      </div>
    </div>
  </>
);

/** §05 — vertical spec sheet (layout only): primary → variations row → application row → meaning panel */
export default function PresentLogoDesign() {
  return (
    <div className="present-logo-spec">
      <p className="dash-body present-logo-spec__intro">
        Primary lockup, lockup types, application samples, and mark meaning — one spec sheet.
      </p>

      <section className="present-logo-spec__block present-logo-spec__block--primary" aria-labelledby="logo-primary-heading">
        <h2 id="logo-primary-heading" className="present-logo-spec__subhead">
          Primary lockup
        </h2>
        <div className="present-logo-spec__primaryFrame">
          <img
            src={assetUrl(MAIN_LOGO_PATH)}
            alt="Haptic Atlas: symbol, wordmark HAPTIC ATLAS, and tagline NAVIGATE BY FEEL"
          />
        </div>
      </section>

      <section className="present-logo-spec__block" aria-labelledby="logo-variations-heading">
        <h2 id="logo-variations-heading" className="present-logo-spec__subhead">
          Lockup variations
        </h2>
        <div
          className="logo-spec-row present-logo-spec__grid3"
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
            <div style={CELL_INNER}>
              <img
                src={assetUrl(LOGO_MARK_PATH)}
                alt="Icon: dot matrix and chevron only, full color"
                style={{ display: "block", width: "min(100%, 8.5rem)", height: "auto", objectFit: "contain" }}
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
                ...CELL_INNER,
                flexDirection: "row",
                gap: "0.28rem",
                padding: "0.2rem 0.18rem",
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
            <div style={CELL_INNER}>
              <img
                src={assetUrl(LOGO_MARK_MONO_PATH)}
                alt="One-color (black) mark, inverted for display on black"
                style={{
                  display: "block",
                  width: "min(100%, 8.5rem)",
                  height: "auto",
                  objectFit: "contain",
                  filter: "invert(1) brightness(1.1)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="present-logo-spec__block" aria-labelledby="logo-application-heading">
        <h2 id="logo-application-heading" className="present-logo-spec__subhead">
          Application
        </h2>
        <div
          className="logo-spec-row present-logo-spec__grid3"
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
            <div style={{ ...CELL_INNER, minHeight: "min(6.8dvh, 3.65rem)" }}>
              <div
                style={{
                  width: 122,
                  height: 122,
                  maxWidth: "100%",
                  borderRadius: 22,
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
                  style={{ width: 64, height: 48, objectFit: "contain" }}
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
            <div style={CELL_INNER}>
              <div
                style={{
                  width: "100%",
                  maxWidth: 620,
                  borderRadius: 12,
                  background: "#0a0a0a",
                  border: "1px solid #2a2a2a",
                  padding: "0.48rem 0.38rem",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.4rem",
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
            <div style={CELL_INNER}>
              <div
                style={{
                  width: "100%",
                  maxWidth: 600,
                  background: "#fff",
                  borderRadius: 10,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                  padding: "0.42rem 0.34rem",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.38rem",
                  boxSizing: "border-box",
                }}
              >
                {horizontalLockupOnLight}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="present-logo-spec__meaningPanel" aria-labelledby="logo-meaning-heading">
        <h2 id="logo-meaning-heading" className="present-logo-spec__meaningLabel">
          Meaning
        </h2>
        <div className="present-logo-spec__meaningBody">
          <MeaningStrip present compact />
        </div>
      </section>
    </div>
  );
}
