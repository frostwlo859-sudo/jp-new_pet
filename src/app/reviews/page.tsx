import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { ReviewsBoard } from "@/components/reviews-board";
import { images } from "@/lib/images";
import { reviews, reviewSummary } from "@/lib/reviews-data";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "What Blue Heeler owners say after bringing a dog home — honest feedback from real placements.",
};

export default function ReviewsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Blue Heeler for Adoption",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: reviewSummary.average,
      reviewCount: reviewSummary.count,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews.slice(0, 20).map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      datePublished: r.date,
      reviewBody: r.text,
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="Reviews"
        title="What owners report back"
        lead="Honest notes from people who adopted a Blue Heeler — temperament, training, and life after pickup."
        image={images.bond}
      />

      <section className="mx-auto max-w-7xl px-5 py-[var(--space-section)] md:px-8">
        <ReviewsBoard reviews={reviews} />
        <Link href="/available" className="btn btn-primary mt-12">
          Adopt a Blue Heeler
        </Link>
      </section>
    </>
  );
}
