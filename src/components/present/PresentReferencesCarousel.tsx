import type { ReactNode } from "react";
import { assetUrl } from "@/lib/assetUrl";

/** Flavin et al., Nature (2024) — same source as §03 copy. */
const NATURE_BIOELASTIC_HAPTIC_ARTICLE_URL =
  "https://www.nature.com/articles/s41586-024-08155-9";

type Slide = {
  key: string;
  src: string;
  alt: string;
  caption: ReactNode;
};

const SLIDES: Slide[] = [
  {
    key: "bioelastic",
    src: "/images/bioelastic-haptic-related-work.png",
    alt:
      "Nature (2024) Fig. 1, panels a–g: skin mechanoreceptors; indentation, shear, and vibrotactile interaction; bioelastic electromagnetic actuator; hexagonal array on skin; device with Bluetooth and battery; system diagram; application scenario.",
    caption: (
      <>
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
            color: "var(--dash-text-secondary)",
            fontWeight: 500,
            textDecoration: "underline",
            textDecorationColor: "rgba(255,255,255,0.25)",
            textUnderlineOffset: "0.2em",
            marginBottom: "0.5rem",
          }}
        >
          Bioelastic state recovery for haptic sensory substitution
        </a>
        <div style={{ marginTop: "0.55rem", fontWeight: 400 }}>
          Fig. 1 — Full figure from the paper (panels a–g): from skin mechanoreceptors and actuator mechanics to a
          wearable array, Bluetooth link, and example use. Shown for related-work context; this project uses a
          lower-fidelity belt prototype.
        </div>
      </>
    ),
  },
  {
    key: "waist-anatomy",
    src: "/images/references-waist-anatomy-wearable.png",
    alt:
      "Anatomical survey of body sites for wearables: MRI cross-sections and waist emphasis for belt-based tactile devices and navigation.",
    caption: (
      <span>
        Related context: body sites and waist region for belt-style tactile wearables and spatial navigation cues.
      </span>
    ),
  },
  {
    key: "origami-actuator",
    src: "/images/references-origami-actuator-figure.png",
    alt:
      "Composite figure on origami-inspired unit cells, folded states, assembly, materials (PU film, PET), and fabricated lattice prototypes with scale bars.",
    caption: (
      <span>
        Related fabrication and geometry: origami-inspired unit cells, folding patterns, and small-scale lattice
        prototypes (context for structured, conformable tactile hardware).
      </span>
    ),
  },
  {
    key: "e-stim-survey",
    src: "/images/references-electrical-stimulation-survey.png",
    alt:
      "Survey figure: electrical stimulation haptic feedback in HCI — fingertip and wrist wearables, electrode arrays, fabrication steps, and example devices (panels a–k).",
    caption: (
      <span>
        Survey overview: electrical stimulation for haptic feedback in HCI (arXiv:2504.21477v2, May 2025) — diverse
        wearable form factors and stimulation interfaces for context.
      </span>
    ),
  },
];

/** §03 — full-width reference figures in a horizontal snap strip (one large image per view). */
export default function PresentReferencesCarousel() {
  return (
    <div className="present-ref-carousel">
      <p className="present-ref-carousel__hint dash-body">
        Scroll or swipe horizontally — each slide is a full-size figure.
      </p>
      <div
        className="present-ref-carousel__scroller"
        tabIndex={0}
        role="region"
        aria-label="Reference figures carousel"
      >
        {SLIDES.map((slide) => (
          <figure key={slide.key} className="present-ref-carousel__slide">
            <div className="present-ref-carousel__imgWrap">
              <img src={assetUrl(slide.src)} alt={slide.alt} loading="lazy" decoding="async" />
            </div>
            <figcaption className="present-ref-carousel__caption dash-body">{slide.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
