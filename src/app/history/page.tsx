"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadSessions, groupSessionsByDate, formatDuration } from "@/lib/session-storage";
import { loadSessionsFromCloud } from "@/lib/firestore-sessions";
import type { SessionResult } from "@/lib/types";
import { LEVELS } from "@/lib/types";

export default function HistoryPage() {
  const [groups, setGroups] = useState<Record<string, SessionResult[]>>({});
  const [empty, setEmpty] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSessionsFromCloud()
      .then((sessions) => {
        if (sessions.length > 0) {
          setGroups(groupSessionsByDate(sessions));
        } else {
          const local = loadSessions();
          if (local.length > 0) {
            setGroups(groupSessionsByDate(local));
          } else {
            setEmpty(true);
          }
        }
      })
      .catch(() => {
        const local = loadSessions();
        if (local.length > 0) {
          setGroups(groupSessionsByDate(local));
        } else {
          setEmpty(true);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="dash-page">
      <div className="dash-container">
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "2.5rem" }}>
          <Link href="/about" style={{ textDecoration: "none" }}>
            <button className="dash-btn" style={{ padding: "0.5rem 0.75rem", fontSize: "0.85rem" }}>
              ‹
            </button>
          </Link>
          <h1 className="dash-title" style={{ marginBottom: 0 }}>Session History</h1>
        </div>

        <div className="dash-card" style={{ marginBottom: "2rem", padding: "1.25rem 1.5rem" }}>
          <div className="dash-section-label" style={{ marginBottom: "0.75rem" }}>Training flow</div>
          <p className="dash-body" style={{ marginBottom: "0.75rem", lineHeight: 1.8 }}>
            Each run follows the same staged path: <strong style={{ color: "#fff", fontWeight: 600 }}>Level</strong>{" "}
            (route difficulty) → <strong style={{ color: "#fff", fontWeight: 600 }}>Role</strong> (Guide or Seeker) →{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>Setup</strong> (environment, distance, intensity) →{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>Active session</strong> (timer, cues, logging) →{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>Result</strong> (summary and badges). History below
            groups completed runs by date; it is the archive side of the same flow started from Interface (
            <code style={{ fontSize: "0.82em", color: "var(--dash-text-secondary)" }}>/interface</code>
            ).
          </p>
          <Link
            href="/interface"
            style={{
              fontSize: "0.78rem",
              color: "var(--dash-text-secondary)",
              textDecoration: "none",
              borderBottom: "1px solid var(--dash-border)",
              paddingBottom: "0.1rem",
            }}
          >
            Open Interface to start →
          </Link>
        </div>

        {loading ? (
          <div className="dash-card" style={{ padding: "3rem 2rem", textAlign: "center" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--dash-text-muted)" }}>Loading sessions…</span>
          </div>
        ) : empty ? (
          <div className="dash-card" style={{ padding: "3rem 2rem", textAlign: "center" }}>
            <div style={{ fontSize: "0.9rem", color: "var(--dash-text-muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              No sessions yet.
              <br />
              <span style={{ fontSize: "0.8rem" }}>Complete a session to see it here.</span>
            </div>
            <Link href="/interface" style={{ textDecoration: "none" }}>
              <button className="dash-btn-primary dash-btn">
                Open Interface
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
