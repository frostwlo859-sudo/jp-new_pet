"use client";

import { useMemo, useState } from "react";
import type { Review } from "@/lib/review-types";
import { reviewSummary } from "@/lib/reviews-data";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={i < rating ? "text-[#f4b400]" : "text-line"}
          aria-hidden
        >
          ★
        </span>
      ))}
    </div>
  );
}

function initials(author: string) {
  return author
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function ReviewsBoard({ reviews }: { reviews: Review[] }) {
  const [visible, setVisible] = useState(12);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return reviews;
    return reviews.filter(
      (r) =>
        r.text.toLowerCase().includes(q) ||
        r.author.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q),
    );
  }, [query, reviews]);

  const slice = filtered.slice(0, visible);

  return (
    <div>
      <div className="flex flex-col gap-6 border border-line bg-paper p-6 md:flex-row md:items-end md:justify-between md:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Owner reviews
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <p className="display text-5xl font-bold text-ink">
              {reviewSummary.average}
            </p>
            <div>
              <Stars rating={Math.round(reviewSummary.average)} />
              <p className="mt-1 text-sm text-muted">Average rating</p>
            </div>
          </div>
        </div>
        <label className="block w-full md:max-w-sm">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Search reviews
          </span>
          <input
            className="field"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisible(12);
            }}
            placeholder="City, name, or keyword"
          />
        </label>
      </div>

      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {slice.map((review) => (
          <li
            key={review.id}
            className="border border-line bg-paper p-5 transition-colors duration-150 hover:bg-canvas"
          >
            <div className="flex items-start gap-3">
              <div
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-slate text-sm font-semibold text-[#f4f7f5]"
                aria-hidden
              >
                {initials(review.author)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <p className="font-semibold text-ink">{review.author}</p>
                  <span className="text-xs uppercase tracking-[0.1em] text-muted">
                    {review.location}
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <Stars rating={review.rating} />
                  <span className="text-xs text-muted">{review.date}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {review.text}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {visible < filtered.length ? (
        <button
          type="button"
          className="btn btn-ghost mt-8"
          onClick={() => setVisible((v) => v + 12)}
        >
          Load more reviews
        </button>
      ) : null}

      {filtered.length === 0 ? (
        <p className="mt-8 text-ink-soft">No reviews match that search.</p>
      ) : null}
    </div>
  );
}
