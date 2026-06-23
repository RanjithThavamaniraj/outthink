"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/animations/FadeIn";
import { CategorySelector } from "@/components/challenge/CategorySelector";
import { BattleView } from "@/components/challenge/BattleView";
import { useChallengeFlow } from "@/hooks/useChallengeFlow";
import { challengeService } from "@/lib/services/challenge-service";
import type { ChallengeCategory } from "@/lib/types/challenge";

export function ChallengeSection() {
  const [categories, setCategories] = useState<ChallengeCategory[]>([]);
  const {
    phase,
    category,
    battle,
    stats,
    voteResult,
    loading,
    selectCategory,
    submitVote,
    reset,
    playAgain,
  } = useChallengeFlow();

  useEffect(() => {
    challengeService.getCategories().then(setCategories);
  }, []);

  const inBattle = phase !== "select";

  return (
    <Section id="challenge" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 45% 35% at 50% 30%, rgba(74,222,128,0.03) 0%, transparent 70%),
            radial-gradient(ellipse 40% 30% at 80% 70%, rgba(96,165,250,0.03) 0%, transparent 65%)
          `,
        }}
      />

      <FadeIn>
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-text-muted">
            The arena
          </p>
          <h2 className="scanline-heading mt-3 font-display font-extrabold uppercase text-text-primary">
            Pick your battleground
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-text-muted">
            Five forms of human intelligence. Each front is a different way to
            challenge AI — foresight, reasoning, creativity, empathy, or wit.
          </p>
        </div>
      </FadeIn>

      <div className="relative mt-10 sm:mt-12">
        <AnimatePresence mode="wait">
          {!inBattle ? (
            <motion.div
              key="selector"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
            >
              {categories.length > 0 && (
                <CategorySelector
                  categories={categories}
                  selectedId={category?.id ?? null}
                  onSelect={selectCategory}
                  loading={loading}
                />
              )}
              {loading && (
                <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-text-muted">
                  Loading battle…
                </p>
              )}
            </motion.div>
          ) : (
            category &&
            battle &&
            stats && (
              <motion.div
                key="battle"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <BattleView
                  phase={phase}
                  category={category}
                  battle={battle}
                  stats={stats}
                  voteResult={voteResult}
                  onVote={submitVote}
                  onPlayAgain={playAgain}
                  onChooseCategory={reset}
                />
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}
