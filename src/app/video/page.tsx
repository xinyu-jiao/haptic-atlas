import Link from "next/link";
import ProjectVideoBlock from "@/components/ProjectVideoBlock";

export default function VideoPage() {
  return (
    <div className="dash-page">
      <div className="dash-container">
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "2rem" }}>
          <Link href="/about" style={{ textDecoration: "none" }}>
            <button type="button" className="dash-btn" style={{ padding: "0.5rem 0.75rem", fontSize: "0.85rem" }}>
              ‹
            </button>
          </Link>
          <div>
            <h1 className="dash-title" style={{ marginBottom: "0.25rem" }}>
              Demo video
            </h1>
            <div className="dash-subtitle">Between Interface and Sessions · Data</div>
          </div>
        </div>

        <div className="dash-card" style={{ marginBottom: "1.75rem", padding: "1.25rem 1.5rem" }}>
          <p className="dash-body" style={{ margin: 0, lineHeight: 1.8 }}>
            A short walkthrough so you can see the setup and flow before starting a session. The player below
            loads a single MP4 from{" "}
            <code style={{ fontSize: "0.82em", color: "var(--dash-text-secondary)" }}>public/videos/interface.mp4</code>
            — add or replace that file in the project to change what plays here.
          </p>
        </div>

        <ProjectVideoBlock />
      </div>
    </div>
  );
}
