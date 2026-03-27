"use client";

import { useEffect, useRef } from "react";

interface Position {
  lat: number;
  lng: number;
  ts: number;
}

interface TraceMapProps {
  positions: Position[];
  tracking: boolean;
}

export default function TraceMap({ positions, tracking }: TraceMapProps) {
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const polylineRef = useRef<import("leaflet").Polyline | null>(null);
  const startMarkerRef = useRef<import("leaflet").Marker | null>(null);
  const endMarkerRef = useRef<import("leaflet").Marker | null>(null);

  // Initialize map
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    if (mapRef.current) return;

    (async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      // Fix default icon paths for Next.js
      delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(containerRef.current!, {
        center: [0, 0],
        zoom: 2,
        zoomControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);

      mapRef.current = map;
    })();

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // Update polyline when positions change
  useEffect(() => {
    if (!mapRef.current || positions.length === 0) return;

    (async () => {
      const L = (await import("leaflet")).default;
      const map = mapRef.current!;
      const latlngs = positions.map((p) => [p.lat, p.lng] as [number, number]);

      // Polyline
      if (polylineRef.current) {
        polylineRef.current.setLatLngs(latlngs);
      } else {
        polylineRef.current = L.polyline(latlngs, {
          color: "#E84DC0",
          weight: 4,
          opacity: 0.9,
        }).addTo(map);
      }

      // Start marker (first position only)
      if (!startMarkerRef.current && positions.length === 1) {
        const startIcon = L.divIcon({
          className: "",
          html: `<div style="width:14px;height:14px;background:#44CC88;border:3px solid #0F0F0F;box-shadow:2px 2px 0 #0F0F0F;"></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        });
        startMarkerRef.current = L.marker([positions[0].lat, positions[0].lng], { icon: startIcon }).addTo(map);
      }

      // End / current position marker
      const last = positions[positions.length - 1];
      if (endMarkerRef.current) {
        endMarkerRef.current.setLatLng([last.lat, last.lng]);
      } else {
        const endIcon = L.divIcon({
          className: "",
          html: `<div style="width:14px;height:14px;background:#E84DC0;border:3px solid #0F0F0F;box-shadow:2px 2px 0 #0F0F0F;"></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        });
        endMarkerRef.current = L.marker([last.lat, last.lng], { icon: endIcon }).addTo(map);
      }

      // Pan to current position if tracking
      if (tracking) {
        map.setView([last.lat, last.lng], Math.max(map.getZoom(), 17));
      } else if (positions.length >= 2) {
        map.fitBounds(polylineRef.current.getBounds(), { padding: [24, 24] });
      }
    })();
  }, [positions, tracking]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        background: "#1a1a2e",
      }}
    />
  );
}
