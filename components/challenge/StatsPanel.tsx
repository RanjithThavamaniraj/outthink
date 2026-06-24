"use client";

import type { ChallengeCategory, UserProgress } from "@/lib/types/challenge";

type StatsPanelProps = {
  progress: UserProgress;
  categories: ChallengeCategory[];
};

export function StatsPanel({ progress, categories }: StatsPanelProps) {
  const winRate =
    progress.totalWins + progress.totalLosses > 0
      ? Math.round(
          (progress.totalWins / (progress.totalWins + progress.totalLosses)) *
            100,
        )
      : 0;

  return (
    <div className="mx-auto mt-8 max-w-lg border-t border-border/50 pt-8">
      <p className="text-center font-mono text-[10px] uppercase tracking-[0.32em] text-text-muted">
        Your progression
      </p>

      <div className="mt-6 flex items-end justify-center gap-8 sm:gap-12">
        <div className="text-center">
          <p className="font-display text-2xl font-extrabold tabular-nums text-text-primary">
            {progress.totalWins}
          </p>
          <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted">
            Wins
          </p>
        </div>
        <div className="text-center">
          <p className="font-display text-2xl font-extrabold tabular-nums text-text-muted">
            {progress.totalLosses}
          </p>
          <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted">
            Losses
          </p>
        </div>
        <div className="text-center">
          <p className="font-display text-2xl font-extrabold tabular-nums text-human">
            {winRate}%
          </p>
          <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted">
            Win rate
          </p>
        </div>
        <div className="text-center">
          <p className="font-display text-2xl font-extrabold tabular-nums text-text-primary">
            {progress.totalXp}
          </p>
          <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted">
            Total XP
          </p>
        </div>
      </div>

      <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted/70">
        Streak {progress.currentStreak} · Best {progress.bestStreak}
      </p>

      <div className="mt-8 space-y-3">
        {categories.map((cat) => {
          const rec = progress.categories[cat.id];
          return (
            <div
              key={cat.id}
              className="flex items-center justify-between gap-4 border-t border-border/40 pt-3 first:border-t-0 first:pt-0"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span aria-hidden>{cat.icon}</span>
                <span className="truncate font-display text-xs font-extrabold uppercase text-text-primary">
                  {cat.name}
                </span>
              </div>
              <span className="shrink-0 font-mono text-[10px] tabular-nums text-text-muted">
                <span className="text-human">{rec.wins}W</span>
                <span className="text-text-muted/30"> / </span>
                <span className="text-ai">{rec.losses}L</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
