import { notFound, redirect } from "next/navigation";
import { AdminDogDetail } from "@/components/admin-dog-detail";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getDog } from "@/lib/dogs-store";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function AdminDogDetailPage({ params }: Props) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const dog = await getDog(id);
  if (!dog) notFound();

  return <AdminDogDetail dog={dog} />;
}
