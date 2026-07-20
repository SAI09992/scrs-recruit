import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-brand-navy text-white overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-blue/5 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/scrs-logo.png"
                alt="SCRS Logo"
                className="w-10 h-10 rounded-full object-contain shadow-md"
              />
              <span className="font-space font-bold text-lg">SCRS</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Soft Computing Research Society, Kalasalingam Academy of Research and Education.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-space font-semibold text-sm uppercase tracking-wider mb-5 text-gray-300">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { href: "#about", label: "About SCRS" },
                { href: "#domains", label: "Domains" },
                { href: "#timeline", label: "Timeline" },
                { href: "/apply", label: "Apply Now" },
                { href: "#faq", label: "FAQ" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Portals */}
          <div>
            <h4 className="font-space font-semibold text-sm uppercase tracking-wider mb-5 text-gray-300">
              Portals
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/dashboard", label: "Candidate Dashboard" },
                { href: "/admin", label: "Admin Dashboard" },
                { href: "/panel", label: "Interview Panel" },
                { href: "/results", label: "Results" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-space font-semibold text-sm uppercase tracking-wider mb-5 text-gray-300">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-brand-blue-lighter mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-400">scrs@kalasalingam.ac.in</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-brand-blue-lighter mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-400">+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-blue-lighter mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-400">
                  Kalasalingam Academy of Research and Education, Krishnankoil, Tamil Nadu
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Soft Computing Research Society. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-gray-500 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-gray-500 hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
