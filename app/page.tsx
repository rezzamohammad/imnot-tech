import Scanlines from "@/components/effects/Scanlines";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/ui/Marquee";
import ConceptAIGod from "@/components/sections/ConceptAIGod";
import ConceptAbandoned from "@/components/sections/ConceptAbandoned";
import ConceptMemeStartup from "@/components/sections/ConceptMemeStartup";
import ConceptLogoArt from "@/components/sections/ConceptLogoArt";
import ConceptVaporware from "@/components/sections/ConceptVaporware";
import ClassifiedPanels from "@/components/ui/ClassifiedPanels";
import FakeRoadmap from "@/components/ui/FakeRoadmap";
import DataViz from "@/components/effects/DataViz";
import GlitchText from "@/components/effects/GlitchText";
import HudFrame from "@/components/ui/HudFrame";
import Footer from "@/components/sections/Footer";
import ConceptHiring from "@/components/sections/ConceptHiring";
import ParodyWarning from "@/components/ui/ParodyWarning";

export default function Page() {
  return (
    <main className="relative">
      <Scanlines />
      <ParodyWarning />
      <Hero />
      <Marquee />

      <ConceptAIGod />

      <ConceptAbandoned />

      <ConceptMemeStartup />

      {/* classified projects */}
      <section id="projects" className="relative py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="font-tech text-[11px] uppercase tracking-[0.4em] text-neon-purple">
              // classified
            </div>
            <h2 className="font-display text-4xl sm:text-6xl mt-3">
              <GlitchText text="MYSTERIOUS PROJECTS" />
            </h2>
            <p className="mt-4 text-dim max-w-2xl mx-auto">
              We have many projects. We have zero clarity. Hover to reveal what
              little we know. (Spoiler: it's nothing.)
            </p>
          </div>
          <ClassifiedPanels />
        </div>
      </section>

      {/* roadmap + data viz */}
      <section id="roadmap" className="relative py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <div className="text-center lg:text-left mb-10">
              <div className="font-tech text-[11px] uppercase tracking-[0.4em] text-neon-blue">
                // the plan
              </div>
              <h2 className="font-display text-4xl sm:text-5xl mt-3">
                <GlitchText text="FAKE ROADMAP" />
              </h2>
              <p className="mt-4 text-dim">
                A timeline of intentions. None fulfilled. All vibes.
              </p>
            </div>
            <FakeRoadmap />
          </div>
          <div className="space-y-5">
            <HudFrame label="global throughput">
              <DataViz className="h-48 w-full" variant="area" theme="cyan" />
            </HudFrame>
            <HudFrame label="sentiment analysis">
              <DataViz className="h-40 w-full" variant="radar" theme="green" />
            </HudFrame>
            <HudFrame label="resource allocation">
              <DataViz className="h-40 w-full" variant="horizontal" theme="pink" />
            </HudFrame>
          </div>
        </div>
      </section>

      <ConceptLogoArt />

      <ConceptVaporware />

      <ConceptHiring />

      <Footer />
    </main>
  );
}
