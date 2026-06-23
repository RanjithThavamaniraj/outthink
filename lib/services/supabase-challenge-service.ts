import type { ChallengeService } from "@/lib/services/challenge-service";

/**
 * Future Supabase implementation sketch.
 *
 * export class SupabaseChallengeService implements ChallengeService {
 *   constructor(private client: SupabaseClient) {}
 *
 *   async getCategories() {
 *     const { data } = await this.client.from("categories").select("*");
 *     return data ?? [];
 *   }
 *
 *   async getBattleForCategory(categoryId) { ... }
 *   async getCategoryStats(categoryId) { ... }
 * }
 *
 * Swap in app bootstrap:
 * export const challengeService = new SupabaseChallengeService(supabase);
 */

export type { ChallengeService };
