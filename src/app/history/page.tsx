"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadSessions, groupSessionsByDate, formatDuration } from "@/lib/session-storage";
import type { SessionResult } from "@/lib/types";
import { LEVELS } from "@/lib/types";

const LEVEL_ICONS: Record<string, string> = {
  straight: "→",
  corner: "↱",
  obstacle: "∨",
};

const LEVEL_COLORS: Record<string, string> = {
  straight: "#7B52CC",
  corner: "#CC44A8",
  obstacle: "#A03880",
};

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
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "2rem 1.25rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <button
            style={{
              background: "var(--dark2)", color: "white",
              border: "2px solid var(--dark)", fontFamily: '"Press Start 2P"',
              fontSize: "0.6rem", padding: "0.4rem 0.6rem",
              cursor: "pointer", boxShadow: "2px 2px 0 var(--dark)",
            }}
          >
            ‹
          </button>
        </Link>
        <div style={{ fontFamily: '"Press Start 2P"', fontSize: "1rem" }}>HISTORY</div>
      </div>

      {empty ? (
        <div className="pixel-card" style={{ padding: "2rem", textAlign: "center" }}>
          <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.55rem", color: "rgba(255,255,255,0.5)", lineHeight: 2 }}>
            NO SESSIONS YET<br />
            <span style={{ fontSize: "0.45rem" }}>COMPLETE A SESSION TO SEE IT HERE</span>
          </div>
          <Link href="/session/level" style={{ textDecoration: "none", display: "block", marginTop: "1.5rem" }}>
            <button
              className="pixel-btn"
              style={{ background: "var(--pink)", color: "white", fontSize: "0.6rem" }}
            >
              · START FIRST SESSION
            </button>
          </Link>
        </div>
      ) : (
        Object.entries(groups).map(([date, sessions]) => (
          <div key={date} style={{ marginBottom: "1.5rem" }}>
            <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.5rem", marginBottom: "0.75rem", opacity: 0.6 }}>
              {date}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {sessions.map((s) => (
                <SessionRow key={s.id} session={s} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function SessionRow({ session }: { session: SessionResult }) {
  const icon = LEVEL_ICONS[session.level] ?? "?";
  const color = LEVEL_COLORS[session.level] ?? "#555";
  const levelInfo = LEVELS.find((l) => l.id === session.level);

  return (
    <div
      className="pixel-card"
      style={{
        padding: "0.75rem 1rem",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 38, height: 38,
          background: color,
          border: "2px solid var(--dark)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.1rem", flexShrink: 0,
          color: "white",
        }}
      >
        {icon}
      </div>

      {/* Info */}
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.6rem", color: "white", marginBottom: "0.3rem" }}>
          {levelInfo?.name ?? session.level.toUpperCase()}
        </div>
        <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.4rem", color: "rgba(255,255,255,0.5)" }}>
          {formatDuration(session.duration)} · {session.consistency}%
        </div>
      </div>

      {/* Role badge */}
      <div style={{
        fontFamily: '"Press Start 2P"', fontSize: "0.38rem",
        color: "rgba(255,255,255,0.4)",
        textTransform: "uppercase",
      }}>
        {session.role}
      </div>

      <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" }}>›</div>
    </div>
  );
}
