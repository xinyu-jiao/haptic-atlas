"use client";

import { useRef, useCallback, type ReactNode } from "react";
import { speak } from "@/lib/speak";

interface VoiceScreenProps {
  children: ReactNode;
  listening: boolean;
  supported: boolean;
  lastHeard: string | null;
  onStart: () => void;
  onStop: () => void;
}

const LONG_PRESS_MS = 500;

export default function VoiceScreen({
  children,
  listening,
  supported,
  lastHeard,
  onStart,
  onStop,
}: VoiceScreenProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const didActivateRef = useRef(false);

  const beginPress = useCallback(() => {
    if (!supported) return;
    didActivateRef.current = false;
    timerRef.current = setTimeout(() => {
      didActivateRef.current = true;
      if (listening) {
        onStop();
        speak("Voice control off");
      } else {
        onStart();
        speak("Listening");
      }
    }, LONG_PRESS_MS);
  }, [supported, listening, onStart, onStop]);

  const endPress = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  return (
    <div
      onTouchStart={beginPress}
      onTouchEnd={endPress}
      onTouchCancel={endPress}
      onMouseDown={beginPress}
      onMouseUp={endPress}
      onMouseLeave={endPress}
      style={{ position: "relative", minHeight: "100vh" }}
    >
      {children}

      {listening && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "linear-gradient(90deg, #E84DC0, #7B52CC, #E84DC0)",
            zIndex: 9999,
            animation: "voice-bar 2s linear infinite",
          }}
        />
      )}

      {listening && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "0.6rem 1rem",
            background: "rgba(20, 10, 18, 0.95)",
            borderTop: "1px solid #E84DC0",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.6rem",
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#E84DC0",
              display: "inline-block",
              animation: "pulse-dot 1s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize: "0.5rem",
              color: "#E84DC0",
              letterSpacing: "0.12em",
            }}
          >
            LISTENING{lastHeard ? ` · "${lastHeard}"` : ""}
          </span>
        </div>
      )}

      <style>{`
        @keyframes voice-bar {
          0% { opacity: 1; }
          50% { opacity: 0.4; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
