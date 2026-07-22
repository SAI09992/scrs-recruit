import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";

export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/scrsadmin");
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white pb-24 pt-8">
      <div className="px-6 lg:px-8 max-w-[1600px] mx-auto">
        <AdminDashboardClient user={session.user} />
      </div>
    </main>
  );
}
