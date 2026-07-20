import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import DomainsSection from "@/components/landing/DomainsSection";
import TimelineSection from "@/components/landing/TimelineSection";
import FAQSection from "@/components/landing/FAQSection";

export default function HomePage() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <DomainsSection />
      <TimelineSection />
      <FAQSection />
    </main>
  );
}
