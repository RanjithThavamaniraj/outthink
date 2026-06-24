import type { CategoryId } from "@/lib/types/challenge";

/** Supabase `profiles` — extends auth.users */
export interface DbProfile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

/** Supabase `challenges` */
export interface DbChallenge {
  id: string;
  category_id: CategoryId;
  prompt: string;
  is_active: boolean;
  created_at: string;
}

/** Supabase `submissions` — human answers */
export interface DbSubmission {
  id: string;
  user_id: string;
  challenge_id: string;
  category_id: CategoryId;
  answer: string;
  created_at: string;
}

/** Supabase `ai_responses` */
export interface DbAiResponse {
  id: string;
  challenge_id: string;
  model: string;
  answer: string;
  created_at: string;
}

/** Supabase `battle_results` */
export interface DbBattleResult {
  id: string;
  user_id: string;
  challenge_id: string;
  category_id: CategoryId;
  submission_id: string;
  ai_response_id: string;
  user_slot: "A" | "B";
  blind_pick: "A" | "B" | null;
  winner: "human" | "ai";
  judge_reasoning: string;
  judge_scores: Record<string, { human: number; ai: number }>;
  xp_earned: number;
  created_at: string;
}

/** Supabase `user_stats` */
export interface DbUserStats {
  user_id: string;
  total_xp: number;
  total_wins: number;
  total_losses: number;
  current_streak: number;
  best_streak: number;
  category_wins: Record<CategoryId, number>;
  category_losses: Record<CategoryId, number>;
  category_xp: Record<CategoryId, number>;
  updated_at: string;
}
