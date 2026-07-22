"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, Mail, AlertCircle, ArrowRight } from "lucide-react";

export default function SCRSAdminPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter both Email ID and Password.");
      return;
    }

    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid Email ID or Password. Access denied.");
      } else {
        window.location.href = "/admin";
      }
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white flex flex-col justify-center py-12">
      <div className="px-6 lg:px-8 max-w-md mx-auto w-full text-center">
        {/* Logo Badge */}
        <div className="flex justify-center mb-6">
          <img
            src="/scrs-logo.png"
            alt="SCRS Logo"
            className="w-16 h-16 rounded-full object-contain shadow-lg shadow-brand-blue/20"
          />
        </div>

        <span className="text-xs font-semibold text-brand-blue uppercase tracking-wider px-3 py-1 bg-brand-blue/5 rounded-full border border-brand-blue/10">
          SCRS ADMIN MANAGEMENT ACCESS
        </span>

        <h1 className="font-space font-bold text-3xl sm:text-4xl text-brand-navy mt-4">
          Admin Login
        </h1>
        <p className="text-xs text-gray-500 mt-2">
          Management access for SCRS Administrators and Interview Panelists
        </p>

        {/* Login Card */}
        <div className="glass-card rounded-3xl p-8 mt-8 border border-gray-200 shadow-2xl space-y-6 text-left">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2.5 text-red-700 text-xs font-semibold">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-brand-navy mb-2">
                Admin Email ID
              </label>
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 focus-within:border-brand-blue focus-within:ring-2 focus-within:ring-brand-blue/10 transition-all">
                <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email ID"
                  className="w-full text-xs outline-none bg-transparent text-brand-navy"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-navy mb-2">
                Password
              </label>
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 focus-within:border-brand-blue focus-within:ring-2 focus-within:ring-brand-blue/10 transition-all">
                <Lock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full text-xs outline-none bg-transparent text-brand-navy"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-brand-blue to-brand-blue-light text-white font-semibold text-xs rounded-xl shadow-lg shadow-brand-blue/25 hover:shadow-brand-blue/40 hover:scale-[1.01] active:scale-[0.99] transition-all inline-flex items-center justify-center gap-2 mt-2"
            >
              {loading ? "Authenticating..." : "Sign In to Admin Dashboard"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
