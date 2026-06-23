import { PageVisualLayers } from "@/components/effects/PageVisualLayers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { ChallengeSection } from "@/components/sections/Challenge";
import { FeaturedBattle } from "@/components/sections/FeaturedBattle";
import { Leaderboard } from "@/components/sections/Leaderboard";

export default function Home() {
  return (
    <>
      <PageVisualLayers />
      <Header />
      <main className="relative z-[1] flex-1">
        <Hero />
        <Stats />
        <ChallengeSection />
        <FeaturedBattle />
        <Leaderboard />
      </main>
      <Footer />
    </>
  );
}
