import type { SessionResult, TraceRecord } from "./types";

const STORAGE_KEY = "haptic_atlas_sessions";

export function saveSessions(sessions: SessionResult[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch {
    console.warn("Failed to save sessions to localStorage");
  }
}

export function loadSessions(): SessionResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SessionResult[];
  } catch {
    return [];
  }
}

export function saveSession(result: SessionResult): void {
  const sessions = loadSessions();
  sessions.unshift(result);
  saveSessions(sessions);
}

export function clearSessions(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function groupSessionsByDate(
  sessions: SessionResult[]
): Record<string, SessionResult[]> {
  const groups: Record<string, SessionResult[]> = {};
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const yesterday = today - 86400000;

  for (const s of sessions) {
    const d = new Date(s.timestamp);
    const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    let key: string;
    if (dayStart === today) key = "TODAY";
    else if (dayStart === yesterday) key = "YESTERDAY";
    else key = d.toLocaleDateString("en-US", { month: "short", day: "numeric" }).toUpperCase();

    if (!groups[key]) groups[key] = [];
    groups[key].push(s);
  }
  return groups;
}

// ── Trace Records ──

const TRACE_KEY = "haptic_atlas_traces";

export function loadTraces(): TraceRecord[] {
  try {
    const raw = localStorage.getItem(TRACE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as TraceRecord[];
  } catch {
    return [];
  }
}

export function saveTrace(record: TraceRecord): void {
  const traces = loadTraces();
  traces.unshift(record);
  localStorage.setItem(TRACE_KEY, JSON.stringify(traces));
}

export function deleteTrace(id: string): void {
  const traces = loadTraces().filter((t) => t.id !== id);
  localStorage.setItem(TRACE_KEY, JSON.stringify(traces));
}

export function computeBadges(result: Omit<SessionResult, "badges" | "id" | "date" | "timestamp">): string[] {
  const badges: string[] = [];
  if (result.helpCount === 0) badges.push("SMOOTH NAV");
  if (result.duration < 90) badges.push("FAST FINDER");
  if (result.consistency >= 85) badges.push("STEADY STEPS");
  if (result.corrections <= 5) badges.push("CLEAN RUN");
  return badges;
}
