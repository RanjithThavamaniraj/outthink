import {
  CHALLENGE_CATEGORIES,
  MOCK_AI_RESPONSES,
  MOCK_CHALLENGES,
  MOCK_CATEGORY_STATS,
} from "@/lib/data/mock-challenges";
import type {
  CategoryId,
  CategoryStatistics,
  Challenge,
  ChallengeCategory,
} from "@/lib/types/challenge";

export interface ChallengeService {
  getCategories(): Promise<ChallengeCategory[]>;
  getChallengeForCategory(categoryId: CategoryId): Promise<Challenge>;
  getCategoryStats(categoryId: CategoryId): Promise<CategoryStatistics>;
}

class MockChallengeService implements ChallengeService {
  async getCategories() {
    return CHALLENGE_CATEGORIES;
  }

  async getChallengeForCategory(categoryId: CategoryId) {
    const pool = MOCK_CHALLENGES.filter((c) => c.categoryId === categoryId);
    if (pool.length === 0) {
      throw new Error(`No challenges for category: ${categoryId}`);
    }
    return pool[Math.floor(Math.random() * pool.length)];
  }

  async getCategoryStats(categoryId: CategoryId) {
    return MOCK_CATEGORY_STATS[categoryId];
  }
}

export const challengeService: ChallengeService = new MockChallengeService();

export interface AiService {
  generateResponse(challengeId: string, prompt: string): Promise<string>;
}

class MockAiService implements AiService {
  async generateResponse(challengeId: string, _prompt: string) {
    await delay(1800);
    const cached = MOCK_AI_RESPONSES[challengeId];
    if (cached) return cached;
    return "I'd optimize for the statistically dominant outcome while hedging against tail-risk scenarios the data underweights.";
  }
}

export const aiService: AiService = new MockAiService();

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
