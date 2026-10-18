type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  lead?: string;
  light?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p
          className={`text-xs font-semibold uppercase tracking-[0.2em] ${light ? "text-[#aeb8b1]" : "text-slate"}`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`display mt-2 text-4xl font-bold uppercase leading-[0.95] tracking-[0.04em] md:text-5xl ${light ? "text-[#f2f5f3]" : "text-ink"}`}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={`mt-4 text-lg leading-relaxed ${light ? "text-[#c5cec7]" : "text-ink-soft"}`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
