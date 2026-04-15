"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/context/SessionContext";
import { bleService } from "@/lib/ble";
import type { Environment, HapticIntensity, SessionConfig } from "@/lib/types";
import { speak } from "@/lib/speak";
import { useVoiceCommands } from "@/lib/useVoiceCommands";
import VoiceMicButton from "@/components/VoiceMicButton";

export default function SetupPage() {
  const router = useRouter();
  const { state, patchConfig, startSession } = useSession();

  const [environment, setEnvironment] = useState<Environment>("indoor");
  const [distance, setDistance] = useState(15);
  const [intensity, setIntensity] = useState<HapticIntensity>("med");
  const [goalConfirmed, setGoalConfirmed] = useState(false);
  const [bleReady, setBleReady] = useState(bleService.connected);
  const [testing, setTesting] = useState<"left" | "right" | null>(null);

  useEffect(() => {
    if (!state.config.level || !state.config.role) {
      router.replace("/session/level");
    }
  }, [state.config.level, state.config.role, router]);

  async function handleHapticTest(dir: "left" | "right") {
    speak(`Testing ${dir}`);
    if (!bleService.connected) {
      const result = await bleService.connect();
      if (result.success) setBleReady(true);
    }
    setTesting(dir);
    if (dir === "left") await bleService.sendLeft();
    else await bleService.sendRight();
    setTimeout(() => setTesting(null), 500);
  }

  const voice = useVoiceCommands({
    indoor: () => { setEnvironment("indoor"); speak("Indoor selected"); },
    outdoor: () => { setEnvironment("outdoor"); speak("Outdoor selected"); },
    low: () => { setIntensity("low"); speak("Intensity low"); },
    medium: () => { setIntensity("med"); speak("Intensity medium"); },
    high: () => { setIntensity("high"); speak("Intensity high"); },
    begin: () => handleBegin(),
    start: () => handleBegin(),
    back: () => { speak("Back"); router.back(); },
  });

  async function handleBegin() {
    speak("Session starting. Begin walking.");
    let ble = bleReady;
    if (!ble) {
      const result = await bleService.connect();
      ble = result.success;
      setBleReady(ble);
    }

    const config: SessionConfig = {
      level: state.config.level!,
      role: state.config.role!,
      environment,
      distance,
      hapticIntensity: intensity,
    };
    patchConfig(config);
    startSession(config, ble);
    router.push("/session/active");
  }

  const intensitySteps: HapticIntensity[] = ["low", "med", "high"];

  return (
    <div className="screen">
      <button
        onClick={() => { speak("Back"); router.back(); }}
        style={{
          background: "var(--dark2)", color: "white",
          border: "2px solid var(--dark)", fontFamily: '"Press Start 2P"',
          fontSize: "0.6rem", padding: "0.4rem 0.6rem",
          cursor: "pointer", marginBottom: "1.5rem", boxShadow: "2px 2px 0 var(--dark)",
        }}
      >
        ‹
      </button>

      <div style={{ fontFamily: '"Press Start 2P"', fontSize: "1rem", marginBottom: "0.4rem" }}>SETUP</div>
      <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.5rem", marginBottom: "2rem", opacity: 0.7 }}>
        CONFIG SESSION
      </div>

      {/* Environment */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.55rem", marginBottom: "0.75rem" }}>
          ENVIRONMENT
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
          {(["indoor", "outdoor"] as Environment[]).map((env) => (
            <button
              key={env}
              onClick={() => { setEnvironment(env); speak(`${env} selected`); }}
              style={{
                fontFamily: '"Press Start 2P"', fontSize: "0.6rem",
                padding: "0.75rem",
                background: environment === env ? "var(--pink)" : "var(--dark2)",
                color: "white",
                border: `3px solid ${environment === env ? "var(--dark)" : "var(--dark)"}`,
                boxShadow: "2px 2px 0 var(--dark)",
                cursor: "pointer",
                textTransform: "uppercase",
              }}
            >
              {env}
            </button>
          ))}
        </div>
      </div>

      {/* Distance */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.55rem", marginBottom: "0.75rem" }}>
          DISTANCE: {distance}M
        </div>
        <input
          type="range"
          min={5}
          max={50}
          step={5}
          value={distance}
          onChange={(e) => { const d = Number(e.target.value); setDistance(d); speak(`${d} meters`); }}
          style={{ width: "100%" }}
        />
      </div>

      {/* Goal Confirm */}
      <div className="pixel-card" style={{ padding: "0.75rem 1rem", marginBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.55rem", color: "var(--blue)" }}>
              GOAL CONFIRM
            </div>
            <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.4rem", color: "rgba(255,255,255,0.5)", marginTop: "0.3rem" }}>
              WIND CHIME
            </div>
          </div>
          <button
            onClick={() => { setGoalConfirmed(!goalConfirmed); speak(goalConfirmed ? "Goal confirm off" : "Goal confirm on"); }}
            style={{
              width: 20, height: 20,
              background: goalConfirmed ? "var(--pink)" : "var(--dark3)",
              border: "2px solid var(--dark)",
              cursor: "pointer",
            }}
          />
        </div>
      </div>

      {/* Haptic Test */}
      <div className="pixel-card" style={{ padding: "1rem", marginBottom: "1.5rem" }}>
        <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.55rem", color: "white", marginBottom: "0.75rem" }}>
          ⬡ HAPTIC TEST
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "0.75rem" }}>
          <button
            onClick={() => handleHapticTest("left")}
            className="pixel-btn"
            style={{
              background: testing === "left" ? "var(--pink)" : "var(--dark3)",
              color: "white", fontSize: "0.55rem",
            }}
          >
            · LEFT
          </button>
          <button
            onClick={() => handleHapticTest("right")}
            className="pixel-btn"
            style={{
              background: testing === "right" ? "var(--pink)" : "var(--dark3)",
              color: "white", fontSize: "0.55rem",
            }}
          >
            RIGHT ·
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: '"Press Start 2P"', fontSize: "0.45rem", color: "rgba(255,255,255,0.6)" }}>
            INTENSITY
          </span>
          <div style={{ display: "flex", gap: "0.25rem" }}>
            {intensitySteps.map((step) => (
              <button
                key={step}
                onClick={() => { setIntensity(step); speak(`Intensity ${step}`); }}
                style={{
                  fontFamily: '"Press Start 2P"', fontSize: "0.4rem",
                  padding: "0.25rem 0.5rem",
                  background: intensity === step ? "var(--purple)" : "var(--dark3)",
                  color: "white",
                  border: "2px solid var(--dark)",
                  cursor: "pointer",
                  textTransform: "uppercase",
                }}
              >
                {step}
              </button>
            ))}
          </div>
        </div>
        <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.4rem", color: "rgba(255,255,255,0.4)", marginTop: "0.5rem" }}>
          TUNE TO FEEL CLEAR
        </div>
      </div>

      <button
        onClick={handleBegin}
        className="pixel-btn"
        style={{
          width: "100%",
          background: "var(--pink)",
          color: "white",
          fontSize: "0.7rem",
          padding: "1rem",
        }}
      >
        · BEGIN
      </button>

      <VoiceMicButton listening={voice.listening} supported={voice.supported} lastHeard={voice.lastHeard} onToggle={voice.toggle} />
    </div>
  );
}
