import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { images } from "@/lib/images";
import { site } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the Blue Heeler field guide with lifestyle or training questions.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Send a field note"
        lead="Questions about fit, training volume, or where to look next? Drop a message."
        image={images.hero}
      />

      <section className="mx-auto max-w-7xl px-5 py-[var(--space-section)] md:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Inbox"
              title="We read for substance"
              lead="Tell us about your household, activity level, and what you’re trying to decide. The more concrete, the more useful the reply can be."
            />
            <dl className="mt-8 space-y-4 text-ink-soft">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Email
                </dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${site.email}`}
                    className="text-ink underline decoration-line underline-offset-4 transition-colors hover:text-slate"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Best for
                </dt>
                <dd className="mt-1">Lifestyle fit, training expectations, resource pointers</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Not for
                </dt>
                <dd className="mt-1">Emergency vet advice or guaranteed puppy placements</dd>
              </div>
            </dl>
          </Reveal>
          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
