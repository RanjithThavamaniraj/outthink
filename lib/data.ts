export const stats = [
  { label: "Humans Competing", value: 12847, suffix: "+" },
  { label: "Challenges Completed", value: 284392, suffix: "+" },
  { label: "Human Win Rate", value: 54.2, suffix: "%", decimals: 1 },
] as const;

export const featuredBattle = {
  category: "Creativity",
  prompt: "Rebrand a declining neighborhood bookstore for the digital age.",
  human: {
    name: "Maya Chen",
    answer:
      "Turn it into a 'slow reading club' — no Wi-Fi, curated shelves by mood, and weekly author dinners. The scarcity of silence becomes the product.",
    votes: 847,
  },
  ai: {
    name: "GPT-4o",
    answer:
      "Launch a hybrid subscription: physical books delivered monthly plus an AI-curated reading companion app with personalized summaries and discussion prompts.",
    votes: 612,
  },
} as const;

export const leaderboard = [
  { rank: 1, name: "Maya Chen", wins: 47, streak: 12, avatar: "MC" },
  { rank: 2, name: "James Okonkwo", wins: 43, streak: 8, avatar: "JO" },
  { rank: 3, name: "Sofia Reyes", wins: 41, streak: 5, avatar: "SR" },
  { rank: 4, name: "Alex Kim", wins: 38, streak: 3, avatar: "AK" },
  { rank: 5, name: "Priya Sharma", wins: 36, streak: 7, avatar: "PS" },
] as const;
