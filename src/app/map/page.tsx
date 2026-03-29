"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useRef, useCallback } from "react";
import { loadTraces, saveTrace, deleteTrace, formatDuration } from "@/lib/session-storage";
import type { TraceRecord, TracePosition } from "@/lib/types";

const MapView = dynamic(() => import("@/components/map/TraceMap"), { ssr: false });

function haversineMeters(a: TracePosition, b: TracePosition): number {
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

function totalDistanceFromPositions(positions: TracePosition[]): number {
  if (positions.length < 2) return 0;
  return positions.slice(1).reduce((sum, pos, i) => sum + haversineMeters(positions[i], pos), 0);
}

export default function MapPage() {
  const [positions, setPositions] = useState<TracePosition[]>([]);
  const [tracking, setTracking] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [traces, setTraces] = useState<TraceRecord[]>([]);
  const [selectedTrace, setSelectedTrace] = useState<TraceRecord | null>(null);
  const [saved, setSaved] = useState(false);

  const watchIdRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);

  const totalDistance = totalDistanceFromPositions(positions);

  useEffect(() => {
    setTraces(loadTraces());
  }, []);

  const startTracking = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation not supported by this browser.");
      return;
    }
    setPositions([]);
    setElapsed(0);
    setGeoError(null);
    setSaved(false);
    setSelectedTrace(null);
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

    setPositions((currentPositions) => {
      if (currentPositions.length >= 2) {
        const now = new Date();
        const dist = totalDistanceFromPositions(currentPositions);
        const dur = Math.floor((Date.now() - startTimeRef.current) / 1000);
        const record: TraceRecord = {
          id: `trace-${Date.now()}`,
          timestamp: Date.now(),
          date: now.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
          duration: dur,
          distance: Math.round(dist),
          points: currentPositions.length,
          positions: currentPositions,
        };
        saveTrace(record);
        setTraces(loadTraces());
        setSaved(true);
      }
      return currentPositions;
    });
  }, []);

  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  function handleDeleteTrace(id: string) {
    deleteTrace(id);
    setTraces(loadTraces());
    if (selectedTrace?.id === id) {
      setSelectedTrace(null);
    }
  }

  function handleViewTrace(trace: TraceRecord) {
    if (selectedTrace?.id === trace.id) {
      setSelectedTrace(null);
      setPositions([]);
    } else {
      setSelectedTrace(trace);
      setPositions(trace.positions);
    }
  }

  const displayPositions = selectedTrace ? selectedTrace.positions : positions;
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
            <Stat label="TIME" value={selectedTrace ? formatDuration(selectedTrace.duration) : `${mm}:${ss}`} />
            <Stat label="DIST" value={selectedTrace ? `${selectedTrace.distance}m` : `${Math.round(totalDistance)}m`} />
            <Stat label="POINTS" value={String(selectedTrace ? selectedTrace.points : positions.length)} />
            {accuracy !== null && !selectedTrace && <Stat label="ACC" value={`±${accuracy}m`} />}
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
              {selectedTrace ? "Replay" : tracking ? "Live" : positions.length > 0 ? "Stopped" : "Idle"}
            </span>
          </div>
        </div>

        {/* Saved indicator */}
        {saved && !tracking && !selectedTrace && (
          <div
            className="dash-card"
            style={{ marginBottom: "1.5rem", padding: "0.75rem 1.5rem", borderColor: "#333" }}
          >
            <span style={{ fontSize: "0.8rem", color: "var(--dash-text-secondary)" }}>
              Trace saved to history.
            </span>
          </div>
        )}

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
          <MapView positions={displayPositions} tracking={tracking} />
        </div>

        {/* Controls */}
        {!selectedTrace && (
          <>
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
                onClick={() => { setPositions([]); setSaved(false); }}
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
          </>
        )}

        {selectedTrace && (
          <button
            onClick={() => { setSelectedTrace(null); setPositions([]); }}
            className="dash-btn"
            style={{ width: "100%", padding: "1rem" }}
          >
            Close Replay
          </button>
        )}

        {/* Trace History */}
        <div style={{ marginTop: "3rem" }}>
          <div className="dash-divider" />
          <div className="dash-section-label" style={{ marginTop: "2.5rem" }}>Trace History</div>

          {traces.length === 0 ? (
            <div style={{ fontSize: "0.85rem", color: "var(--dash-text-muted)", padding: "1rem 0" }}>
              No traces recorded yet. Complete a walk to see it here.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--dash-border)", border: "1px solid var(--dash-border)" }}>
              {traces.map((trace) => (
                <div
                  key={trace.id}
                  style={{
                    background: selectedTrace?.id === trace.id ? "#1a1a1a" : "var(--dash-bg)",
                    padding: "1rem 1.25rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "1.25rem",
                    cursor: "pointer",
                    transition: "background 0.15s",
                  }}
                  onClick={() => handleViewTrace(trace)}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      border: "1px solid var(--dash-border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.85rem",
                      flexShrink: 0,
                      color: selectedTrace?.id === trace.id ? "#fff" : "var(--dash-text-muted)",
                    }}
                  >
                    ↗
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.85rem", fontWeight: 500, color: "#fff", marginBottom: "0.2rem" }}>
                      {trace.distance}m · {formatDuration(trace.duration)}
                    </div>
                    <div style={{ fontSize: "0.7rem", color: "var(--dash-text-muted)" }}>
                      {trace.date} · {trace.points} points
                    </div>
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); handleDeleteTrace(trace.id); }}
                    style={{
                      background: "transparent",
                      border: "1px solid var(--dash-border)",
                      color: "var(--dash-text-muted)",
                      fontSize: "0.65rem",
                      padding: "0.3rem 0.6rem",
                      cursor: "pointer",
                      fontFamily: '"Inter", system-ui, sans-serif',
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      transition: "border-color 0.15s, color 0.15s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#555"; e.currentTarget.style.color = "#ccc"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--dash-border)"; e.currentTarget.style.color = "var(--dash-text-muted)"; }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
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
