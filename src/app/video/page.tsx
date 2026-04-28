import Link from "next/link";
import ProjectVideoBlock from "@/components/ProjectVideoBlock";

export default function VideoPage() {
  return (
    <div className="dash-page">
      <div className="dash-container">
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "2rem" }}>
          <Link href="/present" style={{ textDecoration: "none" }}>
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

        <ProjectVideoBlock />
      </div>
    </div>
  );
}
