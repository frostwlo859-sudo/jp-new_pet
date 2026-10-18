import { breedStats } from "@/lib/content";

export function StatsStrip({ className = "" }: { className?: string }) {
  return (
    <div
      className={`grid grid-cols-2 border-y border-line bg-paper sm:grid-cols-3 lg:grid-cols-6 ${className}`}
    >
      {breedStats.map((stat) => (
        <div
          key={stat.label}
          className="border-line px-4 py-5 not-last:border-b sm:not-last:border-b-0 sm:odd:border-r lg:border-b-0 lg:not-last:border-r"
        >
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted">
            {stat.label}
          </p>
          <p className="display mt-1 text-2xl font-bold tracking-wide text-ink md:text-[1.75rem]">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
