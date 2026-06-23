"use client";

import { AnimatePresence, motion } from "framer-motion";
import { VotePanel } from "@/components/challenge/VotePanel";
import { RevealPanel } from "@/components/challenge/RevealPanel";
import type {
  BattlePhase,
  CategoryStatistics,
  ChallengeBattle,
  ChallengeCategory,
  VoteResult,
} from "@/lib/types/challenge";

type BattleViewProps = {
  phase: BattlePhase;
  category: ChallengeCategory;
  battle: ChallengeBattle;
  stats: CategoryStatistics;
  voteResult: VoteResult | null;
  onAdvance: () => void;
  onVote: (winner: "A" | "B") => void;
  onPlayAgain: () => void;
  onChooseCategory: () => void;
};

function ContinueCue({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-12 font-mono text-[10px] uppercase tracking-[0.32em] text-text-muted/60 transition-colors hover:text-text-primary"
    >
      Continue →
    </button>
  );
}

function BattleHeader({ category }: { category: ChallengeCategory }) {
  return (
    <div className="mb-12 text-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-text-muted">
        Active front
      </p>
      <p className="mt-2 font-display text-lg font-extrabold uppercase text-human sm:text-xl">
        <span className="mr-2 opacity-50">{category.icon}</span>
        {category.name}
      </p>
    </div>
  );
}

export function BattleView({
  phase,
  category,
  battle,
  stats,
  voteResult,
  onAdvance,
  onVote,
  onPlayAgain,
  onChooseCategory,
}: BattleViewProps) {
  return (
    <div className="mx-auto w-full max-w-3xl px-2 py-8 sm:py-12">
      <BattleHeader category={category} />

      <AnimatePresence mode="wait">
        {phase === "category" && (
          <motion.div
            key="category"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45 }}
            className="text-center"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-text-muted">
              Battle initialized
            </p>
            <h3 className="mt-6 font-display text-3xl font-extrabold uppercase text-text-primary sm:text-4xl">
              {category.name}
            </h3>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-text-muted">
              {category.description}
            </p>
            <ContinueCue onClick={onAdvance} />
          </motion.div>
        )}

        {phase === "prompt" && (
          <motion.div
            key="prompt"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45 }}
            className="text-center"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-text-muted">
              The prompt
            </p>
            <p className="mx-auto mt-8 max-w-xl font-display text-xl font-extrabold uppercase leading-snug text-text-primary sm:text-2xl">
              {battle.prompt}
            </p>
            <ContinueCue onClick={onAdvance} />
          </motion.div>
        )}

        {phase === "answer-a" && (
          <motion.div
            key="answer-a"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45 }}
            className="text-center"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-text-muted">
              Answer A
            </p>
            <p className="mx-auto mt-8 max-w-xl font-mono text-sm leading-relaxed text-text-primary/90 sm:text-[15px]">
              {battle.answerA}
            </p>
            <ContinueCue onClick={onAdvance} />
          </motion.div>
        )}

        {phase === "answer-b" && (
          <motion.div
            key="answer-b"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45 }}
            className="text-center"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-text-muted">
              Answer B
            </p>
            <p className="mx-auto mt-8 max-w-xl font-mono text-sm leading-relaxed text-text-primary/90 sm:text-[15px]">
              {battle.answerB}
            </p>
            <ContinueCue onClick={onAdvance} />
          </motion.div>
        )}

        {phase === "vote" && (
          <motion.div
            key="vote"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-12 grid gap-8 sm:grid-cols-2 sm:gap-10">
              <div className="text-left">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-text-muted">
                  A
                </p>
                <p className="mt-3 font-mono text-sm leading-relaxed text-text-muted sm:text-[15px]">
                  {battle.answerA}
                </p>
              </div>
              <div className="text-left">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-text-muted">
                  B
                </p>
                <p className="mt-3 font-mono text-sm leading-relaxed text-text-muted sm:text-[15px]">
                  {battle.answerB}
                </p>
              </div>
            </div>
            <VotePanel onVote={onVote} />
          </motion.div>
        )}

        {phase === "reveal" && voteResult && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <RevealPanel
              answerA={battle.answerA}
              answerB={battle.answerB}
              humanAnswer={battle.humanAnswer}
              voteResult={voteResult}
              stats={stats}
              onPlayAgain={onPlayAgain}
              onChooseCategory={onChooseCategory}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
