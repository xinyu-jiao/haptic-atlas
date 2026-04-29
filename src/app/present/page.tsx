import type { ReactNode } from "react";
import IterationProcess from "@/components/IterationProcess";
import PresentDeck01To6 from "@/components/present/PresentDeck01To6";
import PresentFindings from "@/components/present/PresentFindings";
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

        <PresentSlide id="present-09" flow>
          <Section>
            <div className="dash-section-label">09 / Findings and Open Directions</div>
            <PresentFindings />
          </Section>
        </PresentSlide>
      </div>
    </div>
  );
}

function Section({ children }: { children: ReactNode }) {
  return <div className="present-slide__block">{children}</div>;
}
