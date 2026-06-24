import { aiService, challengeService } from "@/lib/services/challenge-service";
import { judgeService } from "@/lib/services/judge-service";
import { userStatsService } from "@/lib/services/user-stats-service";
import type {
  AnswerSlot,
  BattleSession,
  CategoryId,
  JudgeResult,
  UserProgress,
} from "@/lib/types/challenge";

export interface BattleService {
  loadChallenge(categoryId: CategoryId): ReturnType<
    typeof challengeService.getChallengeForCategory
  >;
  generateAiAnswer(challengeId: string, prompt: string): Promise<string>;
  runJudge(
    prompt: string,
    userAnswer: string,
    aiAnswer: string,
    categoryId: CategoryId,
  ): Promise<JudgeResult>;
  recordOutcome(
    categoryId: CategoryId,
    won: boolean,
  ): UserProgress;
}

export const battleService: BattleService = {
  loadChallenge: (categoryId) => challengeService.getChallengeForCategory(categoryId),
  generateAiAnswer: (challengeId, prompt) =>
    aiService.generateResponse(challengeId, prompt),
  runJudge: (prompt, userAnswer, aiAnswer, categoryId) =>
    judgeService.evaluate(prompt, userAnswer, aiAnswer, categoryId),
  recordOutcome: (categoryId, won) =>
    userStatsService.recordResult(categoryId, won),
};

export function randomUserSlot(): AnswerSlot {
  return Math.random() < 0.5 ? "A" : "B";
}

export function answerForSlot(
  session: Pick<BattleSession, "userSlot" | "userAnswer" | "aiAnswer">,
  slot: AnswerSlot,
) {
  return slot === session.userSlot ? session.userAnswer : session.aiAnswer;
}

export function buildSession(
  challengeId: string,
  categoryId: CategoryId,
  prompt: string,
  userAnswer: string,
  aiAnswer: string,
): BattleSession {
  const userSlot = randomUserSlot();
  return {
    challengeId,
    categoryId,
    prompt,
    userAnswer,
    aiAnswer,
    userSlot,
    blindPick: null,
    judgeResult: null,
  };
}
