import AICore from "@/components/effects/AICore";
import BinaryRain from "@/components/effects/BinaryRain";
import DataViz from "@/components/effects/DataViz";
import GlitchText from "@/components/effects/GlitchText";
import HudFrame from "@/components/ui/HudFrame";

export default function ConceptAIGod() {
  return (
    <section id="core" className="relative py-24 overflow-hidden">
      <BinaryRain
        opacity={0.16}
        color="#b26bff"
        className="absolute inset-0 h-full w-full"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="font-tech text-[11px] uppercase tracking-[0.4em] text-neon-purple">
            // concept_02
          </div>
          <h2 className="font-display text-4xl sm:text-6xl mt-3">
            <GlitchText text="THE GOD MACHINE" />
          </h2>
          <p className="mt-4 text-dim max-w-2xl mx-auto leading-relaxed">
            A mysterious artificial intelligence core floating inside our
            laboratory. It knows exactly what we're building. It has refused,
            politely, to tell us. Thousands of binary numbers orbit it. None of
            them mean anything.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="relative h-[440px] glass hud-corners rounded-2xl overflow-hidden">
            <AICore className="absolute inset-0 h-full w-full" />
            <div className="absolute bottom-4 left-4 font-tech text-[10px] tracking-widest text-neon-blue/70">
              FIG.02 — UNFINISHED TECHNOLOGY PROTOTYPE
            </div>
          </div>

          <div className="space-y-5">
            <HudFrame label="neural output">
              <DataViz className="h-40 w-full" />
            </HudFrame>
            <div className="grid grid-cols-2 gap-4">
              {[
                ["CONSCIOUSNESS", "MOSTLY"],
                ["SELF-AWARENESS", "YES"],
                ["CLUE WHAT WE BUILD", "NO"],
                ["UPTIME", "∞%"],
              ].map(([k, v]) => (
                <div key={k} className="glass p-3">
                  <div className="font-tech text-[9px] uppercase tracking-widest text-dim">
                    {k}
                  </div>
                  <div className="font-display text-xl text-neon-green mt-1">
                    {v}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[12px] text-dim font-mono">
              &gt; the machine hums. it sounds suspiciously like laughter.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
