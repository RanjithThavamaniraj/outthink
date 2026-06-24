"use client";

import { motion } from "framer-motion";

export function AIThinking() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto flex max-w-md flex-col items-center py-12 text-center sm:py-14"
    >
      <div className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-ai/20" />
        <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-ai/40 bg-ai/10">
          <span className="h-2 w-2 animate-pulse rounded-full bg-ai" />
        </span>
      </div>
      <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.36em] text-ai">
        AI is thinking…
      </p>
      <p className="mt-3 max-w-xs text-sm text-text-muted">
        Generating a competing response to yours.
      </p>
      <div className="ai-thinking-bar mt-10 h-px w-48 overflow-hidden bg-border">
        <motion.div
          className="h-full bg-ai"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
}
