"use client";
import { useEffect, useRef, useState } from "react";

const LINES = [
  "> booting imnot.tech core ............ OK",
  "> loading ambition module ............ FAILED",
  "[WARN] motivation.dll not found — continuing anyway",
  "> initializing revolutionary engine ...",
  "[ERR] what are we building? => undefined",
  "> fetching roadmap from /dev/null ...",
  "[OK] existential dread calibrated",
  "> synthesizing hype ................ 9999%",
  "[WARN] product definition still undefined",
  "> deploying to production (someday)",
  "[STATUS] BUILDING SOMETHING REVOLUTIONARY",
  "> coffee_level = 87%  -> within optimal range",
  "[ERR] scope creep detected. pivoting.",
  "> contacting future customers ........ 0 found",
  "[OK] vibes: immaculate",
  "> querying investor patience ......... infinite",
  "[ERR] timeline.so => 404 not found",
];

function randomLine() {
  return LINES[Math.floor(Math.random() * LINES.length)];
}

export default function TerminalLog({
  height = "h-64",
  className = "",
}: {
  height?: string;
  className?: string;
}) {
  const [lines, setLines] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLines(LINES.slice(0, 4));
    let i = 4;
    const id = setInterval(() => {
      setLines((prev) => {
        const next = [...prev, randomLine()];
        return next.slice(-12);
      });
      i++;
    }, 1100);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [lines]);

  return (
    <div
      ref={ref}
      className={`font-mono text-[12px] leading-relaxed overflow-hidden rounded-md p-3 ${height} ${className}`}
      style={{
        backgroundColor: "rgba(2,4,9,0.85)",
        border: "1px solid rgba(61,255,160,0.25)",
        boxShadow: "inset 0 0 24px rgba(61,255,160,0.06)",
      }}
    >
      {lines.map((l, i) => {
        const color = l.includes("[ERR]")
          ? "text-neon-magenta"
          : l.includes("[WARN]")
            ? "text-neon-purple"
            : l.includes("[OK]") || l.includes("[STATUS]")
              ? "text-neon-blue"
              : "text-neon-green/85";
        return (
          <div key={i} className={color}>
            {l}
          </div>
        );
      })}
      <div className="text-neon-green">
        root@imnot:~$ <span className="blink">▋</span>
      </div>
    </div>
  );
}
