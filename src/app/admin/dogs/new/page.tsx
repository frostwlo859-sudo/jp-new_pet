import { redirect } from "next/navigation";
import { AdminDogForm } from "@/components/admin-dog-form";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminNewDogPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return <AdminDogForm />;
}
