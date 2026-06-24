"use client";

import { motion } from "framer-motion";
import type { AnswerSlot } from "@/lib/types/challenge";

type BlindBattleProps = {
  firstAnswer: string;
  secondAnswer: string;
  pickedSlot: AnswerSlot | null;
  onPick: (slot: AnswerSlot) => void;
};

function BlindPanel({
  slot,
  answer,
  selected,
  onPick,
}: {
  slot: AnswerSlot;
  answer: string;
  selected: boolean;
  onPick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onPick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.995 }}
      className={`battle-duel-panel group relative flex min-h-[11rem] flex-1 flex-col overflow-hidden p-6 text-left sm:min-h-[13rem] sm:p-8 ${
        selected ? "battle-duel-panel-selected" : ""
      }`}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-text-muted">
        Option {slot}
      </p>
      <p className="mt-4 font-mono text-[13px] leading-[1.7] text-text-primary/80 sm:text-sm">
        {answer}
      </p>
      <span
        className={`mt-8 inline-flex border px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] transition-colors ${
          selected
            ? "border-text-primary/50 text-text-primary"
            : "border-border/80 text-text-muted group-hover:border-text-primary/35 group-hover:text-text-primary"
        }`}
      >
        {selected ? "Locked in" : "Stronger answer →"}
      </span>
    </motion.button>
  );
}

export function BlindBattle({
  firstAnswer,
  secondAnswer,
  pickedSlot,
  onPick,
}: BlindBattleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="mx-auto w-full"
    >
      <p className="mb-6 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-text-muted">
        Blind battle — pick the stronger answer
      </p>
      <p className="mx-auto mb-6 max-w-lg text-center text-sm text-text-muted">
        Neither writer is revealed yet. Trust your judgment.
      </p>
      <div className="battle-duel-split">
        <BlindPanel
          slot="A"
          answer={firstAnswer}
          selected={pickedSlot === "A"}
          onPick={() => onPick("A")}
        />
        <div className="battle-duel-vs" aria-hidden>
          <div className="battle-duel-vs-line" />
          <span className="battle-duel-vs-badge">VS</span>
          <div className="battle-duel-vs-line" />
        </div>
        <BlindPanel
          slot="B"
          answer={secondAnswer}
          selected={pickedSlot === "B"}
          onPick={() => onPick("B")}
        />
      </div>
    </motion.div>
  );
}
