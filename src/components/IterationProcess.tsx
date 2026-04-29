const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const ITERATIONS: {
  version: string;
  label: string;
  date: string;
  images?: string[];
  /** Short, one-screen copy for the Present scrolly */
  summary: string;
}[] = [
  {
    version: "01",
    label: "Early Hardware Demo",
    date: "January 2026",
    images: ["/images/early-hardware-leonardo-breadboard.png", "/images/early-hardware-drv2605-motor.png"],
    summary: "Single-motor proof on a belt, Arduino, five-meter straight run.",
  },
  {
    version: "02",
    label: "Circuit + Control Testing",
    date: "February 2026",
    images: ["/images/circuit-belt-honeycomb-motors.png", "/images/10.JPG"],
    summary: "Left/right separation, first BLE, belt position retuned for clearer haptics.",
  },
  {
    version: "03",
    label: "Wearable Scenario Exploration",
    date: "March 2026",
    images: ["/images/wearable-scenario-belt-back.png", "/images/7.png", "/images/8.png"],
    summary: "Handheld Guide, indoor and outdoor; motor map and patterns iterated.",
  },
  {
    version: "04",
    label: "Guide controller: two control surfaces",
    date: "April 2026",
    images: ["/images/s1.jpg", "/images/s2.jpg"],
    summary: "Pad for live cues; browser touch drives motors with the active cell on screen.",
  },
  {
    version: "05",
    label: "Assembled Hardware Prototype",
    date: "April 2026",
    images: ["/images/iter06-internal-lattice.png", "/images/iter06-wearable-overview.png"],
    summary: "3D-printed parts fitted and assembled, checked for hand fit, ready to document.",
  },
];

type Props = {
  /** Anchor id for in-page / nav deep links */
  anchorId?: string;
};

/**
 * Present §07: each iteration is one horizontal snap page.
 * Intro line sits on the Present page above this block.
 */
export default function IterationProcess({ anchorId = "iteration-process" }: Props) {
  return (
    <div id={anchorId} className="iteration-process" style={{ scrollMarginTop: "5rem" }}>
      <div
        className="iteration-process__scroller"
        tabIndex={0}
        role="region"
        aria-label="Development stages — scroll horizontally to advance"
      >
        {ITERATIONS.map((iter) => (
          <section
            key={iter.version}
            className="iteration-process__panel"
            aria-label={`${iter.label}, ${iter.date}`}
          >
            <div className="dash-card iteration-process__card">
              <header className="iteration-process__header">
                <div className="iteration-process__title-row">
                  <span className="iteration-process__ver">{iter.version}</span>
                  <h2 className="iteration-process__label">{iter.label}</h2>
                </div>
                <time className="iteration-process__date" dateTime={iter.date}>
                  {iter.date}
                </time>
              </header>
              <p className="iteration-process__summary">{iter.summary}</p>
              {iter.images && iter.images.length > 0 && (
                <div
                  className={
                    "iteration-process__images" +
                    (iter.version === "03" && iter.images.length === 3
                      ? " iteration-process__images--wearable03"
                      : "") +
                    (iter.version === "01" || iter.version === "05" ? " iteration-process__images--squarePair" : "")
                  }
                >
                  {iter.version === "03" && iter.images.length === 3 ? (
                    <>
                      <div className="iteration-process__image-frame">
                        <img src={`${BASE}${iter.images[0]}`} alt="" />
                      </div>
                      <div className="iteration-process__image-frame iteration-process__image-frame--stack">
                        <div className="iteration-process__image-stack-cell">
                          <img src={`${BASE}${iter.images[1]}`} alt="" />
                        </div>
                        <div className="iteration-process__image-stack-cell">
                          <img src={`${BASE}${iter.images[2]}`} alt="" />
                        </div>
                      </div>
                    </>
                  ) : (
                    iter.images.map((src) => (
                      <div
                        key={src}
                        className={
                          "iteration-process__image-frame" +
                          (iter.version === "01" || iter.version === "05" ? " iteration-process__image-frame--square" : "")
                        }
                      >
                        <img src={`${BASE}${src}`} alt="" />
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
