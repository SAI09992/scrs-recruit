import Navbar from "@/components/landing/Navbar";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white pb-24">
      <Navbar />

      <div className="pt-28 sm:pt-36 px-6 lg:px-8 max-w-4xl mx-auto space-y-6">
        <h1 className="font-space font-bold text-4xl text-brand-navy">Privacy Policy</h1>
        <p className="text-sm text-gray-500">Last updated: July 20, 2026</p>

        <div className="glass-card p-8 rounded-3xl space-y-4 text-sm text-gray-600 leading-relaxed">
          <h3 className="font-bold text-brand-navy text-lg">1. Information We Collect</h3>
          <p>
            We collect personal information provided during the SCRS recruitment process, including full name, roll number, email address, phone number, academic department, social links, resume responses, and domain selections.
          </p>

          <h3 className="font-bold text-brand-navy text-lg">2. How We Use Your Information</h3>
          <p>
            Your information is used solely for evaluating candidate applications, scheduling recruitment interviews, communicating results, and maintaining recruitment statistics for the Soft Computing Research Society (SCRS), Kalasalingam Academy of Research and Education.
          </p>

          <h3 className="font-bold text-brand-navy text-lg">3. Data Security</h3>
          <p>
            We implement strict security measures to protect your application data against unauthorized access, alteration, or disclosure.
          </p>
        </div>
      </div>
    </main>
  );
}
