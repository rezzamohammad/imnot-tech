"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";

type PlayerState = "stopped" | "playing" | "paused";

const STATE_STYLE: Record<PlayerState, { label: string; color: string; bg: string }> = {
  stopped: { label: "PLAY", color: "#3dffa0", bg: "rgba(61,255,160,0.15)" },
  playing: { label: "STOP", color: "#ff3ea5", bg: "rgba(255,62,165,0.15)" },
  paused: { label: "RESUME", color: "#fbbf24", bg: "rgba(251,191,36,0.15)" },
};

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef(0);
  const [state, setState] = useState<PlayerState>("stopped");
  const [volume, setVolume] = useState(0.6);
  const [showOverlay, setShowOverlay] = useState(false);

  // init audio
  useEffect(() => {
    const audio = new Audio("/summoned_echoes.mp3");
    audio.loop = true;
    audio.volume = 0.6;
    audioRef.current = audio;
    return () => { audio.pause(); audio.src = ""; };
  }, []);

  // waveform visualization
  useEffect(() => {
    if (state !== "playing" || !showOverlay) {
      cancelAnimationFrame(rafRef.current);
      return;
    }
    const audio = audioRef.current!;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let ctx: CanvasRenderingContext2D;
    try {
      ctx = canvas.getContext("2d")!;
    } catch {
      return;
    }

    // setup analyser if not already
    if (!analyserRef.current) {
      try {
        const actx = new AudioContext();
        const src = actx.createMediaElementSource(audio);
        const analyser = actx.createAnalyser();
        analyser.fftSize = 256;
        src.connect(analyser);
        analyser.connect(actx.destination);
        analyserRef.current = analyser;
      } catch {
        // already connected or error
      }
    }

    const analyser = analyserRef.current;
    if (!analyser) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const bufLen = analyser.frequencyBinCount;
    const data = new Uint8Array(bufLen);

    const draw = () => {
      analyser.getByteFrequencyData(data);
      ctx.clearRect(0, 0, w, h);

      const barW = w / bufLen * 2.5;
      let x = 0;
      for (let i = 0; i < bufLen; i++) {
        const barH = (data[i] / 255) * h * 0.8;
        const y = h - barH;

        // gradient per bar
        const grad = ctx.createLinearGradient(0, y, 0, h);
        grad.addColorStop(0, "rgba(56,225,255,0.9)");
        grad.addColorStop(0.5, "rgba(178,107,255,0.6)");
        grad.addColorStop(1, "rgba(255,62,165,0.3)");
        ctx.fillStyle = grad;

        ctx.fillRect(x, y, barW - 1, barH);
        x += barW;
        if (x > w) break;
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(rafRef.current);
  }, [state, showOverlay]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (state === "stopped") {
      audio.play();
      setState("playing");
      setShowOverlay(true);
    } else if (state === "playing") {
      audio.pause();
      setState("stopped");
    } else {
      audio.play();
      setState("playing");
    }
  }, [state]);

  const handleVolume = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  }, []);

  const st = STATE_STYLE[state];

  return (
    <>
      {/* nav button */}
      <button
        onClick={toggle}
        className="flex items-center gap-2 px-3 py-1 rounded-full font-tech text-[10px] uppercase tracking-[0.2em] transition-all duration-300"
        style={{
          color: st.color,
          backgroundColor: st.bg,
          border: `1px solid ${st.color}40`,
          boxShadow: state === "playing" ? `0 0 12px ${st.color}33` : "none",
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{
            backgroundColor: st.color,
            animation: state === "playing" ? "pulse 1s infinite" : "none",
          }}
        />
        {st.label}
        <span className="text-dim/30">🔊</span>
      </button>

      {typeof window !== "undefined" && createPortal(
        <>
          {/* waveform overlay */}
          {showOverlay && state === "playing" && (
            <div
              className="fixed bottom-4 right-4 rounded-lg overflow-hidden"
              style={{
                width: 200,
                height: 80,
                backgroundColor: "rgba(2,4,9,0.95)",
                border: "1px solid rgba(96,130,210,0.2)",
                boxShadow: "0 0 20px rgba(56,225,255,0.15)",
                zIndex: 2147483647,
                isolation: "isolate",
              }}
            >
              {/* header */}
              <div className="flex items-center justify-between px-2 py-1 border-b" style={{ borderColor: "rgba(96,130,210,0.1)" }}>
                <span className="text-[8px] font-tech text-dim/50 uppercase tracking-wider">summoned echoes</span>
                <button
                  onClick={() => setShowOverlay(false)}
                  className="text-dim/30 hover:text-dim text-[8px] transition"
                >✕</button>
              </div>
              {/* waveform */}
              <canvas ref={canvasRef} className="w-full" style={{ height: 48 }} />
              {/* volume */}
              <div className="flex items-center gap-1 px-1 py-1">
                <span className="text-[8px] text-dim/40 shrink-0">Vol</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolume}
                  className="flex-1 cursor-pointer min-w-0"
                  style={{ height: 6, ["--val" as string]: `${volume * 100}%` } as React.CSSProperties}
                />
                <span className="text-[8px] text-dim/40 w-5 text-right shrink-0">{Math.round(volume * 100)}</span>
              </div>
            </div>
          )}

          {/* minimized indicator when overlay is closed but playing */}
          {state === "playing" && !showOverlay && (
            <button
              onClick={() => setShowOverlay(true)}
              className="fixed bottom-4 right-4 w-8 h-8 rounded-full flex items-center justify-center animate-pulse"
              style={{
                backgroundColor: "rgba(2,4,9,0.95)",
                border: "1px solid rgba(56,225,255,0.3)",
                boxShadow: "0 0 12px rgba(56,225,255,0.2)",
                zIndex: 2147483647,
              }}
            >
              <span className="text-[10px]">🔊</span>
            </button>
          )}
        </>,
        document.body
      )}
    </>
  );
}
