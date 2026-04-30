"use client";

import { useRef, useState, useCallback, useEffect, useLayoutEffect } from "react";
import type { ObjectDetection, DetectedObject } from "@tensorflow-models/coco-ssd";
import type { MobileNet } from "@tensorflow-models/mobilenet";
import { speak } from "@/lib/speak";
import { saveWebmToLocal } from "@/lib/saveWebmToLocal";

const SPEAK_COOLDOWN_MS = 5500;
const COCO_MIN_SCORE = 0.48;
const IMAGENET_MIN = 0.1;
const LOOP_MS = 1200;
const RECORD_SEGMENT_MS = 45_000;

const lastKeyTime = new Map<string, number>();

function tryAnnounce(key: string, text: string) {
  const t = lastKeyTime.get(key) ?? 0;
  const now = Date.now();
  if (now - t < SPEAK_COOLDOWN_MS) return;
  lastKeyTime.set(key, now);
  speak(text);
}

const COCO_PHRASE: Partial<Record<string, string>> = {
  person: "A person in front of you.",
  car: "Car ahead.",
  bus: "Bus ahead.",
  truck: "Truck ahead.",
  motorcycle: "Motorcycle ahead.",
  chair: "A chair in view.",
  bench: "A bench in view.",
  "stop sign": "Stop sign ahead.",
  "traffic light": "Traffic light ahead.",
  "fire hydrant": "A fire hydrant nearby.",
  dog: "A dog in view.",
  cat: "A cat in view.",
  "cell phone": "Phone in view.",
};

/** Heuristic on ImageNet labels (not perfect; best-effort in-browser). */
function lineFromImagenet(className: string, p: number): { speak: string | null; key: string } {
  if (p < IMAGENET_MIN) return { speak: null, key: className };
  const c = className.toLowerCase();
  if (c.includes("door") || c.includes("turnstile") || c.includes("labyrinth")) {
    if (c.includes("turnstile") && p > 0.18) return { speak: "The turnstile is in front. ", key: "turnstile" };
    if (c.includes("door") && p > 0.12) return { speak: "Open the door. ", key: "door" };
  }
  if (/\bstairs?|bannister|balcony|railing|escalator|step|stile\b/.test(c) && p > 0.2) {
    return { speak: "Stairs or steps ahead.", key: "stairs" };
  }
  if (/\bwindow|shutter|louvers?\b/.test(c) && p > 0.22) {
    return { speak: "A window in view.", key: "window" };
  }
  if (/\b(gate|arch|palace|street sign)\b/.test(c) && p > 0.3) {
    return { speak: "An opening or sign ahead.", key: "scene" };
  }
  return { speak: null, key: className };
}

type Phase = "idle" | "loading" | "ready" | "error";

const SESSION_LOG_KEY = "haptic-atlas-cam-log";

function appendSessionLogLine(line: string) {
  if (typeof sessionStorage === "undefined") return;
  try {
    const raw = sessionStorage.getItem(SESSION_LOG_KEY);
    const arr: string[] = raw ? (JSON.parse(raw) as string[]) : [];
    arr.push(`${new Date().toISOString()}\t${line}`);
    while (arr.length > 400) arr.shift();
    sessionStorage.setItem(SESSION_LOG_KEY, JSON.stringify(arr));
  } catch {
    /* ignore quota */
  }
}

function exportSessionLog() {
  if (typeof sessionStorage === "undefined") return;
  const raw = sessionStorage.getItem(SESSION_LOG_KEY);
  if (!raw) return;
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([raw], { type: "application/json" }));
  a.download = `haptic-atlas-cam-log-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
}

export type CameraGuideProps = {
  /** inline: in page flow. fixed: bottom-right on all routes, single instance (stream survives navigation). */
  placement?: "inline" | "fixed";
  /** When fixed: start WebM capture as soon as the stream is ready (stops + saves when you turn camera off or press Stop). */
  autoStartRecording?: boolean;
};

export default function InterfaceCameraGuide({ placement = "inline", autoStartRecording = false }: CameraGuideProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const loopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cocoRef = useRef<ObjectDetection | null>(null);
  const mnetRef = useRef<MobileNet | null>(null);
  const tickInFlight = useRef(false);
  const recRef = useRef<MediaRecorder | null>(null);
  const recSegmentTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const keepRecordingRef = useRef(false);
  const chunksRef = useRef<Blob[]>([]);
  const mayAutoStartRecording = useRef(true);
  const startRecordRef = useRef<() => void>(() => {});
  /** Set after first successful camera+stream; avoids auto re-prompt when user turns Off. */
  const dataFlowBootCompletedRef = useRef(false);
  const enableInFlightRef = useRef(false);
  const phaseRef = useRef<Phase>("idle");

  const [phase, setPhase] = useState<Phase>("idle");
  const [err, setErr] = useState<string | null>(null);
  const [logLines, setLogLines] = useState<string[]>([]);
  const [recOn, setRecOn] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  useLayoutEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  const pushLog = useCallback(
    (line: string) => {
      setLogLines((prev) => [line, ...prev].slice(0, placement === "fixed" ? 8 : 6));
      if (placement === "fixed") appendSessionLogLine(line);
    },
    [placement],
  );

  const clearLoop = useCallback(() => {
    if (loopTimerRef.current != null) {
      clearTimeout(loopTimerRef.current);
      loopTimerRef.current = null;
    }
  }, []);

  const clearRecSegmentTimer = useCallback(() => {
    if (recSegmentTimerRef.current) {
      clearTimeout(recSegmentTimerRef.current);
      recSegmentTimerRef.current = null;
    }
  }, []);

  const releaseModels = useCallback(() => {
    const coco = cocoRef.current as { dispose?: () => void } | null;
    const mnet = mnetRef.current as { dispose?: () => void } | null;
    try {
      coco?.dispose?.();
    } catch {
      /* ignore model disposal errors */
    }
    try {
      mnet?.dispose?.();
    } catch {
      /* ignore model disposal errors */
    }
    cocoRef.current = null;
    mnetRef.current = null;
    tickInFlight.current = false;
    void import("@tensorflow/tfjs")
      .then((tf) => {
        try {
          tf.disposeVariables();
        } catch {
          /* best-effort */
        }
      })
      .catch(() => {
        /* best-effort */
      });
  }, []);

  const stopStream = useCallback(() => {
    clearLoop();
    clearRecSegmentTimer();
    keepRecordingRef.current = false;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    if (recRef.current?.state === "recording") {
      try {
        recRef.current.stop();
      } catch {
        /* empty */
      }
    }
    setRecOn(false);
    setAnalyzing(false);
    setPhase("idle");
    mayAutoStartRecording.current = true;
    releaseModels();
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, [clearLoop, clearRecSegmentTimer, releaseModels]);

  const loadModels = useCallback(async () => {
    if (cocoRef.current && mnetRef.current) return;
    const tf = await import("@tensorflow/tfjs");
    const backend = await tf.setBackend("webgl");
    if (!backend) await tf.setBackend("cpu");
    await tf.ready();
    const cocoMod = await import("@tensorflow-models/coco-ssd");
    const mMod = await import("@tensorflow-models/mobilenet");
    const [c, m] = await Promise.all([cocoMod.load({ base: "lite_mobilenet_v2" }), mMod.load({ version: 2, alpha: 0.5 })]);
    cocoRef.current = c;
    mnetRef.current = m;
  }, []);

  const runFrame = useCallback(
    async (v: HTMLVideoElement) => {
      const coco = cocoRef.current;
      const m = mnetRef.current;
      if (!coco || !m || v.readyState < 2) return;
      if (tickInFlight.current) return;
      tickInFlight.current = true;
      setAnalyzing(true);
      let said = false;
      try {
        const [cocoa, imgk] = await Promise.all([coco.detect(v, 8, 0.4), m.classify(v, 3)]);

        for (const row of imgk) {
          if (row.probability < IMAGENET_MIN) continue;
          const { speak: line, key } = lineFromImagenet(row.className, row.probability);
          if (line) {
            if (row.probability >= 0.18) {
              tryAnnounce(`in:${key}`, line);
              said = true;
            }
            pushLog(`[scene] ${row.className} ${(row.probability * 100).toFixed(0)}%`);
            break;
          }
        }

        const hits = (cocoa as DetectedObject[]).filter((d) => d.score >= COCO_MIN_SCORE);
        if (hits.length) {
          hits.sort((a, b) => b.score - a.score);
          if (!said) {
            const top = hits[0];
            const phrase = COCO_PHRASE[top.class] || `A ${top.class} in view. `;
            tryAnnounce(`co:${top.class}`, phrase);
          }
          pushLog(`[objects] ${hits.slice(0, 3).map((h) => `${h.class} $${(h.score * 100).toFixed(0)}%`).join(" · ")}`);
        }
      } catch (e) {
        console.warn("InterfaceCameraGuide", e);
      } finally {
        setAnalyzing(false);
        tickInFlight.current = false;
      }
    },
    [pushLog],
  );

  const scheduleLoop = useCallback(
    (v: HTMLVideoElement) => {
      const tick = () => {
        if (!streamRef.current || !v.srcObject) return;
        void runFrame(v);
        loopTimerRef.current = setTimeout(tick, LOOP_MS);
      };
      void runFrame(v);
      loopTimerRef.current = setTimeout(tick, LOOP_MS);
    },
    [runFrame],
  );

  const enable = useCallback(async () => {
    if (enableInFlightRef.current) return;
    enableInFlightRef.current = true;
    setErr(null);
    setPhase("loading");
    try {
      await loadModels();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" }, width: { ideal: 640 } },
        audio: false,
      });
      const v = videoRef.current;
      if (!v) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }
      streamRef.current = stream;
      v.srcObject = stream;
      v.muted = true;
      v.playsInline = true;
      setPhase("ready");
      await v.play();
      clearLoop();
      scheduleLoop(v);
      if (placement === "fixed") {
        dataFlowBootCompletedRef.current = true;
        pushLog("[data] camera on — tap Rec to record WebM; detection runs while preview is on.");
      }
    } catch (e) {
      console.error("CameraGuide enable", e);
      setPhase("error");
      const name = (e as { name?: string })?.name ?? "";
      if (name === "NotAllowedError" || name === "NotFoundError" || name === "NotReadableError" || /Permission|getUserMedia/i.test(String((e as Error).message || ""))) {
        setErr("Camera not available. Allow access or use https / localhost.");
      } else {
        setErr("Could not start camera or load models. Check network and try again.");
      }
    } finally {
      enableInFlightRef.current = false;
    }
  }, [loadModels, scheduleLoop, clearLoop, placement, pushLog]);

  const startRecord = useCallback(() => {
    const s = streamRef.current;
    if (!s) return;
    if (recRef.current?.state === "recording") return;
    if (recOn) return;
    const mime = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
      ? "video/webm;codecs=vp9"
      : MediaRecorder.isTypeSupported("video/webm")
        ? "video/webm"
        : "";
    if (!mime) {
      setErr("This browser cannot record webm. ");
      if (placement === "fixed" && autoStartRecording) {
        mayAutoStartRecording.current = false;
      }
      return;
    }
    chunksRef.current = [];
    keepRecordingRef.current = true;
    const r = new MediaRecorder(s, { mimeType: mime, videoBitsPerSecond: 2_000_000 });
    r.ondataavailable = (e) => {
      if (e.data.size) chunksRef.current.push(e.data);
    };
    r.onstop = () => {
      clearRecSegmentTimer();
      const type = chunksRef.current[0]?.type ?? "video/webm";
      const chunkCopy = chunksRef.current.slice();
      chunksRef.current = [];
      const b = new Blob(chunkCopy, { type });
      const fileName = `haptic-atlas-camera-${Date.now()}.webm`;
      setRecOn(false);
      const place = placement;
      const doAuto = autoStartRecording;
      void (async () => {
        try {
          const mode = await saveWebmToLocal(b, fileName);
          if (place === "fixed") {
            const via = mode === "file-picker" ? "file dialog" : "download";
            pushLog(`[data] video saved (${via}): ${fileName}`);
          }
        } catch (e) {
          console.error("InterfaceCameraGuide save", e);
          setErr("Could not save the recorded video. Try again or use another browser.");
        }
        if (place === "fixed" && doAuto && streamRef.current) {
          setTimeout(() => {
            if (!streamRef.current) return;
            if (recRef.current?.state === "recording") return;
            mayAutoStartRecording.current = true;
            startRecordRef.current();
          }, 350);
          return;
        }
        if (keepRecordingRef.current && streamRef.current) {
          setTimeout(() => {
            if (!keepRecordingRef.current || !streamRef.current) return;
            if (recRef.current?.state === "recording") return;
            startRecordRef.current();
          }, 220);
        }
      })();
    };
    r.start(400);
    recRef.current = r;
    setRecOn(true);
    clearRecSegmentTimer();
    recSegmentTimerRef.current = setTimeout(() => {
      if (recRef.current?.state === "recording") {
        if (placement === "fixed") {
          pushLog("[data] segment reached 45s; saving and continuing to keep memory stable.");
        }
        recRef.current.stop();
      }
    }, RECORD_SEGMENT_MS);
    if (placement === "fixed" && autoStartRecording) {
      mayAutoStartRecording.current = false;
    }
  }, [recOn, placement, autoStartRecording, pushLog, clearRecSegmentTimer]);

  useLayoutEffect(() => {
    startRecordRef.current = startRecord;
  }, [startRecord]);

  const stopRecord = useCallback(() => {
    keepRecordingRef.current = false;
    clearRecSegmentTimer();
    if (recRef.current && recRef.current.state === "recording") {
      recRef.current.stop();
    }
  }, [clearRecSegmentTimer]);

  const fixedAuto = placement === "fixed" && autoStartRecording;
  useEffect(() => {
    if (!fixedAuto) return;
    if (phase !== "ready" || recOn) return;
    if (!mayAutoStartRecording.current) return;
    const t = window.setTimeout(() => {
      if (recRef.current?.state === "recording") return;
      if (!streamRef.current) return;
      startRecord();
    }, 450);
    return () => clearTimeout(t);
  }, [fixedAuto, phase, recOn, startRecord]);

  useEffect(() => () => stopStream(), [stopStream]);

  const onOff = phase === "ready" ? "Off" : "Camera";
  const isFixed = placement === "fixed";

  return (
    <div
      style={
        isFixed
          ? {
              position: "fixed",
              zIndex: 10050,
              bottom: "max(0.4rem, env(safe-area-inset-bottom, 0px))",
              right: "max(0.4rem, env(safe-area-inset-right, 0px))",
              maxWidth: "min(100vw - 0.85rem, 19rem)",
              padding: "0.45rem 0.55rem 0.5rem",
              background: "rgba(15, 15, 15, 0.95)",
              border: "2px solid #333",
              boxShadow: "0 3px 18px rgba(0,0,0,0.45)",
              color: "white",
              fontFamily: "'Inter', system-ui, sans-serif",
            }
          : {
              margin: "0 0 1.1rem",
              width: "100%",
              color: "white",
              fontFamily: "'Inter', system-ui, sans-serif",
            }
      }
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "0.4rem 0.5rem",
        }}
      >
        <span
          style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: "0.45rem",
            color: "var(--pink)",
            letterSpacing: "0.1em",
            marginRight: "0.15rem",
          }}
        >
          CAM
        </span>
        <button
          type="button"
          className="pixel-btn"
          disabled={phase === "loading"}
          onClick={() => {
            if (phase === "ready") {
              clearLoop();
              stopStream();
              return;
            }
            void enable();
          }}
          style={{ fontSize: "0.48rem", padding: "0.4rem 0.55rem", fontFamily: '"Press Start 2P", monospace' }}
        >
          {phase === "loading" ? "…" : onOff}
        </button>

        <div
          style={{
            width: phase === "ready" ? 88 : 0,
            height: phase === "ready" ? 66 : 0,
            borderRadius: 2,
            overflow: "hidden",
            background: "#0a0a0a",
            border: phase === "ready" ? "1px solid var(--dark3)" : "none",
            flexShrink: 0,
            opacity: phase === "ready" ? 1 : 0,
            position: "relative",
          }}
          aria-hidden={phase !== "ready"}
        >
          <video
            ref={videoRef}
            style={{ width: 88, height: 66, objectFit: "cover", display: "block" }}
            playsInline
            muted
          />
        </div>
        {phase === "ready" && (
          <>
            <button
              type="button"
              className="pixel-btn"
              disabled={recOn}
              onClick={startRecord}
              style={{ fontSize: "0.45rem", padding: "0.4rem 0.5rem", fontFamily: '"Press Start 2P", monospace' }}
            >
              Rec
            </button>
            <button
              type="button"
              className="pixel-btn"
              disabled={!recOn}
              onClick={stopRecord}
              style={{ fontSize: "0.45rem", padding: "0.4rem 0.5rem", fontFamily: '"Press Start 2P", monospace' }}
            >
              Stop
            </button>
            {recOn && (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  fontFamily: '"Press Start 2P", monospace',
                }}
                aria-live="polite"
              >
                <span className="camera-rec-dot" title="Recording" />
                <span style={{ fontSize: "0.4rem", color: "#ff6a6a", letterSpacing: "0.2em" }}>REC</span>
              </div>
            )}
            {analyzing && <span style={{ fontSize: "0.5rem", color: "rgba(200, 190, 220, 0.7)" }}>·</span>}
            {isFixed && (
              <button
                type="button"
                className="pixel-btn"
                onClick={exportSessionLog}
                style={{ fontSize: "0.4rem", padding: "0.32rem 0.45rem" }}
                title="Download detection log for this tab (JSON)"
              >
                Log
              </button>
            )}
          </>
        )}
      </div>

      {isFixed ? (
        <p
          style={{
            fontSize: "0.5rem",
            lineHeight: 1.45,
            color: "rgba(255,255,255,0.5)",
            margin: "0.35rem 0 0",
            maxWidth: "19rem",
          }}
        >
          Tap <strong style={{ color: "rgba(255,255,255,0.75)" }}>Camera</strong> to allow the camera, then{" "}
          <strong style={{ color: "rgba(255,255,255,0.75)" }}>Rec</strong> to save WebM. Long-press the page for voice
          commands (mic) — not started automatically. Tap Off to release stream + model memory.
        </p>
      ) : (
        <p
          style={{
            fontSize: "0.52rem",
            lineHeight: 1.45,
            color: "rgba(255,255,255,0.55)",
            margin: "0.45rem 0 0",
            maxWidth: "19rem",
          }}
        >
          On-device detect (approx.). Turn camera on, then Rec saves WebM. Good light helps.
        </p>
      )}
      {err && <p style={{ fontSize: "0.5rem", color: "#ff9a9a", margin: "0.35rem 0 0" }}>{err}</p>}
      {logLines.length > 0 && (
        <div style={{ fontSize: "0.45rem", color: "rgba(200, 190, 220, 0.8)", lineHeight: 1.35, marginTop: "0.4rem" }}>
          {logLines.map((L, i) => (
            <div key={i} style={{ opacity: 0.9 }}>
              {L}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
