"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { assetUrl, LOGO_MARK_PATH } from "@/lib/assetUrl";

const NAV_LINKS = [
  { href: "/present", label: "PRESENT" },
  { href: "/video", label: "VIDEO" },
  { href: "/touch-pad", label: "TOUCH" },
  { href: "/interface", label: "INTERFACE" },
  { href: "/history", label: "SESSIONS · DATA" },
  { href: "/map", label: "MAP · CODE" },
];

const SESSION_PATHS = [
  "/session/level",
  "/session/role",
  "/session/setup",
  "/session/active",
  "/session/complete",
];

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isSessionFlow = SESSION_PATHS.some((p) => pathname.startsWith(p));
  if (isSessionFlow) return null;

  return (
    <nav
      style={{
        background: "#0a0a0a",
        borderBottom: "1px solid #222",
        position: "sticky",
        top: 0,
        zIndex: 100,
        fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0.75rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/present"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "#fff",
            textDecoration: "none",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          <img
            src={assetUrl(LOGO_MARK_PATH)}
            alt=""
            width={40}
            height={40}
            style={{
              display: "block",
              height: 40,
              width: 40,
              objectFit: "contain",
              filter: "brightness(1.2) contrast(1.04)",
            }}
          />
          HAPTIC ATLAS
        </Link>

        <div
          className="hidden md:flex"
          style={{ gap: "0.15rem", alignItems: "center" }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link"
              style={{
                color: pathname === link.href ? "#fff" : undefined,
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: '"Inter", system-ui, sans-serif',
            fontSize: "1.2rem",
            color: "#888",
            padding: "0.25rem",
          }}
        >
          {open ? "✕" : "≡"}
        </button>
      </div>

      {open && (
        <div
          style={{
            borderTop: "1px solid #222",
            padding: "0.5rem 1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.15rem",
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link"
              onClick={() => setOpen(false)}
              style={{
                color: pathname === link.href ? "#fff" : undefined,
                display: "block",
                padding: "0.6rem 0.7rem",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
