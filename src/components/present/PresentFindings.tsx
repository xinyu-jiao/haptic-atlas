/** §09 — Findings: structured layout (steps + cards) for the closing slide. */
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
              The project shows that touch-based navigation is not only a hardware problem. It is also a training and data
              problem. Each session can produce useful records: route traces, timing, corrections, help requests, and notes
              about how the user responded to haptic cues.
            </p>
            <ul className="present-findings__chips" aria-label="Examples of session records">
              <li>Route traces</li>
              <li>Timing</li>
              <li>Corrections</li>
              <li>Help requests</li>
              <li>Notes on cues</li>
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
              In the current system, this data helps make the non-visual experience visible and reviewable. In a future
              version, these session records could also be used to train AI models. The model could learn from repeated
              navigation sessions and gradually predict what kind of haptic cue should be sent to the belt in different
              spatial situations.
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
              The longer-term direction is to reduce dependence on a human guide. Instead of someone manually sending every
              cue, the belt could connect with sensing systems, such as a camera or location input, and use an AI model to
              generate haptic feedback more independently. This is not a finished claim yet, but an open direction: using
              training data to move from guided practice toward more independent use of the wearable belt.
            </p>
          </article>
        </li>
      </ol>
    </div>
  );
}
