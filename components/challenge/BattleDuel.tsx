"use client";

import { motion } from "framer-motion";
import type { AnswerSlot } from "@/lib/types/challenge";

export type DuelReveal = {
  /** e.g. "Human · Maya Chen" or "AI · GPT-4o" */
  label: string;
  accent: "human" | "ai";
};

type BattleDuelProps = {
  prompt: string;
  pillar?: string;
  category?: string;
  firstAnswer: string;
  secondAnswer: string;
  mode: "vote" | "reveal";
  pickedSlot?: AnswerSlot | null;
  revealFirst?: DuelReveal;
  revealSecond?: DuelReveal;
  onChoose?: (slot: AnswerSlot) => void;
};

const accentStyles = {
  human: {
    label: "text-human",
    border: "border-human/50",
    glow: "rgba(74, 222, 128, 0.14)",
    text: "text-human/90",
  },
  ai: {
    label: "text-ai",
    border: "border-ai/50",
    glow: "rgba(96, 165, 250, 0.14)",
    text: "text-ai/90",
  },
} as const;

function DuelPanel({
  answer,
  mode,
  selected,
  reveal,
  onChoose,
}: {
  answer: string;
  mode: "vote" | "reveal";
  selected: boolean;
  reveal?: DuelReveal;
  onChoose?: () => void;
}) {
  const isRevealed = mode === "reveal" && Boolean(reveal);
  const accent = reveal ? accentStyles[reveal.accent] : null;
  const isVote = mode === "vote";

  const content = (
    <>
      {isRevealed && accent && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${accent.glow}, transparent 70%)`,
          }}
          aria-hidden
        />
      )}

      <div className="relative z-10">
        {isRevealed && reveal && accent && (
          <p
            className={`font-mono text-[10px] uppercase tracking-[0.32em] ${accent.label}`}
          >
            {reveal.label}
          </p>
        )}

        {isVote && (
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-text-muted/50">
            Anonymous mind
          </p>
        )}

        <p
          className={`${isRevealed ? "mt-4" : "mt-3"} max-w-prose font-mono text-[13px] leading-[1.7] sm:text-sm sm:leading-relaxed ${
            isRevealed && accent
              ? accent.text
              : selected
                ? "text-text-primary"
                : "text-text-primary/80"
          }`}
        >
          <span className="text-text-muted/30" aria-hidden>
            &ldquo;
          </span>
          {answer}
          <span className="text-text-muted/30" aria-hidden>
            &rdquo;
          </span>
        </p>

        {isVote && (
          <span
            className={`mt-8 inline-flex items-center gap-2 border px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] transition-all duration-300 ${
              selected
                ? "border-text-primary/50 text-text-primary"
                : "border-border/80 text-text-muted group-hover:border-text-primary/35 group-hover:text-text-primary"
            }`}
          >
            {selected ? "Your pick" : "Stronger answer"}
            {!selected && (
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            )}
          </span>
        )}

        {isRevealed && selected && (
          <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.24em] text-text-muted">
            You chose this one
          </p>
        )}
      </div>
    </>
  );

  const panelClass = `battle-duel-panel group relative flex min-h-[12rem] flex-1 flex-col overflow-hidden p-6 text-left sm:min-h-[14rem] sm:p-8 ${
    isRevealed && accent ? `battle-duel-panel-revealed ${accent.border}` : ""
  } ${selected ? "battle-duel-panel-selected" : ""}`;

  if (isVote && onChoose) {
    return (
      <motion.button
        type="button"
        onClick={onChoose}
        className={panelClass}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.995 }}
        transition={{ duration: 0.25 }}
      >
        {content}
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={isRevealed ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`${panelClass} ${isRevealed ? "reveal-identity-glow" : ""}`}
    >
      {content}
    </motion.div>
  );
}

export function BattleDuel({
  prompt,
  pillar,
  category,
  firstAnswer,
  secondAnswer,
  mode,
  pickedSlot = null,
  revealFirst,
  revealSecond,
  onChoose,
}: BattleDuelProps) {
  return (
    <div className="battle-duel-arena mx-auto w-full max-w-5xl">
      <div className="battle-duel-prompt-block text-center">
        {(pillar || category) && (
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-text-muted">
            {pillar && <span className="text-human/90">{pillar}</span>}
            {pillar && category && (
              <span className="mx-2 text-text-muted/25">·</span>
            )}
            {category}
          </p>
        )}
        <h3 className="mx-auto mt-4 max-w-2xl font-display text-xl font-extrabold uppercase leading-snug tracking-tight text-text-primary sm:mt-5 sm:text-2xl md:text-[1.75rem] md:leading-tight">
          {prompt}
        </h3>
        {mode === "vote" && (
          <p className="mx-auto mt-4 max-w-md font-mono text-[10px] uppercase tracking-[0.26em] text-text-muted/70">
            Two minds · One prompt · You judge
          </p>
        )}
      </div>

      <div className="battle-duel-split mt-8 sm:mt-10">
        <DuelPanel
          answer={firstAnswer}
          mode={mode}
          selected={pickedSlot === "A"}
          reveal={revealFirst}
          onChoose={onChoose ? () => onChoose("A") : undefined}
        />

        <div className="battle-duel-vs" aria-hidden>
          <div className="battle-duel-vs-line" />
          <span className="battle-duel-vs-badge">VS</span>
          <div className="battle-duel-vs-line" />
        </div>

        <DuelPanel
          answer={secondAnswer}
          mode={mode}
          selected={pickedSlot === "B"}
          reveal={revealSecond}
          onChoose={onChoose ? () => onChoose("B") : undefined}
        />
      </div>
    </div>
  );
}
