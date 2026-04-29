import type { ReactNode } from "react";
import IterationProcess from "@/components/IterationProcess";
import PresentReferencesCarousel from "@/components/present/PresentReferencesCarousel";
import PresentSlide from "./PresentSlide";
import { assetUrl } from "@/lib/assetUrl";

function Section({ children }: { children: ReactNode }) {
  return <div className="present-slide__block">{children}</div>;
}

/**
 * Present deck slides 01–06: Context → … → Technical Method. Slides 07–09 are composed in page.tsx.
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
          <div className="dash-section-label">04 / Experiments / Development</div>
          <p className="dash-body" style={{ marginBottom: "1.25rem", maxWidth: "42rem" }}>
            Each full-width page in the strip below is one build step; scroll this section horizontally to move through the
            sequence.
          </p>
          <IterationProcess />
        </Section>
        </PresentSlide>

        <PresentSlide id="present-05">
        <Section>
          <div className="dash-section-label">05 / System Components</div>
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
                desc: "Next.js app: session flow, maps, charts, optional Firestore sync, voice / long-press access, getUserMedia + TensorFlow.js on Interface, embedded touch pad (Web Serial) for lab use.",
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

        <PresentSlide id="present-06" flow>
        <Section>
          <div className="dash-section-label">06 / Technical Method</div>
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
                      <li>
                        getUserMedia — camera stream for Interface experiments (browser-local video capture)
                      </li>
                      <li>
                        TensorFlow.js — COCO-SSD (object detection) &amp; MobileNet (scene labels); runs in-browser for
                        spoken cues
                      </li>
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
    </>
  );
}
