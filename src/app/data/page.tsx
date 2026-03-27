"use client";

import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend,
} from "recharts";
import { loadSessions, formatDuration } from "@/lib/session-storage";
import type { SessionResult } from "@/lib/types";

// Fallback sample data shown when no sessions exist
const SAMPLE_DATA: SessionResult[] = [
  { id: "s1", date: "Mar 20", timestamp: Date.now() - 6*86400000, level: "straight", levelName: "STRAIGHT LINE", role: "seeker", environment: "indoor", duration: 83, corrections: 4, helpCount: 0, consistency: 91, responseTime: 0.6, badges: ["SMOOTH NAV","FAST FINDER","STEADY STEPS"] },
  { id: "s2", date: "Mar 21", timestamp: Date.now() - 5*86400000, level: "corner", levelName: "CORNER TURN", role: "guide", environment: "indoor", duration: 154, corrections: 12, helpCount: 2, consistency: 78, responseTime: 0.9, badges: [] },
  { id: "s3", date: "Mar 22", timestamp: Date.now() - 4*86400000, level: "straight", levelName: "STRAIGHT LINE", role: "seeker", environment: "outdoor", duration: 71, corrections: 3, helpCount: 0, consistency: 94, responseTime: 0.5, badges: ["SMOOTH NAV","FAST FINDER","STEADY STEPS","CLEAN RUN"] },
  { id: "s4", date: "Mar 23", timestamp: Date.now() - 3*86400000, level: "obstacle", levelName: "SAFE OBSTACLE", role: "seeker", environment: "outdoor", duration: 253, corrections: 18, helpCount: 3, consistency: 69, responseTime: 1.1, badges: [] },
  { id: "s5", date: "Mar 24", timestamp: Date.now() - 2*86400000, level: "corner", levelName: "CORNER TURN", role: "seeker", environment: "indoor", duration: 138, corrections: 8, helpCount: 1, consistency: 85, responseTime: 0.8, badges: ["STEADY STEPS"] },
  { id: "s6", date: "Mar 25", timestamp: Date.now() - 1*86400000, level: "straight", levelName: "STRAIGHT LINE", role: "seeker", environment: "indoor", duration: 62, corrections: 2, helpCount: 0, consistency: 96, responseTime: 0.4, badges: ["SMOOTH NAV","FAST FINDER","STEADY STEPS","CLEAN RUN"] },
];

const PINK = "#E84DC0";
const PURPLE = "#7B52CC";
const BLUE = "#4A6AE8";

export default function DataPage() {
  const [sessions, setSessions] = useState<SessionResult[]>([]);
  const [isSample, setIsSample] = useState(false);

  useEffect(() => {
    const loaded = loadSessions();
    if (loaded.length > 0) {
      setSessions(loaded);
    } else {
      setSessions(SAMPLE_DATA);
      setIsSample(true);
    }
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

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1.25rem" }}>
      <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.9rem", marginBottom: "0.5rem" }}>
        DATA
      </div>
      <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.45rem", opacity: 0.6, marginBottom: "1.5rem" }}>
        TRAINING VISUALIZATION
      </div>

      {isSample && (
        <div
          className="pixel-card"
          style={{ padding: "0.6rem 1rem", marginBottom: "1.25rem", background: "var(--dark3)" }}
        >
          <span style={{ fontFamily: '"Press Start 2P"', fontSize: "0.4rem", color: "rgba(255,255,255,0.5)" }}>
            ○ SHOWING SAMPLE DATA — COMPLETE SESSIONS TO SEE YOUR DATA
          </span>
        </div>
      )}

      {/* Summary stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem", marginBottom: "1.5rem" }}>
        {[
          { label: "SESSIONS", value: totalSessions },
          { label: "AVG CONSIST", value: `${avgConsistency}%` },
          { label: "BEST TIME", value: formatDuration(bestTime) },
          { label: "BADGES", value: totalBadges },
        ].map(({ label, value }) => (
          <div key={label} className="pixel-card" style={{ padding: "0.75rem 0.5rem", textAlign: "center" }}>
            <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.35rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.4rem" }}>
              {label}
            </div>
            <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.8rem", color: "white" }}>
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* Consistency over time */}
      <ChartBlock title="CONSISTENCY OVER TIME">
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="2 2" stroke="#2A2A2A" />
            <XAxis dataKey="name" tick={{ fontFamily: '"Press Start 2P"', fontSize: 8, fill: "#888" }} />
            <YAxis domain={[0, 100]} tick={{ fontFamily: '"Press Start 2P"', fontSize: 8, fill: "#888" }} />
            <Tooltip
              contentStyle={{ background: "#1E1E1E", border: "2px solid #0F0F0F", fontFamily: '"Press Start 2P"', fontSize: 8 }}
              labelStyle={{ color: "#E84DC0" }}
            />
            <Line type="monotone" dataKey="consistency" stroke={PINK} strokeWidth={2} dot={{ fill: PINK, r: 4 }} name="Consistency %" />
          </LineChart>
        </ResponsiveContainer>
      </ChartBlock>

      {/* Duration comparison */}
      <ChartBlock title="SESSION DURATION (S)">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="2 2" stroke="#2A2A2A" />
            <XAxis dataKey="name" tick={{ fontFamily: '"Press Start 2P"', fontSize: 8, fill: "#888" }} />
            <YAxis tick={{ fontFamily: '"Press Start 2P"', fontSize: 8, fill: "#888" }} />
            <Tooltip
              contentStyle={{ background: "#1E1E1E", border: "2px solid #0F0F0F", fontFamily: '"Press Start 2P"', fontSize: 8 }}
              labelStyle={{ color: "#7B52CC" }}
            />
            <Bar dataKey="time" fill={PURPLE} name="Duration (s)" />
          </BarChart>
        </ResponsiveContainer>
      </ChartBlock>

      {/* Corrections + Help */}
      <ChartBlock title="CORRECTIONS vs HELP">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="2 2" stroke="#2A2A2A" />
            <XAxis dataKey="name" tick={{ fontFamily: '"Press Start 2P"', fontSize: 8, fill: "#888" }} />
            <YAxis tick={{ fontFamily: '"Press Start 2P"', fontSize: 8, fill: "#888" }} />
            <Tooltip
              contentStyle={{ background: "#1E1E1E", border: "2px solid #0F0F0F", fontFamily: '"Press Start 2P"', fontSize: 8 }}
            />
            <Legend wrapperStyle={{ fontFamily: '"Press Start 2P"', fontSize: 8 }} />
            <Bar dataKey="corrections" fill={PINK} name="Corrections" />
            <Bar dataKey="help" fill={BLUE} name="Help Requests" />
          </BarChart>
        </ResponsiveContainer>
      </ChartBlock>
    </div>
  );
}

function ChartBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="pixel-card" style={{ padding: "1.25rem 1rem", marginBottom: "1rem" }}>
      <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.5rem", color: "rgba(255,255,255,0.6)", marginBottom: "1rem" }}>
        {title}
      </div>
      {children}
    </div>
  );
}
