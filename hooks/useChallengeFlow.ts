"use client";

import { useCallback, useState } from "react";
import { challengeService } from "@/lib/services/challenge-service";
import type {
  AnswerSlot,
  BattlePhase,
  CategoryId,
  CategoryStatistics,
  ChallengeBattle,
  ChallengeCategory,
  VoteResult,
} from "@/lib/types/challenge";

export function useChallengeFlow() {
  const [phase, setPhase] = useState<BattlePhase>("select");
  const [category, setCategory] = useState<ChallengeCategory | null>(null);
  const [battle, setBattle] = useState<ChallengeBattle | null>(null);
  const [stats, setStats] = useState<CategoryStatistics | null>(null);
  const [voteResult, setVoteResult] = useState<VoteResult | null>(null);
  const [loading, setLoading] = useState(false);

  const selectCategory = useCallback(async (selected: ChallengeCategory) => {
    setLoading(true);
    setCategory(selected);
    setVoteResult(null);
    try {
      const [nextBattle, nextStats] = await Promise.all([
        challengeService.getBattleForCategory(selected.id),
        challengeService.getCategoryStats(selected.id),
      ]);
      setBattle(nextBattle);
      setStats(nextStats);
      setPhase("category");
    } finally {
      setLoading(false);
    }
  }, []);

  const advance = useCallback(() => {
    setPhase((current) => {
      const order: BattlePhase[] = [
        "select",
        "category",
        "prompt",
        "answer-a",
        "answer-b",
        "vote",
        "reveal",
      ];
      const idx = order.indexOf(current);
      return order[Math.min(idx + 1, order.length - 1)];
    });
  }, []);

  const submitVote = useCallback(
    (pickedWinner: AnswerSlot) => {
      if (!battle) return;
      const result: VoteResult = {
        battleId: battle.id,
        pickedWinner,
        humanAnswer: battle.humanAnswer,
        guessedHumanCorrectly: pickedWinner === battle.humanAnswer,
      };
      setVoteResult(result);
      setPhase("reveal");
    },
    [battle],
  );

  const reset = useCallback(() => {
    setPhase("select");
    setCategory(null);
    setBattle(null);
    setStats(null);
    setVoteResult(null);
  }, []);

  const playAgain = useCallback(async () => {
    if (!category) return;
    setLoading(true);
    setVoteResult(null);
    try {
      const nextBattle = await challengeService.getBattleForCategory(
        category.id,
      );
      setBattle(nextBattle);
      setPhase("category");
    } finally {
      setLoading(false);
    }
  }, [category]);

  return {
    phase,
    category,
    battle,
    stats,
    voteResult,
    loading,
    selectCategory,
    advance,
    submitVote,
    reset,
    playAgain,
  };
}
