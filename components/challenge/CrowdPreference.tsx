"use client";

import { motion } from "framer-motion";

type CrowdPreferenceProps = {
  optionAPercent: number;
  optionBPercent: number;
  totalVotes?: number;
};

export function CrowdPreference({
  optionAPercent,
  optionBPercent,
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
          <span className="tabular-nums">{optionAPercent}%</span> preferred{" "}
          <span className="text-text-muted/80">Option A</span>
        </p>
        <p className="font-display text-lg font-extrabold uppercase tracking-tight text-text-primary sm:text-xl">
          <span className="tabular-nums">{optionBPercent}%</span> preferred{" "}
          <span className="text-text-muted/80">Option B</span>
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-xs">
        <div className="frontier-spectrum h-[2px]">
          <motion.div
            className="frontier-spectrum-human"
            initial={{ width: 0 }}
            animate={{ width: `${optionAPercent}%` }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
          <div
            className="frontier-spectrum-marker"
            style={{ left: `${optionAPercent}%` }}
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
