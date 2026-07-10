"use client";
import { useEffect, useRef } from "react";

export default function AICore({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let t = 0;
    let w = 0;
    let h = 0;
    let cx = 0;
    let cy = 0;
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
      cx = w / 2;
      cy = h / 2;
    };
    resize();
    window.addEventListener("resize", resize);

    const bits = "01101001 11010010 00101101 11100101 01011010 10010110 00110101";

    const draw = () => {
      t += 0.012;
      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * 0.32;

      // outer halo
      const g = ctx.createRadialGradient(cx, cy, 4, cx, cy, R * 1.7);
      g.addColorStop(0, "rgba(56,225,255,0.28)");
      g.addColorStop(0.4, "rgba(168,85,247,0.16)");
      g.addColorStop(1, "rgba(4,5,10,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.7, 0, Math.PI * 2);
      ctx.fill();

      // tilted rotating rings (fake 3D)
      const rings = 4;
      for (let i = 0; i < rings; i++) {
        const rr = R * (0.45 + i * 0.18);
        const tilt = 0.32 + i * 0.04;
        const rot = t * (i % 2 ? -1 : 1) * (0.4 + i * 0.12);
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rot);
        ctx.scale(1, tilt);
        ctx.beginPath();
        ctx.arc(0, 0, rr, 0, Math.PI * 2);
        ctx.strokeStyle =
          i % 2 ? "rgba(178,107,255,0.5)" : "rgba(56,225,255,0.55)";
        ctx.lineWidth = 1.4;
        ctx.shadowBlur = 12;
        ctx.shadowColor = i % 2 ? "#b26bff" : "#38e1ff";
        ctx.stroke();
        ctx.restore();
      }
      ctx.shadowBlur = 0;

      // orbiting particles
      const N = 26;
      for (let i = 0; i < N; i++) {
        const a = t * 1.3 + (i / N) * Math.PI * 2;
        const rad = R * (0.5 + 0.5 * Math.sin(t * 0.7 + i));
        const x = cx + Math.cos(a) * rad;
        const y = cy + Math.sin(a) * rad * 0.42;
        ctx.beginPath();
        ctx.arc(x, y, 1.6 + (i % 3), 0, Math.PI * 2);
        ctx.fillStyle = i % 3 ? "rgba(61,255,160,0.9)" : "rgba(56,225,255,0.9)";
        ctx.fill();
      }

      // central pulsing core
      const pulse = 0.5 + 0.5 * Math.sin(t * 2.2);
      const cr = R * 0.16 * (1 + pulse * 0.18);
      const cg = ctx.createRadialGradient(cx, cy, 1, cx, cy, cr * 2.2);
      cg.addColorStop(0, "#ffffff");
      cg.addColorStop(0.4, "rgba(56,225,255,0.9)");
      cg.addColorStop(1, "rgba(56,225,255,0)");
      ctx.fillStyle = cg;
      ctx.beginPath();
      ctx.arc(cx, cy, cr * 2.2, 0, Math.PI * 2);
      ctx.fill();

      // binary ring text
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-t * 0.6);
      ctx.font = "11px ui-monospace, monospace";
      ctx.fillStyle = "rgba(178,107,255,0.7)";
      const rad2 = R * 1.08;
      for (let i = 0; i < bits.length; i++) {
        const ang = (i / bits.length) * Math.PI * 2;
        const x = Math.cos(ang) * rad2;
        const y = Math.sin(ang) * rad2 * 0.42;
        ctx.fillText(bits[i], x, y);
      }
      ctx.restore();

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas ref={ref} className={className} aria-hidden style={{ display: "block" }} />
  );
}
