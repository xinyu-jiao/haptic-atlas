"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/context/SessionContext";
import { bleService } from "@/lib/ble";
import { speak } from "@/lib/speak";
import { useVoiceCommands } from "@/lib/useVoiceCommands";
import VoiceMicButton from "@/components/VoiceMicButton";

export default function HomePage() {
  const router = useRouter();
  const { reset } = useSession();
  const [bleStatus, setBleStatus] = useState<"disconnected" | "connected" | "sim">("disconnected");
  const [bleLabel, setBleLabel] = useState("NOT CONNECTED");
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    reset();
  }, [reset]);

  async function handleConnect() {
    setConnecting(true);
    speak("Scanning for haptic belt");
    const result = await bleService.connect();
    if (result.success) {
      if (result.sim) {
        setBleStatus("sim");
        setBleLabel("SIM MODE");
        speak("Simulation mode activated");
      } else {
        setBleStatus("connected");
        setBleLabel("CONNECTED · 100%");
        speak("Belt connected successfully");
      }
    } else {
      setBleStatus("disconnected");
      setBleLabel("SCAN CANCELLED");
      speak("Connection cancelled");
    }
    setConnecting(false);
  }

  async function handleTest() {
    if (bleStatus === "disconnected") return;
    speak("Testing. Left");
    await bleService.sendLeft();
    setTimeout(() => {
      speak("Right");
      bleService.sendRight();
    }, 600);
  }

  const handleStart = useCallback(() => {
    speak("Starting session. Select your level.");
    router.push("/session/level");
  }, [router]);

  const voice = useVoiceCommands({
    connect: handleConnect,
    test: handleTest,
    start: handleStart,
    begin: handleStart,
    history: () => { speak("Opening session history"); router.push("/history"); },
  });

  return (
    <div className="screen" style={{ paddingTop: "2rem" }}>
      {/* Hero pixel art area */}
      <div
        className="pixel-card"
        style={{
          marginBottom: "1.5rem",
          height: 140,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
        }}
      >
        <svg width="200" height="60" viewBox="0 0 200 60" style={{ imageRendering: "pixelated" }}>
          {/* Pixel waveform art */}
          {[0,8,16,24,32,40,48,56,64,72,80,88,96,104,112,120,128,136,144,152,160,168,176,184,192].map((x, i) => {
            const y = [30,22,18,26,14,22,30,18,10,22,30,14,22,18,26,14,22,30,18,22,14,26,22,18,30][i];
            const colors = ["#E84DC0","#7B52CC","#E84DC0","#4A6AE8","#CC44A8"];
            return (
              <rect key={x} x={x} y={y} width={6} height={6}
                fill={colors[i % colors.length]} />
            );
          })}
        </svg>
      </div>

      {/* Title */}
      <div style={{ marginBottom: "0.4rem" }}>
        <div style={{ fontFamily: '"Press Start 2P"', fontSize: "1.5rem", lineHeight: 1.3, color: "var(--dark)" }}>
          BEFORE<br />LIGHT
        </div>
      </div>
      <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.55rem", color: "var(--dark)", marginBottom: "2rem", letterSpacing: "0.1em" }}>
        HAPTIC NAV TRAINING
      </div>

      {/* BLE status card */}
      <div className="pixel-card" style={{ padding: "0.75rem 1rem", marginBottom: "0.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.8rem" }}>⬡</span>
            <span style={{ fontFamily: '"Press Start 2P"', fontSize: "0.55rem", color: "white" }}>BELT</span>
          </div>
          <button
            onClick={handleConnect}
            disabled={connecting || bleStatus === "connected"}
            style={{
              fontFamily: '"Press Start 2P"', fontSize: "0.45rem",
              background: bleStatus === "connected" ? "var(--blue)"
                : bleStatus === "sim" ? "var(--purple)"
                : "var(--dark3)",
              color: "white",
              border: "2px solid var(--dark)",
              padding: "0.3rem 0.6rem",
              cursor: bleStatus === "connected" ? "default" : "pointer",
              display: "flex", alignItems: "center", gap: "0.4rem",
            }}
          >
            {bleStatus === "connected" || bleStatus === "sim" ? (
              <>
                <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--px-green, #44CC88)", display: "inline-block" }} />
                {bleLabel}
              </>
            ) : (
              connecting ? "SCANNING..." : "TAP TO CONNECT"
            )}
          </button>
        </div>
      </div>

      {/* TEST button */}
      <button
        onClick={handleTest}
        disabled={bleStatus === "disconnected"}
        className="pixel-btn"
        style={{
          width: "100%",
          marginBottom: "1.5rem",
          background: "var(--dark2)",
          color: bleStatus !== "disconnected" ? "white" : "#666",
          fontSize: "0.65rem",
        }}
      >
        TEST
      </button>

      {/* START */}
      <Link href="/session/level" style={{ textDecoration: "none" }} onClick={handleStart}>
        <button
          className="pixel-btn"
          style={{
            width: "100%",
            background: "var(--pink)",
            color: "white",
            fontSize: "0.7rem",
            padding: "1rem",
          }}
        >
          · START
        </button>
      </Link>

      {/* History link */}
      <div style={{ textAlign: "center", marginTop: "1.25rem" }}>
        <Link href="/history"
          onClick={() => speak("Opening session history")}
          style={{
            fontFamily: '"Press Start 2P"', fontSize: "0.5rem",
            color: "var(--dark)", opacity: 0.6, textDecoration: "none",
            letterSpacing: "0.1em",
          }}
        >
          · HISTORY ·
        </Link>
      </div>

      <VoiceMicButton listening={voice.listening} supported={voice.supported} lastHeard={voice.lastHeard} onToggle={voice.toggle} />
    </div>
  );
}
