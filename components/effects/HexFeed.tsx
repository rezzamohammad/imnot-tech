"use client";
import { useEffect, useState } from "react";

export default function HexFeed({ lines = 14 }: { lines?: number }) {
  const [rows, setRows] = useState<string[]>([]);

  useEffect(() => {
    const gen = () => {
      const head =
        "0x" +
        Math.floor(Math.random() * 0xffffff)
          .toString(16)
          .padStart(6, "0")
          .toUpperCase();
      const body = Array.from({ length: 4 }, () =>
        Math.floor(Math.random() * 256)
          .toString(16)
          .padStart(2, "0")
          .toUpperCase()
      ).join(" ");
      return `${head}  ${body}`;
    };
    setRows(Array.from({ length: lines }, gen));
    const id = setInterval(() => {
      setRows((prev) => [gen(), ...prev].slice(0, lines));
    }, 240);
    return () => clearInterval(id);
  }, [lines]);

  return (
    <div className="font-mono text-[11px] leading-relaxed">
      {rows.map((r, i) => (
        <div
          key={i}
          className={i === 0 ? "text-neon-green" : "text-neon-green/55"}
        >
          {r}
        </div>
      ))}
    </div>
  );
}
