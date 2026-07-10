"use client";

import { useState } from "react";
import MusicPlayer from "@/components/ui/MusicPlayer";
import StickyHireButton from "@/components/ui/StickyHireButton";

const NAV_LINKS = [
  { href: "#core", label: "core" },
  { href: "#hq", label: "hq" },
  { href: "#projects", label: "projects" },
  { href: "#roadmap", label: "roadmap" },
  { href: "#join", label: "join" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative flex items-center justify-between px-6 py-5 max-w-7xl mx-auto w-full">
      {/* logo */}
      <a
        href="#top"
        className="flex items-center gap-2 font-display tracking-widest text-white"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="imnot.tech"
          width={28}
          height={28}
          className="w-7 h-7 select-none"
          style={{
            filter:
              "drop-shadow(0 0 8px rgba(255,255,255,0.75)) drop-shadow(0 0 18px rgba(255,255,255,0.45))",
          }}
        />
        imnot.tech
      </a>

      {/* desktop inline links — unchanged desktop behavior (md+) */}
      <div className="hidden md:flex items-center gap-7 font-tech text-[11px] uppercase tracking-[0.25em] text-dim">
        <MusicPlayer />
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} className="hover:text-neon-blue transition">
            {l.label}
          </a>
        ))}
        <StickyHireButton />
      </div>

      {/* mobile hamburger toggle — hidden on desktop (md+) */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle navigation menu"
        aria-expanded={open}
        className="md:hidden flex flex-col items-center justify-center gap-1.5 w-9 h-9 text-dim hover:text-neon-blue transition-colors"
      >
        <span
          className={`block w-5 h-px bg-current transition-transform duration-300 ${
            open ? "translate-y-[6.5px] rotate-45" : ""
          }`}
        />
        <span
          className={`block w-5 h-px bg-current transition-opacity duration-300 ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-5 h-px bg-current transition-transform duration-300 ${
            open ? "-translate-y-[6.5px] -rotate-45" : ""
          }`}
        />
      </button>

      {/* mobile collapsible menu — hidden on desktop (md+) */}
      {open && (
        <div
          className="md:hidden absolute left-6 right-6 top-full mt-2 z-50 rounded-lg border overflow-hidden"
          style={{
            backgroundColor: "rgba(8,10,20,0.98)",
            borderColor: "rgba(96,130,210,0.2)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          }}
        >
          <div className="flex flex-col gap-4 px-5 py-4 font-tech text-[11px] uppercase tracking-[0.25em] text-dim">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="hover:text-neon-blue transition"
              >
                {l.label}
              </a>
            ))}
            <div
              className="pt-3 border-t flex items-center"
              style={{ borderColor: "rgba(96,130,210,0.15)" }}
            >
              <MusicPlayer />
            </div>
            <div className="flex items-center">
              <StickyHireButton />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
