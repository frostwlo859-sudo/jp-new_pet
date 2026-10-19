import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin-dashboard";
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
      <AdminDashboard
        initialDogs={dogs}
        initialRequests={requests}
        initialMessages={messages}
      />
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not load admin data.";
    return (
      <div className="border border-line bg-paper p-8">
        <h1 className="display text-3xl font-bold uppercase tracking-[0.05em]">
          Database not connected
        </h1>
        <p className="mt-3 max-w-xl text-ink-soft">{message}</p>
        <p className="mt-4 text-sm text-muted">
          Check Atlas Network Access allows your IP, then restart the dev
          server. Dogs already seeded stay in the database.
        </p>
      </div>
    );
  }
}
