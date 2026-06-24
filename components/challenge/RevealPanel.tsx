"use client";

import { motion } from "framer-motion";
import type { AnswerSlot } from "@/lib/types/challenge";

type RevealPanelProps = {
  firstAnswer: string;
  secondAnswer: string;
  firstLabel: string;
  secondLabel: string;
  firstAccent: "human" | "ai";
  secondAccent: "human" | "ai";
  userSlot: AnswerSlot;
  pickedSlot: AnswerSlot | null;
};

function RevealCard({
  label,
  answer,
  accent,
  isUser,
  isPick,
}: {
  label: string;
  answer: string;
  accent: "human" | "ai";
  isUser: boolean;
  isPick: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`battle-duel-panel reveal-identity-glow relative p-6 sm:p-8 ${
        accent === "human" ? "border-human/40" : "border-ai/40"
      }`}
    >
      <p
        className="font-mono text-[10px] uppercase tracking-[0.32em]"
        style={{ color: accent === "human" ? "var(--human)" : "var(--ai)" }}
      >
        {label}
      </p>
      <p
        className="mt-4 font-mono text-sm leading-relaxed"
        style={{
          color:
            accent === "human"
              ? "rgba(74, 222, 128, 0.9)"
              : "rgba(96, 165, 250, 0.9)",
        }}
      >
        {answer}
      </p>
      {isPick && (
        <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.22em] text-text-muted">
          Your blind pick
        </p>
      )}
      {isUser && (
        <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-human/80">
          That was you
        </p>
      )}
    </motion.div>
  );
}

export function RevealPanel({
  firstAnswer,
  secondAnswer,
  firstLabel,
  secondLabel,
  firstAccent,
  secondAccent,
  userSlot,
  pickedSlot,
}: RevealPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto max-w-5xl"
    >
      <p className="mb-8 text-center font-mono text-[10px] uppercase tracking-[0.32em] text-text-muted">
        Identities revealed
      </p>
      <div className="battle-duel-split">
        <RevealCard
          label={firstLabel}
          answer={firstAnswer}
          accent={firstAccent}
          isUser={userSlot === "A"}
          isPick={pickedSlot === "A"}
        />
        <div className="battle-duel-vs" aria-hidden>
          <div className="battle-duel-vs-line" />
          <span className="battle-duel-vs-badge">VS</span>
          <div className="battle-duel-vs-line" />
        </div>
        <RevealCard
          label={secondLabel}
          answer={secondAnswer}
          accent={secondAccent}
          isUser={userSlot === "B"}
          isPick={pickedSlot === "B"}
        />
      </div>
    </motion.div>
  );
}
