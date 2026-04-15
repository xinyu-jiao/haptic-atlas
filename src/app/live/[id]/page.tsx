"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { subscribeLiveLocation, type LiveLocation } from "@/lib/firestore-live";
import type { TracePosition } from "@/lib/types";

const MapView = dynamic(() => import("@/components/map/TraceMap"), { ssr: false });

export default function LivePage() {
  const params = useParams();
  const liveId = params.id as string;

  const [data, setData] = useState<LiveLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [positions, setPositions] = useState<TracePosition[]>([]);
  const lastTsRef = useRef(0);

  useEffect(() => {
    if (!liveId) return;

    const unsub = subscribeLiveLocation(liveId, (loc) => {
      setLoading(false);
      setData(loc);
      if (loc && loc.status === "active" && loc.timestamp !== lastTsRef.current) {
        lastTsRef.current = loc.timestamp;
        setPositions((prev) => [
          ...prev,
          { lat: loc.lat, lng: loc.lng, ts: loc.timestamp },
        ]);
      }
    });

    return () => unsub();
  }, [liveId]);

  const elapsed = data?.elapsed ?? 0;
  const mm = Math.floor(elapsed / 60).toString().padStart(2, "0");
  const ss = (elapsed % 60).toString().padStart(2, "0");

  const isActive = data?.status === "active";
  const lastUpdate = data?.timestamp
    ? new Date(data.timestamp).toLocaleTimeString()
    : "--";

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      color: "#fff",
      fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
    }}>
      {/* Header */}
      <div style={{
        padding: "1.25rem 1.5rem",
        borderBottom: "1px solid #222",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div>
          <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.25rem" }}>
            HAPTIC ATLAS
          </div>
          <div style={{ fontSize: "0.65rem", color: "#888", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Live Location
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {isActive && (
            <span style={{
              width: 8, height: 8,
              background: "#44CC88", borderRadius: "50%",
              display: "inline-block",
              animation: "pulse-dot 1.5s ease-in-out infinite",
            }} />
          )}
          <span style={{
            fontSize: "0.65rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: isActive ? "#44CC88" : "#888",
          }}>
            {loading ? "CONNECTING..." : isActive ? "LIVE" : "ENDED"}
          </span>
        </div>
      </div>

      {loading ? (
        <div style={{ padding: "4rem 2rem", textAlign: "center" }}>
          <div style={{ fontSize: "0.85rem", color: "#888" }}>Connecting to live session...</div>
        </div>
      ) : !data ? (
        <div style={{ padding: "4rem 2rem", textAlign: "center" }}>
          <div style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.5rem" }}>Session Not Found</div>
          <div style={{ fontSize: "0.85rem", color: "#888" }}>
            This live session link is invalid or has expired.
          </div>
        </div>
      ) : (
        <>
          {/* Map */}
          <div style={{ height: "55vh", borderBottom: "1px solid #222" }}>
            <MapView positions={positions} tracking={isActive} />
          </div>

          {/* Info */}
          <div style={{ padding: "1.5rem" }}>
            {/* Stats */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
              gap: "1px", background: "#222", marginBottom: "1.5rem",
              border: "1px solid #222",
            }}>
              <StatCard label="DURATION" value={`${mm}:${ss}`} />
              <StatCard label="POINTS" value={String(positions.length)} />
              <StatCard label="LAST UPDATE" value={lastUpdate} />
            </div>

            {/* User info */}
            <div style={{
              border: "1px solid #222", padding: "1rem 1.25rem",
              display: "flex", alignItems: "center", gap: "1rem",
            }}>
              <div style={{
                width: 36, height: 36,
                border: "1px solid #333", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.85rem",
              }}>
                ◉
              </div>
              <div>
                <div style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                  {data.userName}
                </div>
                <div style={{ fontSize: "0.75rem", color: "#888", marginTop: "0.15rem" }}>
                  {isActive
                    ? "Currently in a haptic navigation session"
                    : "Session has ended"}
                </div>
              </div>
            </div>

            {!isActive && (
              <div style={{
                marginTop: "1.5rem", padding: "1rem 1.25rem",
                border: "1px solid #222", textAlign: "center",
              }}>
                <div style={{ fontSize: "0.75rem", color: "#888", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Session Ended
                </div>
                <div style={{ fontSize: "0.7rem", color: "#555", marginTop: "0.4rem" }}>
                  The user has completed their navigation session.
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ background: "#0a0a0a", padding: "1rem", textAlign: "center" }}>
      <div style={{ fontSize: "0.6rem", color: "#888", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.4rem" }}>
        {label}
      </div>
      <div style={{ fontSize: "1rem", fontWeight: 600 }}>{value}</div>
    </div>
  );
}
