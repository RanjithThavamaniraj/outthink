"use client";

import { motion } from "framer-motion";
import type { JudgeResult } from "@/lib/types/challenge";

type JudgePanelProps = {
  result: JudgeResult;
  loading?: boolean;
};

const CRITERIA = [
  { key: "creativity" as const, label: "Creativity" },
  { key: "originality" as const, label: "Originality" },
  { key: "relevance" as const, label: "Relevance" },
  { key: "quality" as const, label: "Quality" },
];

export function JudgePanel({ result, loading = false }: JudgePanelProps) {
  if (loading) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center py-12 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-text-muted">
          AI judge evaluating…
        </p>
        <div className="mt-8 h-px w-40 overflow-hidden bg-border">
          <motion.div
            className="h-full bg-gradient-to-r from-human via-text-muted to-ai"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            style={{ width: "50%" }}
          />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-lg"
    >
      <p className="text-center font-mono text-[10px] uppercase tracking-[0.32em] text-text-muted">
        AI judge verdict
      </p>

      <div className="mt-8 space-y-4">
        {CRITERIA.map(({ key, label }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center justify-between gap-4 border-t border-border/50 pt-4 first:border-t-0 first:pt-0"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
              {label}
            </span>
            <div className="flex items-center gap-6 font-mono text-sm tabular-nums">
              <span className="text-human">
                You {result.scores[key].human.toFixed(1)}
              </span>
              <span className="text-text-muted/30">·</span>
              <span className="text-ai">
                AI {result.scores[key].ai.toFixed(1)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="mt-8 text-center text-sm leading-relaxed text-text-muted">
        {result.reasoning}
      </p>

      <p className="mt-6 text-center font-display text-xl font-extrabold uppercase text-text-primary">
        Winner:{" "}
        <span className={result.winner === "human" ? "text-human" : "text-ai"}>
          {result.winner === "human" ? "You" : "AI"}
        </span>
      </p>
    </motion.div>
  );
}
