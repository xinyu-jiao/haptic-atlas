"use client";

interface VoiceMicButtonProps {
  listening: boolean;
  supported: boolean;
  lastHeard: string | null;
  onToggle: () => void;
}

export default function VoiceMicButton({ listening, supported, lastHeard, onToggle }: VoiceMicButtonProps) {
  if (!supported) return null;

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 200, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.4rem" }}>
      {listening && lastHeard && (
        <div style={{
          background: "#1a1a1a", border: "1px solid #333",
          padding: "0.35rem 0.7rem", borderRadius: 6,
          fontSize: "0.65rem", color: "#888", maxWidth: 180,
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          fontFamily: '"Inter", system-ui, sans-serif',
        }}>
          &quot;{lastHeard}&quot;
        </div>
      )}
      <button
        onClick={onToggle}
        aria-label={listening ? "Stop voice control" : "Start voice control"}
        style={{
          width: 48, height: 48,
          borderRadius: "50%",
          border: listening ? "2px solid #E84DC0" : "2px solid #333",
          background: listening ? "#2a1025" : "#1a1a1a",
          color: listening ? "#E84DC0" : "#888",
          fontSize: "1.2rem",
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: listening ? "0 0 12px rgba(232,77,192,0.3)" : "none",
          transition: "all 0.2s",
        }}
      >
        {listening ? "🎙" : "🎤"}
      </button>
    </div>
  );
}
