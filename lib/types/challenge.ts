export type CategoryId =
  | "sports-prediction"
  | "mystery"
  | "impossible-ideas"
  | "human-insight"
  | "humor";

export type AnswerSlot = "A" | "B";

export type BeatAIPhase =
  | "select"
  | "prompt"
  | "ai-thinking"
  | "blind-battle"
  | "judging"
  | "reveal"
  | "results";

export interface ChallengeCategory {
  id: CategoryId;
  name: string;
  icon: string;
  pillar: string;
  description: string;
  accent: string;
  node: { x: number; y: number };
}

export interface Challenge {
  id: string;
  categoryId: CategoryId;
  prompt: string;
}

export interface JudgeScorePair {
  human: number;
  ai: number;
}

export interface JudgeScores {
  creativity: JudgeScorePair;
  originality: JudgeScorePair;
  relevance: JudgeScorePair;
  quality: JudgeScorePair;
}

export interface JudgeResult {
  winner: "human" | "ai";
  reasoning: string;
  scores: JudgeScores;
}

export interface BattleSession {
  challengeId: string;
  categoryId: CategoryId;
  prompt: string;
  userAnswer: string;
  aiAnswer: string;
  userSlot: AnswerSlot;
  blindPick: AnswerSlot | null;
  judgeResult: JudgeResult | null;
}

export interface CategoryRecord {
  wins: number;
  losses: number;
  xp: number;
}

export interface UserProgress {
  totalXp: number;
  totalWins: number;
  totalLosses: number;
  currentStreak: number;
  bestStreak: number;
  categories: Record<CategoryId, CategoryRecord>;
}

export interface CategoryStatistics {
  categoryId: CategoryId;
  humanWinPercent: number;
  aiWinPercent: number;
  totalVotes: number;
}

/** @deprecated Legacy voting battle — kept for featured teaser data only */
export interface ChallengeBattle {
  id: string;
  categoryId: CategoryId;
  prompt: string;
  answerA: string;
  answerB: string;
  humanAnswer: AnswerSlot;
}
