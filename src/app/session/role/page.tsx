"use client";

import { useRouter } from "next/navigation";
import { useSession } from "@/context/SessionContext";
import type { Role } from "@/lib/types";
import { speak } from "@/lib/speak";
import { useVoiceCommands } from "@/lib/useVoiceCommands";
import VoiceScreen from "@/components/VoiceScreen";
import { useEffect } from "react";

export default function RolePage() {
  const router = useRouter();
  const { state, setRole } = useSession();

  // Guard: must have level selected
  useEffect(() => {
    if (!state.config.level) router.replace("/session/level");
  }, [state.config.level, router]);

  function handleSelect(role: Role) {
    speak(`${role} selected`);
    setRole(role);
    router.push("/session/setup");
  }

  const voice = useVoiceCommands({
    guide: () => handleSelect("guide"),
    seeker: () => handleSelect("seeker"),
    ready: () => { if (state.config.role) { speak("Ready. Configure session."); router.push("/session/setup"); } },
    back: () => { speak("Back"); router.back(); },
  });

  const roles = [
    {
      id: "guide" as Role,
      name: "GUIDE",
      desc: "Sets goal keeps safe",
      icon: "▲",
      selected: state.config.role === "guide",
    },
    {
      id: "seeker" as Role,
      name: "SEEKER",
      desc: "Follows haptics",
      icon: "⬛",
      selected: state.config.role === "seeker",
    },
  ];

  return (
    <VoiceScreen listening={voice.listening} supported={voice.supported} lastHeard={voice.lastHeard} onStart={voice.start} onStop={voice.stop}>
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

      <div style={{ fontFamily: '"Press Start 2P"', fontSize: "1rem", marginBottom: "0.5rem" }}>
        PICK ROLE
      </div>
      <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.5rem", marginBottom: "2rem", opacity: 0.7 }}>
        CHOOSE PLAYER
      </div>

      {/* Role cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
        {roles.map((r) => (
          <button
            key={r.id}
            onClick={() => handleSelect(r.id)}
            style={{
              background: r.selected ? "var(--purple)" : "var(--dark2)",
              border: r.selected ? "3px solid var(--pink)" : "3px solid var(--dark)",
              boxShadow: r.selected ? "3px 3px 0 var(--pink)" : "3px 3px 0 var(--dark)",
              cursor: "pointer",
              padding: "1.25rem 0.75rem",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{r.icon}</div>
            <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.65rem", color: "white", marginBottom: "0.4rem" }}>
              {r.name}
            </div>
            <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.4rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
              {r.desc}
            </div>
          </button>
        ))}
      </div>

      {/* How it works */}
      <div className="pixel-card" style={{ padding: "1rem", marginBottom: "2rem" }}>
        <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.55rem", color: "white", marginBottom: "0.75rem" }}>
          HOW IT WORKS
        </div>
        {[
          { color: "var(--pink)", text: "LEFT VIBE = LEFT" },
          { color: "var(--purple)", text: "RIGHT VIBE = RIGHT" },
          { color: "var(--blue)", text: "CHIME = ARRIVED" },
        ].map(({ color, text }) => (
          <div key={text} style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.4rem" }}>
            <div style={{ width: 10, height: 10, background: color, border: "1px solid var(--dark)", flexShrink: 0 }} />
            <span style={{ fontFamily: '"Press Start 2P"', fontSize: "0.45rem", color: "rgba(255,255,255,0.7)" }}>
              {text}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={() => { if (state.config.role) { speak("Ready. Configure session."); router.push("/session/setup"); } }}
        disabled={!state.config.role}
        className="pixel-btn"
        style={{
          width: "100%",
          background: state.config.role ? "var(--pink)" : "var(--dark3)",
          color: "white",
          fontSize: "0.7rem",
          padding: "1rem",
        }}
      >
        · READY
      </button>

    </div>
    </VoiceScreen>
  );
}
