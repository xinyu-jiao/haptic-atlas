"use client";

import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend,
} from "recharts";
import { loadSessions, formatDuration } from "@/lib/session-storage";
import { loadSessionsFromCloud } from "@/lib/firestore-sessions";
import type { SessionResult } from "@/lib/types";

const SAMPLE_DATA: SessionResult[] = [
  { id: "s1", date: "Mar 20", timestamp: Date.now() - 6*86400000, level: "straight", levelName: "STRAIGHT LINE", role: "seeker", environment: "indoor", duration: 83, corrections: 4, helpCount: 0, consistency: 91, responseTime: 0.6, badges: ["SMOOTH NAV","FAST FINDER","STEADY STEPS"] },
  { id: "s2", date: "Mar 21", timestamp: Date.now() - 5*86400000, level: "corner", levelName: "CORNER TURN", role: "guide", environment: "indoor", duration: 154, corrections: 12, helpCount: 2, consistency: 78, responseTime: 0.9, badges: [] },
  { id: "s3", date: "Mar 22", timestamp: Date.now() - 4*86400000, level: "straight", levelName: "STRAIGHT LINE", role: "seeker", environment: "outdoor", duration: 71, corrections: 3, helpCount: 0, consistency: 94, responseTime: 0.5, badges: ["SMOOTH NAV","FAST FINDER","STEADY STEPS","CLEAN RUN"] },
  { id: "s4", date: "Mar 23", timestamp: Date.now() - 3*86400000, level: "obstacle", levelName: "SAFE OBSTACLE", role: "seeker", environment: "outdoor", duration: 253, corrections: 18, helpCount: 3, consistency: 69, responseTime: 1.1, badges: [] },
  { id: "s5", date: "Mar 24", timestamp: Date.now() - 2*86400000, level: "corner", levelName: "CORNER TURN", role: "seeker", environment: "indoor", duration: 138, corrections: 8, helpCount: 1, consistency: 85, responseTime: 0.8, badges: ["STEADY STEPS"] },
  { id: "s6", date: "Mar 25", timestamp: Date.now() - 1*86400000, level: "straight", levelName: "STRAIGHT LINE", role: "seeker", environment: "indoor", duration: 62, corrections: 2, helpCount: 0, consistency: 96, responseTime: 0.4, badges: ["SMOOTH NAV","FAST FINDER","STEADY STEPS","CLEAN RUN"] },
];

export default function DataPage() {
  const [sessions, setSessions] = useState<SessionResult[]>([]);
  const [isSample, setIsSample] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSessionsFromCloud()
      .then((cloud) => {
        if (cloud.length > 0) {
          setSessions(cloud);
        } else {
          const local = loadSessions();
          if (local.length > 0) {
            setSessions(local);
          } else {
            setSessions(SAMPLE_DATA);
            setIsSample(true);
          }
        }
      })
      .catch(() => {
        const local = loadSessions();
        if (local.length > 0) {
          setSessions(local);
        } else {
          setSessions(SAMPLE_DATA);
          setIsSample(true);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const chartData = sessions.slice().reverse().map((s, i) => ({
    name: `S${i + 1}`,
    time: s.duration,
    corrections: s.corrections,
    help: s.helpCount,
    consistency: s.consistency,
    level: s.levelName,
  }));

  const avgConsistency = sessions.length
    ? Math.round(sessions.reduce((a, s) => a + s.consistency, 0) / sessions.length)
    : 0;
  const totalSessions = sessions.length;
  const bestTime = sessions.length
    ? Math.min(...sessions.map((s) => s.duration))
    : 0;
  const totalBadges = sessions.reduce((a, s) => a + s.badges.length, 0);

  const chartFont = { fontFamily: '"Inter", system-ui, sans-serif', fontSize: 10, fill: "#555" };
  const tooltipStyle = { background: "#111", border: "1px solid #222", fontFamily: '"Inter", system-ui, sans-serif', fontSize: 11, color: "#fff" };

  return (
    <div className="dash-page">
      <div className="dash-container">
        <h1 className="dash-title">Data</h1>
        <div className="dash-subtitle">Training Visualization</div>

        {loading && (
          <div className="dash-card" style={{ padding: "3rem 2rem", textAlign: "center" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--dash-text-muted)" }}>Loading data…</span>
          </div>
        )}

        {!loading && isSample && (
          <div
            className="dash-card"
            style={{ marginBottom: "2rem", padding: "1rem 1.5rem" }}
          >
            <span style={{ fontSize: "0.8rem", color: "var(--dash-text-muted)" }}>
              Showing sample data — complete sessions to see your data.
            </span>
          </div>
        )}

        {/* Summary stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", marginBottom: "2.5rem", background: "var(--dash-border)" }}>
          {[
            { label: "SESSIONS", value: totalSessions },
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

        {/* Consistency over time */}
        <ChartBlock title="Consistency Over Time">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
              <XAxis dataKey="name" tick={chartFont} axisLine={{ stroke: "#222" }} tickLine={{ stroke: "#222" }} />
              <YAxis domain={[0, 100]} tick={chartFont} axisLine={{ stroke: "#222" }} tickLine={{ stroke: "#222" }} />
              <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "#888" }} />
              <Line type="monotone" dataKey="consistency" stroke="#fff" strokeWidth={1.5} dot={{ fill: "#fff", r: 3, stroke: "#fff" }} name="Consistency %" />
            </LineChart>
          </ResponsiveContainer>
        </ChartBlock>

        {/* Duration comparison */}
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

        {/* Corrections + Help */}
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
      </div>
    </div>
  );
}

function ChartBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="dash-card" style={{ marginBottom: "1.5rem" }}>
      <div style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--dash-text-muted)", marginBottom: "1.25rem" }}>
        {title}
      </div>
      {children}
    </div>
  );
}
