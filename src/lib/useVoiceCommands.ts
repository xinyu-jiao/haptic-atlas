"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type CommandMap = Record<string, () => void>;

/* eslint-disable @typescript-eslint/no-explicit-any */
type SpeechRecognitionCtor = new () => any;

function getSpeechRecognition(): SpeechRecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as any;
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function useVoiceCommands(commands: CommandMap) {
  const [listening, setListening] = useState(false);
  const [lastHeard, setLastHeard] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const commandsRef = useRef(commands);
  commandsRef.current = commands;

  const supported = getSpeechRecognition() !== null;

  const start = useCallback(() => {
    const Ctor = getSpeechRecognition();
    if (!Ctor || recognitionRef.current) return;

    const recognition = new Ctor();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event: { resultIndex: number; results: SpeechRecognitionResultList }) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (!event.results[i].isFinal) continue;
        const transcript = event.results[i][0].transcript.trim().toLowerCase();
        setLastHeard(transcript);

        for (const [keyword, action] of Object.entries(commandsRef.current)) {
          if (transcript.includes(keyword.toLowerCase())) {
            action();
            break;
          }
        }
      }
    };

    recognition.onend = () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.start(); } catch { /* already started */ }
      }
    };

    recognition.onerror = (e: { error: string }) => {
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        setListening(false);
        recognitionRef.current = null;
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  }, []);

  const stop = useCallback(() => {
    if (recognitionRef.current) {
      const r = recognitionRef.current;
      recognitionRef.current = null;
      r.stop();
      setListening(false);
    }
  }, []);

  const toggle = useCallback(() => {
    if (listening) stop();
    else start();
  }, [listening, start, stop]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        const r = recognitionRef.current;
        recognitionRef.current = null;
        r.stop();
      }
    };
  }, []);

  return { listening, lastHeard, supported, start, stop, toggle };
}
