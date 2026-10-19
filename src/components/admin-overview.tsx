import Link from "next/link";

type Props = {
  available: number;
  reserved: number;
  sold: number;
  newRequests: number;
  newMessages: number;
  dogCount: number;
};

export function AdminOverview(props: Props) {
  const cards = [
    {
      label: "Available dogs",
      value: props.available,
      href: "/admin/dogs",
    },
    {
      label: "Reserved",
      value: props.reserved,
      href: "/admin/dogs",
    },
    {
      label: "Adopted",
      value: props.sold,
      href: "/admin/dogs",
    },
    {
      label: "New adoption requests",
      value: props.newRequests,
      href: "/admin/adoptions",
    },
    {
      label: "New messages",
      value: props.newMessages,
      href: "/admin/messages",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="display text-4xl font-bold uppercase tracking-[0.05em]">
          Overview
        </h1>
        <p className="mt-2 max-w-2xl text-ink-soft">
          Kennel snapshot. Open Dogs, Adoptions, or Messages for full details.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="border border-line bg-paper p-5 transition-colors hover:bg-canvas"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              {card.label}
            </p>
            <p className="display mt-1 text-4xl font-bold text-ink">
              {card.value}
            </p>
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/admin/dogs/new" className="btn btn-primary">
          Add heeler
        </Link>
        <Link href="/admin/dogs" className="btn btn-ghost">
          All dogs ({props.dogCount})
        </Link>
        <Link href="/admin/adoptions" className="btn btn-ghost">
          Adoptions
        </Link>
        <Link href="/admin/messages" className="btn btn-ghost">
          Messages
        </Link>
      </div>
    </div>
  );
}
