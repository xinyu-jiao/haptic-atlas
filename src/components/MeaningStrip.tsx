import type { CSSProperties, ReactNode } from "react";

const ROW: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(11.5rem, 1fr))",
  gap: "1.5rem 1.75rem",
  width: "100%",
  minWidth: 0,
};

const CELL: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  gap: "0.85rem",
  minWidth: 0,
};

const TITLE: CSSProperties = {
  fontSize: "0.78rem",
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color: "#e8e0f0",
  lineHeight: 1.25,
  margin: 0,
};

const LINE: CSSProperties = {
  fontSize: "0.8rem",
  fontWeight: 400,
  lineHeight: 1.45,
  color: "rgba(200, 192, 210, 0.85)",
  margin: 0,
};

const items: Array<{
  id: string;
  title: string;
  lines: [string, string];
  icon: ReactNode;
}> = [
  {
    id: "dot-matrix",
    title: "Dot matrix",
    lines: ["Motor array /", "Haptic feedback"],
    icon: (
      <svg viewBox="0 0 38 38" width="44" height="44" aria-hidden>
        <circle cx="10" cy="10" r="10" fill="#9B7BC8" />
        <circle cx="28" cy="10" r="10" fill="#8A6ab8" />
        <circle cx="10" cy="28" r="10" fill="#B8A0DC" />
        <circle cx="28" cy="28" r="10" fill="#A48FD0" />
      </svg>
    ),
  },
  {
    id: "direction",
    title: "Direction",
    lines: ["Guidance /", "Navigation"],
    icon: (
      <svg viewBox="0 0 36 68" width="36" height="64" aria-hidden>
        <path
          d="M0 0 L32 32 L0 64"
          fill="none"
          stroke="#B89BDF"
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "circle",
    title: "Circle",
    lines: ["The body /", "Wearable"],
    icon: (
      <svg viewBox="-40 -40 80 80" width="56" height="56" aria-hidden>
        <circle cx="0" cy="0" r="34" fill="none" stroke="#8f6fb8" strokeWidth="8" />
      </svg>
    ),
  },
  {
    id: "waves",
    title: "Waves",
    lines: ["Vibration /", "Signal"],
    icon: (
      <svg viewBox="0 -50 100 100" width="88" height="56" aria-hidden>
        <g fill="none" stroke="#A883D2" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M0 -18 C8 -10 8 10 0 18" />
          <path d="M18 -32 C31 -18 31 18 18 32" />
          <path d="M40 -46 C59 -26 59 26 40 46" />
        </g>
      </svg>
    ),
  },
];

type Props = {
  /** Larger type + icons for Present deck / slides */
  present?: boolean;
};

/**
 * Mark meaning row: only the four graphic motifs from the brand meaning strip, copy set in the layout.
 */
export default function MeaningStrip({ present = false }: Props) {
  const row = present
    ? {
        ...ROW,
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        gap: "2rem 2.25rem" as const,
      }
    : ROW;
  const title = present ? { ...TITLE, fontSize: "1.08rem" } : TITLE;
  const line = present ? { ...LINE, fontSize: "1.12rem", lineHeight: 1.52 } : LINE;
  return (
    <div style={row} aria-label="What the mark represents">
      {items.map((item) => (
        <div key={item.id} style={CELL}>
          <div
            style={{
              flexShrink: 0,
              width: present ? "5rem" : "3.5rem",
              minHeight: present ? "5rem" : "3.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: present ? "scale(1.32)" : undefined,
              transformOrigin: "center center",
            }}
          >
            {item.icon}
          </div>
          <div style={{ minWidth: 0, paddingTop: "0.1rem" }}>
            <p style={title}>{item.title}</p>
            <p style={{ ...line, marginTop: "0.4rem" }}>{item.lines[0]}</p>
            <p style={{ ...line, marginTop: "0.15rem" }}>{item.lines[1]}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
