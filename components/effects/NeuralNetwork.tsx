"use client";
import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  pulse: number;
}

export default function NeuralNetwork({ className = "" }: { className?: string }) {
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

    const NODE_COUNT = 32;
    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * 600 - 300,
      y: Math.random() * 400 - 200,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: 2 + Math.random() * 3,
      pulse: Math.random() * Math.PI * 2,
    }));

    const CONNECT_DIST = 140;

    const COL = {
      nodeA: "#38e1ff",    // cyan
      nodeB: "#b26bff",    // magenta
      nodeC: "#3dffa0",    // green accent
      lineA: "rgba(56,225,255,0.35)",
      lineB: "rgba(178,107,255,0.2)",
      glow: "#38e1ff",
      core: "#b26bff",
    };

    const draw = () => {
      t += 0.015;
      ctx.clearRect(0, 0, w, h);

      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) * 0.5);
      bg.addColorStop(0, "rgba(56,225,255,0.08)");
      bg.addColorStop(0.5, "rgba(178,107,255,0.04)");
      bg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.03;
        n.vx += (0 - n.x) * 0.0003;
        n.vy += (0 - n.y) * 0.0003;
        if (Math.abs(n.x) > w * 0.4) n.vx *= -0.9;
        if (Math.abs(n.y) > h * 0.4) n.vy *= -0.9;
        n.vx += (Math.random() - 0.5) * 0.02;
        n.vy += (Math.random() - 0.5) * 0.02;
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const alpha = 1 - dist / CONNECT_DIST;
            ctx.strokeStyle = alpha > 0.5 ? COL.lineA : COL.lineB;
            ctx.globalAlpha = alpha * 0.8;
            ctx.beginPath();
            ctx.moveTo(cx + a.x, cy + a.y);
            ctx.lineTo(cx + b.x, cy + b.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      for (const n of nodes) {
        const px = cx + n.x;
        const py = cy + n.y;
        const pulseScale = 1 + Math.sin(n.pulse) * 0.3;
        const nr = n.r * pulseScale;

        const ng = ctx.createRadialGradient(px, py, 0, px, py, nr * 4);
        ng.addColorStop(0, "rgba(56,225,255,0.4)");
        ng.addColorStop(1, "rgba(56,225,255,0)");
        ctx.fillStyle = ng;
        ctx.beginPath();
        ctx.arc(px, py, nr * 4, 0, Math.PI * 2);
        ctx.fill();

        const colors = [COL.nodeA, COL.nodeB, COL.nodeC];
        ctx.fillStyle = colors[Math.floor(n.pulse) % 3];
        ctx.shadowBlur = 8;
        ctx.shadowColor = COL.glow;
        ctx.beginPath();
        ctx.arc(px, py, nr, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      const hubPulse = 0.5 + 0.5 * Math.sin(t * 2);
      const hubR = 18 * (1 + hubPulse * 0.15);
      const hg = ctx.createRadialGradient(cx, cy, 0, cx, cy, hubR * 3);
      hg.addColorStop(0, "#ffffff");
      hg.addColorStop(0.3, "rgba(178,107,255,0.8)");
      hg.addColorStop(0.7, "rgba(56,225,255,0.3)");
      hg.addColorStop(1, "rgba(56,225,255,0)");
      ctx.fillStyle = hg;
      ctx.beginPath();
      ctx.arc(cx, cy, hubR * 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = COL.core;
      ctx.shadowBlur = 20;
      ctx.shadowColor = COL.glow;
      ctx.beginPath();
      ctx.arc(cx, cy, hubR * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.5);
      const ringR = Math.min(w, h) * 0.3;
      ctx.font = "10px ui-monospace, monospace";
      ctx.fillStyle = "rgba(178,107,255,0.45)";
      const ringText = "0xDEAD 0xBEEF 0xCAFE 0xF00D 0x1337 0xFEED 0xBABE ";
      for (let i = 0; i < ringText.length; i++) {
        const ang = (i / ringText.length) * Math.PI * 2;
        const x = Math.cos(ang) * ringR;
        const y = Math.sin(ang) * ringR * 0.5;
        ctx.fillText(ringText[i], x, y);
      }
      ctx.restore();

      const sy = (t * 50) % h;
      ctx.strokeStyle = "rgba(56,225,255,0.12)";
      ctx.lineWidth = 1;
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
  }, []);

  return (
    <canvas ref={ref} className={className} aria-hidden style={{ display: "block" }} />
  );
}
