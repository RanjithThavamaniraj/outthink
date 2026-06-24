"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import type { ChallengeCategory } from "@/lib/types/challenge";

type ChallengePromptProps = {
  category: ChallengeCategory;
  prompt: string;
};

export function ChallengePrompt({ category, prompt }: ChallengePromptProps) {
  return (
    <FadeIn>
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-text-muted">
          <span style={{ color: category.accent }}>{category.pillar}</span>
          <span className="mx-2 text-text-muted/25">·</span>
          {category.name}
        </p>
        <h3 className="mx-auto mt-4 font-display text-xl font-extrabold uppercase leading-snug tracking-tight text-text-primary sm:text-2xl md:text-[1.75rem]">
          {prompt}
        </h3>
      </div>
    </FadeIn>
  );
}
