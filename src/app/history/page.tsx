"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadSessions, groupSessionsByDate, formatDuration } from "@/lib/session-storage";
import type { SessionResult } from "@/lib/types";
import { LEVELS } from "@/lib/types";

export default function HistoryPage() {
  const [groups, setGroups] = useState<Record<string, SessionResult[]>>({});
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    const sessions = loadSessions();
    if (sessions.length === 0) {
      setEmpty(true);
      return;
    }
    setGroups(groupSessionsByDate(sessions));
  }, []);

  return (
    <div className="dash-page">
      <div className="dash-container">
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "2.5rem" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <button className="dash-btn" style={{ padding: "0.5rem 0.75rem", fontSize: "0.85rem" }}>
              ‹
            </button>
          </Link>
          <h1 className="dash-title" style={{ marginBottom: 0 }}>Session History</h1>
        </div>

        {empty ? (
          <div className="dash-card" style={{ padding: "3rem 2rem", textAlign: "center" }}>
            <div style={{ fontSize: "0.9rem", color: "var(--dash-text-muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              No sessions yet.
              <br />
              <span style={{ fontSize: "0.8rem" }}>Complete a session to see it here.</span>
            </div>
            <Link href="/session/level" style={{ textDecoration: "none" }}>
              <button className="dash-btn-primary dash-btn">
                Start First Session
              </button>
            </Link>
          </div>
        ) : (
          Object.entries(groups).map(([date, sessions]) => (
            <div key={date} style={{ marginBottom: "2rem" }}>
              <div className="dash-section-label" style={{ marginBottom: "1rem" }}>
                {date}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--dash-border)" }}>
                {sessions.map((s) => (
                  <SessionRow key={s.id} session={s} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function SessionRow({ session }: { session: SessionResult }) {
  const levelInfo = LEVELS.find((l) => l.id === session.level);

  return (
    <div
      style={{
        background: "var(--dash-bg)",
        padding: "1rem 1.25rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          border: "1px solid var(--dash-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.8rem",
          flexShrink: 0,
          color: "#fff",
        }}
      >
        {session.level === "straight" ? "→" : session.level === "corner" ? "↱" : "∨"}
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#fff", marginBottom: "0.2rem" }}>
          {levelInfo?.name ?? session.level.toUpperCase()}
        </div>
        <div style={{ fontSize: "0.75rem", color: "var(--dash-text-muted)" }}>
          {formatDuration(session.duration)} · {session.consistency}% consistency
        </div>
      </div>

      <div className="dash-badge">
        {session.role}
      </div>
    </div>
  );
}
