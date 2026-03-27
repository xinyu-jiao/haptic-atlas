"use client";

import React, { createContext, useContext, useReducer, useCallback } from "react";
import type { SessionConfig, ActiveSessionState, SessionResult, Level, Role } from "@/lib/types";
import { LEVELS } from "@/lib/types";
import { saveSession, computeBadges, formatDuration } from "@/lib/session-storage";

// ─── State ────────────────────────────────────────────────────────────────────

interface SessionCtxState {
  config: Partial<SessionConfig>;
  active: ActiveSessionState | null;
  lastResult: SessionResult | null;
}

const initialState: SessionCtxState = {
  config: {},
  active: null,
  lastResult: null,
};

// ─── Actions ──────────────────────────────────────────────────────────────────

type Action =
  | { type: "SET_LEVEL"; level: Level }
  | { type: "SET_ROLE"; role: Role }
  | { type: "SET_CONFIG"; patch: Partial<SessionConfig> }
  | { type: "START_SESSION"; config: SessionConfig; bleConnected: boolean }
  | { type: "TICK"; elapsed: number }
  | { type: "PAUSE" }
  | { type: "RESUME" }
  | { type: "ADD_CORRECTION" }
  | { type: "ADD_HELP" }
  | { type: "UPDATE_CONSISTENCY"; value: number }
  | { type: "SET_BLE"; connected: boolean }
  | { type: "END_SESSION" }
  | { type: "RESET" };

function reducer(state: SessionCtxState, action: Action): SessionCtxState {
  switch (action.type) {
    case "SET_LEVEL":
      return { ...state, config: { ...state.config, level: action.level } };
    case "SET_ROLE":
      return { ...state, config: { ...state.config, role: action.role } };
    case "SET_CONFIG":
      return { ...state, config: { ...state.config, ...action.patch } };

    case "START_SESSION":
      return {
        ...state,
        config: action.config,
        active: {
          config: action.config,
          startTime: Date.now(),
          elapsed: 0,
          corrections: 0,
          helpCount: 0,
          consistency: 75,
          status: "running",
          bleConnected: action.bleConnected,
        },
      };

    case "TICK":
      if (!state.active) return state;
      return {
        ...state,
        active: { ...state.active, elapsed: action.elapsed },
      };

    case "PAUSE":
      if (!state.active) return state;
      return { ...state, active: { ...state.active, status: "paused" } };

    case "RESUME":
      if (!state.active) return state;
      return { ...state, active: { ...state.active, status: "running" } };

    case "ADD_CORRECTION":
      if (!state.active) return state;
      return {
        ...state,
        active: { ...state.active, corrections: state.active.corrections + 1 },
      };

    case "ADD_HELP":
      if (!state.active) return state;
      return {
        ...state,
        active: { ...state.active, helpCount: state.active.helpCount + 1 },
      };

    case "UPDATE_CONSISTENCY":
      if (!state.active) return state;
      return {
        ...state,
        active: { ...state.active, consistency: action.value },
      };

    case "SET_BLE":
      if (!state.active) return state;
      return {
        ...state,
        active: { ...state.active, bleConnected: action.connected },
      };

    case "END_SESSION": {
      if (!state.active) return state;
      const a = state.active;
      const levelInfo = LEVELS.find((l) => l.id === a.config.level);
      const partial = {
        level: a.config.level,
        levelName: levelInfo?.name ?? a.config.level,
        role: a.config.role,
        environment: a.config.environment,
        duration: a.elapsed,
        corrections: a.corrections,
        helpCount: a.helpCount,
        consistency: Math.round(a.consistency),
        responseTime: parseFloat((0.5 + Math.random() * 0.8).toFixed(1)),
      };
      const badges = computeBadges(partial);
      const result: SessionResult = {
        ...partial,
        id: `session_${Date.now()}`,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        timestamp: Date.now(),
        badges,
      };
      saveSession(result);
      return {
        ...state,
        active: { ...a, status: "complete" },
        lastResult: result,
      };
    }

    case "RESET":
      return { ...initialState };

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface SessionCtx {
  state: SessionCtxState;
  setLevel: (level: Level) => void;
  setRole: (role: Role) => void;
  patchConfig: (patch: Partial<SessionConfig>) => void;
  startSession: (config: SessionConfig, bleConnected: boolean) => void;
  tick: (elapsed: number) => void;
  pause: () => void;
  resume: () => void;
  addCorrection: () => void;
  addHelp: () => void;
  updateConsistency: (value: number) => void;
  setBLE: (connected: boolean) => void;
  endSession: () => void;
  reset: () => void;
  formatElapsed: () => string;
}

const Ctx = createContext<SessionCtx | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setLevel = useCallback((level: Level) => dispatch({ type: "SET_LEVEL", level }), []);
  const setRole = useCallback((role: Role) => dispatch({ type: "SET_ROLE", role }), []);
  const patchConfig = useCallback((patch: Partial<SessionConfig>) => dispatch({ type: "SET_CONFIG", patch }), []);
  const startSession = useCallback((config: SessionConfig, bleConnected: boolean) =>
    dispatch({ type: "START_SESSION", config, bleConnected }), []);
  const tick = useCallback((elapsed: number) => dispatch({ type: "TICK", elapsed }), []);
  const pause = useCallback(() => dispatch({ type: "PAUSE" }), []);
  const resume = useCallback(() => dispatch({ type: "RESUME" }), []);
  const addCorrection = useCallback(() => dispatch({ type: "ADD_CORRECTION" }), []);
  const addHelp = useCallback(() => dispatch({ type: "ADD_HELP" }), []);
  const updateConsistency = useCallback((value: number) => dispatch({ type: "UPDATE_CONSISTENCY", value }), []);
  const setBLE = useCallback((connected: boolean) => dispatch({ type: "SET_BLE", connected }), []);
  const endSession = useCallback(() => dispatch({ type: "END_SESSION" }), []);
  const reset = useCallback(() => dispatch({ type: "RESET" }), []);
  const formatElapsed = useCallback(() =>
    formatDuration(state.active?.elapsed ?? 0), [state.active?.elapsed]);

  return (
    <Ctx.Provider value={{
      state, setLevel, setRole, patchConfig, startSession,
      tick, pause, resume, addCorrection, addHelp, updateConsistency,
      setBLE, endSession, reset, formatElapsed,
    }}>
      {children}
    </Ctx.Provider>
  );
}

export function useSession(): SessionCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSession must be used inside SessionProvider");
  return ctx;
}
