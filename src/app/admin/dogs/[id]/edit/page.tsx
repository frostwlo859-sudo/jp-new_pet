import { notFound, redirect } from "next/navigation";
import { AdminDogForm } from "@/components/admin-dog-form";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getDog } from "@/lib/dogs-store";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function AdminEditDogPage({ params }: Props) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const dog = await getDog(id);
  if (!dog) notFound();

  return <AdminDogForm dog={dog} />;
}
