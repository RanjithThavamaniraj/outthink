"use client";

import { motion } from "framer-motion";
import type { CategoryStatistics } from "@/lib/types/challenge";

type CategoryStatsProps = {
  stats: CategoryStatistics;
};

export function CategoryStats({ stats }: CategoryStatsProps) {
  return (
    <div className="text-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-text-muted">
        Category intelligence split
      </p>

      <div className="mt-6 flex items-end justify-center gap-10 sm:gap-16">
        <div>
          <p className="font-display text-3xl font-extrabold tabular-nums text-human sm:text-4xl">
            {stats.humanWinPercent}%
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted">
            Human wins
          </p>
        </div>

        <div className="h-12 w-px bg-border" aria-hidden />

        <div>
          <p className="font-display text-3xl font-extrabold tabular-nums text-ai sm:text-4xl">
            {stats.aiWinPercent}%
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted">
            AI wins
          </p>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-xs">
        <div className="frontier-spectrum h-[2px]">
          <motion.div
            className="frontier-spectrum-human"
            initial={{ width: 0 }}
            animate={{ width: `${stats.humanWinPercent}%` }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
          <div
            className="frontier-spectrum-marker"
            style={{ left: `${stats.humanWinPercent}%` }}
          />
        </div>
      </div>

      <p className="mt-5 font-mono text-[10px] text-text-muted/70">
        {stats.totalVotes.toLocaleString()} votes cast on this front
      </p>
    </div>
  );
}
