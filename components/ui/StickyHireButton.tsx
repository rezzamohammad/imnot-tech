"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

interface StickyHireButtonProps {
  onDetach?: (detached: boolean) => void;
}

export default function StickyHireButton({ onDetach }: StickyHireButtonProps) {
  const placeholderRef = useRef<HTMLDivElement>(null);
  const [detached, setDetached] = useState(false);

  const updatePosition = useCallback(() => {
    const placeholder = placeholderRef.current;
    if (!placeholder) return;

    const placeholderRect = placeholder.getBoundingClientRect();

    if (window.scrollY > 10 && placeholderRect.top < -10) {
      if (!detached) {
        setDetached(true);
        onDetach?.(true);
      }
    } else {
      if (detached) {
        setDetached(false);
        onDetach?.(false);
      }
    }
  }, [detached, onDetach]);

  useEffect(() => {
    window.addEventListener("scroll", updatePosition, { passive: true });
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, [updatePosition]);

  const btn = (
    <a
      href="#hiring"
      className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-tech text-[10px] uppercase tracking-[0.2em] text-neon-magenta border border-neon-magenta/50 bg-black/60 backdrop-blur hover:scale-105 transition-all duration-300 ease-out whitespace-nowrap ${
        detached ? "shadow-[0_0_18px_rgba(255,62,165,0.45)]" : ""
      }`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-neon-magenta animate-pulse" />
      we&apos;re hiring ▸
    </a>
  );

  return (
    <>
      {/* placeholder to reserve space in the nav */}
      <div ref={placeholderRef} className="relative" style={{ width: 150, height: 32 }}>
        {/* in-nav button (visible when not detached) */}
        {!detached && btn}
      </div>

      {/* detached button via portal (same strategy as MusicPlayer waveform) */}
      {typeof window !== "undefined" &&
        detached &&
        createPortal(
          <div
            className="fixed top-4 right-4"
            style={{ zIndex: 2147483647, isolation: "isolate" }}
          >
            {btn}
          </div>,
          document.body
        )}
    </>
  );
}
