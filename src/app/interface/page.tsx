"use client";

/**
 * Interface — in-app training launcher (pixel UI).
 * Site entry and narrative live on /about; this route is only the session start surface.
 */
import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/context/SessionContext";
import { speak } from "@/lib/speak";
import { useVoiceCommands } from "@/lib/useVoiceCommands";
import VoiceScreen from "@/components/VoiceScreen";

export default function InterfacePage() {
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
    history: () => {
      speak("Opening session history");
      router.push("/history");
    },
  });

  return (
    <VoiceScreen listening={voice.listening} supported={voice.supported} lastHeard={voice.lastHeard} onStart={voice.start} onStop={voice.stop}>
      <div className="screen" style={{ paddingTop: "2rem" }}>
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
            {[0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120, 128, 136, 144, 152, 160, 168, 176, 184, 192].map((x, i) => {
              const y = [30, 22, 18, 26, 14, 22, 30, 18, 10, 22, 30, 14, 22, 18, 26, 14, 22, 30, 18, 22, 14, 26, 22, 18, 30][i];
              const colors = ["#E84DC0", "#7B52CC", "#E84DC0", "#4A6AE8", "#CC44A8"];
              return <rect key={x} x={x} y={y} width={6} height={6} fill={colors[i % colors.length]} />;
            })}
          </svg>
        </div>

        <div style={{ textAlign: "center", marginBottom: "0.35rem" }}>
          <div
            style={{
              fontFamily: '"Press Start 2P"',
              fontSize: "0.48rem",
              color: "var(--dark)",
              letterSpacing: "0.18em",
              opacity: 0.85,
            }}
          >
            HAPTIC ATLAS
          </div>
        </div>
        <div style={{ marginBottom: "0.4rem", textAlign: "center" }}>
          <div style={{ fontFamily: '"Press Start 2P"', fontSize: "1.5rem", lineHeight: 1.3, color: "var(--dark)" }}>
            BEFORE
            <br />
            LIGHT
          </div>
        </div>
        <div
          style={{
            fontFamily: '"Press Start 2P"',
            fontSize: "0.55rem",
            color: "var(--dark)",
            marginBottom: "0.85rem",
            letterSpacing: "0.1em",
            textAlign: "center",
          }}
        >
          SESSION LAUNCHER · HAPTIC NAV
        </div>

        <p
          style={{
            fontFamily: '"Inter", system-ui, sans-serif',
            fontSize: "0.72rem",
            lineHeight: 1.55,
            color: "var(--dark)",
            opacity: 0.82,
            textAlign: "center",
            margin: "0 auto 0.65rem",
            maxWidth: "19rem",
          }}
        >
          Same{" "}
          <span style={{ fontWeight: 600, color: "var(--dark)", opacity: 1 }}>Level → Result</span> path as
          Sessions / History — this screen only starts or reviews runs.{" "}
          <Link href="/about" style={{ color: "var(--dark)", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: "2px" }}>
            Context on About
          </Link>
          .
        </p>

        {voice.supported ? (
          <p
            style={{
              fontFamily: '"Inter", system-ui, sans-serif',
              fontSize: "0.68rem",
              lineHeight: 1.5,
              color: "var(--dark)",
              opacity: 0.78,
              textAlign: "center",
              margin: "0 auto 1.35rem",
              maxWidth: "20rem",
            }}
          >
            <strong style={{ fontWeight: 600, opacity: 1 }}>Long-press</strong> (~½ s){" "}
            <strong style={{ fontWeight: 600, opacity: 1 }}>anywhere</strong> on this page to turn voice on or
            off. When the bar says listening, say{" "}
            <strong style={{ fontWeight: 600, opacity: 1 }}>start</strong>,{" "}
            <strong style={{ fontWeight: 600, opacity: 1 }}>begin</strong>, or{" "}
            <strong style={{ fontWeight: 600, opacity: 1 }}>history</strong>.
          </p>
        ) : (
          <p
            style={{
              fontFamily: '"Inter", system-ui, sans-serif',
              fontSize: "0.68rem",
              lineHeight: 1.5,
              color: "var(--dark)",
              opacity: 0.65,
              textAlign: "center",
              margin: "0 auto 1.35rem",
              maxWidth: "20rem",
            }}
          >
            This browser does not expose speech recognition — use{" "}
            <strong style={{ fontWeight: 600, opacity: 0.95 }}>START</strong> and{" "}
            <strong style={{ fontWeight: 600, opacity: 0.95 }}>HISTORY</strong> below.
          </p>
        )}

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

        <div style={{ textAlign: "center", marginTop: "1.25rem" }}>
          <Link
            href="/history"
            onClick={() => speak("Opening session history")}
            style={{
              fontFamily: '"Press Start 2P"',
              fontSize: "0.5rem",
              color: "var(--dark)",
              opacity: 0.6,
              textDecoration: "none",
              letterSpacing: "0.1em",
            }}
          >
            · HISTORY ·
          </Link>
        </div>
      </div>
    </VoiceScreen>
  );
}
