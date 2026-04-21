"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/about", label: "ABOUT" },
  { href: "/interface", label: "INTERFACE" },
  { href: "/history", label: "SESSIONS" },
  { href: "/map", label: "MAP" },
  { href: "/data", label: "DATA" },
  { href: "/touch-pad", label: "TOUCH" },
  { href: "/about#iteration-process", label: "PROCESS" },
  { href: "/code", label: "CODE" },
];

function isNavActive(pathname: string, routeHash: string, href: string) {
  if (href.includes("#")) {
    const [path, frag] = href.split("#");
    return pathname === path && routeHash === `#${frag}`;
  }
  if (href === "/about") {
    return pathname === "/about" && routeHash !== "#iteration-process";
  }
  return pathname === href;
}

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
  const [routeHash, setRouteHash] = useState(() =>
    typeof window !== "undefined" ? window.location.hash : "",
  );

  useEffect(() => {
    setRouteHash(typeof window !== "undefined" ? window.location.hash : "");
    const onHashChange = () => setRouteHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [pathname]);

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
          href="/about"
          style={{
            fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "#fff",
            textDecoration: "none",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
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
                color: isNavActive(pathname, routeHash, link.href) ? "#fff" : undefined,
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
                color: isNavActive(pathname, routeHash, link.href) ? "#fff" : undefined,
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
