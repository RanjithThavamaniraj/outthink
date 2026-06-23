export const stats = [
  { label: "Humans Competing", value: 12847, suffix: "+" },
  { label: "Challenges Completed", value: 284392, suffix: "+" },
  { label: "Human Win Rate", value: 54.2, suffix: "%", decimals: 1 },
] as const;

export const categories = [
  {
    id: "logic",
    title: "Logic",
    description:
      "Untangle paradoxes, solve puzzles, and out-reason the machine on pure deduction.",
    icon: "◇",
  },
  {
    id: "creativity",
    title: "Creativity",
    description:
      "Generate ideas, reimagine brands, and bring imagination machines can't replicate.",
    icon: "✦",
  },
  {
    id: "predictions",
    title: "Predictions",
    description:
      "Forecast trends, markets, and outcomes — then see who called it right.",
    icon: "◎",
  },
  {
    id: "writing",
    title: "Writing",
    description:
      "Craft copy, stories, and arguments with voice, nuance, and human rhythm.",
    icon: "¶",
  },
  {
    id: "business-ideas",
    title: "Business Ideas",
    description:
      "Pitch startups, strategies, and pivots that only a founder's instinct delivers.",
    icon: "△",
  },
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
