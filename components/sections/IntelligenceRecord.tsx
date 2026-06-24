"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/animations/FadeIn";
import {
  CHALLENGE_CATEGORIES,
  MOCK_CATEGORY_STATS,
} from "@/lib/data/mock-challenges";
import { stats } from "@/lib/data";
import type { ChallengeCategory } from "@/lib/types/challenge";

const globalHumanWin = stats[2].value;
const globalAiWin = 100 - globalHumanWin;

function FrontRow({
  category,
  index,
}: {
  category: ChallengeCategory;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const frontStats = MOCK_CATEGORY_STATS[category.id];
  const humanLeads = frontStats.humanWinPercent > frontStats.aiWinPercent;
  const leaderPercent = humanLeads
    ? frontStats.humanWinPercent
    : frontStats.aiWinPercent;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.45,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="intelligence-front-row group border-t border-border/50 py-5 sm:py-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <span className="text-lg sm:text-xl" aria-hidden>
              {category.icon}
            </span>
            <div>
              <p
                className="font-mono text-[9px] uppercase tracking-[0.28em] sm:text-[10px]"
                style={{ color: category.accent }}
              >
                {category.pillar}
              </p>
              <p className="font-display text-sm font-extrabold uppercase tracking-wide text-text-primary sm:text-base">
                {category.name}
              </p>
            </div>
          </div>
          <p className="mt-2 max-w-md text-xs leading-relaxed text-text-muted sm:text-sm">
            {category.description}
          </p>
        </div>

        <div className="w-full shrink-0 sm:w-48">
          <div className="flex items-baseline justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted">
            <span className={humanLeads ? "text-human" : "text-ai"}>
              {humanLeads ? "Humans lead" : "AI leads"}
            </span>
            <span className="tabular-nums text-text-primary/80">
              {leaderPercent}%
            </span>
          </div>
          <div className="mt-2 h-px w-full overflow-hidden bg-ai/20">
            <motion.div
              className="h-px bg-human"
              initial={{ width: 0 }}
              animate={inView ? { width: `${frontStats.humanWinPercent}%` } : {}}
              transition={{
                duration: 0.9,
                delay: 0.1 + index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </div>
          <p className="mt-2 text-right font-mono text-[9px] text-text-muted/60">
            {frontStats.totalVotes.toLocaleString()} judgments
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function IntelligenceRecord() {
  const spectrumRef = useRef<HTMLDivElement>(null);
  const spectrumInView = useInView(spectrumRef, { once: true, margin: "-40px" });
  const humansLeadGlobal = globalHumanWin >= globalAiWin;

  return (
    <Section id="intelligence-record" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 50% 40% at 20% 50%, rgba(74,222,128,0.04) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 80% 50%, rgba(96,165,250,0.04) 0%, transparent 55%)
          `,
        }}
      />

      <SectionHeader
        eyebrow="The species score"
        title="Where humans still win"
        description="Not one battle — five kinds of intelligence. This is how the species is performing against AI, front by front."
      />

      <FadeIn delay={0.08} className="relative mx-auto mt-8 max-w-2xl sm:mt-10">
        <div ref={spectrumRef} className="text-center">
          <div className="flex items-end justify-center gap-10 sm:gap-14">
            <div>
              <p className="font-display text-4xl font-extrabold tabular-nums text-human sm:text-5xl">
                {globalHumanWin}%
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted">
                Human
              </p>
            </div>
            <div className="h-12 w-px bg-border" aria-hidden />
            <div>
              <p className="font-display text-4xl font-extrabold tabular-nums text-ai sm:text-5xl">
                {globalAiWin.toFixed(1)}%
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted">
                AI
              </p>
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-md">
            <div className="frontier-spectrum h-[2px]">
              <motion.div
                className="frontier-spectrum-human"
                initial={{ width: 0 }}
                animate={
                  spectrumInView ? { width: `${globalHumanWin}%` } : { width: 0 }
                }
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              />
              <div
                className="frontier-spectrum-marker"
                style={{ left: `${globalHumanWin}%` }}
              />
            </div>
          </div>

          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-text-muted/70">
            {humansLeadGlobal
              ? "Humans ahead — for now"
              : "AI is catching up"}
          </p>
        </div>
      </FadeIn>

      <div className="relative mx-auto mt-8 max-w-2xl sm:mt-10">
        {CHALLENGE_CATEGORIES.map((category, index) => (
          <FrontRow key={category.id} category={category} index={index} />
        ))}
      </div>
    </Section>
  );
}
