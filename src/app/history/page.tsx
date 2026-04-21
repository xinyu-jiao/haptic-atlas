"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { loadSessions, groupSessionsByDate, formatDuration } from "@/lib/session-storage";
import { loadSessionsFromCloud } from "@/lib/firestore-sessions";
import type { SessionResult } from "@/lib/types";
import { LEVELS } from "@/lib/types";

const SAMPLE_DATA: SessionResult[] = [
  { id: "s1", date: "Mar 20", timestamp: Date.now() - 6 * 86400000, level: "straight", levelName: "STRAIGHT LINE", role: "seeker", environment: "indoor", duration: 83, corrections: 4, helpCount: 0, consistency: 91, responseTime: 0.6, badges: ["SMOOTH NAV", "FAST FINDER", "STEADY STEPS"] },
  { id: "s2", date: "Mar 21", timestamp: Date.now() - 5 * 86400000, level: "corner", levelName: "CORNER TURN", role: "guide", environment: "indoor", duration: 154, corrections: 12, helpCount: 2, consistency: 78, responseTime: 0.9, badges: [] },
  { id: "s3", date: "Mar 22", timestamp: Date.now() - 4 * 86400000, level: "straight", levelName: "STRAIGHT LINE", role: "seeker", environment: "outdoor", duration: 71, corrections: 3, helpCount: 0, consistency: 94, responseTime: 0.5, badges: ["SMOOTH NAV", "FAST FINDER", "STEADY STEPS", "CLEAN RUN"] },
  { id: "s4", date: "Mar 23", timestamp: Date.now() - 3 * 86400000, level: "obstacle", levelName: "SAFE OBSTACLE", role: "seeker", environment: "outdoor", duration: 253, corrections: 18, helpCount: 3, consistency: 69, responseTime: 1.1, badges: [] },
  { id: "s5", date: "Mar 24", timestamp: Date.now() - 2 * 86400000, level: "corner", levelName: "CORNER TURN", role: "seeker", environment: "indoor", duration: 138, corrections: 8, helpCount: 1, consistency: 85, responseTime: 0.8, badges: ["STEADY STEPS"] },
  { id: "s6", date: "Mar 25", timestamp: Date.now() - 1 * 86400000, level: "straight", levelName: "STRAIGHT LINE", role: "seeker", environment: "indoor", duration: 62, corrections: 2, helpCount: 0, consistency: 96, responseTime: 0.4, badges: ["SMOOTH NAV", "FAST FINDER", "STEADY STEPS", "CLEAN RUN"] },
];

export default function SessionsAndDataPage() {
  const [groups, setGroups] = useState<Record<string, SessionResult[]>>({});
  const [listEmpty, setListEmpty] = useState(false);
  const [chartSessions, setChartSessions] = useState<SessionResult[]>([]);
  const [chartsAreSample, setChartsAreSample] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const applyReal = (sessions: SessionResult[]) => {
      setGroups(groupSessionsByDate(sessions));
      setChartSessions(sessions);
      setChartsAreSample(false);
      setListEmpty(false);
    };

    loadSessionsFromCloud()
      .then((sessions) => {
        if (sessions.length > 0) {
          applyReal(sessions);
        } else {
          const local = loadSessions();
          if (local.length > 0) {
            applyReal(local);
          } else {
            setGroups({});
            setListEmpty(true);
            setChartSessions(SAMPLE_DATA);
            setChartsAreSample(true);
          }
        }
      })
      .catch(() => {
        const local = loadSessions();
        if (local.length > 0) {
          applyReal(local);
        } else {
          setGroups({});
          setListEmpty(true);
          setChartSessions(SAMPLE_DATA);
          setChartsAreSample(true);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const chartData = chartSessions
    .slice()
    .reverse()
    .map((s, i) => ({
      name: `S${i + 1}`,
      time: s.duration,
      corrections: s.corrections,
      help: s.helpCount,
      consistency: s.consistency,
      level: s.levelName,
    }));

  const avgConsistency = chartSessions.length
    ? Math.round(chartSessions.reduce((a, s) => a + s.consistency, 0) / chartSessions.length)
    : 0;
  const totalChartSessions = chartSessions.length;
  const bestTime = chartSessions.length ? Math.min(...chartSessions.map((s) => s.duration)) : 0;
  const totalBadges = chartSessions.reduce((a, s) => a + s.badges.length, 0);

  const chartFont = { fontFamily: '"Inter", system-ui, sans-serif', fontSize: 10, fill: "#555" };
  const tooltipStyle = {
    background: "#111",
    border: "1px solid #222",
    fontFamily: '"Inter", system-ui, sans-serif',
    fontSize: 11,
    color: "#fff",
  };

  return (
    <div className="dash-page">
      <div className="dash-container">
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "2.5rem" }}>
          <Link href="/about" style={{ textDecoration: "none" }}>
            <button type="button" className="dash-btn" style={{ padding: "0.5rem 0.75rem", fontSize: "0.85rem" }}>
              ‹
            </button>
          </Link>
          <div>
            <h1 className="dash-title" style={{ marginBottom: "0.25rem" }}>
              Sessions &amp; Data
            </h1>
            <div className="dash-subtitle">History and evidence charts</div>
          </div>
        </div>

        <div className="dash-card" style={{ marginBottom: "2rem", padding: "1.25rem 1.5rem" }}>
          <div className="dash-section-label" style={{ marginBottom: "0.75rem" }}>
            Training flow
          </div>
          <p className="dash-body" style={{ marginBottom: "0.75rem", lineHeight: 1.8 }}>
            Each run follows the same staged path: <strong style={{ color: "#fff", fontWeight: 600 }}>Level</strong>{" "}
            (route difficulty) → <strong style={{ color: "#fff", fontWeight: 600 }}>Role</strong> (Guide or Seeker) →{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>Setup</strong> (environment, distance, intensity) →{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>Active session</strong> (timer, cues, logging) →{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>Result</strong> (summary and badges). Below: grouped
            history, then charts as an <strong style={{ color: "#fff", fontWeight: 600 }}>evidence layer</strong> over
            the same runs (or sample series when none exist yet). Flow starts from Interface (
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

        <div className="dash-label" style={{ marginBottom: "1rem" }}>
          Session history
        </div>

        {loading ? (
          <div className="dash-card" style={{ padding: "3rem 2rem", textAlign: "center", marginBottom: "2.5rem" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--dash-text-muted)" }}>Loading sessions…</span>
          </div>
        ) : listEmpty ? (
          <div className="dash-card" style={{ padding: "3rem 2rem", textAlign: "center", marginBottom: "2.5rem" }}>
            <div style={{ fontSize: "0.9rem", color: "var(--dash-text-muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              No sessions yet.
              <br />
              <span style={{ fontSize: "0.8rem" }}>Complete a session to see it here. Charts below use sample data until then.</span>
            </div>
            <Link href="/interface" style={{ textDecoration: "none" }}>
              <button type="button" className="dash-btn-primary dash-btn">
                Open Interface
              </button>
            </Link>
          </div>
        ) : (
          <div style={{ marginBottom: "2.5rem" }}>
            {Object.entries(groups).map(([date, sessions]) => (
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
            ))}
          </div>
        )}

        <div className="dash-divider" style={{ margin: "2rem 0" }} />

        <div className="dash-label" style={{ marginBottom: "1rem" }}>
          Metrics &amp; charts
        </div>

        {!loading && chartsAreSample && (
          <div className="dash-card" style={{ marginBottom: "1.5rem", padding: "1rem 1.5rem" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--dash-text-muted)" }}>
              Showing sample data — complete sessions to see your metrics.
            </span>
          </div>
        )}

        {!loading && (
          <>
            <div className="dash-card" style={{ marginBottom: "1.5rem", padding: "1.25rem 1.5rem" }}>
              <p className="dash-body" style={{ margin: 0, lineHeight: 1.8 }}>
                Duration, consistency, corrections, and help requests across the session series shown in the charts
                (aligned with the list above when you have real runs).
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "1px",
                marginBottom: "2.5rem",
                background: "var(--dash-border)",
              }}
            >
              {[
                { label: "SESSIONS", value: totalChartSessions },
                { label: "AVG CONSISTENCY", value: `${avgConsistency}%` },
                { label: "BEST TIME", value: formatDuration(bestTime) },
                { label: "BADGES", value: totalBadges },
              ].map(({ label, value }) => (
                <div key={label} className="dash-stat-card" style={{ background: "var(--dash-bg)" }}>
                  <div className="label">{label}</div>
                  <div className="value">{value}</div>
                </div>
              ))}
            </div>

            <ChartBlock title="Consistency Over Time">
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                  <XAxis dataKey="name" tick={chartFont} axisLine={{ stroke: "#222" }} tickLine={{ stroke: "#222" }} />
                  <YAxis domain={[0, 100]} tick={chartFont} axisLine={{ stroke: "#222" }} tickLine={{ stroke: "#222" }} />
                  <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "#888" }} />
                  <Line
                    type="monotone"
                    dataKey="consistency"
                    stroke="#fff"
                    strokeWidth={1.5}
                    dot={{ fill: "#fff", r: 3, stroke: "#fff" }}
                    name="Consistency %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartBlock>

            <ChartBlock title="Session Duration (s)">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                  <XAxis dataKey="name" tick={chartFont} axisLine={{ stroke: "#222" }} tickLine={{ stroke: "#222" }} />
                  <YAxis tick={chartFont} axisLine={{ stroke: "#222" }} tickLine={{ stroke: "#222" }} />
                  <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "#888" }} />
                  <Bar dataKey="time" fill="#444" name="Duration (s)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartBlock>

            <ChartBlock title="Corrections vs Help Requests">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                  <XAxis dataKey="name" tick={chartFont} axisLine={{ stroke: "#222" }} tickLine={{ stroke: "#222" }} />
                  <YAxis tick={chartFont} axisLine={{ stroke: "#222" }} tickLine={{ stroke: "#222" }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontFamily: '"Inter", system-ui, sans-serif', fontSize: 11, color: "#888" }} />
                  <Bar dataKey="corrections" fill="#666" name="Corrections" />
                  <Bar dataKey="help" fill="#333" name="Help Requests" />
                </BarChart>
              </ResponsiveContainer>
            </ChartBlock>
          </>
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

      <div className="dash-badge">{session.role}</div>
    </div>
  );
}

function ChartBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="dash-card" style={{ marginBottom: "1.5rem" }}>
      <div
        style={{
          fontSize: "0.75rem",
          fontWeight: 500,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--dash-text-muted)",
          marginBottom: "1.25rem",
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}
