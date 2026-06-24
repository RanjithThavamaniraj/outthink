"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CategorySelector } from "@/components/challenge/CategorySelector";
import { BeatAIView } from "@/components/challenge/BeatAIView";
import { useBeatAIFlow } from "@/hooks/useBeatAIFlow";
import { challengeService } from "@/lib/services/challenge-service";
import type { ChallengeCategory } from "@/lib/types/challenge";

export function ChallengeSection() {
  const [categories, setCategories] = useState<ChallengeCategory[]>([]);
  const flow = useBeatAIFlow();
  const { phase, category, loading, selectCategory, reset } = flow;

  useEffect(() => {
    const openCategories = () => reset();
    window.addEventListener("outthink:open-categories", openCategories);
    return () =>
      window.removeEventListener("outthink:open-categories", openCategories);
  }, [reset]);

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

      {!inBattle ? (
        <SectionHeader
          eyebrow="Beat the AI"
          title="Pick your battleground"
          description="Write your answer. Face the model. Find out if you can outthink AI."
          scanline
        />
      ) : null}

      <div className={`relative ${inBattle ? "" : "mt-8 sm:mt-10"}`}>
        <AnimatePresence mode="wait">
          {!inBattle ? (
            <motion.div
              key="selector"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
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
                <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-text-muted">
                  Loading challenge…
                </p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="battle"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <BeatAIView {...flow} categories={categories} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}
