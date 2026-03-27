"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/history", label: "SESSIONS" },
  { href: "/map", label: "MAP" },
  { href: "/data", label: "DATA" },
  { href: "/iterations", label: "PROCESS" },
  { href: "/code", label: "CODE" },
  { href: "/missing", label: "MISSING" },
];

// Hide nav during the active session flow
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
        background: "var(--dark)",
        borderBottom: "3px solid var(--dark)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0.6rem 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: "0.6rem",
            color: "var(--pink)",
            textDecoration: "none",
            letterSpacing: "0.1em",
          }}
        >
          ◈ HAPTIC ATLAS
        </Link>

        {/* Desktop links */}
        <div
          className="hidden md:flex"
          style={{ gap: "0.25rem", alignItems: "center" }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link"
              style={{
                color:
                  pathname === link.href
                    ? "var(--bg)"
                    : "rgba(195,168,212,0.8)",
                background: pathname === link.href ? "var(--pink)" : undefined,
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: '"Press Start 2P", monospace',
            fontSize: "0.6rem",
            color: "var(--pink)",
          }}
        >
          {open ? "✕" : "≡"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            borderTop: "2px solid var(--dark3)",
            padding: "0.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link"
              onClick={() => setOpen(false)}
              style={{
                color:
                  pathname === link.href ? "var(--bg)" : "rgba(195,168,212,0.8)",
                background: pathname === link.href ? "var(--pink)" : undefined,
                display: "block",
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
