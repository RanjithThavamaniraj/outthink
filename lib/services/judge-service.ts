import type { CategoryId, JudgeResult, JudgeScores } from "@/lib/types/challenge";

export interface JudgeService {
  evaluate(
    prompt: string,
    userAnswer: string,
    aiAnswer: string,
    categoryId: CategoryId,
  ): Promise<JudgeResult>;
}

function scoreAnswer(text: string, categoryId: CategoryId) {
  const words = text.trim().split(/\s+/).length;
  const lengthScore = Math.min(10, 5.5 + words * 0.08);
  const varietyBonus = new Set(text.toLowerCase().split(/\s+/)).size / words;
  const categoryBoost: Partial<Record<CategoryId, number>> = {
    humor: 0.4,
    "impossible-ideas": 0.35,
    "human-insight": 0.25,
    mystery: 0.1,
    "sports-prediction": 0.05,
  };
  const base =
    lengthScore +
    varietyBonus * 2 +
    (categoryBoost[categoryId] ?? 0) +
    (Math.random() - 0.5) * 0.8;
  return Math.min(10, Math.max(4, Math.round(base * 10) / 10));
}

function buildScores(
  userAnswer: string,
  aiAnswer: string,
  categoryId: CategoryId,
): JudgeScores {
  const userBase = scoreAnswer(userAnswer, categoryId);
  const aiBase = scoreAnswer(aiAnswer, categoryId);
  const jitter = () => Math.round((Math.random() - 0.5) * 1.2 * 10) / 10;

  return {
    creativity: {
      human: Math.min(10, userBase + jitter() + 0.3),
      ai: Math.min(10, aiBase + jitter()),
    },
    originality: {
      human: Math.min(10, userBase + jitter() + 0.5),
      ai: Math.min(10, aiBase + jitter() - 0.2),
    },
    relevance: {
      human: Math.min(10, userBase + jitter()),
      ai: Math.min(10, aiBase + jitter() + 0.4),
    },
    quality: {
      human: Math.min(10, userBase + jitter()),
      ai: Math.min(10, aiBase + jitter() + 0.2),
    },
  };
}

function totalScore(scores: JudgeScores, side: "human" | "ai") {
  const keys = Object.keys(scores) as (keyof JudgeScores)[];
  return keys.reduce((sum, key) => sum + scores[key][side], 0);
}

class MockJudgeService implements JudgeService {
  async evaluate(
    prompt: string,
    userAnswer: string,
    aiAnswer: string,
    categoryId: CategoryId,
  ) {
    await new Promise((r) => setTimeout(r, 2200));

    const scores = buildScores(userAnswer, aiAnswer, categoryId);
    const humanTotal = totalScore(scores, "human");
    const aiTotal = totalScore(scores, "ai");
    const winner: "human" | "ai" = humanTotal >= aiTotal ? "human" : "ai";

    const reasoning =
      winner === "human"
        ? `Your answer showed stronger ${categoryId === "humor" ? "wit and timing" : "original thinking"} on "${prompt.slice(0, 48)}…" — more surprising and specific than the model's response.`
        : `The model's answer was tighter on structure and relevance for this prompt — yours had moments of flair but lost on consistency and precision.`;

    return { winner, reasoning, scores };
  }
}

export const judgeService: JudgeService = new MockJudgeService();
