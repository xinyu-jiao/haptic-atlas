"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/context/SessionContext";
import { speak } from "@/lib/speak";
import { useVoiceCommands } from "@/lib/useVoiceCommands";
import VoiceMicButton from "@/components/VoiceMicButton";

export default function HomePage() {
  const router = useRouter();
  const { reset } = useSession();

  useEffect(() => {
    reset();
  }, [reset]);

  const handleStart = useCallback(() => {
    speak("Starting session. Select your level.");
    router.push("/session/level");
  }, [router]);

  const voice = useVoiceCommands({
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
