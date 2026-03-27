"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useRef, useCallback } from "react";

// Leaflet must be dynamically imported (no SSR) because it uses window
const MapView = dynamic(() => import("@/components/map/TraceMap"), { ssr: false });

interface Position {
  lat: number;
  lng: number;
  ts: number;
}

function haversineMeters(a: Position, b: Position): number {
  const R = 6371000;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) *
      Math.cos((b.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

export default function MapPage() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [tracking, setTracking] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);

  const watchIdRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);

  const totalDistance = positions.length >= 2
    ? positions.slice(1).reduce((sum, pos, i) => sum + haversineMeters(positions[i], pos), 0)
    : 0;

  const startTracking = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation not supported by this browser.");
      return;
    }
    setPositions([]);
    setElapsed(0);
    setGeoError(null);
    startTimeRef.current = Date.now();
    setTracking(true);

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        setAccuracy(Math.round(pos.coords.accuracy));
        setPositions((prev) => [
          ...prev,
          { lat: pos.coords.latitude, lng: pos.coords.longitude, ts: pos.timestamp },
        ]);
      },
      (err) => {
        setGeoError(`Location error: ${err.message}`);
        setTracking(false);
      },
      { enableHighAccuracy: true, maximumAge: 1000 }
    );

    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
  }, []);

  const stopTracking = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTracking(false);
  }, []);

  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const mm = Math.floor(elapsed / 60).toString().padStart(2, "0");
  const ss = (elapsed % 60).toString().padStart(2, "0");

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1.25rem" }}>
      <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.9rem", marginBottom: "0.5rem" }}>
        WALK TRACE
      </div>
      <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.45rem", opacity: 0.6, marginBottom: "1.5rem" }}>
        REAL-TIME ROUTE TRACKING
      </div>

      {/* Status bar */}
      <div
        className="pixel-card"
        style={{
          padding: "0.75rem 1rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1rem",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <Stat label="TIME" value={`${mm}:${ss}`} />
          <Stat label="DIST" value={`${Math.round(totalDistance)}m`} />
          <Stat label="POINTS" value={String(positions.length)} />
          {accuracy !== null && <Stat label="ACC" value={`±${accuracy}m`} />}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          {tracking && (
            <span
              className="pulse-dot"
              style={{ width: 8, height: 8, background: "var(--px-green, #44CC88)", borderRadius: "50%", display: "inline-block" }}
            />
          )}
          <span style={{ fontFamily: '"Press Start 2P"', fontSize: "0.4rem", color: "rgba(255,255,255,0.5)" }}>
            {tracking ? "LIVE" : positions.length > 0 ? "STOPPED" : "IDLE"}
          </span>
        </div>
      </div>

      {/* Error */}
      {geoError && (
        <div
          className="pixel-card"
          style={{ padding: "0.75rem 1rem", marginBottom: "1rem", background: "#8B3030" }}
        >
          <span style={{ fontFamily: '"Press Start 2P"', fontSize: "0.4rem", color: "white" }}>
            ⚠ {geoError}
          </span>
        </div>
      )}

      {/* Map */}
      <div
        style={{
          border: "3px solid var(--dark)",
          boxShadow: "3px 3px 0 var(--dark)",
          marginBottom: "1rem",
          height: 380,
          background: "#1a1a2e",
          overflow: "hidden",
        }}
      >
        <MapView positions={positions} tracking={tracking} />
      </div>

      {/* Controls */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
        <button
          onClick={startTracking}
          disabled={tracking}
          className="pixel-btn"
          style={{
            background: tracking ? "var(--dark3)" : "var(--pink)",
            color: "white",
            fontSize: "0.6rem",
            padding: "0.85rem",
          }}
        >
          ▶ START
        </button>
        <button
          onClick={stopTracking}
          disabled={!tracking}
          className="pixel-btn"
          style={{
            background: !tracking ? "var(--dark3)" : "var(--dark2)",
            color: "white",
            fontSize: "0.6rem",
            padding: "0.85rem",
          }}
        >
          ■ STOP
        </button>
      </div>

      {positions.length > 0 && !tracking && (
        <button
          onClick={() => setPositions([])}
          style={{
            marginTop: "0.5rem",
            width: "100%",
            fontFamily: '"Press Start 2P"',
            fontSize: "0.4rem",
            background: "transparent",
            color: "rgba(0,0,0,0.4)",
            border: "none",
            cursor: "pointer",
            padding: "0.5rem",
          }}
        >
          · CLEAR TRACE
        </button>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.35rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.2rem" }}>
        {label}
      </div>
      <div style={{ fontFamily: '"Press Start 2P"', fontSize: "0.6rem", color: "white" }}>
        {value}
      </div>
    </div>
  );
}
