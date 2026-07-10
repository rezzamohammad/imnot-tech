const MILESTONES = [
  {
    q: "Q1 · 2077",
    title: "Conceive the idea",
    detail: "During a 3-hour meeting that could have been a tweet.",
    state: "done" as const,
  },
  {
    q: "Q2 · 2077",
    title: "Hire one (1) intern",
    detail: "They now run the entire company. We don't understand why.",
    state: "done" as const,
  },
  {
    q: "Q3 · 2077",
    title: "Pivot ×4",
    detail: "We have pivoted so hard we're facing the original direction again.",
    state: "active" as const,
  },
  {
    q: "Q4 · 2077",
    title: "Acqui-hire ourselves",
    detail: "Cancelled. No one wanted to buy us. We were shocked.",
    state: "cancelled" as const,
  },
  {
    q: "Q1 · 2078",
    title: "Soft launch (maybe)",
    detail: "Tentative. Subject to vibes. Do not hold breath.",
    state: "pending" as const,
  },
  {
    q: "∞",
    title: "Coming soon forever",
    detail: "Our flagship milestone. Always 6 months away. Since 2075.",
    state: "pending" as const,
  },
];

export default function FakeRoadmap({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div
        className="absolute left-[18px] top-2 bottom-2 w-px hidden sm:block"
        style={{
          background:
            "linear-gradient(to bottom, #38e1ff, #b26bff, rgba(61,255,160,0.4))",
        }}
      />
      <ul className="space-y-5">
        {MILESTONES.map((m) => {
          const dot =
            m.state === "done"
              ? "#3dffa0"
              : m.state === "active"
                ? "#38e1ff"
                : m.state === "cancelled"
                  ? "#ff3ea5"
                  : "#6f7da3";
          return (
            <li key={m.q} className="relative pl-12">
              <span
                className="absolute left-2 top-1 w-4 h-4 rounded-full"
                style={{
                  background: dot,
                  boxShadow: `0 0 12px ${dot}`,
                  outline: "3px solid rgba(4,5,10,0.9)",
                }}
              />
              <div className="font-tech text-[11px] tracking-[0.25em] uppercase text-dim">
                {m.q}
              </div>
              <div
                className={`font-display text-lg ${
                  m.state === "cancelled" ? "line-through opacity-60" : ""
                }`}
                style={{ color: dot }}
              >
                {m.title}
              </div>
              <p className="text-[13px] text-dim mt-1 max-w-xl">{m.detail}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
