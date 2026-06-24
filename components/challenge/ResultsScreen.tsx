"use client";

import { motion } from "framer-motion";
import { LOSS_XP, WIN_XP } from "@/lib/services/user-stats-service";

type ResultsScreenProps = {
  won: boolean;
  xpEarned: number;
  onPlayAgain: () => void;
  onChangeCategory: () => void;
};

export function ResultsScreen({
  won,
  xpEarned,
  onPlayAgain,
  onChangeCategory,
}: ResultsScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-lg text-center"
    >
      <p className="text-4xl sm:text-5xl" aria-hidden>
        {won ? "🎉" : "🤖"}
      </p>
      <h3
        className={`mt-4 font-display text-2xl font-extrabold uppercase tracking-tight sm:text-3xl ${
          won ? "text-human" : "text-ai"
        }`}
      >
        {won ? "You outthought AI" : "AI outthought you"}
      </h3>
      <p className="mt-3 text-sm text-text-muted">
        {won
          ? "Your answer beat the model on this front."
          : "The model took this round. Come back sharper."}
      </p>
      <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.28em] text-text-muted">
        +{xpEarned} XP · {won ? `+${WIN_XP} win` : `+${LOSS_XP} effort`}
      </p>

      <div className="mt-8 flex flex-col items-center gap-4">
        <button
          type="button"
          onClick={onPlayAgain}
          className="min-w-[11rem] bg-human px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-background transition-colors hover:bg-[#22C55E]"
        >
          Next challenge →
        </button>
        <button
          type="button"
          onClick={onChangeCategory}
          className="font-mono text-[10px] uppercase tracking-[0.28em] text-text-muted transition-colors hover:text-human"
        >
          Change battleground
        </button>
      </div>
    </motion.div>
  );
}
