"use client";
import { useEffect, useRef } from "react";

type Variant = "area" | "radar" | "horizontal";
type Theme = "cyan" | "green" | "pink";

const THEME: Record<Theme, { wave: string; waveGlow: string; barTop: string; barBot: string; scan: string; accent: string }> = {
  cyan: { wave: "rgba(56,225,255,0.9)", waveGlow: "#38e1ff", barTop: "rgba(178,107,255,0.9)", barBot: "rgba(178,107,255,0.12)", scan: "rgba(61,255,160,0.25)", accent: "#38e1ff" },
  green: { wave: "rgba(61,255,160,0.9)", waveGlow: "#3dffa0", barTop: "rgba(56,225,255,0.9)", barBot: "rgba(56,225,255,0.12)", scan: "rgba(178,107,255,0.25)", accent: "#3dffa0" },
  pink: { wave: "rgba(255,62,165,0.85)", waveGlow: "#ff3ea5", barTop: "rgba(255,180,50,0.9)", barBot: "rgba(255,180,50,0.12)", scan: "rgba(56,225,255,0.25)", accent: "#ff3ea5" },
};

export default function DataViz({
  className = "",
  variant = "area",
  theme = "cyan",
}: {
  className?: string;
  variant?: Variant;
  theme?: Theme;
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
    const c = THEME[theme];

    const resize = () => {
      const p = canvas.parentElement!;
      const style = getComputedStyle(p);
      const padX = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      const padY = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
      w = p.clientWidth - padX;
      h = p.clientHeight - padY;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // persistent data
    const areaPts = new Array(80).fill(0).map(() => Math.random());
    const radarPts = new Array(8).fill(0).map(() => 0.3 + Math.random() * 0.5);
    const hBars = new Array(12).fill(0).map(() => Math.random());

    const drawGrid = () => {
      ctx.strokeStyle = "rgba(86,120,200,0.10)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 24) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += 24) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
    };

    /* ── AREA CHART ───────────────────────────────────────── */
    const drawArea = () => {
      t += 0.03;
      // shift & add new point
      areaPts.shift();
      areaPts.push(0.3 + Math.sin(t * 0.8) * 0.2 + Math.sin(t * 2.1) * 0.1 + (Math.random() - 0.5) * 0.08);

      const step = w / (areaPts.length - 1);

      // filled area
      ctx.beginPath();
      ctx.moveTo(0, h);
      for (let i = 0; i < areaPts.length; i++) {
        const x = i * step;
        const y = h - areaPts[i] * h * 0.8;
        i === 0 ? ctx.lineTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.closePath();
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, c.wave.replace("0.9", "0.35"));
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fill();

      // top line
      ctx.beginPath();
      for (let i = 0; i < areaPts.length; i++) {
        const x = i * step;
        const y = h - areaPts[i] * h * 0.8;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = c.wave;
      ctx.lineWidth = 1.8;
      ctx.shadowBlur = 8;
      ctx.shadowColor = c.waveGlow;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // moving dot at end
      const lastY = h - areaPts[areaPts.length - 1] * h * 0.8;
      ctx.beginPath();
      ctx.arc(w, lastY, 3, 0, Math.PI * 2);
      ctx.fillStyle = c.accent;
      ctx.fill();
    };

    /* ── RADAR / CIRCULAR GAUGE ───────────────────────────── */
    const drawRadar = () => {
      t += 0.02;
      const cx = w / 2;
      const cy = h / 2;
      const r = Math.min(w, h) * 0.38;
      const n = radarPts.length;

      // animated target values
      const targets = Array.from({ length: n }, (_, i) => 0.3 + Math.sin(t * 0.5 + i * 1.2) * 0.25 + Math.sin(t * 1.3 + i * 0.7) * 0.15);

      // rings
      for (let ring = 1; ring <= 4; ring++) {
        ctx.beginPath();
        const rr = (r * ring) / 4;
        for (let i = 0; i <= n; i++) {
          const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
          const px = cx + Math.cos(angle) * rr;
          const py = cy + Math.sin(angle) * rr;
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = "rgba(86,120,200,0.15)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // spokes
      for (let i = 0; i < n; i++) {
        const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
        ctx.strokeStyle = "rgba(86,120,200,0.12)";
        ctx.stroke();
      }

      // data polygon - animate towards targets
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const idx = i % n;
        radarPts[idx] += (targets[idx] - radarPts[idx]) * 0.04;
        const angle = (Math.PI * 2 * idx) / n - Math.PI / 2;
        const px = cx + Math.cos(angle) * r * radarPts[idx];
        const py = cy + Math.sin(angle) * r * radarPts[idx];
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      grad.addColorStop(0, c.wave.replace("0.9", "0.25"));
      grad.addColorStop(1, c.wave.replace("0.9", "0.05"));
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = c.wave;
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 8;
      ctx.shadowColor = c.waveGlow;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // dots at vertices
      for (let i = 0; i < n; i++) {
        const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
        const px = cx + Math.cos(angle) * r * radarPts[i];
        const py = cy + Math.sin(angle) * r * radarPts[i];
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = c.accent;
        ctx.fill();
      }
    };

    /* ── HORIZONTAL BARS ──────────────────────────────────── */
    const drawHorizontal = () => {
      t += 0.03;
      const barH = (h - 20) / hBars.length;
      const maxBarW = w * 0.75;

      for (let i = 0; i < hBars.length; i++) {
        hBars[i] += (Math.random() - 0.5) * 0.06;
        hBars[i] = Math.max(0.1, Math.min(1, hBars[i]));
        const bw = hBars[i] * maxBarW;
        const y = 10 + i * barH;

        // bar bg track
        ctx.fillStyle = "rgba(86,120,200,0.06)";
        ctx.fillRect(80, y + 2, maxBarW, barH - 4);

        // bar fill
        const grad = ctx.createLinearGradient(80, 0, 80 + bw, 0);
        grad.addColorStop(0, c.barTop);
        grad.addColorStop(1, c.barBot);
        ctx.fillStyle = grad;
        ctx.fillRect(80, y + 2, bw, barH - 4);

        // label
        ctx.fillStyle = "rgba(180,200,230,0.4)";
        ctx.font = "9px monospace";
        ctx.textAlign = "right";
        ctx.fillText(`P${i + 1}`, 72, y + barH / 2 + 3);

        // value
        ctx.fillStyle = c.accent;
        ctx.textAlign = "left";
        ctx.fillText(`${(hBars[i] * 100).toFixed(0)}%`, 80 + bw + 6, y + barH / 2 + 3);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      drawGrid();

      if (variant === "area") drawArea();
      else if (variant === "radar") drawRadar();
      else drawHorizontal();

      // scan line
      const sy = (t * 35) % h;
      ctx.strokeStyle = c.scan;
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
  }, [variant, theme]);

  return (
    <canvas ref={ref} className={className} aria-hidden style={{ display: "block" }} />
  );
}
