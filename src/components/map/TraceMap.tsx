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
  const initializingRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    if (mapRef.current || initializingRef.current) return;

    let cancelled = false;
    initializingRef.current = true;

    (async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      if (cancelled || !containerRef.current) {
        initializingRef.current = false;
        return;
      }

      delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(containerRef.current, {
        center: [0, 0],
        zoom: 2,
        zoomControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);

      mapRef.current = map;
      initializingRef.current = false;
    })();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      polylineRef.current = null;
      startMarkerRef.current = null;
      endMarkerRef.current = null;
      initializingRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    if (positions.length === 0) {
      if (polylineRef.current) {
        polylineRef.current.remove();
        polylineRef.current = null;
      }
      if (startMarkerRef.current) {
        startMarkerRef.current.remove();
        startMarkerRef.current = null;
      }
      if (endMarkerRef.current) {
        endMarkerRef.current.remove();
        endMarkerRef.current = null;
      }
      return;
    }

    (async () => {
      const L = (await import("leaflet")).default;
      if (!mapRef.current) return;

      const latlngs = positions.map((p) => [p.lat, p.lng] as [number, number]);

      if (polylineRef.current) {
        polylineRef.current.setLatLngs(latlngs);
      } else {
        polylineRef.current = L.polyline(latlngs, {
          color: "#E84DC0",
          weight: 4,
          opacity: 0.9,
        }).addTo(map);
      }

      if (!startMarkerRef.current && positions.length >= 1) {
        const startIcon = L.divIcon({
          className: "",
          html: `<div style="width:14px;height:14px;background:#44CC88;border:3px solid #0F0F0F;box-shadow:2px 2px 0 #0F0F0F;"></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        });
        startMarkerRef.current = L.marker([positions[0].lat, positions[0].lng], { icon: startIcon }).addTo(map);
      }

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

      if (tracking) {
        map.setView([last.lat, last.lng], Math.max(map.getZoom(), 17));
      } else if (positions.length >= 2 && polylineRef.current) {
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
