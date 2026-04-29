import type { ReactNode } from "react";
import PresentDeck01To6 from "@/components/present/PresentDeck01To6";
import PresentFindings from "@/components/present/PresentFindings";
import PresentLogoDesign from "@/components/present/PresentLogoDesign";
import PresentProductShowcase from "@/components/present/PresentProductShowcase";
import PresentSlide from "@/components/present/PresentSlide";

export default function PresentPage() {
  return (
    <div className="dash-page present-page present-page--deck">
      <div className="present-deck">
        <PresentDeck01To6 />

        <PresentSlide id="present-07" flow>
          <Section>
            <div className="dash-section-label">07 / Product showcase</div>
            <PresentProductShowcase />
          </Section>
        </PresentSlide>

        <PresentSlide id="present-08" flow>
          <Section>
            <div className="dash-section-label" id="logo-design">
              08 / Logo design
            </div>
            <PresentLogoDesign />
          </Section>
        </PresentSlide>

        <PresentSlide id="present-09" flow>
          <Section>
            <div className="dash-section-label">09 / Findings</div>
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
