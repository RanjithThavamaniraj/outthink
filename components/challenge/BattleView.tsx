"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BlindOptionColumn } from "@/components/challenge/BlindOptionColumn";
import { BattleVersusLayout } from "@/components/challenge/BattleVersusLayout";
import { CrowdPreference } from "@/components/challenge/CrowdPreference";
import { OutthinkScore } from "@/components/challenge/OutthinkScore";
import { mockOutthinkScore } from "@/lib/data";
import type {
  AnswerSlot,
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
  onVote: (winner: AnswerSlot) => void;
  onPlayAgain: () => void;
  onChooseCategory: () => void;
};

function BattleHeader({ category }: { category: ChallengeCategory }) {
  return (
    <div className="mb-8 text-center sm:mb-10">
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-text-muted">
        <span className="mr-2 opacity-60">{category.icon}</span>
        {category.name}
      </p>
    </div>
  );
}

function optionPercents(
  stats: CategoryStatistics,
  humanAnswer: AnswerSlot,
): { optionAPercent: number; optionBPercent: number } {
  const optionAPercent =
    humanAnswer === "A" ? stats.humanWinPercent : stats.aiWinPercent;
  return {
    optionAPercent,
    optionBPercent: 100 - optionAPercent,
  };
}

export function BattleView({
  phase,
  category,
  battle,
  stats,
  voteResult,
  onVote,
  onPlayAgain,
  onChooseCategory,
}: BattleViewProps) {
  const { optionAPercent, optionBPercent } = optionPercents(
    stats,
    battle.humanAnswer,
  );

  return (
    <div className="mx-auto w-full max-w-3xl px-2 py-2 sm:py-4">
      <BattleHeader category={category} />

      <AnimatePresence mode="wait">
        {phase === "vote" && (
          <motion.div
            key="vote"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-center font-mono text-[10px] uppercase tracking-[0.28em] text-text-muted">
              Today&apos;s challenge
            </p>
            <p className="mx-auto mt-2 max-w-md text-center text-sm text-text-muted">
              Choose the stronger answer. Identities are revealed after voting.
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-center font-display text-xl font-extrabold uppercase leading-snug text-text-primary sm:mt-8 sm:text-2xl md:text-3xl">
              {battle.prompt}
            </p>

            <div
              className="mx-auto mt-8 h-px max-w-md opacity-35 sm:mt-10"
              style={{
                background:
                  "linear-gradient(90deg, rgba(74,222,128,0.35), rgba(245,245,245,0.1), rgba(96,165,250,0.35))",
              }}
            />

            <div className="mt-8 sm:mt-10">
              <BattleVersusLayout
                left={
                  <BlindOptionColumn
                    slot="A"
                    answer={battle.answerA}
                    selected={false}
                    voted={false}
                    onChoose={() => onVote("A")}
                  />
                }
                right={
                  <BlindOptionColumn
                    slot="B"
                    answer={battle.answerB}
                    selected={false}
                    voted={false}
                    onChoose={() => onVote("B")}
                  />
                }
              />
            </div>
          </motion.div>
        )}

        {phase === "reveal" && voteResult && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-center font-mono text-[10px] uppercase tracking-[0.32em] text-text-muted">
              Identities revealed
            </p>
            <h3 className="mt-3 text-center font-display text-2xl font-extrabold uppercase text-text-primary sm:text-3xl">
              {voteResult.pickedStrongerCorrectly
                ? "You called the stronger answer"
                : "You went against the crowd"}
            </h3>

            <div className="mt-8 sm:mt-10">
              <BattleVersusLayout
                left={
                  <BlindOptionColumn
                    slot="A"
                    answer={battle.answerA}
                    selected={voteResult.pickedWinner === "A"}
                    voted
                    onChoose={() => {}}
                    revealLabel={`Option A = ${
                      battle.humanAnswer === "A" ? "Human" : "AI"
                    }`}
                    revealAccent={battle.humanAnswer === "A" ? "human" : "ai"}
                  />
                }
                right={
                  <BlindOptionColumn
                    slot="B"
                    answer={battle.answerB}
                    selected={voteResult.pickedWinner === "B"}
                    voted
                    onChoose={() => {}}
                    revealLabel={`Option B = ${
                      battle.humanAnswer === "B" ? "Human" : "AI"
                    }`}
                    revealAccent={battle.humanAnswer === "B" ? "human" : "ai"}
                  />
                }
              />
            </div>

            <div className="mt-10 space-y-8 sm:mt-12 sm:space-y-10">
              <CrowdPreference
                optionAPercent={optionAPercent}
                optionBPercent={optionBPercent}
                totalVotes={stats.totalVotes}
              />
              <OutthinkScore
                score={mockOutthinkScore.score}
                total={mockOutthinkScore.total}
              />
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:mt-12 sm:flex-row sm:gap-4">
              <button
                type="button"
                onClick={onPlayAgain}
                className="min-w-[11rem] bg-human px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-background transition-colors hover:bg-[#22C55E]"
              >
                Next challenge →
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
        )}
      </AnimatePresence>
    </div>
  );
}
