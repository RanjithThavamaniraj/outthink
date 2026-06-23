export type CategoryId =
  | "creativity"
  | "storytelling"
  | "humor"
  | "business-ideas"
  | "advertising";

export type AnswerSlot = "A" | "B";

export type BattlePhase =
  | "select"
  | "category"
  | "prompt"
  | "answer-a"
  | "answer-b"
  | "vote"
  | "reveal";

export interface ChallengeCategory {
  id: CategoryId;
  name: string;
  icon: string;
  description: string;
  /** Percent position within the selector canvas (0–100). */
  node: { x: number; y: number };
}

export interface ChallengeBattle {
  id: string;
  categoryId: CategoryId;
  prompt: string;
  answerA: string;
  answerB: string;
  humanAnswer: AnswerSlot;
}

export interface CategoryStatistics {
  categoryId: CategoryId;
  humanWinPercent: number;
  aiWinPercent: number;
  totalVotes: number;
}

export interface VoteResult {
  battleId: string;
  pickedWinner: AnswerSlot;
  humanAnswer: AnswerSlot;
  guessedHumanCorrectly: boolean;
}
