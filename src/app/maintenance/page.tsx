import Navbar from "@/components/landing/Navbar";
import { Wrench } from "lucide-react";

export default function MaintenancePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white flex flex-col items-center justify-center text-center px-6">
      <Navbar />

      <div className="pt-20 max-w-md mx-auto">
        <div className="w-20 h-20 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-6 shadow-xl">
          <Wrench className="w-10 h-10" />
        </div>
        <h1 className="font-space font-bold text-3xl text-brand-navy">Under Scheduled Maintenance</h1>
        <p className="text-gray-500 mt-3 text-sm leading-relaxed">
          The SCRS Recruitment Portal is currently undergoing scheduled system updates. We will be back online shortly!
        </p>
      </div>
    </main>
  );
}
