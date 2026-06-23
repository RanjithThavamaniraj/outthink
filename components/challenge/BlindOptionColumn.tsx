"use client";

import { motion } from "framer-motion";
import type { AnswerSlot } from "@/lib/types/challenge";

type BlindOptionColumnProps = {
  slot: AnswerSlot;
  answer: string;
  selected: boolean;
  voted: boolean;
  onChoose: () => void;
  revealLabel?: string;
  revealAccent?: "human" | "ai";
};

export function BlindOptionColumn({
  slot,
  answer,
  selected,
  voted,
  onChoose,
  revealLabel,
  revealAccent,
}: BlindOptionColumnProps) {
  const isRevealed = Boolean(revealLabel);

  return (
    <motion.div
      initial={isRevealed ? { opacity: 0, y: 8 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`text-left ${isRevealed && revealAccent ? "reveal-identity-glow" : ""}`}
    >
      <p
        className={`font-mono text-[10px] uppercase tracking-[0.28em] ${
          isRevealed && revealAccent === "human"
            ? "text-human"
            : isRevealed && revealAccent === "ai"
              ? "text-ai"
              : "text-text-muted"
        }`}
      >
        {isRevealed ? revealLabel : `Option ${slot}`}
      </p>

      <p
        className={`mt-3 border-l-2 pl-4 font-mono text-sm leading-relaxed sm:pl-5 sm:text-[15px] ${
          isRevealed && revealAccent === "human"
            ? "border-human text-human/90"
            : isRevealed && revealAccent === "ai"
              ? "border-ai text-ai/90"
              : selected
                ? "border-text-primary/40 text-text-primary/90"
                : "border-border text-text-muted"
        }`}
      >
        {answer}
      </p>

      {!voted && (
        <button
          type="button"
          onClick={onChoose}
          className={`mt-6 font-mono text-[10px] uppercase tracking-[0.24em] transition-colors duration-300 underline-offset-4 hover:underline ${
            selected
              ? "text-text-primary"
              : "text-text-muted hover:text-text-primary"
          }`}
        >
          {selected ? "Locked in" : "This one wins →"}
        </button>
      )}
    </motion.div>
  );
}
