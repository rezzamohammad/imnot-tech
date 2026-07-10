import BinaryRain from "@/components/effects/BinaryRain";
import GlitchText from "@/components/effects/GlitchText";
import HudFrame from "@/components/ui/HudFrame";

const SCREENS = [
  { t: "HR_PORTAL.exe", s: "corrupted", d: "last login: 64 years ago" },
  { t: "roadmap.q3", s: "deleted", d: "we pivoted into the void" },
  { t: "investor_deck", s: "corrupted", d: "slide 4 caused a black hole" },
  { t: "the_product", s: "missing", d: "never existed" },
];

export default function ConceptAbandoned() {
  return (
    <section id="hq" className="relative py-24 overflow-hidden">
      <BinaryRain
        opacity={0.14}
        color="#ff3ea5"
        className="absolute inset-0 h-full w-full"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="font-tech text-[11px] uppercase tracking-[0.4em] text-neon-magenta">
            // concept_01
          </div>
          <h2 className="font-display text-4xl sm:text-6xl mt-3">
            <GlitchText text="ABANDONED HQ" />
          </h2>
          <p className="mt-4 text-dim max-w-2xl mx-auto leading-relaxed">
            Our futuristic headquarters. Holographic screens display corrupted
            code. Mysterious servers still glow — for no reason we can recall.
            The lights are on. Nobody is home. Nobody was ever home.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SCREENS.map((s) => (
            <HudFrame key={s.t} label={s.t} className="h-44">
              <div className="font-tech text-[10px] uppercase tracking-widest text-neon-magenta">
                {s.s}
              </div>
              <div className="mt-3 font-mono text-[11px] text-neon-green/70 break-words">
                01001110 01101111 01110000 01100101
              </div>
              <div className="absolute bottom-3 left-5 right-5 font-mono text-[10px] text-dim">
                {s.d}
              </div>
            </HudFrame>
          ))}
        </div>

        {/* glowing servers */}
        <div className="mt-10 flex gap-3 justify-center items-end h-40">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="w-10 rounded-t-md"
              style={{
                height: `${40 + i * 6}%`,
                background:
                  "linear-gradient(180deg, rgba(56,225,255,0.15), rgba(168,85,247,0.05))",
                border: "1px solid rgba(56,225,255,0.25)",
                boxShadow: "0 0 18px rgba(56,225,255,0.15)",
              }}
            >
              <div className="flex flex-col gap-1 p-1.5">
                {[0, 1, 2].map((j) => (
                  <span
                    key={j}
                    className="h-1 rounded-full"
                    style={{
                      background: i % 2 ? "#3dffa0" : "#38e1ff",
                      boxShadow: "0 0 8px currentColor",
                      opacity: (i + j) % 3 ? 1 : 0.3,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-center font-tech text-[10px] tracking-[0.3em] text-dim mt-4">
          FIG.01 — MYSTERIOUS GLOWING SERVERS (PURPOSE: FORGOTTEN)
        </p>
      </div>
    </section>
  );
}
