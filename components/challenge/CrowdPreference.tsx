"use client";

import { motion } from "framer-motion";

type CrowdPreferenceProps = {
  humanPercent: number;
  aiPercent: number;
  totalVotes?: number;
};

export function CrowdPreference({
  humanPercent,
  aiPercent,
  totalVotes,
}: CrowdPreferenceProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-text-muted">
        Crowd Preference
      </p>

      <div className="mt-6 space-y-3">
        <p className="font-display text-lg font-extrabold uppercase tracking-tight text-text-primary sm:text-xl">
          <span className="tabular-nums text-human">{humanPercent}%</span> backed{" "}
          <span className="text-human/80">Human</span>
        </p>
        <p className="font-display text-lg font-extrabold uppercase tracking-tight text-text-primary sm:text-xl">
          <span className="tabular-nums text-ai">{aiPercent}%</span> backed{" "}
          <span className="text-ai/80">AI</span>
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-xs">
        <div className="frontier-spectrum h-[2px]">
          <motion.div
            className="frontier-spectrum-human"
            initial={{ width: 0 }}
            animate={{ width: `${humanPercent}%` }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
          <div
            className="frontier-spectrum-marker"
            style={{ left: `${humanPercent}%` }}
          />
        </div>
      </div>

      {totalVotes !== undefined && (
        <p className="mt-5 font-mono text-[10px] text-text-muted/70">
          {totalVotes.toLocaleString()} votes on this challenge
        </p>
      )}
    </motion.div>
  );
}
