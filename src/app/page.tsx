import HeroSection from "@/components/home/HeroSection";
import MissionStatement from "@/components/home/MissionStatement";
import HowItWorksPreview from "@/components/home/HowItWorksPreview";
import PricingPreview from "@/components/home/PricingPreview";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import StarField from "@/components/shared/StarField";

export default function Home() {
  return (
    <>
      <StarField />
      <div className="relative z-10">
        <HeroSection />
        <MissionStatement />
        <HowItWorksPreview />
        <PricingPreview />
        <TestimonialsSection />
        <CTASection />
      </div>
    </>
  );
}
