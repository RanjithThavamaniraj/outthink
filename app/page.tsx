import { PageVisualLayers } from "@/components/effects/PageVisualLayers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ChallengeSection } from "@/components/sections/Challenge";
import { IntelligenceRecord } from "@/components/sections/IntelligenceRecord";
import { WhyOutthinkExists } from "@/components/sections/WhyOutthinkExists";

export default function Home() {
  return (
    <>
      <PageVisualLayers />
      <Header />
      <main className="site-experience relative z-[1] flex-1">
        <Hero />
        <ChallengeSection />
        <IntelligenceRecord />
        <WhyOutthinkExists />
      </main>
      <Footer />
    </>
  );
}
