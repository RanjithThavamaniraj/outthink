"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/animations/FadeIn";
import { featuredBattle } from "@/lib/data";

type VoteChoice = "human" | "ai" | null;

export function FeaturedBattle() {
  const [vote, setVote] = useState<VoteChoice>(null);
  const totalVotes = featuredBattle.human.votes + featuredBattle.ai.votes;
  const humanPercent = Math.round(
    (featuredBattle.human.votes / totalVotes) * 100,
  );
  const aiPercent = 100 - humanPercent;

  return (
    <Section id="featured" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(74,222,128,0.04) 0%, transparent 70%)",
        }}
      />

      <FadeIn>
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-text-muted">
            Spotlight duel
          </p>
          <h2 className="mt-4 font-display text-3xl font-extrabold uppercase tracking-tight text-text-primary sm:text-4xl">
            Tonight&apos;s front
          </h2>
          <p className="mt-3 text-sm text-text-muted">
            A live prompt from the creativity front — cast your vote.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.12} className="relative mx-auto mt-14 max-w-3xl px-2">
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.28em] text-human/80">
          {featuredBattle.category}
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-center font-display text-xl font-extrabold uppercase leading-snug text-text-primary sm:text-2xl">
          {featuredBattle.prompt}
        </p>

        <div
          className="mx-auto mt-10 h-px max-w-md opacity-40"
          style={{
            background:
              "linear-gradient(90deg, rgba(74,222,128,0.35), rgba(245,245,245,0.1), rgba(96,165,250,0.35))",
          }}
        />

        <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-10">
          <AnswerColumn
            type="human"
            name={featuredBattle.human.name}
            answer={featuredBattle.human.answer}
            percent={humanPercent}
            votes={featuredBattle.human.votes}
            selected={vote === "human"}
            onVote={() => setVote("human")}
          />
          <AnswerColumn
            type="ai"
            name={featuredBattle.ai.name}
            answer={featuredBattle.ai.answer}
            percent={aiPercent}
            votes={featuredBattle.ai.votes}
            selected={vote === "ai"}
            onVote={() => setVote("ai")}
          />
        </div>

        <AnimatePresence>
          {vote && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-10 text-center font-mono text-[11px] text-text-muted"
            >
              Vote recorded —{" "}
              <span className="text-human">{humanPercent}%</span> side with the
              human across {totalVotes.toLocaleString()} votes.
            </motion.p>
          )}
        </AnimatePresence>

        <div className="mt-14 text-center">
          <a
            href="#challenge"
            className="font-mono text-[10px] uppercase tracking-[0.32em] text-text-muted transition-colors hover:text-human"
          >
            Enter the full challenge →
          </a>
        </div>
      </FadeIn>
    </Section>
  );
}

function AnswerColumn({
  type,
  name,
  answer,
  percent,
  votes,
  selected,
  onVote,
}: {
  type: "human" | "ai";
  name: string;
  answer: string;
  percent: number;
  votes: number;
  selected: boolean;
  onVote: () => void;
}) {
  const isHuman = type === "human";

  return (
    <div className="text-left">
      <p
        className={`font-mono text-[10px] uppercase tracking-[0.24em] ${
          isHuman ? "text-human" : "text-ai"
        }`}
      >
        {isHuman ? "Human" : "AI"} · {name}
      </p>
      <p
        className={`mt-4 border-l-2 pl-5 font-mono text-sm leading-relaxed sm:text-[15px] ${
          isHuman ? "border-human text-human/90" : "border-ai text-ai/90"
        }`}
      >
        {answer}
      </p>

      <div className="mt-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
        <span>{percent}% crowd</span>
        <span className="tabular-nums">{votes.toLocaleString()} votes</span>
      </div>

      <div className="mt-2 h-px w-full bg-border">
        <motion.div
          className={`h-px ${isHuman ? "bg-human" : "bg-ai"}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <button
        type="button"
        onClick={onVote}
        className={`mt-6 w-full border px-4 py-3 font-mono text-[10px] uppercase tracking-[0.22em] transition-all duration-300 ${
          selected
            ? isHuman
              ? "border-human/50 text-human"
              : "border-ai/50 text-ai"
            : "border-border text-text-muted hover:border-border-hover hover:text-text-primary"
        }`}
      >
        {selected ? "Voted" : `Side with ${isHuman ? "human" : "AI"}`}
      </button>
    </div>
  );
}
