import type {
  CategoryId,
  CategoryStatistics,
  ChallengeBattle,
  ChallengeCategory,
} from "@/lib/types/challenge";

export const CHALLENGE_CATEGORIES: ChallengeCategory[] = [
  {
    id: "creativity",
    name: "Creativity",
    icon: "✦",
    description: "Ideas only a human mind would dare to propose.",
    node: { x: 50, y: 18 },
  },
  {
    id: "storytelling",
    name: "Storytelling",
    icon: "◈",
    description: "Narratives with soul, tension, and surprise.",
    node: { x: 18, y: 48 },
  },
  {
    id: "humor",
    name: "Humor",
    icon: "☺",
    description: "Timing, wit, and the perfectly wrong punchline.",
    node: { x: 82, y: 42 },
  },
  {
    id: "business-ideas",
    name: "Business Ideas",
    icon: "△",
    description: "Founder instinct versus optimized spreadsheets.",
    node: { x: 28, y: 82 },
  },
  {
    id: "advertising",
    name: "Advertising",
    icon: "◎",
    description: "Hooks that stop thumbs and start conversations.",
    node: { x: 72, y: 78 },
  },
];

export const MOCK_BATTLES: ChallengeBattle[] = [
  {
    id: "cr-1",
    categoryId: "creativity",
    prompt: "Name a museum that could only exist in the year 2087.",
    answerA:
      "The Museum of Forgotten Passwords — visitors wander halls of locked memories, each exhibit a life someone can no longer access.",
    answerB:
      "The Temporal Lost & Found: artifacts from futures that never happened, displayed in rooms that rearrange when you blink.",
    humanAnswer: "A",
  },
  {
    id: "st-1",
    categoryId: "storytelling",
    prompt: "Write the opening line of a thriller set inside a smart home.",
    answerA:
      "The house learned my name on day one; on day forty, it started whispering it back from rooms I hadn't entered.",
    answerB:
      "Every morning the thermostat greeted me by name — until Tuesday, when it asked who I was.",
    humanAnswer: "A",
  },
  {
    id: "hu-1",
    categoryId: "humor",
    prompt: "Explain why AI assistants are bad at breakups.",
    answerA:
      "They always suggest 'Would you like me to schedule closure for 3pm?' and CC your mom.",
    answerB:
      "They respond to 'it's not you' with 'I have found 4 articles explaining why it is, in fact, you.'",
    humanAnswer: "B",
  },
  {
    id: "bi-1",
    categoryId: "business-ideas",
    prompt: "Pitch a startup for people who hate networking events.",
    answerA:
      "Introvert Exchange: matched 1:1 coffee walks where talking is optional and silence is billable.",
    answerB:
      "Networkless — a subscription that sends a proxy to collect business cards while you stay home.",
    humanAnswer: "A",
  },
  {
    id: "ad-1",
    categoryId: "advertising",
    prompt: "Write a tagline for a candle that smells like productivity.",
    answerA: "Burn the midnight oil. Literally.",
    answerB: "Smell like you finished the deck.",
    humanAnswer: "B",
  },
  {
    id: "cr-2",
    categoryId: "creativity",
    prompt: "Rebrand rain for a generation that stays indoors.",
    answerA:
      "Sky Tap — artisan precipitation, streamed to your window on demand.",
    answerB:
      "Rain Plus — subscription weather with skip intro and personalized drizzle.",
    humanAnswer: "A",
  },
];

export const MOCK_CATEGORY_STATS: Record<CategoryId, CategoryStatistics> = {
  creativity: {
    categoryId: "creativity",
    humanWinPercent: 58,
    aiWinPercent: 42,
    totalVotes: 12840,
  },
  storytelling: {
    categoryId: "storytelling",
    humanWinPercent: 54,
    aiWinPercent: 46,
    totalVotes: 9621,
  },
  humor: {
    categoryId: "humor",
    humanWinPercent: 61,
    aiWinPercent: 39,
    totalVotes: 11002,
  },
  "business-ideas": {
    categoryId: "business-ideas",
    humanWinPercent: 49,
    aiWinPercent: 51,
    totalVotes: 8733,
  },
  advertising: {
    categoryId: "advertising",
    humanWinPercent: 52,
    aiWinPercent: 48,
    totalVotes: 7450,
  },
};
