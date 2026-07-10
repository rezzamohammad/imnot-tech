import React from "react";

export default function HudFrame({
  label,
  children,
  className = "",
}: {
  label?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`hud-corners glass relative p-5 ${className}`}
      style={{ backgroundColor: "rgba(6,9,16,0.55)" }}
    >
      {label && (
        <div
          className="absolute -top-3 left-4 px-2 text-[10px] tracking-[0.3em] uppercase font-tech text-neon-blue"
          style={{ backgroundColor: "var(--color-void)" }}
        >
          {label}
        </div>
      )}
      {children}
    </div>
  );
}
