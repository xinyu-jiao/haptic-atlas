import React from "react";

interface PixelCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  color?: string; // override background
  onClick?: () => void;
}

export default function PixelCard({
  children,
  className = "",
  style,
  color,
  onClick,
}: PixelCardProps) {
  return (
    <div
      className={`pixel-card ${className}`}
      style={{
        background: color ?? "var(--dark2)",
        borderRadius: 0,
        cursor: onClick ? "pointer" : undefined,
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
