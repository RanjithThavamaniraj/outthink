export const stats = [
  { label: "Humans Competing", value: 12847, suffix: "+" },
  { label: "Challenges Completed", value: 284392, suffix: "+" },
  { label: "Human Win Rate", value: 54.2, suffix: "%", decimals: 1 },
] as const;

export const mockOutthinkScore = { score: 7, total: 10 } as const;

export const featuredBattle = {
  category: "Impossible Ideas",
  pillar: "Creativity",
  prompt: "Invent a product that solves a problem humans didn't know they had.",
  human: {
    name: "Maya Chen",
    answer:
      "The Apology Delay Box — a mailbox that holds your angry text for six hours and returns it rewritten by someone who loves you.",
    votes: 847,
  },
  ai: {
    name: "GPT-4o",
    answer:
      "MoodSync Mirror: a smart mirror that adjusts lighting and plays affirmations based on biometric stress markers detected via camera.",
    votes: 612,
  },
} as const;

export const fullLeaderboard = [
  { rank: 1, name: "Maya Chen", wins: 47, streak: 12, avatar: "MC" },
  { rank: 2, name: "James Okonkwo", wins: 43, streak: 8, avatar: "JO" },
  { rank: 3, name: "Sofia Reyes", wins: 41, streak: 5, avatar: "SR" },
  { rank: 4, name: "Alex Kim", wins: 38, streak: 3, avatar: "AK" },
  { rank: 5, name: "Priya Sharma", wins: 36, streak: 7, avatar: "PS" },
  { rank: 6, name: "Daniel Torres", wins: 34, streak: 4, avatar: "DT" },
  { rank: 7, name: "Elena Volkov", wins: 32, streak: 6, avatar: "EV" },
  { rank: 8, name: "Marcus Webb", wins: 30, streak: 2, avatar: "MW" },
  { rank: 9, name: "Yuki Tanaka", wins: 28, streak: 5, avatar: "YT" },
  { rank: 10, name: "Amara Osei", wins: 27, streak: 3, avatar: "AO" },
  { rank: 11, name: "Liam Foster", wins: 25, streak: 1, avatar: "LF" },
  { rank: 12, name: "Nina Patel", wins: 24, streak: 4, avatar: "NP" },
  { rank: 13, name: "Omar Hassan", wins: 22, streak: 2, avatar: "OH" },
  { rank: 14, name: "Clara Nguyen", wins: 21, streak: 3, avatar: "CN" },
  { rank: 15, name: "Ravi Menon", wins: 19, streak: 1, avatar: "RM" },
] as const;

export type LeaderboardPlayer = (typeof fullLeaderboard)[number];

/** Top five for the landing-page preview. */
export const leaderboard = fullLeaderboard.slice(0, 5);
