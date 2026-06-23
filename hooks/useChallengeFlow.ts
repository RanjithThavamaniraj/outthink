"use client";

import { useCallback, useState } from "react";
import { challengeService } from "@/lib/services/challenge-service";
import type {
  AnswerSlot,
  BattlePhase,
  CategoryStatistics,
  ChallengeBattle,
  ChallengeCategory,
  VoteResult,
} from "@/lib/types/challenge";

function crowdFavoriteFromStats(
  stats: CategoryStatistics,
  humanAnswer: AnswerSlot,
): AnswerSlot {
  const optionAPercent =
    humanAnswer === "A" ? stats.humanWinPercent : stats.aiWinPercent;
  return optionAPercent >= 100 - optionAPercent ? "A" : "B";
}

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
      setPhase("vote");
    } finally {
      setLoading(false);
    }
  }, []);

  const submitVote = useCallback(
    (pickedWinner: AnswerSlot) => {
      if (!battle || !stats) return;
      const crowdFavorite = crowdFavoriteFromStats(stats, battle.humanAnswer);
      const result: VoteResult = {
        battleId: battle.id,
        pickedWinner,
        humanAnswer: battle.humanAnswer,
        crowdFavorite,
        pickedStrongerCorrectly: pickedWinner === crowdFavorite,
      };
      setVoteResult(result);
      setPhase("reveal");
    },
    [battle, stats],
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
      setPhase("vote");
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
    submitVote,
    reset,
    playAgain,
  };
}
