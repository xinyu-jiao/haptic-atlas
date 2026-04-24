"use client";

import { useRouter } from "next/navigation";
import { useSession } from "@/context/SessionContext";
import { LEVELS, type Level } from "@/lib/types";
import { speak } from "@/lib/speak";
import { useVoiceCommands } from "@/lib/useVoiceCommands";
import VoiceScreen from "@/components/VoiceScreen";
import InterfaceCameraGuide from "@/components/InterfaceCameraGuide";

export default function LevelPage() {
  const router = useRouter();
  const { setLevel } = useSession();

  function handleSelect(id: Level) {
    const info = LEVELS.find((l) => l.id === id);
    speak(`${info?.name ?? id} selected. Choose your role.`);
    setLevel(id);
    router.push("/session/role");
  }

  const voice = useVoiceCommands({
    straight: () => handleSelect("straight"),
    easy: () => handleSelect("straight"),
    corner: () => handleSelect("corner"),
    medium: () => handleSelect("corner"),
    obstacle: () => handleSelect("obstacle"),
    hard: () => handleSelect("obstacle"),
    back: () => { speak("Back to home"); router.push("/about"); },
  });

  const COLOR_MAP: Record<Level, string> = {
    straight: "#7B52CC",
    corner: "#CC44A8",
    obstacle: "#A03880",
  };

  return (
    <VoiceScreen listening={voice.listening} supported={voice.supported} lastHeard={voice.lastHeard} onStart={voice.start} onStop={voice.stop}>
    <div className="screen">
      {/* Back */}
      <button
        onClick={() => { speak("Back to home"); router.push("/about"); }}
        style={{
          background: "var(--dark2)",
          color: "white",
          border: "2px solid var(--dark)",
          fontFamily: '"Press Start 2P"',
          fontSize: "0.6rem",
          padding: "0.4rem 0.6rem",
          cursor: "pointer",
          marginBottom: "1.5rem",
          boxShadow: "2px 2px 0 var(--dark)",
        }}
      >
        ‹
      </button>

      <div style={{ fontFamily: '"Press Start 2P"', fontSize: "1rem", marginBottom: "0.5rem" }}>
        CHOOSE SESSION
      </div>
      <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.5rem", marginBottom: "1.25rem", opacity: 0.7 }}>
        SELECT LEVEL
      </div>

      <InterfaceCameraGuide />

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {LEVELS.map((level) => (
          <button
            key={level.id}
            onClick={() => handleSelect(level.id)}
            style={{
              background: "var(--dark2)",
              border: "3px solid var(--dark)",
              boxShadow: "3px 3px 0 var(--dark)",
              cursor: "pointer",
              padding: 0,
              textAlign: "left",
              width: "100%",
            }}
          >
            {/* Colored banner */}
            <div
              style={{
                background: COLOR_MAP[level.id],
                height: 70,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "2.5rem", color: "white" }}>{level.icon}</span>
            </div>
            {/* Info */}
            <div style={{ padding: "0.75rem 1rem" }}>
              <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.7rem", color: "white", marginBottom: "0.4rem" }}>
                {level.name}
              </div>
              <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.45rem", color: "rgba(255,255,255,0.6)" }}>
                {level.difficulty}
              </div>
              <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.45rem", color: "rgba(255,255,255,0.5)", marginTop: "0.2rem" }}>
                {level.distance}M · {level.estimatedTime}
              </div>
            </div>
          </button>
        ))}
      </div>

    </div>
    </VoiceScreen>
  );
}
