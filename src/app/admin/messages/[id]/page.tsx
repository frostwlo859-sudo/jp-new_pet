import { notFound, redirect } from "next/navigation";
import { AdminMessageDetail } from "@/components/admin-message-detail";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getContactMessage } from "@/lib/messages-store";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function AdminMessageDetailPage({ params }: Props) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const message = await getContactMessage(id);
  if (!message) notFound();

  return <AdminMessageDetail message={message} />;
}
