"use client";
import { useEffect, useRef } from "react";

export default function DataViz({
  className = "",
  variant = "composite",
}: {
  className?: string;
  variant?: "composite" | "wave" | "bars";
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let t = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const p = canvas.parentElement!;
      w = p.clientWidth;
      h = p.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const bars = new Array(28).fill(0).map(() => Math.random());

    const draw = () => {
      t += 0.04;
      ctx.clearRect(0, 0, w, h);

      // grid
      ctx.strokeStyle = "rgba(86,120,200,0.10)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 24) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 24) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      if (variant !== "bars") {
        // neural waveform
        ctx.beginPath();
        for (let x = 0; x <= w; x += 3) {
          const y =
            h * 0.35 +
            Math.sin(x * 0.03 + t) * h * 0.12 * Math.sin(t * 0.7) +
            Math.sin(x * 0.07 - t * 1.7) * h * 0.06;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = "rgba(56,225,255,0.9)";
        ctx.lineWidth = 1.6;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#38e1ff";
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      if (variant !== "wave") {
        // throughput bars
        const bw = w / bars.length;
        for (let i = 0; i < bars.length; i++) {
          bars[i] += (Math.random() - 0.5) * 0.12;
          bars[i] = Math.max(0.05, Math.min(1, bars[i]));
          const bh = bars[i] * h * 0.45;
          const x = i * bw;
          const y = h - bh;
          const grad = ctx.createLinearGradient(0, y, 0, h);
          grad.addColorStop(0, "rgba(178,107,255,0.9)");
          grad.addColorStop(1, "rgba(178,107,255,0.12)");
          ctx.fillStyle = grad;
          ctx.fillRect(x + 2, y, bw - 4, bh);
        }
      }

      // sweeping scan line
      const sy = (t * 40) % h;
      ctx.strokeStyle = "rgba(61,255,160,0.25)";
      ctx.beginPath();
      ctx.moveTo(0, sy);
      ctx.lineTo(w, sy);
      ctx.stroke();

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [variant]);

  return (
    <canvas ref={ref} className={className} aria-hidden style={{ display: "block" }} />
  );
}
