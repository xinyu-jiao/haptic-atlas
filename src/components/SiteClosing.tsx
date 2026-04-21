/**
 * Closing reflection at the end of the Map page (after Code / repositories).
 * Not labeled as “conclusion” in the UI — reads as a brief vertical-slice takeaway.
 */
export default function SiteClosing() {
  return (
    <section
      className="dash-card"
      style={{
        marginTop: "2.5rem",
        padding: "1.5rem 1.75rem",
        borderStyle: "solid",
        borderColor: "var(--dash-border)",
      }}
    >
      <div
        style={{
          fontSize: "0.68rem",
          fontWeight: 500,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--dash-text-muted)",
          marginBottom: "1rem",
        }}
      >
        Where this slice lands
      </div>
      <p className="dash-body" style={{ marginBottom: "1rem", lineHeight: 1.85 }}>
        Haptic Atlas is offered as a <strong style={{ color: "#fff", fontWeight: 600 }}>vertical slice</strong>
        — a thin but end-to-end cut through hardware, protocol-level interaction, and a web layer for
        documentation, training, traces, and provisional metrics. It demonstrates how a wearable
        directional channel and a browser-based stack can be held together long enough to run
        structured sessions and retain evidence, without claiming a closed product.
      </p>
      <p className="dash-body" style={{ marginBottom: "1rem", lineHeight: 1.85 }}>
        What it <strong style={{ color: "#fff", fontWeight: 600 }}>does</strong> show: a repeatable session
        path; spatial logging of walks; charts as an argument for performance over time; live sharing and
        voice/long-press affordances as experiments in access; and a Web Serial touch pad aligned with
        belt firmware for bench testing.
      </p>
      <p className="dash-body" style={{ margin: 0, lineHeight: 1.85, color: "var(--dash-text-secondary)" }}>
        What remains <strong style={{ color: "#fff", fontWeight: 600 }}>open</strong>: long-duration wear and
        comfort; rigorous outdoor GNSS behavior; multi-user and consent-rich data practices; tighter
        coupling between web state and physical hardware in the field; and how far a research prototype
        can stretch before it needs a different audience than this one.
      </p>
    </section>
  );
}
