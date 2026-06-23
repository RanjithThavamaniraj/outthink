"use client";

import { motion } from "framer-motion";

type OutthinkScoreProps = {
  score: number;
  total: number;
  className?: string;
};

export function OutthinkScore({ score, total, className = "" }: OutthinkScoreProps) {
  const percent = Math.round((score / total) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`text-center ${className}`}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-text-muted">
        Your Outthink Score
      </p>
      <p className="mt-3 font-display text-4xl font-extrabold tabular-nums text-text-primary sm:text-5xl">
        {score}
        <span className="text-text-muted/40"> / {total}</span>
      </p>
      <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-text-muted">
        You correctly identified the stronger answer {percent}% of the time.
      </p>
    </motion.div>
  );
}
