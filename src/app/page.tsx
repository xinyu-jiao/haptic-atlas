"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Root URL loads About; the pixel training launcher lives at `/interface`. */
export default function RootRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/about");
  }, [router]);

  return (
    <div
      className="dash-page"
      style={{
        minHeight: "45vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--dash-text-muted)",
        fontSize: "0.875rem",
        letterSpacing: "0.04em",
      }}
    >
      Loading
    </div>
  );
}
