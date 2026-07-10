"use client";
import { useEffect, useState, useRef, useCallback } from "react";

interface StickyHireButtonProps {
  onDetach?: (detached: boolean) => void;
}

export default function StickyHireButton({ onDetach }: StickyHireButtonProps) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const [detached, setDetached] = useState(false);
  const [btnStyle, setBtnStyle] = useState<React.CSSProperties>({});

  const updatePosition = useCallback(() => {
    const placeholder = placeholderRef.current;
    const btn = btnRef.current;
    if (!placeholder || !btn) return;

    const placeholderRect = placeholder.getBoundingClientRect();
    const threshold = placeholderRect.bottom + 10;

    if (window.scrollY > 10 && placeholderRect.top < -10) {
      if (!detached) {
        setDetached(true);
        onDetach?.(true);
      }
      setBtnStyle({
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 40,
      });
    } else {
      if (detached) {
        setDetached(false);
        onDetach?.(false);
      }
      setBtnStyle({
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 10,
      });
    }
  }, [detached, onDetach]);

  useEffect(() => {
    window.addEventListener("scroll", updatePosition, { passive: true });
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, [updatePosition]);

  return (
    <>
      {/* placeholder to reserve space in the nav */}
      <div ref={placeholderRef} className="relative" style={{ width: 150, height: 32 }}>
        {/* actual button */}
        <a
          ref={btnRef}
          href="#hiring"
          style={btnStyle}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-tech text-[10px] uppercase tracking-[0.2em] text-neon-magenta border border-neon-magenta/50 bg-black/60 backdrop-blur hover:scale-105 transition-all duration-300 ease-out whitespace-nowrap ${
            detached ? "shadow-[0_0_18px_rgba(255,62,165,0.45)]" : ""
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-neon-magenta animate-pulse" />
          we&apos;re hiring ▸
        </a>
      </div>
    </>
  );
}
