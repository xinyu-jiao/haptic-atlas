/** §09 — Findings: closing slide (compact). */
export default function PresentFindings() {
  return (
    <div className="present-findings">
      <ol className="present-findings__track" aria-label="Findings and open directions">
        <li className="present-findings__item">
          <span className="present-findings__step" aria-hidden>
            01
          </span>
          <article className="present-findings__card">
            <div className="dash-label present-findings__cardTitle">Findings</div>
            <p className="dash-body present-findings__body">
              Touch navigation is as much about training and session data as hardware. Each run can log routes, timing,
              corrections, and how people respond to cues—making the non-visual path reviewable.
            </p>
            <ul className="present-findings__chips" aria-label="Examples of session records">
              <li>Routes & timing</li>
              <li>Corrections</li>
              <li>Cue response</li>
            </ul>
          </article>
        </li>
        <li className="present-findings__item">
          <span className="present-findings__step" aria-hidden>
            02
          </span>
          <article className="present-findings__card">
            <div className="dash-label present-findings__cardTitle">From records to models</div>
            <p className="dash-body present-findings__body">
              Those records already support review. Next, the same data can train <strong>AI models</strong>—learning from
              repeated sessions to predict which belt cues fit different spatial situations.
            </p>
          </article>
        </li>
        <li className="present-findings__item present-findings__item--open">
          <span className="present-findings__step" aria-hidden>
            03
          </span>
          <article className="present-findings__card present-findings__card--open">
            <div className="dash-label present-findings__cardTitle">Open direction</div>
            <p className="dash-body present-findings__body">
              Longer term: less reliance on a human guide—pair the belt with sensing (vision, location, …) and let an{" "}
              <strong>AI model</strong> map context to haptic output for more independent wear. A direction, not a finished
              claim.
            </p>
          </article>
        </li>
      </ol>
    </div>
  );
}
