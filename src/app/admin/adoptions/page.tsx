import { redirect } from "next/navigation";
import { AdminAdoptions } from "@/components/admin-adoptions";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { listAdoptionRequests } from "@/lib/adoptions-store";

export const dynamic = "force-dynamic";

export default async function AdminAdoptionsPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  try {
    const requests = await listAdoptionRequests();
    return <AdminAdoptions initialRequests={requests} />;
  } catch {
    return (
      <p className="border border-line bg-paper p-6 text-ink-soft">
        Could not load adoption requests right now. Please refresh.
      </p>
    );
  }
}
