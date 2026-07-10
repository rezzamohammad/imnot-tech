"use client";
import { useEffect, useState } from "react";

const STATUSES = [
  "calibrating existential dread",
  "aligning shareholder vibes",
  "compiling undefined specification",
  "negotiating with the future",
  "loading roadmap (file missing)",
  "optimizing coffee-to-code ratio",
  "summoning revolutionary energy",
  "defragmenting scope creep",
  "training AI exclusively on hype",
  "consulting the void",
];

export default function AbsurdProgress({
  className = "",
}: {
  className?: string;
}) {
  const [value, setValue] = useState(7);
  const [status, setStatus] = useState(STATUSES[0]);

  useEffect(() => {
    const id = setInterval(() => {
      setValue((v) => {
        let next = v + Math.random() * 3.2;
        if (Math.random() > 0.92) next = Math.random() * 30; // absurd regression
        if (next >= 99.9) next = 4 + Math.random() * 12; // never finishes
        return Math.min(99.9, next);
      });
      setStatus(STATUSES[Math.floor(Math.random() * STATUSES.length)]);
    }, 850);
    return () => clearInterval(id);
  }, []);

  const pct = value.toFixed(1);

  return (
    <div className={className}>
      <div className="flex items-center justify-between font-tech text-[11px] uppercase tracking-widest text-neon-blue/80 mb-1">
        <span>{status}</span>
        <span className="text-neon-green">{pct}%</span>
      </div>
      <div
        className="h-3 w-full rounded-full overflow-hidden"
        style={{
          backgroundColor: "rgba(56,225,255,0.08)",
          border: "1px solid rgba(56,225,255,0.25)",
        }}
      >
        <div
          className="h-full transition-[width] duration-700 ease-out"
          style={{
            width: `${value}%`,
            background:
              "linear-gradient(90deg, #38e1ff, #b26bff, #3dffa0)",
            boxShadow: "0 0 14px rgba(56,225,255,0.6)",
          }}
        />
      </div>
      <div className="mt-1 font-mono text-[10px] text-dim">
        ETA: ∞ &nbsp;|&nbsp; remaining: undefined &nbsp;|&nbsp; status: building
        something revolutionary
      </div>
    </div>
  );
}
