import type { ReactNode } from "react";
import IterationProcess from "@/components/IterationProcess";
import PresentDeck01To6 from "@/components/present/PresentDeck01To6";
import PresentProductShowcase from "@/components/present/PresentProductShowcase";
import PresentSlide from "@/components/present/PresentSlide";

export default function PresentPage() {
  return (
    <div className="dash-page present-page present-page--deck">
      <div className="present-deck">
        <PresentDeck01To6 />

        <PresentSlide id="present-07" flow>
          <Section>
            <div className="dash-section-label">07 / Experiments / Development</div>
            <p className="dash-body" style={{ marginBottom: "1.25rem", maxWidth: "42rem" }}>
              Each full-width page in the strip below is one build step; scroll this section horizontally to move
              through the sequence.
            </p>
            <IterationProcess />
          </Section>
        </PresentSlide>

        <PresentSlide id="present-08" flow>
          <Section>
            <div className="dash-section-label">08 / Product showcase</div>
            <PresentProductShowcase />
          </Section>
        </PresentSlide>

        <PresentSlide id="present-09">
          <Section>
            <div className="dash-section-label">09 / Findings and Open Directions</div>
            <p className="dash-body" style={{ margin: "0 0 1rem" }}>
              The project shows that touch-based navigation is not only a hardware problem. It is also a training and data
              problem. Each session can produce useful records: route traces, timing, corrections, help requests, and notes
              about how the user responded to haptic cues.
            </p>
            <p className="dash-body" style={{ margin: "0 0 1rem" }}>
              In the current system, this data helps make the non-visual experience visible and reviewable. In a future
              version, these session records could also be used to train AI models. The model could learn from repeated
              navigation sessions and gradually predict what kind of haptic cue should be sent to the belt in different
              spatial situations.
            </p>
            <p className="dash-body" style={{ margin: 0 }}>
              The longer-term direction is to reduce dependence on a human guide. Instead of someone manually sending every
              cue, the belt could connect with sensing systems, such as a camera or location input, and use an AI model to
              generate haptic feedback more independently. This is not a finished claim yet, but an open direction: using
              training data to move from guided practice toward more independent use of the wearable belt.
            </p>
          </Section>
        </PresentSlide>
      </div>
    </div>
  );
}

function Section({ children }: { children: ReactNode }) {
  return <div className="present-slide__block">{children}</div>;
}
