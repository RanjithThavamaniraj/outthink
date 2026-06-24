"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AIThinking } from "@/components/challenge/AIThinking";
import { AnswerSubmission } from "@/components/challenge/AnswerSubmission";
import { BlindBattle } from "@/components/challenge/BlindBattle";
import { ChallengePrompt } from "@/components/challenge/ChallengePrompt";
import { JudgePanel } from "@/components/challenge/JudgePanel";
import { ResultsScreen } from "@/components/challenge/ResultsScreen";
import { RevealPanel } from "@/components/challenge/RevealPanel";
import { StatsPanel } from "@/components/challenge/StatsPanel";
import type { ChallengeCategory } from "@/lib/types/challenge";
import type { useBeatAIFlow } from "@/hooks/useBeatAIFlow";

type BeatAIViewProps = ReturnType<typeof useBeatAIFlow> & {
  categories: ChallengeCategory[];
};

export function BeatAIView({
  phase,
  category,
  challenge,
  session,
  progress,
  xpEarned,
  userWon,
  firstAnswer,
  secondAnswer,
  aiModelLabel,
  submitAnswer,
  pickBlind,
  reset,
  playAgain,
  categories,
}: BeatAIViewProps) {
  if (!category) return null;

  return (
    <div className="mx-auto w-full max-w-3xl">
      <AnimatePresence mode="wait">
        {phase === "prompt" && challenge && (
          <motion.div
            key="prompt"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <ChallengePrompt category={category} prompt={challenge.prompt} />
            <AnswerSubmission onSubmit={submitAnswer} />
          </motion.div>
        )}

        {phase === "ai-thinking" && (
          <motion.div key="ai-thinking" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <AIThinking />
          </motion.div>
        )}

        {phase === "blind-battle" && session && (
          <motion.div
            key="blind"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ChallengePrompt category={category} prompt={session.prompt} />
            <BlindBattle
              firstAnswer={firstAnswer}
              secondAnswer={secondAnswer}
              pickedSlot={session.blindPick}
              onPick={pickBlind}
            />
          </motion.div>
        )}

        {phase === "judging" && (
          <motion.div key="judging" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <JudgePanel
              result={
                session?.judgeResult ?? {
                  winner: "ai",
                  reasoning: "",
                  scores: {
                    creativity: { human: 0, ai: 0 },
                    originality: { human: 0, ai: 0 },
                    relevance: { human: 0, ai: 0 },
                    quality: { human: 0, ai: 0 },
                  },
                }
              }
              loading={!session?.judgeResult}
            />
          </motion.div>
        )}

        {phase === "reveal" && session?.judgeResult && (
          <motion.div key="reveal" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <RevealPanel
              firstAnswer={firstAnswer}
              secondAnswer={secondAnswer}
              firstLabel={
                session.userSlot === "A"
                  ? `Option A = You`
                  : `Option A = ${aiModelLabel}`
              }
              secondLabel={
                session.userSlot === "B"
                  ? `Option B = You`
                  : `Option B = ${aiModelLabel}`
              }
              firstAccent={session.userSlot === "A" ? "human" : "ai"}
              secondAccent={session.userSlot === "B" ? "human" : "ai"}
              userSlot={session.userSlot}
              pickedSlot={session.blindPick}
            />
          </motion.div>
        )}

        {phase === "results" && session?.judgeResult && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ResultsScreen
              won={userWon ?? false}
              xpEarned={xpEarned}
              onPlayAgain={playAgain}
              onChangeCategory={reset}
            />
            <StatsPanel progress={progress} categories={categories} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
