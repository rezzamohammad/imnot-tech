import GlitchText from "@/components/effects/GlitchText";

export default function ConceptLogoArt() {
  return (
    <section id="brand" className="relative py-24 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="font-tech text-[11px] uppercase tracking-[0.4em] text-neon-green">
            // concept_04
          </div>
          <h2 className="font-display text-4xl sm:text-6xl mt-3">
            <GlitchText text="THE MARK" />
          </h2>
          <p className="mt-4 text-dim max-w-2xl mx-auto leading-relaxed">
            Abstract, minimal, broken. A symbol for a company that doesn't know
            what it sells. The circuit is incomplete. So is the business plan.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* logo image (replaces procedural green mark) */}
          <div className="relative float-slow">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="imnot.tech mark"
              width={260}
              height={260}
              className="w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] select-none"
              style={{
                filter:
                  "drop-shadow(0 0 16px rgba(255,255,255,0.7)) drop-shadow(0 0 40px rgba(255,255,255,0.4))",
              }}
            />
          </div>

          {/* wordmark + ascii */}
          <div className="text-center">
            <GlitchText
              text="imnot.tech"
              className="font-display text-5xl sm:text-7xl"
            />
            <pre
              className="font-mono text-neon-green/70 text-[11px] mt-6 leading-[1.2] select-none"
              style={{ textShadow: "0 0 8px rgba(61,255,160,0.4)" }}
            >{`  ╔══════════════╗
  ║  [ N O T ]   ║
  ║  building... ║
  ╚══════════════╝`}</pre>
            <div className="mt-6 flex gap-3 justify-center font-tech text-[10px] uppercase tracking-widest text-dim">
              <span className="px-2 py-1 border border-neon-green/30 rounded">
                minimal
              </span>
              <span className="px-2 py-1 border border-neon-green/30 rounded">
                broken
              </span>
              <span className="px-2 py-1 border border-neon-green/30 rounded">
                glitch
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
