"use client";

import { usePathname } from "next/navigation";
import InterfaceCameraGuide from "@/components/InterfaceCameraGuide";
import { isCameraSessionRoute } from "@/lib/cameraRoutes";

/**
 * Renders the fixed camera strip only on `/interface` and `/session/*` so it stays one instance
 * while the user moves through the training flow, and is hidden on About, Map, Home, etc.
 */
export default function GlobalCameraHost() {
  const path = usePathname();
  if (!isCameraSessionRoute(path)) return null;
  return <InterfaceCameraGuide placement="fixed" autoStartRecording />;
}
