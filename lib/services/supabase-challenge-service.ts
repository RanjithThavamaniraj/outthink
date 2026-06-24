/**
 * Supabase schema reference — implement when wiring persistence.
 *
 * profiles (id uuid PK → auth.users, display_name, avatar_url, timestamps)
 * challenges (id, category_id, prompt, is_active, created_at)
 * submissions (id, user_id → profiles, challenge_id, category_id, answer, created_at)
 * ai_responses (id, challenge_id, model, answer, created_at)
 * battle_results (id, user_id, challenge_id, category_id, submission_id,
 *   ai_response_id, user_slot, blind_pick, winner, judge_reasoning,
 *   judge_scores jsonb, xp_earned, created_at)
 * user_stats (user_id PK → profiles, total_xp, total_wins, total_losses,
 *   current_streak, best_streak, category_wins jsonb, category_losses jsonb,
 *   category_xp jsonb, updated_at)
 *
 * @see lib/types/database.ts for TypeScript row shapes.
 */

export type { ChallengeService } from "@/lib/services/challenge-service";
