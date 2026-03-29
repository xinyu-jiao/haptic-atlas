"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useRef, useCallback } from "react";

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
    <div className="dash-page">
      <div className="dash-container">
        <h1 className="dash-title">Walk Trace</h1>
        <div className="dash-subtitle">Real-time Route Tracking</div>

        {/* Status bar */}
        <div
          className="dash-card"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2rem",
            marginBottom: "1.5rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: "2rem" }}>
            <Stat label="TIME" value={`${mm}:${ss}`} />
            <Stat label="DIST" value={`${Math.round(totalDistance)}m`} />
            <Stat label="POINTS" value={String(positions.length)} />
            {accuracy !== null && <Stat label="ACC" value={`±${accuracy}m`} />}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {tracking && (
              <span
                style={{
                  width: 8,
                  height: 8,
                  background: "#fff",
                  borderRadius: "50%",
                  display: "inline-block",
                  animation: "pulse-dot 1.5s ease-in-out infinite",
                }}
              />
            )}
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: "var(--dash-text-muted)", textTransform: "uppercase" }}>
              {tracking ? "Live" : positions.length > 0 ? "Stopped" : "Idle"}
            </span>
          </div>
        </div>

        {/* Error */}
        {geoError && (
          <div
            className="dash-card"
            style={{ marginBottom: "1.5rem", borderColor: "#444" }}
          >
            <span style={{ fontSize: "0.8rem", color: "#ccc" }}>
              {geoError}
            </span>
          </div>
        )}

        {/* Map */}
        <div
          style={{
            border: "1px solid var(--dash-border)",
            marginBottom: "1.5rem",
            height: 400,
            background: "#111",
            overflow: "hidden",
          }}
        >
          <MapView positions={positions} tracking={tracking} />
        </div>

        {/* Controls */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "var(--dash-border)" }}>
          <button
            onClick={startTracking}
            disabled={tracking}
            className="dash-btn"
            style={{
              background: tracking ? "#111" : "var(--dash-bg)",
              padding: "1rem",
              borderWidth: 0,
            }}
          >
            ▶ START
          </button>
          <button
            onClick={stopTracking}
            disabled={!tracking}
            className="dash-btn"
            style={{
              background: !tracking ? "#111" : "var(--dash-bg)",
              padding: "1rem",
              borderWidth: 0,
            }}
          >
            ■ STOP
          </button>
        </div>

        {positions.length > 0 && !tracking && (
          <button
            onClick={() => setPositions([])}
            style={{
              marginTop: "1rem",
              width: "100%",
              fontFamily: '"Inter", system-ui, sans-serif',
              fontSize: "0.75rem",
              background: "transparent",
              color: "var(--dash-text-muted)",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Clear Trace
          </button>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="dash-label" style={{ marginBottom: "0.3rem", fontSize: "0.6rem" }}>
        {label}
      </div>
      <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "#fff" }}>
        {value}
      </div>
    </div>
  );
}
