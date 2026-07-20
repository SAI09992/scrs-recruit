import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import DomainsSection from "@/components/landing/DomainsSection";
import TimelineSection from "@/components/landing/TimelineSection";
import FAQSection from "@/components/landing/FAQSection";
import CoordinatorsSection from "@/components/landing/CoordinatorsSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white pb-12">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <DomainsSection />
      <TimelineSection />
      <FAQSection />
      <CoordinatorsSection />
    </main>
  );
}
