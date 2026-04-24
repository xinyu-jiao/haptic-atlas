"use client";

import InterfaceCameraGuide from "@/components/InterfaceCameraGuide";

/**
 * One shared camera + detect + record strip for the whole app (stays mounted so the stream
 * and MediaRecorder session survive client-side route changes).
 */
export default function GlobalCameraDock() {
  return <InterfaceCameraGuide placement="fixed" autoStartRecording />;
}
