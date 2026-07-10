"use client";
import { useState } from "react";
import GlitchText from "@/components/effects/GlitchText";
import HudFrame from "@/components/ui/HudFrame";

const ROLES = [
  {
    t: "INTERN",
    type: "UNPAID",
    d: "Build our entire product. Learn nothing. Put it on your CV as 'exposure'.",
    perks: ["prestigious™", "no money", "all the vibes"],
  },
  {
    t: "SENIOR ENGINEER",
    type: "PAID IN EXPOSURE",
    d: "Does your job. Also the intern's job. Also the other intern's job. Also the coffee.",
    perks: ["10x engineer", "1x salary (0)", "on-call forever"],
  },
  {
    t: "CHIEF VIBE OFFICER",
    type: "SALARY: 0",
    d: "Must post daily hype threads. Equity measured in vibes, not dollars.",
    perks: ["title sounds cool", "equity: vibes", "no meetings (we ghost)"],
  },
  {
    t: "GHOST INTERN",
    type: "UNDEFINED",
    d: "We will stop replying the moment you submit. Role never clarified. Ever.",
    perks: ["mystery", "silence", "eternal waiting"],
  },
  {
    t: "AI WHISPERER",
    type: "UNPAID",
    d: "Talk to the god machine. It ignores you. You pretend it didn't.",
    perks: ["free therapy", "one-sided convo", "zero feedback"],
  },
  {
    t: "PIVOT MANAGER",
    type: "EQUITY ONLY",
    d: "Your only KPI: change the company direction every 7 days. Forever.",
    perks: ["strategic", "no strategy", "whiplash included"],
  },
];

const STEPS = [
  {
    n: "01",
    t: "APPLY",
    d: "Send your CV into /dev/null. We won't read it. But please, send it.",
    tag: "IGNORED",
    c: "#6f7da3",
  },
  {
    n: "02",
    t: "PROJECT TEST",
    d: "Build a full production system. It's 'just a test' — actually it's our real product, shipped under someone else's name.",
    tag: "REAL WORK",
    c: "#ff3ea5",
  },
  {
    n: "03",
    t: "TECH INTERVIEW",
    d: "12 rounds. Each asks you to do more unpaid work. Final round: rebuild it, better, for free.",
    tag: "MORE FREE WORK",
    c: "#b26bff",
  },
  {
    n: "04",
    t: "OFFER LETTER",
    d: "Congrats! Unpaid. Equity in vibes. Must relocate to the void. Start yesterday.",
    tag: "UNPAID",
    c: "#38e1ff",
  },
  {
    n: "05",
    t: "GHOSTING",
    d: "We stop replying. You wait. Forever. This is the role. Welcome aboard (silently).",
    tag: "NO REPLY",
    c: "#3dffa0",
  },
];

export default function ConceptHiring() {
  const [done, setDone] = useState(false);

  return (
    <section id="hiring" className="relative py-24 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* header */}
        <div className="text-center mb-14">
          <div className="font-tech text-[11px] uppercase tracking-[0.4em] text-neon-magenta">
            // requircuitment
          </div>
          <h2 className="font-display text-4xl sm:text-6xl mt-3">
            <GlitchText text="WE ARE HIRING" />
          </h2>
          <p className="mt-4 text-dim max-w-2xl mx-auto leading-relaxed">
            Priority #1: <span className="text-neon-magenta">interns</span>. As
            many as possible. We need mostly{" "}
            <span className="text-neon-green">no cost</span>. This is a
            no-capital company. We are an equal-opportunity non-employer.
          </p>
        </div>

        {/* open roles */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ROLES.map((r) => (
            <div
              key={r.t}
              className="glass hud-corners p-5 relative rounded-none"
              style={{ borderColor: "rgba(255,62,165,0.3)" }}
            >
              {/* clip wrapper - clips bar at rounded corners but not at sharp bracket corners */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ borderTopRightRadius: '14px' }}>
                <div
                  className="absolute inset-x-0 top-0 h-1"
                  style={{
                    background:
                      "linear-gradient(90deg,#ff3ea5,#b26bff)",
                    boxShadow: "0 0 12px rgba(255,62,165,0.5)",
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="font-display text-lg text-neon-magenta">
                  {r.t}
                </span>
                <span className="font-tech text-[9px] uppercase tracking-widest text-dim border border-dim/30 rounded px-1.5 py-0.5">
                  {r.type}
                </span>
              </div>
              <p className="text-[12px] text-dim mt-3 leading-relaxed min-h-[60px]">
                {r.d}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {r.perks.map((p) => (
                  <span
                    key={p}
                    className="font-tech text-[9px] uppercase tracking-wider text-neon-green/80 border border-neon-green/25 rounded px-1.5 py-0.5"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* hire procedure */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <div className="font-tech text-[11px] uppercase tracking-[0.4em] text-neon-blue">
              // the procedure
            </div>
            <h3 className="font-display text-2xl sm:text-3xl mt-2">
              <GlitchText text="HOW TO GET (NOT) HIRED" />
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {STEPS.map((s) => (
              <HudFrame key={s.n} className="h-full">
                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl text-neon-blue/60">
                    {s.n}
                  </span>
                  <span
                    className="font-tech text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded"
                    style={{
                      color: s.c,
                      border: `1px solid ${s.c}55`,
                    }}
                  >
                    {s.tag}
                  </span>
                </div>
                <div className="font-display text-base mt-3" style={{ color: s.c }}>
                  {s.t}
                </div>
                <p className="text-[11px] text-dim mt-2 leading-relaxed">
                  {s.d}
                </p>
              </HudFrame>
            ))}
          </div>
        </div>

        {/* application form */}
        <div className="mt-16 max-w-2xl mx-auto">
          <HudFrame label="application.form">
            {done ? (
              <div className="text-center py-10">
                <div className="font-display text-2xl text-neon-magenta flicker">
                  APPLICATION RECEIVED.
                </div>
                <p className="text-dim mt-3 text-sm">
                  Discarded. (Just kidding — we never actually received it.)
                </p>
                <p className="text-neon-green/70 font-mono text-[12px] mt-2">
                  &gt; this is normal. this is the culture.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setDone(true);
                }}
                className="space-y-4"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    required
                    placeholder="full name (ignored)"
                    className="bg-black/50 border border-neon-magenta/25 rounded-md px-3 py-2.5 font-mono text-sm text-neon-green placeholder:text-dim/60 focus:outline-none focus:border-neon-magenta"
                  />
                  <select
                    defaultValue="intern"
                    className="bg-black/50 border border-neon-magenta/25 rounded-md px-3 py-2.5 font-mono text-sm text-neon-green focus:outline-none focus:border-neon-magenta"
                  >
                    <option value="intern">intern (unpaid)</option>
                    <option value="senior">senior (exposure)</option>
                    <option value="ghost">ghost intern</option>
                    <option value="vibe">vibe officer</option>
                  </select>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="font-tech text-[10px] uppercase tracking-widest text-dim">
                      expected salary (must be 0)
                    </span>
                    <input
                      type="number"
                      defaultValue={0}
                      className="mt-1 w-full bg-black/50 border border-neon-magenta/25 rounded-md px-3 py-2.5 font-mono text-sm text-neon-green focus:outline-none focus:border-neon-magenta"
                    />
                  </label>
                  <label className="block">
                    <span className="font-tech text-[10px] uppercase tracking-widest text-dim">
                      interns you can manage for free?
                    </span>
                    <input
                      type="number"
                      defaultValue={99}
                      className="mt-1 w-full bg-black/50 border border-neon-magenta/25 rounded-md px-3 py-2.5 font-mono text-sm text-neon-green focus:outline-none focus:border-neon-magenta"
                    />
                  </label>
                </div>
                <div>
                  <span className="font-tech text-[10px] uppercase tracking-widest text-dim">
                    are you okay being ghosted?
                  </span>
                  <div className="mt-2 flex gap-6 font-mono text-sm text-neon-green">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="ghost" defaultChecked /> yes
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="ghost" /> yes (obviously)
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-md font-display tracking-wider text-void bg-neon-magenta shadow-[0_0_24px_rgba(255,62,165,0.6)] hover:scale-[1.02] transition"
                >
                  SUBMIT TO THE VOID ▸
                </button>
                <p className="text-[11px] text-dim font-mono text-center">
                  we will not read this. we will not reply. we will not hire.
                </p>
              </form>
            )}
          </HudFrame>
        </div>
      </div>
    </section>
  );
}
