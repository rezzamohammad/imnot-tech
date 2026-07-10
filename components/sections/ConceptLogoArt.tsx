import GlitchText from "@/components/effects/GlitchText";
import AgentWorkLog from "@/components/ui/AgentWorkLog";

export default function ConceptLogoArt() {
  return (
    <section id="brand" className="relative py-32 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* header */}
        <div className="text-center mb-20">
          <div className="font-tech text-[11px] uppercase tracking-[0.4em] text-neon-green/70">
            // concept_04
          </div>
          <h2 className="font-display text-4xl sm:text-6xl mt-4">
            <GlitchText text="THE MARK" />
          </h2>
          <p className="mt-5 text-dim max-w-xl mx-auto leading-relaxed text-sm sm:text-base">
            Abstract, minimal, broken. A symbol for a company that doesn&apos;t know
            what it sells.
          </p>
        </div>

        {/* logo + wordmark + agent work */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* left: logo + wordmark */}
          <div className="flex flex-col items-center gap-8">
            {/* logo */}
            <div className="relative float-slow shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="imnot.tech mark"
                width={260}
                height={260}
                className="w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] select-none"
                style={{
                  filter:
                    "drop-shadow(0 0 20px rgba(255,255,255,0.6)) drop-shadow(0 0 50px rgba(255,255,255,0.3))",
                }}
              />
            </div>

            {/* wordmark */}
            <div className="flex flex-col items-center gap-6">
              <GlitchText
                text="imnot.tech"
                className="font-display text-5xl sm:text-6xl"
              />

              {/* divider */}
              <div className="w-full max-w-[280px] h-px bg-gradient-to-r from-transparent via-neon-green/40 to-transparent" />

              {/* tags */}
              <div className="flex gap-4 font-tech text-[10px] uppercase tracking-[0.2em] text-neon-green/60">
                <span className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-neon-green/50" />
                  probably
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-neon-green/50" />
                  nothing
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-neon-green/50" />
                  happen (we're never promise)
                </span>
              </div>
            </div>
          </div>

          {/* right: agent work log */}
          <div className="w-full">
            <AgentWorkLog className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
