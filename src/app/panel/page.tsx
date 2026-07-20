import PanelDashboardClient from "@/components/panel/PanelDashboardClient";

export default function InterviewPanelPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white pb-24 pt-8">
      <div className="px-6 lg:px-8 max-w-6xl mx-auto">
        <PanelDashboardClient />
      </div>
    </main>
  );
}
