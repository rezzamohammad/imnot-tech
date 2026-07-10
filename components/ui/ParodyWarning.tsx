"use client";
import { useState } from "react";

// cigarette-style hazard stripes (amber / black)
const HAZARD =
  "repeating-linear-gradient(45deg,#ffb000,#ffb000 14px,#0a0a0a 14px,#0a0a0a 28px)";

const NOTICE =
  "PARODY & SATIRE NOTICE — imnot.tech is a fictional, non-existent company. No real products. No real jobs. No real hiring. All 'roles', 'offers' and 'roadmaps' are jokes. Any resemblance to actual startups is intentional mockery.";

function Warn({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className="shrink-0"
      aria-hidden
    >
      <path d="M12 2 L22 20 H2 Z" fill="#0a0a0a" />
      <rect x="11" y="8" width="2" height="6" fill="#ffb000" />
      <rect x="11" y="16" width="2" height="2" fill="#ffb000" />
    </svg>
  );
}

export default function ParodyWarning({
  variant = "banner",
}: {
  variant?: "banner" | "box" | "inline";
}) {
  const [open, setOpen] = useState(true);

  if (variant === "banner") {
    if (!open) return null;
    return (
      <div className="fixed bottom-0 inset-x-0 z-[80] font-mono" role="alert">
        <div className="h-2" style={{ background: HAZARD }} />
        <div
          className="flex items-center gap-3 px-4 py-3 text-[12px] sm:text-[13px] text-black"
          style={{ background: "#ffb000" }}
        >
          <Warn />
          <p className="flex-1 leading-snug">{NOTICE}</p>
          <button
            onClick={() => setOpen(false)}
            className="shrink-0 px-3 py-1.5 rounded bg-black text-[#ffb000] font-tech text-[10px] uppercase tracking-widest hover:bg-[#1a1a1a] transition"
          >
            acknowledge
          </button>
        </div>
      </div>
    );
  }

  if (variant === "box") {
    return (
      <div
        className="font-mono rounded-md overflow-hidden border border-[#ffb000]/50"
        role="alert"
      >
        <div
          className="flex items-center gap-2 px-4 py-2 text-black text-[11px] uppercase tracking-[0.3em] font-tech"
          style={{ background: "#ffb000" }}
        >
          <Warn size={14} /> Legal Notice // Parody
        </div>
        <div className="px-4 py-4 bg-black/60 text-[12px] leading-relaxed text-dim">
          <p className="text-[#ffb000]">
            ⚠ imnot.tech is a parody. A fictional, non-existent company.
          </p>
          <p className="mt-2">
            There are <span className="text-neon-green">no real products</span>,{" "}
            <span className="text-neon-green">no real jobs</span>, and{" "}
            <span className="text-neon-green">no real hiring</span>. Every
            &ldquo;role&rdquo;, &ldquo;offer&rdquo; and &ldquo;roadmap&rdquo; on
            this site is satire. Any resemblance to actual startups is
            intentional mockery. Do not send us your CV. (We&rsquo;d ignore it
            anyway.)
          </p>
        </div>
      </div>
    );
  }

  // inline (compact strip for sensitive sections)
  return (
    <div
      className="flex items-center gap-2 px-3 py-2 rounded-md font-mono text-[11px] text-black"
      style={{ background: "#ffb000" }}
      role="alert"
    >
      <Warn size={14} />
      <span>
        ⚠ PARODY — not a real company. No real jobs. This page is satire.
      </span>
    </div>
  );
}
