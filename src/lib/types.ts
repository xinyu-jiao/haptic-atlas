export type Level = "straight" | "corner" | "obstacle";
export type Role = "guide" | "seeker";
export type Environment = "indoor" | "outdoor";
export type HapticIntensity = "low" | "med" | "high";
export type SessionStatus = "idle" | "running" | "paused" | "complete";

export interface LevelInfo {
  id: Level;
  name: string;
  difficulty: string;
  distance: number;
  estimatedTime: string;
  icon: string;
  color: string;
}

export interface SessionConfig {
  level: Level;
  role: Role;
  environment: Environment;
  distance: number;
  hapticIntensity: HapticIntensity;
}

export interface ActiveSessionState {
  config: SessionConfig;
  startTime: number;
  elapsed: number;
  corrections: number;
  helpCount: number;
  consistency: number;
  status: SessionStatus;
  bleConnected: boolean;
}

export interface SessionResult {
  id: string;
  date: string;
  timestamp: number;
  level: Level;
  levelName: string;
  role: Role;
  environment: Environment;
  duration: number; // seconds
  corrections: number;
  helpCount: number;
  consistency: number; // 0-100
  responseTime: number; // seconds, average
  badges: string[];
}

export const LEVELS: LevelInfo[] = [
  {
    id: "straight",
    name: "STRAIGHT LINE",
    difficulty: "Easy",
    distance: 10,
    estimatedTime: "1:23",
    icon: "→",
    color: "bg-px-purple",
  },
  {
    id: "corner",
    name: "CORNER TURN",
    difficulty: "Medium",
    distance: 15,
    estimatedTime: "2:45",
    icon: "↱",
    color: "bg-px-purple-mid",
  },
  {
    id: "obstacle",
    name: "SAFE OBSTACLE",
    difficulty: "Hard",
    distance: 20,
    estimatedTime: "4:00",
    icon: "∨",
    color: "bg-[#A03880]",
  },
];
