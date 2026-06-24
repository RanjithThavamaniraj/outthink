"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type AnswerSubmissionProps = {
  onSubmit: (answer: string) => void;
  disabled?: boolean;
};

export function AnswerSubmission({
  onSubmit,
  disabled = false,
}: AnswerSubmissionProps) {
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = answer.trim();
    if (trimmed.length < 12) return;
    onSubmit(trimmed);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      onSubmit={handleSubmit}
      className="mx-auto mt-8 max-w-2xl"
    >
      <label
        htmlFor="user-answer"
        className="block font-mono text-[10px] uppercase tracking-[0.32em] text-human"
      >
        Your answer
      </label>
      <textarea
        id="user-answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        disabled={disabled}
        rows={5}
        placeholder="Write your response. Be specific, surprising, and sharp."
        className="mt-4 w-full resize-none border border-border bg-background-secondary/40 px-5 py-4 font-mono text-sm leading-relaxed text-text-primary placeholder:text-text-muted/40 focus:border-human/40 focus:outline-none focus:ring-1 focus:ring-human/20 disabled:opacity-50"
      />
      <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted/60">
          Min. 12 characters · AI answers next
        </p>
        <button
          type="submit"
          disabled={disabled || answer.trim().length < 12}
          className="min-w-[11rem] bg-human px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-background transition-colors hover:bg-[#22C55E] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Submit & battle →
        </button>
      </div>
    </motion.form>
  );
}
