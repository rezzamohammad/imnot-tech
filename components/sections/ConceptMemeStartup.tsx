import GlitchText from "@/components/effects/GlitchText";
import HudFrame from "@/components/ui/HudFrame";

const ROBOTS = [
  { id: "UNIT-2077", mood: "should we build something?" },
  { id: "UNIT-3141", mood: "i'll start tomorrow" },
  { id: "UNIT-0000", mood: "vibes only" },
  { id: "UNIT-9001", mood: "it's over 9000% hype" },
];

function Robot({ id, mood }: { id: string; mood: string }) {
  return (
    <div className="glass hud-corners p-5 flex flex-col items-center text-center">
      <div className="relative w-20 h-20 mb-3">
        <div
          className="absolute inset-0 rounded-xl border border-neon-blue/40 bg-black/40"
          style={{ boxShadow: "inset 0 0 18px rgba(56,225,255,0.15)" }}
        >
          <div className="flex justify-center gap-3 mt-6">
            <span
              className="w-3 h-3 rounded-full bg-neon-green"
              style={{ boxShadow: "0 0 10px #3dffa0" }}
            />
            <span
              className="w-3 h-3 rounded-full bg-neon-green"
              style={{ boxShadow: "0 0 10px #3dffa0" }}
            />
          </div>
          <div
            className="mx-auto mt-3 w-6 h-1 rounded-full bg-neon-magenta"
            style={{ boxShadow: "0 0 8px #ff3ea5" }}
          />
        </div>
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-neon-blue" />
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-neon-blue"
          style={{ boxShadow: "0 0 10px #38e1ff" }}
        />
      </div>
      <div className="font-tech text-[10px] uppercase tracking-widest text-neon-blue/80">
        {id}
      </div>
      <div className="text-dim text-[12px] mt-1">
        building: <span className="text-neon-magenta">nothing</span>
      </div>
      <div className="text-dim text-[10px] mt-1 italic">"{mood}"</div>
    </div>
  );
}

export default function ConceptMemeStartup() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="font-tech text-[11px] uppercase tracking-[0.4em] text-neon-green">
            // concept_03
          </div>
          <h2 className="font-display text-4xl sm:text-6xl mt-3">
            <GlitchText text="MEME STARTUP" />
          </h2>
          <p className="mt-4 text-dim max-w-2xl mx-auto leading-relaxed">
            A futuristic startup office where the robots are building nothing.
            The roadmap screens are abandoned. The atmosphere is humorous,
            absurd, and deeply, deeply on-brand.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ROBOTS.map((r) => (
            <Robot key={r.id} id={r.id} mood={r.mood} />
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-10">
          <HudFrame label="daily standup" className="md:col-span-2">
            <ul className="font-mono text-[12px] text-dim space-y-1.5">
              <li>
                <span className="text-neon-green">✓</span> opened laptop
              </li>
              <li>
                <span className="text-neon-green">✓</span> stared at blank
                editor (2h)
              </li>
              <li>
                <span className="text-neon-magenta">✗</span> wrote code
              </li>
              <li>
                <span className="text-neon-magenta">✗</span> decided what to
                build
              </li>
              <li>
                <span className="text-neon-purple">~</span> posted hype thread
                (1.2k likes)
              </li>
            </ul>
          </HudFrame>
          <HudFrame label="today's KPI">
            <div className="font-display text-5xl text-neon-blue">0</div>
            <div className="font-tech text-[10px] uppercase tracking-widest text-dim mt-2">
              things shipped
            </div>
            <div className="font-display text-5xl text-neon-magenta mt-4">
              ∞
            </div>
            <div className="font-tech text-[10px] uppercase tracking-widest text-dim mt-2">
              things announced
            </div>
          </HudFrame>
        </div>
      </div>
    </section>
  );
}
