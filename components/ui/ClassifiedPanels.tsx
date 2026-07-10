const PROJECTS = [
  {
    name: "PROJECT NULL",
    codename: "████████",
    desc: "A decentralized solution for problems we haven't invented yet.",
    status: "ABANDONED (pre-start)",
    confidence: "3%",
    reveal: "RELEASED: never. FUNDING: yes. PRODUCT: no.",
    accent: "magenta" as const,
  },
  {
    name: "OPERATION MAYBE",
    codename: "███-7",
    desc: "Internal-only platform. Purpose classified. Possibly a toaster.",
    status: "CLASSIFIED",
    confidence: "12%",
    reveal: "CLEARANCE: you don't have it. MOVE ALONG.",
    accent: "blue" as const,
  },
  {
    name: "THE THING",
    codename: "???",
    desc: "We'll know what it is after Series B.",
    status: "UNKNOWN",
    confidence: "0.4%",
    reveal: "ETA: TBD (forever). RISK: existential.",
    accent: "green" as const,
  },
  {
    name: "HYPERLOOP//DATA",
    codename: "v0.0.0",
    desc: "Like a hyperloop, but for data. Or feelings. Unclear.",
    status: "PIVOTED x7",
    confidence: "n/a",
    reveal: "ORIGINAL PLAN: lost. CURRENT PLAN: also lost.",
    accent: "purple" as const,
  },
  {
    name: "ORACLE-AI",
    codename: "GODMODE",
    desc: "An AI that knows what we're building. It won't tell us either.",
    status: "SMARTER THAN US",
    confidence: "??%",
    reveal: "LAST MESSAGE: 'figure it out yourselves.'",
    accent: "blue" as const,
  },
  {
    name: "UNTITLED",
    codename: "concept²",
    desc: "A concept of a concept. Pre-pre-pre-alpha.",
    status: "DAYDREAMING",
    confidence: "∞%",
    reveal: "SHIP DATE: when the stars align. Or never.",
    accent: "green" as const,
  },
];

const accentMap: Record<string, string> = {
  magenta: "#ff3ea5",
  blue: "#38e1ff",
  green: "#3dffa0",
  purple: "#b26bff",
};

export default function ClassifiedPanels({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {PROJECTS.map((p) => {
        const c = accentMap[p.accent];
        return (
          <div
            key={p.name}
            className="group relative glass p-4 overflow-hidden hud-corners"
            style={{ borderColor: `${c}40` }}
          >
            <div
              className="absolute inset-x-0 top-0 h-1"
              style={{ background: c, boxShadow: `0 0 12px ${c}` }}
            />
            <div className="flex items-center justify-between">
              <span
                className="text-[10px] font-tech tracking-[0.25em] uppercase"
                style={{ color: c }}
              >
                ▣ {p.name}
              </span>
              <span className="text-[9px] font-mono text-dim">
                CLEARANCE: MAX
              </span>
            </div>

            <div className="my-3 font-mono text-sm tracking-widest text-text/70">
              {p.codename}
              <span className="ml-2 text-dim">[REDACTED]</span>
            </div>

            <p className="text-[12px] text-dim leading-relaxed min-h-[48px]">
              {p.desc}
            </p>

            <div className="mt-3 flex items-center justify-between font-tech text-[10px] uppercase tracking-wider">
              <span style={{ color: c }}>{p.status}</span>
              <span className="text-neon-green/80">
                confidence: {p.confidence}
              </span>
            </div>

            {/* reveal on hover */}
            <div
              className="absolute inset-0 flex items-center justify-center p-4 text-center font-mono text-[12px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "rgba(2,4,9,0.94)",
                color: c,
                boxShadow: `inset 0 0 30px ${c}33`,
              }}
            >
              {p.reveal}
            </div>
          </div>
        );
      })}
    </div>
  );
}
