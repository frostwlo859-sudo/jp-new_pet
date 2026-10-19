"use client";

import Link from "next/link";
import { useState } from "react";
import type { AdoptionRequest } from "@/lib/adoptions-store";

const statusLabel: Record<AdoptionRequest["status"], string> = {
  new: "New",
  contacted: "Contacted",
  approved: "Approved",
  declined: "Declined",
};

export function AdminAdoptions({
  initialRequests,
}: {
  initialRequests: AdoptionRequest[];
}) {
  const [requests, setRequests] = useState(initialRequests);
  const [message, setMessage] = useState("");

  async function refresh() {
    const res = await fetch("/api/adoptions");
    if (res.ok) setRequests((await res.json()) as AdoptionRequest[]);
  }

  async function setRequestStatus(
    id: string,
    status: AdoptionRequest["status"],
  ) {
    const res = await fetch(`/api/adoptions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      setMessage("Could not update this request.");
      return;
    }
    setMessage("Request updated.");
    await refresh();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="display text-4xl font-bold uppercase tracking-[0.05em]">
          Adoption requests
        </h1>
        <p className="mt-2 text-ink-soft">
          Open a request to review the home details, then mark its status.
        </p>
      </div>

      {message ? (
        <p className="border border-slate/30 bg-canvas px-4 py-3 text-sm text-ink">
          {message}
        </p>
      ) : null}

      {requests.length === 0 ? (
        <p className="border border-line bg-paper p-6 text-ink-soft">
          No adoption requests yet.
        </p>
      ) : (
        <ul className="space-y-3">
          {requests.map((req) => (
            <li key={req.id} className="border border-line bg-paper p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="display text-xl font-bold uppercase tracking-[0.04em]">
                    {req.dogName}{" "}
                    <span className="text-sm font-semibold text-slate">
                      {statusLabel[req.status]}
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {req.name} · {req.email} · {req.phone}
                  </p>
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-soft">
                    {req.experience}
                  </p>
                  <p className="mt-2 text-xs text-muted">
                    {new Date(req.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/admin/adoptions/${req.id}`}
                    className="btn btn-primary !min-h-9 !text-sm"
                  >
                    Details
                  </Link>
                  {(
                    ["new", "contacted", "approved", "declined"] as const
                  ).map((status) => (
                    <button
                      key={status}
                      type="button"
                      className="btn btn-ghost !min-h-8 !px-2 !text-xs"
                      onClick={() => setRequestStatus(req.id, status)}
                    >
                      {statusLabel[status]}
                    </button>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
