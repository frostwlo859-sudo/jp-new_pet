import { notFound, redirect } from "next/navigation";
import { AdminAdoptionDetail } from "@/components/admin-adoption-detail";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAdoptionRequest } from "@/lib/adoptions-store";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function AdminAdoptionDetailPage({ params }: Props) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const request = await getAdoptionRequest(id);
  if (!request) notFound();

  return <AdminAdoptionDetail request={request} />;
}
