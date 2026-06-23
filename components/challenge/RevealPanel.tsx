"use client";

import { motion } from "framer-motion";
import type { AnswerSlot, CategoryStatistics, VoteResult } from "@/lib/types/challenge";
import { CategoryStats } from "@/components/challenge/CategoryStats";

type RevealPanelProps = {
  answerA: string;
  answerB: string;
  humanAnswer: AnswerSlot;
  voteResult: VoteResult;
  stats: CategoryStatistics;
  onPlayAgain: () => void;
  onChooseCategory: () => void;
};

export function RevealPanel({
  answerA,
  answerB,
  humanAnswer,
  voteResult,
  stats,
  onPlayAgain,
  onChooseCategory,
}: RevealPanelProps) {
  const slotLabel = (slot: AnswerSlot, type: "human" | "ai") => (
    <span
      className={`font-mono text-[10px] uppercase tracking-[0.24em] ${
        type === "human" ? "text-human" : "text-ai"
      }`}
    >
      {type === "human" ? "Human" : "AI"} · Answer {slot}
    </span>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-2xl text-center"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-text-muted">
        Identity revealed
      </p>
      <h3 className="mt-4 font-display text-2xl font-extrabold uppercase text-text-primary sm:text-3xl">
        {voteResult.guessedHumanCorrectly
          ? "You read the human"
          : "The machine fooled you"}
      </h3>

      <div className="mt-12 space-y-8 text-left">
        <div
          className={`border-l-2 pl-5 ${
            humanAnswer === "A" ? "border-human" : "border-ai"
          }`}
        >
          {slotLabel("A", humanAnswer === "A" ? "human" : "ai")}
          <p
            className={`mt-3 font-mono text-sm leading-relaxed sm:text-[15px] ${
              humanAnswer === "A" ? "text-human/90" : "text-ai/90"
            }`}
          >
            {answerA}
          </p>
        </div>

        <div
          className={`border-l-2 pl-5 ${
            humanAnswer === "B" ? "border-human" : "border-ai"
          }`}
        >
          {slotLabel("B", humanAnswer === "B" ? "human" : "ai")}
          <p
            className={`mt-3 font-mono text-sm leading-relaxed sm:text-[15px] ${
              humanAnswer === "B" ? "text-human/90" : "text-ai/90"
            }`}
          >
            {answerB}
          </p>
        </div>
      </div>

      <div className="mt-14">
        <CategoryStats stats={stats} />
      </div>

      <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <button
          type="button"
          onClick={onPlayAgain}
          className="min-w-[11rem] bg-human px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-background transition-colors hover:bg-[#22C55E]"
        >
          Next battle
        </button>
        <button
          type="button"
          onClick={onChooseCategory}
          className="min-w-[11rem] border border-border px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted transition-colors hover:border-border-hover hover:text-text-primary"
        >
          Change front
        </button>
      </div>
    </motion.div>
  );
}
