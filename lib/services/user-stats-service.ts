import type { CategoryId, UserProgress } from "@/lib/types/challenge";

const STORAGE_KEY = "outthink_user_progress";
const WIN_XP = 10;
const LOSS_XP = 2;

const EMPTY_CATEGORIES = (): UserProgress["categories"] => ({
  "sports-prediction": { wins: 0, losses: 0, xp: 0 },
  mystery: { wins: 0, losses: 0, xp: 0 },
  "impossible-ideas": { wins: 0, losses: 0, xp: 0 },
  "human-insight": { wins: 0, losses: 0, xp: 0 },
  humor: { wins: 0, losses: 0, xp: 0 },
});

/** Demo seed so StatsPanel isn't empty on first visit. */
const DEMO_PROGRESS: UserProgress = {
  totalXp: 247,
  totalWins: 47,
  totalLosses: 20,
  currentStreak: 3,
  bestStreak: 8,
  categories: {
    "sports-prediction": { wins: 7, losses: 3, xp: 82 },
    mystery: { wins: 4, losses: 6, xp: 52 },
    "impossible-ideas": { wins: 12, losses: 2, xp: 128 },
    "human-insight": { wins: 9, losses: 5, xp: 98 },
    humor: { wins: 15, losses: 4, xp: 162 },
  },
};

function defaultProgress(): UserProgress {
  if (typeof window === "undefined") return { ...DEMO_PROGRESS };
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_PROGRESS));
    return { ...DEMO_PROGRESS };
  }
  try {
    const parsed = JSON.parse(raw) as UserProgress;
    return {
      ...parsed,
      categories: { ...EMPTY_CATEGORIES(), ...parsed.categories },
    };
  } catch {
    return { ...DEMO_PROGRESS };
  }
}

export interface UserStatsService {
  getProgress(): UserProgress;
  recordResult(categoryId: CategoryId, won: boolean): UserProgress;
}

class LocalUserStatsService implements UserStatsService {
  getProgress() {
    return defaultProgress();
  }

  recordResult(categoryId: CategoryId, won: boolean) {
    const progress = this.getProgress();
    const xp = won ? WIN_XP : LOSS_XP;
    const cat = progress.categories[categoryId];

    progress.totalXp += xp;
    cat.xp += xp;
    if (won) {
      progress.totalWins += 1;
      cat.wins += 1;
      progress.currentStreak += 1;
      progress.bestStreak = Math.max(progress.bestStreak, progress.currentStreak);
    } else {
      progress.totalLosses += 1;
      cat.losses += 1;
      progress.currentStreak = 0;
    }

    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
    return progress;
  }
}

export const userStatsService: UserStatsService = new LocalUserStatsService();

export { WIN_XP, LOSS_XP };
