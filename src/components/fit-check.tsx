"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { fitChecks } from "@/lib/content";

export function FitCheck() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const score = useMemo(
    () => fitChecks.filter((item) => checked[item.id]).length,
    [checked],
  );

  const total = fitChecks.length;
  const ready = score >= 6;
  const almost = score >= 4 && score < 6;

  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
      <ul className="stagger space-y-0 border border-line bg-paper">
        {fitChecks.map((item) => {
          const on = Boolean(checked[item.id]);
          return (
            <li key={item.id} className="border-b border-line last:border-b-0">
              <label className="flex cursor-pointer items-start gap-4 px-5 py-5 transition-colors duration-150 hover:bg-canvas/60">
                <input
                  type="checkbox"
                  className="mt-1 size-5 accent-[var(--slate)]"
                  checked={on}
                  onChange={(e) =>
                    setChecked((prev) => ({
                      ...prev,
                      [item.id]: e.target.checked,
                    }))
                  }
                />
                <span className="text-base leading-snug text-ink md:text-lg">
                  {item.prompt}
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      <aside className="border border-line bg-ink p-7 text-[#e8ece9] lg:sticky lg:top-24 lg:self-start">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9aa59d]">
          Field verdict
        </p>
        <p className="display mt-3 text-6xl font-bold tracking-wide">
          {score}
          <span className="text-3xl text-[#8f9a92]">/{total}</span>
        </p>
        <p className="mt-4 text-base leading-relaxed text-[#c5cec7]">
          {ready
            ? "Strong match on paper. Next: meet ethical breeders or rescue, and plan training support before the dog arrives."
            : almost
              ? "Close — but gaps matter. Shore up exercise, experience, or household readiness before committing."
              : "This breed will likely outpace your current setup. Love the dog enough to wait, or choose a lower-drive partner."}
        </p>
        <div className="mt-7 flex flex-col gap-3">
          <Link href="/resources" className="btn btn-on-dark w-full">
            Find breeders & rescue
          </Link>
          <Link href="/training" className="btn btn-ghost-on-dark w-full">
            See training reality
          </Link>
        </div>
      </aside>
    </div>
  );
}
