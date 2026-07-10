import GlitchText from "@/components/effects/GlitchText";

export default function ConceptVaporware() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="font-tech text-[11px] uppercase tracking-[0.4em] text-neon-magenta">
            // concept_05
          </div>
          <h2 className="font-display text-4xl sm:text-6xl mt-3">
            <GlitchText text="COMING SOON FOREVER" />
          </h2>
        </div>

        <div
          className="glass hud-corners rounded-none p-8 sm:p-12 relative"
          style={{ borderColor: "rgba(255,62,165,0.35)" }}
        >
          <div className="relative text-center">
            <div className="font-tech text-[11px] uppercase tracking-[0.5em] text-neon-blue/70">
              imnot.tech proudly announces
            </div>
            <h3 className="font-display text-3xl sm:text-6xl mt-4 leading-tight">
              THE FUTURE
              <br />
              IS <span className="neon-purple flicker">COMING</span>
            </h3>

            {/* blurred mystery product */}
            <div
              className="relative mx-auto mt-8 h-48 w-64 sm:w-80 rounded-2xl overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(56,225,255,0.4), rgba(178,107,255,0.4), rgba(61,255,160,0.3))",
                filter: "blur(14px)",
                opacity: 0.7,
              }}
            />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-tech text-[10px] uppercase tracking-[0.3em] text-void/80 pointer-events-none">
              [ PRODUCT REDACTED ]
            </div>

            <div
              className="mt-8 inline-block px-6 py-3 rounded-full border border-neon-magenta/50 font-display tracking-widest text-neon-magenta"
              style={{ boxShadow: "0 0 20px rgba(255,62,165,0.3)" }}
            >
              COMING SOON™ — SINCE 2075
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md mx-auto">
              {[
                ["VALUATION", "$1B*"],
                ["EMPLOYEES", "1 (intern)"],
                ["PRODUCT", "0"],
              ].map(([k, v]) => (
                <div key={k} className="glass p-3">
                  <div className="font-tech text-[9px] uppercase tracking-widest text-dim">
                    {k}
                  </div>
                  <div className="font-display text-lg text-neon-green mt-1">
                    {v}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[11px] text-dim font-mono">
              *valuation is a feeling, not a number.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
