"use client";

import { useCallback, useState } from "react";
import {
  answerForSlot,
  battleService,
  buildSession,
} from "@/lib/services/battle-service";
import { AI_MODEL_LABEL } from "@/lib/data/mock-challenges";
import { challengeService } from "@/lib/services/challenge-service";
import { LOSS_XP, WIN_XP, userStatsService } from "@/lib/services/user-stats-service";
import type {
  AnswerSlot,
  BattleSession,
  BeatAIPhase,
  Challenge,
  ChallengeCategory,
  UserProgress,
} from "@/lib/types/challenge";

export function useBeatAIFlow() {
  const [phase, setPhase] = useState<BeatAIPhase>("select");
  const [category, setCategory] = useState<ChallengeCategory | null>(null);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [session, setSession] = useState<BattleSession | null>(null);
  const [progress, setProgress] = useState<UserProgress>(() =>
    userStatsService.getProgress(),
  );
  const [loading, setLoading] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  const selectCategory = useCallback(async (selected: ChallengeCategory) => {
    setLoading(true);
    setCategory(selected);
    setSession(null);
    setChallenge(null);
    try {
      const next = await challengeService.getChallengeForCategory(selected.id);
      setChallenge(next);
      setPhase("prompt");
    } finally {
      setLoading(false);
    }
  }, []);

  const submitAnswer = useCallback(
    async (userAnswer: string) => {
      if (!challenge || !category) return;
      setPhase("ai-thinking");
      try {
        const aiAnswer = await battleService.generateAiAnswer(
          challenge.id,
          challenge.prompt,
        );
        const nextSession = buildSession(
          challenge.id,
          category.id,
          challenge.prompt,
          userAnswer,
          aiAnswer,
        );
        setSession(nextSession);
        setPhase("blind-battle");
      } catch {
        setPhase("prompt");
      }
    },
    [challenge, category],
  );

  const pickBlind = useCallback(
    async (slot: AnswerSlot) => {
      if (!session || !category) return;
      const withPick = { ...session, blindPick: slot };
      setSession(withPick);
      setPhase("judging");

      try {
        const judgeResult = await battleService.runJudge(
          session.prompt,
          session.userAnswer,
          session.aiAnswer,
          category.id,
        );
        const judged = { ...withPick, judgeResult };
        setSession(judged);
        setPhase("reveal");

        setTimeout(() => {
          const won = judgeResult.winner === "human";
          setXpEarned(won ? WIN_XP : LOSS_XP);
          const updated = battleService.recordOutcome(category.id, won);
          setProgress(updated);
          setPhase("results");
        }, 2800);
      } catch {
        setPhase("blind-battle");
      }
    },
    [session, category],
  );

  const reset = useCallback(() => {
    setPhase("select");
    setCategory(null);
    setChallenge(null);
    setSession(null);
    setXpEarned(0);
  }, []);

  const playAgain = useCallback(async () => {
    if (!category) return;
    setLoading(true);
    setSession(null);
    setXpEarned(0);
    try {
      const next = await challengeService.getChallengeForCategory(category.id);
      setChallenge(next);
      setPhase("prompt");
    } finally {
      setLoading(false);
    }
  }, [category]);

  const firstAnswer = session
    ? answerForSlot(session, "A")
    : "";
  const secondAnswer = session
    ? answerForSlot(session, "B")
    : "";

  const userWon = session?.judgeResult?.winner === "human";

  return {
    phase,
    category,
    challenge,
    session,
    progress,
    loading,
    xpEarned,
    userWon,
    firstAnswer,
    secondAnswer,
    aiModelLabel: AI_MODEL_LABEL,
    selectCategory,
    submitAnswer,
    pickBlind,
    reset,
    playAgain,
  };
}
