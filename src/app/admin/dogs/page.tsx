import { redirect } from "next/navigation";
import { AdminDogsList } from "@/components/admin-dogs-list";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { readDogs } from "@/lib/dogs-store";

export const dynamic = "force-dynamic";

export default async function AdminDogsPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  try {
    const dogs = await readDogs();
    return <AdminDogsList initialDogs={dogs} />;
  } catch {
    return (
      <p className="border border-line bg-paper p-6 text-ink-soft">
        Could not load dogs right now. Please refresh.
      </p>
    );
  }
}
