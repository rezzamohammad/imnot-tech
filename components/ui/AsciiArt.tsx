export default function AsciiArt({
  className = "",
}: {
  className?: string;
}) {
  const art = String.raw`
        .-"      "-.
       /  ░░░░░  \
      |   O      O   |
      |      /\      |
       \   '----'   /
        '-.______.-'
  [ S Y S T E M : NOMINAL ]
  `;
  return (
    <pre
      className={`font-mono text-neon-green/90 text-[10px] sm:text-[12px] leading-[1.1] select-none ${className}`}
      style={{ textShadow: "0 0 10px rgba(61,255,160,0.55)" }}
    >
      {art}
    </pre>
  );
}
