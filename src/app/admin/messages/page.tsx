import { redirect } from "next/navigation";
import { AdminMessages } from "@/components/admin-messages";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { listContactMessages } from "@/lib/messages-store";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  try {
    const messages = await listContactMessages();
    return <AdminMessages initialMessages={messages} />;
  } catch {
    return (
      <p className="border border-line bg-paper p-6 text-ink-soft">
        Could not load messages right now. Please refresh.
      </p>
    );
  }
}
