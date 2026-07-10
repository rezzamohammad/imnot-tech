"use client";
import { useState } from "react";
import GlitchText from "@/components/effects/GlitchText";

export default function Footer() {
  const [subbed, setSubbed] = useState(false);
  return (
    <footer
      id="join"
      className="relative py-24 overflow-hidden border-t border-neon-blue/15"
    >
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <div className="font-tech text-[11px] uppercase tracking-[0.4em] text-neon-blue">
          // join the void
        </div>
        <h2 className="font-display text-4xl sm:text-5xl mt-3">
          <GlitchText text="WAITLIST (FOREVER)" />
        </h2>
        <p className="mt-4 text-dim">
          Enter your email. We'll never email you. We'll never launch. It's
          perfect.
        </p>
        <form
          className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          onSubmit={(e) => { e.preventDefault(); setSubbed(true); }}
        >
          <input
            type="email"
            required
            placeholder="you@thefuture.xyz"
            className="flex-1 bg-black/50 border border-neon-blue/30 rounded-md px-4 py-3 font-mono text-sm text-neon-green placeholder:text-dim/60 focus:outline-none focus:border-neon-blue"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-md font-display tracking-wider text-void bg-neon-magenta shadow-[0_0_24px_rgba(255,62,165,0.6)] hover:scale-105 transition"
          >
            SUBSCRIBE ▸
          </button>
        </form>
        <p className="mt-3 text-[11px] text-dim font-mono">
          no spam. mostly because there's nothing to spam about.
        </p>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 mt-20 flex flex-col sm:flex-row items-center justify-between gap-6 font-tech text-[10px] uppercase tracking-widest text-dim">
        <div className="flex items-center gap-2 font-display tracking-widest text-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="imnot.tech"
            width={24}
            height={24}
            className="w-6 h-6 select-none"
            style={{
              filter:
                "drop-shadow(0 0 8px rgba(255,255,255,0.75)) drop-shadow(0 0 18px rgba(255,255,255,0.45))",
            }}
          />
          imnot.tech
        </div>
        <div className="flex flex-wrap gap-6">
          <a href="#core" className="hover:text-neon-blue transition">
            manifesto
          </a>
          <a href="#projects" className="hover:text-neon-blue transition">
            projects
          </a>
          <a href="#roadmap" className="hover:text-neon-blue transition">
            roadmap
          </a>
          <a href="#brand" className="hover:text-neon-blue transition">
            brand
          </a>
        </div>
        <div>© 2077 imnot.tech — all rights reserved, none exercised.</div>
      </div>
      {subbed && (
        <div
          onClick={() => setSubbed(false)}
          className="fixed inset-0 z-[70] flex items-center justify-center p-6"
          style={{ background: "rgba(2,3,8,0.8)", backdropFilter: "blur(6px)" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass hud-corners relative w-full max-w-md p-8 text-center"
            style={{ borderColor: "rgba(56,225,255,0.4)" }}
          >
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 font-tech text-[10px] uppercase tracking-[0.3em] text-neon-blue"
              style={{ background: "var(--color-void)" }}
            >
              // confirmed
            </div>
            <h3 className="font-display text-2xl sm:text-3xl text-neon-blue flicker">
              <GlitchText text="YOU'RE ON THE LIST" />
            </h3>
            <p className="mt-4 text-dim text-sm leading-relaxed">
              Your email has been received. And ignored. You are now waitlisted
              for something that does not exist.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3 font-mono text-[11px]">
              <div className="glass p-3">
                <div className="text-dim text-[9px] uppercase tracking-widest">
                  queue position
                </div>
                <div className="text-neon-green text-lg">∞</div>
              </div>
              <div className="glass p-3">
                <div className="text-dim text-[9px] uppercase tracking-widest">
                  est. invite
                </div>
                <div className="text-neon-magenta text-lg">never</div>
              </div>
            </div>
            <p className="mt-4 text-[11px] text-dim font-mono">
              &gt; we won't remember this. we won't email you. we won't launch.
            </p>
            <button
              onClick={() => setSubbed(false)}
              className="mt-6 px-6 py-3 rounded-md font-display tracking-wider text-void bg-neon-blue shadow-[0_0_24px_rgba(56,225,255,0.6)] hover:scale-105 transition"
            >
              OK (we won't remember this) ▸
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
