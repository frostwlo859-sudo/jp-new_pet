import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin-dashboard";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { listAdoptionRequests } from "@/lib/adoptions-store";
import { readDogs } from "@/lib/dogs-store";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  try {
    const [dogs, requests] = await Promise.all([
      readDogs(),
      listAdoptionRequests(),
    ]);
    return (
      <AdminDashboard initialDogs={dogs} initialRequests={requests} />
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
          Set <code>MONGODB_URI</code> in <code>.env.local</code> and on Vercel,
          then restart the app. Log in and use <strong>Seed sample dogs</strong>{" "}
          once.
        </p>
      </div>
    );
  }
}
