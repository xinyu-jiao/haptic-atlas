"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/context/SessionContext";
import { bleService } from "@/lib/ble";

// Simulates consistency score drift (Seeker only)
function driftConsistency(current: number): number {
  const delta = (Math.random() - 0.45) * 2.5;
  return Math.max(20, Math.min(100, current + delta));
}

export default function ActivePage() {
  const router = useRouter();
  const { state, tick, pause, resume, addCorrection, addHelp, updateConsistency, endSession } = useSession();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef = useRef<number>(Date.now());
  const pausedRef = useRef<number>(0);
  const pauseStartRef = useRef<number | null>(null);

  const [hapticFlash, setHapticFlash] = useState<"left" | "right" | null>(null);

  const active = state.active;

  // Guard
  useEffect(() => {
    if (!active) {
      router.replace("/session/level");
      return;
    }
    startRef.current = active.startTime;
  }, [active, router]);

  // Timer
  useEffect(() => {
    if (!active || active.status === "complete") return;

    function runTick() {
      if (active!.status !== "running") return;
      const now = Date.now();
      const elapsed = Math.floor((now - startRef.current - pausedRef.current) / 1000);
      tick(elapsed);
      // Drift consistency for seeker
      if (active!.config.role === "seeker") {
        updateConsistency(driftConsistency(active!.consistency));
      }
    }

    intervalRef.current = setInterval(runTick, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active?.status, tick, updateConsistency, active]);

  const handlePause = useCallback(() => {
    if (active?.status === "running") {
      pause();
      pauseStartRef.current = Date.now();
    } else if (active?.status === "paused") {
      if (pauseStartRef.current) {
        pausedRef.current += Date.now() - pauseStartRef.current;
        pauseStartRef.current = null;
      }
      resume();
    }
  }, [active?.status, pause, resume]);

  async function handleHapticDir(dir: "left" | "right") {
    setHapticFlash(dir);
    if (dir === "left") await bleService.sendLeft();
    else await bleService.sendRight();
    addCorrection();
    setTimeout(() => setHapticFlash(null), 400);
  }

  async function handleHelp() {
    addHelp();
    await bleService.sendArrived();
  }

  function handleEnd() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    endSession();
    router.push("/session/complete");
  }

  if (!active) return null;

  const { role } = active.config;
  const isRunning = active.status === "running";
  const mm = Math.floor(active.elapsed / 60).toString().padStart(2, "0");
  const ss = (active.elapsed % 60).toString().padStart(2, "0");
  const timeStr = `${mm}:${ss}`;

  // ── SEEKER VIEW ─────────────────────────────────────────────────────────────
  if (role === "seeker") {
    const cons = active.consistency.toFixed(2);
    const isOnTrack = active.consistency >= 65;

    return (
      <div className="screen" style={{ paddingTop: "1.25rem" }}>
        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
          <div
            className="pixel-card"
            style={{ padding: "0.3rem 0.6rem", display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <span style={{ fontFamily: '"Press Start 2P"', fontSize: "0.55rem", color: "var(--pink)" }}>✦</span>
            <span style={{ fontFamily: '"Press Start 2P"', fontSize: "0.65rem", color: "white" }}>{timeStr}</span>
          </div>
          <span
            style={{
              fontFamily: '"Press Start 2P"', fontSize: "0.45rem",
              color: "var(--dark)", opacity: 0.6, letterSpacing: "0.08em",
            }}
          >
            SEEKER ·
          </span>
        </div>

        {/* Status card */}
        <div
          className="pixel-card"
          style={{
            padding: "2rem 1rem",
            textAlign: "center",
            marginBottom: "1rem",
            background: isOnTrack ? "var(--purple)" : "#8B3030",
            transition: "background 0.5s",
          }}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>
            {isOnTrack ? "✓" : "!"}
          </div>
          <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.85rem", color: "white" }}>
            {active.status === "paused" ? "PAUSED" : isOnTrack ? "ON TRACK!" : "OFF COURSE"}
          </div>
        </div>

        {/* Consistency */}
        <div style={{ marginBottom: "0.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
            <span style={{ fontFamily: '"Press Start 2P"', fontSize: "0.45rem" }}>CONSISTENCY</span>
            <span style={{ fontFamily: '"Press Start 2P"', fontSize: "0.45rem" }}>{cons}</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${active.consistency}%` }} />
          </div>
        </div>

        <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.45rem", opacity: 0.5, marginBottom: "2rem", textAlign: "center" }}>
          STAY STEADY BUILD SCORE
        </div>

        {/* Haptic direction buttons */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <button
            onClick={() => handleHapticDir("left")}
            className="pixel-btn"
            style={{
              background: hapticFlash === "left" ? "var(--pink)" : "var(--dark2)",
              color: "white", fontSize: "0.6rem", padding: "0.75rem",
            }}
          >
            ‹ LEFT
          </button>
          <button
            onClick={() => handleHapticDir("right")}
            className="pixel-btn"
            style={{
              background: hapticFlash === "right" ? "var(--pink)" : "var(--dark2)",
              color: "white", fontSize: "0.6rem", padding: "0.75rem",
            }}
          >
            RIGHT ›
          </button>
        </div>

        {/* Bottom controls */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          <button
            onClick={handlePause}
            className="pixel-btn"
            style={{ background: "var(--dark2)", color: "white", fontSize: "0.6rem", padding: "0.75rem" }}
          >
            {isRunning ? "⏸ PAUSE" : "▶ RESUME"}
          </button>
          <button
            onClick={handleHelp}
            className="pixel-btn"
            style={{ background: "var(--purple-mid, #CC44A8)", color: "white", fontSize: "0.6rem", padding: "0.75rem" }}
          >
            ⊙ HELP!
          </button>
        </div>

        {/* END (small, bottom) */}
        <button
          onClick={handleEnd}
          style={{
            width: "100%", marginTop: "0.75rem",
            fontFamily: '"Press Start 2P"', fontSize: "0.45rem",
            background: "transparent", color: "rgba(0,0,0,0.4)",
            border: "none", cursor: "pointer", padding: "0.5rem",
            letterSpacing: "0.1em",
          }}
        >
          · END SESSION
        </button>
      </div>
    );
  }

  // ── GUIDE VIEW ───────────────────────────────────────────────────────────────
  return (
    <div className="screen" style={{ paddingTop: "1.25rem" }}>
      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div
          className="pixel-card"
          style={{ padding: "0.3rem 0.6rem" }}
        >
          <span style={{ fontFamily: '"Press Start 2P"', fontSize: "0.65rem", color: "white" }}>{timeStr}</span>
        </div>
        <div
          style={{
            background: "var(--blue)",
            border: "2px solid var(--dark)",
            padding: "0.25rem 0.5rem",
          }}
        >
          <span style={{ fontFamily: '"Press Start 2P"', fontSize: "0.4rem", color: "white" }}>
            ● {active.status === "paused" ? "Paused" : "On Track"}
          </span>
        </div>
      </div>

      <div style={{ fontFamily: '"Press Start 2P"', fontSize: "1rem", marginBottom: "2rem" }}>
        GUIDE VIEW
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.25rem" }}>
        <div className="pixel-card" style={{ padding: "0.75rem 1rem" }}>
          <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.4rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.4rem" }}>
            CORRECTIONS
          </div>
          <div style={{ fontFamily: '"Press Start 2P"', fontSize: "1.5rem", color: "white" }}>
            {active.corrections}
          </div>
        </div>
        <div className="pixel-card" style={{ padding: "0.75rem 1rem" }}>
          <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.4rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.4rem" }}>
            ASSISTANCE
          </div>
          <div style={{ fontFamily: '"Press Start 2P"', fontSize: "1.5rem", color: "white" }}>
            {active.helpCount}
          </div>
        </div>
      </div>

      {/* Mark Help — primary action for guide */}
      <button
        onClick={handleHelp}
        className="pixel-card"
        style={{
          width: "100%",
          padding: "1.5rem 1rem",
          textAlign: "center",
          cursor: "pointer",
          border: "3px solid var(--dark)",
          background: "var(--pink)",
          marginBottom: "1.25rem",
          display: "block",
          boxShadow: "3px 3px 0 var(--dark)",
        }}
      >
        <div style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>✋</div>
        <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.7rem", color: "white" }}>
          MARK HELP
        </div>
        <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.4rem", color: "rgba(255,255,255,0.7)", marginTop: "0.4rem" }}>
          TAP WHEN YOU GUIDE SEEKER
        </div>
      </button>

      {/* Direction corrections */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
        <button
          onClick={() => handleHapticDir("left")}
          className="pixel-btn"
          style={{
            background: hapticFlash === "left" ? "var(--pink)" : "var(--dark2)",
            color: "white", fontSize: "0.55rem", padding: "0.75rem",
          }}
        >
          ‹ SEND LEFT
        </button>
        <button
          onClick={() => handleHapticDir("right")}
          className="pixel-btn"
          style={{
            background: hapticFlash === "right" ? "var(--pink)" : "var(--dark2)",
            color: "white", fontSize: "0.55rem", padding: "0.75rem",
          }}
        >
          SEND RIGHT ›
        </button>
      </div>

      {/* SEEKER / END */}
      <button
        onClick={handlePause}
        className="pixel-btn"
        style={{ width: "100%", background: "var(--dark2)", color: "white", fontSize: "0.6rem", marginBottom: "0.5rem" }}
      >
        {isRunning ? "⏸ PAUSE" : "▶ RESUME"}
      </button>
      <button
        onClick={handleEnd}
        className="pixel-btn"
        style={{ width: "100%", background: "var(--pink)", color: "white", fontSize: "0.7rem", padding: "1rem" }}
      >
        ■ END
      </button>
    </div>
  );
}
