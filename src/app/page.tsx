import HeroSection from "@/components/home/HeroSection";
import MissionStatement from "@/components/home/MissionStatement";
import EmotionalSection from "@/components/home/EmotionalSection";
import PackagePreview from "@/components/home/PackagePreview";
import HowItWorksPreview from "@/components/home/HowItWorksPreview";
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
        <EmotionalSection />
        <PackagePreview />
        <HowItWorksPreview />
        <TestimonialsSection />
        <CTASection />
      </div>
    </>
  );
}
