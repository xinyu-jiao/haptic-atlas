"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/context/SessionContext";
import { formatDuration } from "@/lib/session-storage";
import { speak } from "@/lib/speak";
import { useVoiceCommands } from "@/lib/useVoiceCommands";
import VoiceScreen from "@/components/VoiceScreen";

const BADGE_ICONS: Record<string, string> = {
  "SMOOTH NAV": "◈",
  "FAST FINDER": "⚡",
  "STEADY STEPS": "◆",
  "CLEAN RUN": "★",
};

export default function CompletePage() {
  const router = useRouter();
  const { state, reset } = useSession();
  const result = state.lastResult;

  useEffect(() => {
    if (!result) {
      router.replace("/");
      return;
    }
    const dur = formatDuration(result.duration);
    speak(`Session complete. Time: ${dur}. Consistency: ${result.consistency} percent. ${result.badges.length} badges earned.`);
  }, [result, router]);

  const voice = useVoiceCommands({
    history: () => { speak("Opening session history"); router.push("/history"); },
    again: () => { speak("Starting new session"); reset(); router.push("/session/level"); },
    home: () => { speak("Back to home"); reset(); router.push("/"); },
    back: () => { speak("Back to home"); reset(); router.push("/"); },
  });

  if (!result) return null;

  const durationStr = formatDuration(result.duration);

  return (
    <VoiceScreen listening={voice.listening} supported={voice.supported} lastHeard={voice.lastHeard} onStart={voice.start} onStop={voice.stop}>
    <div className="screen" style={{ paddingTop: "1.5rem" }}>
      <div style={{ fontFamily: '"Press Start 2P"', fontSize: "1.25rem", marginBottom: "0.4rem" }}>
        COMPLETE!
      </div>
      <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.5rem", opacity: 0.7, marginBottom: "2rem" }}>
        GREAT WORK!
      </div>

      {/* TIME — hero */}
      <div
        className="pixel-card"
        style={{
          background: "var(--purple)",
          padding: "1.25rem 1rem",
          textAlign: "center",
          marginBottom: "0.75rem",
        }}
      >
        <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.45rem", color: "rgba(255,255,255,0.6)", marginBottom: "0.5rem" }}>
          TIME
        </div>
        <div style={{ fontFamily: '"Press Start 2P"', fontSize: "1.75rem", color: "white" }}>
          {durationStr}
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
        {[
          { label: "CORRECTS", value: result.corrections },
          { label: "HELP", value: result.helpCount },
          { label: "CONSIST", value: `${result.consistency}%` },
          { label: "RESPONSE", value: `${result.responseTime}s` },
        ].map(({ label, value }) => (
          <div key={label} className="pixel-card" style={{ padding: "0.75rem 1rem" }}>
            <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.4rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.5rem" }}>
              {label}
            </div>
            <div style={{ fontFamily: '"Press Start 2P"', fontSize: "1.1rem", color: "white" }}>
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* Badges */}
      {result.badges.length > 0 && (
        <div className="pixel-card" style={{ padding: "1rem", marginBottom: "1.5rem" }}>
          <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.5rem", color: "white", marginBottom: "0.75rem" }}>
            BADGES
          </div>
          {result.badges.map((badge) => (
            <div key={badge} style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.4rem" }}>
              <div
                style={{
                  width: 22, height: 22,
                  background: "var(--pink)",
                  border: "2px solid var(--dark)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.65rem", flexShrink: 0,
                }}
              >
                {BADGE_ICONS[badge] ?? "●"}
              </div>
              <span style={{ fontFamily: '"Press Start 2P"', fontSize: "0.45rem", color: "white" }}>
                {badge}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Session already saved to localStorage automatically */}
      <div
        className="pixel-card"
        style={{
          padding: "0.6rem 1rem",
          marginBottom: "1.25rem",
          background: "var(--dark3)",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span style={{ color: "var(--px-green, #44CC88)", fontSize: "0.7rem" }}>✓</span>
        <span style={{ fontFamily: '"Press Start 2P"', fontSize: "0.4rem", color: "rgba(255,255,255,0.6)" }}>
          SESSION SAVED
        </span>
      </div>

      {/* Actions */}
      <Link href="/history" style={{ textDecoration: "none", display: "block", marginBottom: "0.75rem" }} onClick={() => speak("Opening session history")}>
        <button
          className="pixel-btn"
          style={{ width: "100%", background: "var(--pink)", color: "white", fontSize: "0.7rem", padding: "1rem" }}
        >
          ♥ VIEW HISTORY
        </button>
      </Link>

      <button
        onClick={() => { speak("Starting new session"); reset(); router.push("/session/level"); }}
        className="pixel-btn"
        style={{ width: "100%", background: "var(--dark2)", color: "white", fontSize: "0.55rem", padding: "0.75rem" }}
      >
        · AGAIN
      </button>

      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <Link href="/"
          style={{ fontFamily: '"Press Start 2P"', fontSize: "0.45rem", color: "var(--dark)", opacity: 0.5, textDecoration: "none" }}
          onClick={() => { speak("Back to home"); reset(); }}
        >
          HOME
        </Link>
      </div>

    </div>
    </VoiceScreen>
  );
}
