import { redirect } from "next/navigation";
import { AdminOverview } from "@/components/admin-overview";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { listAdoptionRequests } from "@/lib/adoptions-store";
import { readDogs } from "@/lib/dogs-store";
import { listContactMessages } from "@/lib/messages-store";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  try {
    const [dogs, requests, messages] = await Promise.all([
      readDogs(),
      listAdoptionRequests(),
      listContactMessages(),
    ]);

    return (
      <AdminOverview
        available={dogs.filter((d) => d.status === "available").length}
        reserved={dogs.filter((d) => d.status === "reserved").length}
        sold={dogs.filter((d) => d.status === "sold").length}
        newRequests={requests.filter((r) => r.status === "new").length}
        newMessages={messages.filter((m) => m.status === "new").length}
        dogCount={dogs.length}
      />
    );
  } catch {
    return (
      <div className="border border-line bg-paper p-8">
        <h1 className="display text-3xl font-bold uppercase tracking-[0.05em]">
          Temporarily unavailable
        </h1>
        <p className="mt-3 max-w-xl text-ink-soft">
          The kennel board could not load right now. Refresh the page in a
          moment.
        </p>
      </div>
    );
  }
}
