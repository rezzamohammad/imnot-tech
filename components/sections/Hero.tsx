import BinaryRain from "@/components/effects/BinaryRain";
import AICore from "@/components/effects/AICore";
import GlitchText from "@/components/effects/GlitchText";
import TerminalLog from "@/components/ui/TerminalLog";
import AbsurdProgress from "@/components/ui/AbsurdProgress";
import HexFeed from "@/components/effects/HexFeed";
import AsciiArt from "@/components/ui/AsciiArt";
import HudFrame from "@/components/ui/HudFrame";
import MusicPlayer from "@/components/ui/MusicPlayer";
import StickyHireButton from "@/components/ui/StickyHireButton";

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex flex-col overflow-hidden">
      <BinaryRain
        opacity={0.22}
        className="absolute inset-0 h-full w-full"
      />

      <div className="relative z-10 flex-1 flex flex-col">
        {/* nav */}
        <nav className="flex items-center justify-between px-6 py-5 max-w-7xl mx-auto w-full">
          <a
            href="#top"
            className="flex items-center gap-2 font-display tracking-widest text-white"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="imnot.tech"
              width={28}
              height={28}
              className="w-7 h-7 select-none"
              style={{
                filter:
                  "drop-shadow(0 0 8px rgba(255,255,255,0.75)) drop-shadow(0 0 18px rgba(255,255,255,0.45))",
              }}
            />
            imnot.tech
          </a>
          <div className="hidden md:flex items-center gap-7 font-tech text-[11px] uppercase tracking-[0.25em] text-dim">
            <MusicPlayer />
            <a href="#core" className="hover:text-neon-blue transition">
              core
            </a>
            <a href="#hq" className="hover:text-neon-blue transition">
              hq
            </a>
            <a href="#projects" className="hover:text-neon-blue transition">
              projects
            </a>
            <a href="#roadmap" className="hover:text-neon-blue transition">
              roadmap
            </a>
            <a href="#join" className="hover:text-neon-blue transition">
              join
            </a>
            <StickyHireButton />
          </div>
        </nav>

        {/* body */}
        <div className="flex-1 grid lg:grid-cols-2 gap-10 items-center max-w-7xl mx-auto w-full px-6 pb-10 pt-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full font-tech text-[10px] uppercase tracking-[0.3em] text-neon-green border border-neon-green/30">
              ▮ est. 2077 // status: unclear
            </div>
            <h1 className="font-display font-black leading-[0.95] text-5xl sm:text-7xl lg:text-8xl">
              <GlitchText text="imnot.tech" className="block" />
            </h1>
            <p className="mt-5 text-lg sm:text-2xl text-neon-blue/90 font-tech">
              We don't know what we're building yet.
            </p>
            <p className="mt-5 text-lg sm:text-2xl text-neon-blue/90 font-tech">
              Probably AI slops and it will be revolutionary.
            </p>
            <p className="mt-3 max-w-md text-dim text-sm sm:text-base leading-relaxed">
              A hyper-hyped technology company from the future. Funded, staffed,
              and completely unsure of our own product. But it will be{" "}
              <span className="text-neon-purple">revolutionary</span>. Probably.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#join"
                className="px-6 py-3 rounded-md font-display tracking-wider text-void bg-neon-blue shadow-[0_0_24px_rgba(56,225,255,0.6)] hover:scale-105 transition"
              >
                JOIN THE WAITLIST ▸
              </a>
              <a
                href="#core"
                className="px-6 py-3 rounded-md font-tech uppercase tracking-widest text-neon-blue border border-neon-blue/40 hover:bg-neon-blue/10 transition"
              >
                read the (non-existent) docs
              </a>
            </div>
          </div>

          {/* AI core + HUD */}
          <div className="relative h-[400px] sm:h-[440px]">
            <AICore className="absolute inset-0 h-full w-full" />
            <div className="absolute bottom-4 left-2 w-56">
              <HudFrame label="core telemetry">
                <HexFeed lines={7} />
              </HudFrame>
            </div>
            <div className="absolute top-8 right-2 w-60">
              <HudFrame label="system">
                <AsciiArt />
              </HudFrame>
            </div>
          </div>
        </div>

        {/* bottom HUD */}
        <div className="max-w-7xl mx-auto w-full px-6 pb-16 grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <HudFrame label="build log">
              <TerminalLog />
            </HudFrame>
          </div>
          <HudFrame label="revolution progress">
            <AbsurdProgress className="mt-2" />
            <p className="mt-4 text-[11px] text-dim font-mono">
              note: progress is decorative. like our roadmap.
            </p>
          </HudFrame>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-dim font-tech text-[10px] tracking-[0.3em] animate-bounce">
        ▼ SCROLL TO DISBELIEVE
      </div>
    </section>
  );
}
