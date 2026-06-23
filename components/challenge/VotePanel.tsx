"use client";

import { motion } from "framer-motion";
import type { AnswerSlot } from "@/lib/types/challenge";

type VotePanelProps = {
  onVote: (winner: AnswerSlot) => void;
};

export function VotePanel({ onVote }: VotePanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
    >
      <p className="font-display text-xl font-extrabold uppercase tracking-tight text-text-primary sm:text-2xl">
        Which answer wins?
      </p>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.28em] text-text-muted">
        Trust your instinct — human or machine
      </p>

      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
        <button
          type="button"
          onClick={() => onVote("A")}
          className="group min-w-[10rem] border border-border px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-text-primary transition-all duration-300 hover:border-human/40 hover:text-human hover:shadow-[0_0_20px_rgba(74,222,128,0.12)]"
        >
          A wins
        </button>
        <button
          type="button"
          onClick={() => onVote("B")}
          className="group min-w-[10rem] border border-border px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-text-primary transition-all duration-300 hover:border-ai/40 hover:text-ai hover:shadow-[0_0_20px_rgba(96,165,250,0.12)]"
        >
          B wins
        </button>
      </div>
    </motion.div>
  );
}
