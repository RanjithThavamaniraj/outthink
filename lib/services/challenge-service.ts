import {
  CHALLENGE_CATEGORIES,
  MOCK_BATTLES,
  MOCK_CATEGORY_STATS,
} from "@/lib/data/mock-challenges";
import type {
  CategoryId,
  CategoryStatistics,
  ChallengeBattle,
  ChallengeCategory,
} from "@/lib/types/challenge";

/**
 * Data access boundary for challenges.
 * Swap `mockChallengeService` for a Supabase implementation later.
 */
export interface ChallengeService {
  getCategories(): Promise<ChallengeCategory[]>;
  getBattleForCategory(categoryId: CategoryId): Promise<ChallengeBattle>;
  getCategoryStats(categoryId: CategoryId): Promise<CategoryStatistics>;
}

class MockChallengeService implements ChallengeService {
  async getCategories() {
    return CHALLENGE_CATEGORIES;
  }

  async getBattleForCategory(categoryId: CategoryId) {
    const pool = MOCK_BATTLES.filter((b) => b.categoryId === categoryId);
    if (pool.length === 0) {
      throw new Error(`No battles for category: ${categoryId}`);
    }
    return pool[Math.floor(Math.random() * pool.length)];
  }

  async getCategoryStats(categoryId: CategoryId) {
    return MOCK_CATEGORY_STATS[categoryId];
  }
}

export const challengeService: ChallengeService = new MockChallengeService();
