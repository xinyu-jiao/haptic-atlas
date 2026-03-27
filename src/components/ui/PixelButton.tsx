import React from "react";

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "pink" | "dark" | "purple" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const VARIANTS = {
  pink: { background: "var(--pink)", color: "white" },
  dark: { background: "var(--dark2)", color: "white" },
  purple: { background: "var(--purple)", color: "white" },
  outline: {
    background: "transparent",
    color: "var(--dark)",
    boxShadow: "none",
    border: "3px solid var(--dark)",
  },
};

const SIZES = {
  sm: { fontSize: "0.5rem", padding: "0.5rem 0.75rem" },
  md: { fontSize: "0.65rem", padding: "0.75rem 1.25rem" },
  lg: { fontSize: "0.75rem", padding: "1rem 1.5rem" },
};

export default function PixelButton({
  variant = "dark",
  size = "md",
  fullWidth = false,
  children,
  style,
  ...props
}: PixelButtonProps) {
  const v = VARIANTS[variant];
  const s = SIZES[size];

  return (
    <button
      className="pixel-btn"
      style={{
        ...v,
        ...s,
        width: fullWidth ? "100%" : undefined,
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
