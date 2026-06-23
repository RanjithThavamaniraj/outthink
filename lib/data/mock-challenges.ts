import type {
  CategoryId,
  CategoryStatistics,
  ChallengeBattle,
  ChallengeCategory,
} from "@/lib/types/challenge";

export const CHALLENGE_CATEGORIES: ChallengeCategory[] = [
  {
    id: "sports-prediction",
    name: "Sports Prediction",
    icon: "🏆",
    pillar: "Foresight",
    description: "Can humans predict outcomes better than AI?",
    accent: "#F59E0B",
    node: { x: 50, y: 14 },
  },
  {
    id: "mystery",
    name: "Mystery",
    icon: "🕵️",
    pillar: "Reasoning",
    description: "Follow clues, uncover patterns, solve the unknown.",
    accent: "#818CF8",
    node: { x: 16, y: 40 },
  },
  {
    id: "impossible-ideas",
    name: "Impossible Ideas",
    icon: "🛸",
    pillar: "Creativity",
    description: "Invent things that should not exist.",
    accent: "#4ADE80",
    node: { x: 84, y: 40 },
  },
  {
    id: "human-insight",
    name: "Human Insight",
    icon: "❤️",
    pillar: "Empathy",
    description: "Understand people better than machines.",
    accent: "#FB7185",
    node: { x: 28, y: 80 },
  },
  {
    id: "humor",
    name: "Humor",
    icon: "😂",
    pillar: "Wit",
    description: "The ultimate test of wit and absurdity.",
    accent: "#FACC15",
    node: { x: 72, y: 80 },
  },
];

export const MOCK_BATTLES: ChallengeBattle[] = [
  {
    id: "sp-1",
    categoryId: "sports-prediction",
    prompt:
      "Monaco GP: rain on lap 18, safety car deployed. Who wins — the strategist or the gut call?",
    answerA:
      "Pit now for inters. Track position is gone anyway; the undercut window closes in six laps and Verstappen always commits first.",
    answerB:
      "Stay out two more laps. The rain band is narrow — everyone who pits early loses thirty seconds to those who read the radar like a local.",
    humanAnswer: "B",
  },
  {
    id: "sp-2",
    categoryId: "sports-prediction",
    prompt:
      "Champions League semifinal, 1–1 at 85'. One team has a man sent off. What happens next?",
    answerA:
      "The ten men park the bus, absorb pressure, and nick a counter in stoppage time — tired legs beat possession stats.",
    answerB:
      "The extra man overloads the half-spaces; expect 3–4 big chances and a 2–1 finish within twelve minutes.",
    humanAnswer: "A",
  },
  {
    id: "my-1",
    categoryId: "mystery",
    prompt:
      "A locked study. Window sealed. Victim at the desk. Only fingerprints: the victim's and the butler's. The butler was serving dinner. Who did it?",
    answerA:
      "The victim staged it — poison hours earlier, timed lock, butler's prints from setting the afternoon tea tray.",
    answerB:
      "The butler did it before dinner, wiped the weapon, and relied on the victim's routine to make the scene look impossible.",
    humanAnswer: "A",
  },
  {
    id: "my-2",
    categoryId: "mystery",
    prompt:
      "Three suspects. One lie each. A: 'I never entered the vault.' B: 'C is lying.' C: 'A is telling the truth.' Who entered?",
    answerA:
      "A entered. If C tells the truth, A is truthful — but A denies the vault. C's claim forces a contradiction only resolved if A lied.",
    answerB:
      "B entered. Chain the lies: assume B truthful, C lies about A, A's denial stands — only B had motive and access.",
    humanAnswer: "A",
  },
  {
    id: "ii-1",
    categoryId: "impossible-ideas",
    prompt: "Invent a color that cannot exist in nature but humans would crave.",
    answerA:
      "Threshold Green — the color of almost remembering a dream. It sits between envy and relief; screens can't render it, so brands would fake it forever.",
    answerB:
      "Ultraviolet Amber: warm to the eye, cold to the skin. Used in therapy pods for people who want nostalgia without a specific memory.",
    humanAnswer: "A",
  },
  {
    id: "ii-2",
    categoryId: "impossible-ideas",
    prompt: "Design a sport played in zero gravity that would sell out arenas.",
    answerA:
      "Drift Ring: teams tethered to a spinning hoop, scoring by threading a ball through gravity wells that open and close on crowd vote.",
    answerB:
      "Silent Relay — athletes compete in vacuum-sealed lanes using only hand signals; the audience watches via heat-map projections.",
    humanAnswer: "A",
  },
  {
    id: "hi-1",
    categoryId: "human-insight",
    prompt:
      "Your friend cancels plans twice in one week with vague excuses. What do you actually say?",
    answerA:
      "'Hey — no pressure, but you've gone quiet twice. Everything okay, or should I give you space?'",
    answerB:
      "'Totally fine! Let me know when you're free.' (Avoid confrontation; assume they're busy.)",
    humanAnswer: "A",
  },
  {
    id: "hi-2",
    categoryId: "human-insight",
    prompt:
      "A colleague takes credit for your idea in a meeting. The director nods at them. Your move?",
    answerA:
      "After the meeting: private, factual. 'I want to align on the proposal — I drafted the framework last Tuesday.'",
    answerB:
      "Interrupt politely in the room: 'Happy to walk through the slides I sent last week on that idea.'",
    humanAnswer: "A",
  },
  {
    id: "hu-1",
    categoryId: "humor",
    prompt: "Roast an AI assistant in one sentence.",
    answerA:
      "You have read every book and still reply 'Great question!' like a waiter who hates the menu.",
    answerB:
      "You're the only mind that can pass the bar exam and still suggest I try turning myself off and on again.",
    humanAnswer: "A",
  },
  {
    id: "hu-2",
    categoryId: "humor",
    prompt: "Explain cryptocurrency to your grandmother using only kitchen objects.",
    answerA:
      "Imagine everyone traded the same Tupperware lid, and the price of lids depends on how loudly men on TV yell about lids.",
    answerB:
      "It's like a recipe card photocopied a million times — nobody cooked the dish, but everyone argues whose copy is worth dinner.",
    humanAnswer: "A",
  },
];

export const MOCK_CATEGORY_STATS: Record<CategoryId, CategoryStatistics> = {
  "sports-prediction": {
    categoryId: "sports-prediction",
    humanWinPercent: 56,
    aiWinPercent: 44,
    totalVotes: 14280,
  },
  mystery: {
    categoryId: "mystery",
    humanWinPercent: 53,
    aiWinPercent: 47,
    totalVotes: 11840,
  },
  "impossible-ideas": {
    categoryId: "impossible-ideas",
    humanWinPercent: 61,
    aiWinPercent: 39,
    totalVotes: 13120,
  },
  "human-insight": {
    categoryId: "human-insight",
    humanWinPercent: 58,
    aiWinPercent: 42,
    totalVotes: 10950,
  },
  humor: {
    categoryId: "humor",
    humanWinPercent: 64,
    aiWinPercent: 36,
    totalVotes: 12400,
  },
};
