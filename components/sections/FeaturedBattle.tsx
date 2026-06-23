"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/animations/FadeIn";
import { featuredBattle } from "@/lib/data";

type VoteChoice = "human" | "ai" | null;

export function FeaturedBattle() {
  const [vote, setVote] = useState<VoteChoice>(null);
  const totalVotes = featuredBattle.human.votes + featuredBattle.ai.votes;
  const humanPercent = Math.round((featuredBattle.human.votes / totalVotes) * 100);
  const aiPercent = 100 - humanPercent;

  return (
    <Section id="featured" className="bg-background-secondary/50">
      <FadeIn>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-human">
            Featured Battle
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            See it in action
          </h2>
        </div>
      </FadeIn>

      <FadeIn delay={0.15} className="mt-12">
        <div className="micro-card mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border bg-surface-elevated">
          <div className="border-b border-border px-6 py-5 sm:px-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-human/15 px-3 py-1 text-xs font-medium uppercase tracking-wider text-human">
                {featuredBattle.category}
              </span>
              <span className="text-xs text-muted">Ends in 4h 22m</span>
            </div>
            <p className="mt-3 font-display text-lg font-semibold text-white sm:text-xl">
              {featuredBattle.prompt}
            </p>
          </div>

          <div className="grid md:grid-cols-2">
            <AnswerCard
              type="human"
              name={featuredBattle.human.name}
              answer={featuredBattle.human.answer}
              votes={featuredBattle.human.votes}
              percent={humanPercent}
              selected={vote === "human"}
              onVote={() => setVote("human")}
            />
            <AnswerCard
              type="ai"
              name={featuredBattle.ai.name}
              answer={featuredBattle.ai.answer}
              votes={featuredBattle.ai.votes}
              percent={aiPercent}
              selected={vote === "ai"}
              onVote={() => setVote("ai")}
              className="border-t border-border md:border-l md:border-t-0"
            />
          </div>

          <AnimatePresence>
            {vote && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden border-t border-border"
              >
                <div className="px-6 py-4 text-center text-sm text-muted sm:px-8">
                  Vote recorded.{" "}
                  <span className="text-human">
                    {humanPercent}% of voters side with the human.
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between border-t border-border px-6 py-4 sm:px-8">
            <span className="text-sm text-muted">
              {totalVotes.toLocaleString()} votes cast
            </span>
            <Button variant="ghost" className="!px-4 !py-2 text-xs">
              View all battles →
            </Button>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}

type AnswerCardProps = {
  type: "human" | "ai";
  name: string;
  answer: string;
  votes: number;
  percent: number;
  selected: boolean;
  onVote: () => void;
  className?: string;
};

function AnswerCard({
  type,
  name,
  answer,
  votes,
  percent,
  selected,
  onVote,
  className = "",
}: AnswerCardProps) {
  const isHuman = type === "human";

  return (
    <div className={`flex flex-col p-6 sm:p-8 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
              isHuman
                ? "bg-human/20 text-human"
                : "bg-ai/15 text-ai"
            }`}
          >
            {isHuman ? "H" : "AI"}
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted">
              {isHuman ? "Human Answer" : "AI Answer"}
            </p>
            <p className="font-medium text-text-primary">{name}</p>
          </div>
        </div>
        <span
          className={`font-display text-2xl font-bold ${
            isHuman ? "text-human" : "text-ai"
          }`}
        >
          {percent}%
        </span>
      </div>

      <p className="mt-5 flex-1 text-sm leading-relaxed text-muted sm:text-base">
        &ldquo;{answer}&rdquo;
      </p>

      <div className="mt-6">
        <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className={`h-full rounded-full ${isHuman ? "bg-human" : "bg-ai"}`}
            initial={{ width: 0 }}
            whileInView={{ width: `${percent}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <Button
          variant={isHuman ? "human" : "secondary"}
          className={`w-full ${selected ? "ring-2 ring-white/30" : ""}`}
          onClick={onVote}
        >
          {selected ? "Voted" : `Vote ${isHuman ? "Human" : "AI"}`}
          <span className="text-xs opacity-70">({votes.toLocaleString()})</span>
        </Button>
      </div>
    </div>
  );
}
