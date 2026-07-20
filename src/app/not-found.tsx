import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white flex flex-col items-center justify-center text-center px-6">
      <Navbar />

      <div className="pt-20">
        <h1 className="font-space font-bold text-8xl sm:text-9xl text-brand-blue">404</h1>
        <h2 className="font-space font-bold text-2xl sm:text-3xl text-brand-navy mt-4">
          Page Not Found
        </h2>
        <p className="text-gray-500 mt-2 max-w-md mx-auto text-sm sm:text-base">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 bg-brand-blue text-white font-semibold rounded-2xl hover:bg-brand-blue-light transition-all shadow-xl shadow-brand-blue/25"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Home
        </Link>
      </div>
    </main>
  );
}
