"use client";

import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/animations/FadeIn";
import { WalletPassStack } from "@/components/leaderboard/WalletPassStack";
import { fullLeaderboard } from "@/lib/data";

export function LeaderboardFull() {
  return (
    <Section id="leaderboard-full" className="overflow-hidden">
      <FadeIn>
        <div className="mx-auto max-w-md text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-text-muted">
            Leaderboard
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight text-text-primary sm:text-4xl">
            Full standings
          </h2>
          <p className="mt-2 text-sm text-text-muted">
            {fullLeaderboard.length} competitors ranked by wins. Tap a pass to
            bring it forward.
          </p>
        </div>
      </FadeIn>

      <div className="mx-auto mt-10 w-full max-w-md sm:mt-12">
        <WalletPassStack players={fullLeaderboard} compact />
      </div>

      <FadeIn delay={0.2} className="mt-8 text-center sm:mt-10">
        <a
          href="#leaderboard"
          className="font-mono text-[10px] uppercase tracking-[0.28em] text-text-muted transition-colors hover:text-human"
        >
          ← Back to top minds
        </a>
      </FadeIn>
    </Section>
  );
}
