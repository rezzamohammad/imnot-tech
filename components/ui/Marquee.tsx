const SLOGANS = [
  "WE'RE BUILDING THE FUTURE™",
  "STATUS: UNDEFINED",
  "SERIES ∞ CLOSED",
  "PRODUCT: SOON™",
  "WE PIVOT SO YOU DON'T HAVE TO",
  "100% HYPE / 0% SHIP",
  "COMING SOON FOREVER",
];

export default function Marquee() {
  const items = [...SLOGANS, ...SLOGANS];
  return (
    <div className="relative overflow-hidden border-y border-neon-blue/20 py-3 bg-black/30">
      <div className="marquee font-display tracking-[0.3em] text-neon-blue/70 text-sm whitespace-nowrap">
        {items.map((s, i) => (
          <span key={i} className="mx-8 inline-block">
            ◆ {s}
          </span>
        ))}
      </div>
    </div>
  );
}
