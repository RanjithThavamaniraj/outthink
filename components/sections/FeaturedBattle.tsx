"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/animations/FadeIn";
import { BattleVersusLayout } from "@/components/challenge/BattleVersusLayout";
import { BlindOptionColumn } from "@/components/challenge/BlindOptionColumn";
import { CrowdPreference } from "@/components/challenge/CrowdPreference";
import { OutthinkScore } from "@/components/challenge/OutthinkScore";
import { featuredBattle, mockOutthinkScore } from "@/lib/data";
import type { AnswerSlot } from "@/lib/types/challenge";

type SlotSide = "human" | "ai";

function crowdFavoriteFromPercents(
  optionAPercent: number,
  optionBPercent: number,
): AnswerSlot {
  return optionAPercent >= optionBPercent ? "A" : "B";
}

export function FeaturedBattle() {
  const [picked, setPicked] = useState<AnswerSlot | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [slotAssignment, setSlotAssignment] = useState<{
    A: SlotSide;
    B: SlotSide;
  } | null>(null);

  useEffect(() => {
    setSlotAssignment(
      Math.random() < 0.5
        ? { A: "human", B: "ai" }
        : { A: "ai", B: "human" },
    );
  }, []);

  const totalVotes = featuredBattle.human.votes + featuredBattle.ai.votes;
  const humanPercent = Math.round(
    (featuredBattle.human.votes / totalVotes) * 100,
  );
  const aiPercent = 100 - humanPercent;

  const optionAPercent = slotAssignment
    ? slotAssignment.A === "human"
      ? humanPercent
      : aiPercent
    : 0;
  const optionBPercent = 100 - optionAPercent;
  const crowdFavorite = crowdFavoriteFromPercents(
    optionAPercent,
    optionBPercent,
  );

  const answerFor = (slot: AnswerSlot) => {
    if (!slotAssignment) return "";
    const side = slotAssignment[slot];
    return side === "human"
      ? featuredBattle.human.answer
      : featuredBattle.ai.answer;
  };

  const revealFor = (slot: AnswerSlot) => {
    if (!slotAssignment) {
      return { label: `Option ${slot}`, accent: "human" as SlotSide };
    }
    const side = slotAssignment[slot];
    const name =
      side === "human" ? featuredBattle.human.name : featuredBattle.ai.name;
    const type = side === "human" ? "Human" : "AI";
    return {
      label: `Option ${slot} = ${type} · ${name}`,
      accent: side as SlotSide,
    };
  };

  const handleChoose = (slot: AnswerSlot) => {
    setPicked(slot);
    setRevealed(true);
  };

  const pickedStronger = picked === crowdFavorite;

  return (
    <Section id="featured" className="relative overflow-hidden" flow={false}>
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 55% 42% at 50% 45%, rgba(74,222,128,0.04) 0%, transparent 72%)",
        }}
      />

      <FadeIn>
        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-text-primary sm:text-4xl">
            Today&apos;s challenge
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-text-muted">
            Choose the stronger answer. Identities are revealed after voting.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1} className="relative mx-auto mt-8 max-w-3xl px-2 sm:mt-10">
        {!slotAssignment ? (
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.28em] text-text-muted">
            Loading challenge…
          </p>
        ) : (
          <>
            <p className="text-center font-mono text-[10px] uppercase tracking-[0.28em] text-text-muted/80">
              {featuredBattle.category}
            </p>

            <p className="mx-auto mt-6 max-w-2xl text-center font-display text-2xl font-extrabold uppercase leading-snug text-text-primary sm:text-3xl md:text-4xl">
              {featuredBattle.prompt}
            </p>

            <div
              className="mx-auto mt-8 h-px max-w-lg opacity-35"
              style={{
                background:
                  "linear-gradient(90deg, rgba(74,222,128,0.35), rgba(245,245,245,0.1), rgba(96,165,250,0.35))",
              }}
            />

            <div className="mt-8 sm:mt-10">
              <AnimatePresence mode="wait">
                {!revealed ? (
                  <motion.div
                    key="vote"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                  >
                    <BattleVersusLayout
                      left={
                        <BlindOptionColumn
                          slot="A"
                          answer={answerFor("A")}
                          selected={picked === "A"}
                          voted={false}
                          onChoose={() => handleChoose("A")}
                        />
                      }
                      right={
                        <BlindOptionColumn
                          slot="B"
                          answer={answerFor("B")}
                          selected={picked === "B"}
                          voted={false}
                          onChoose={() => handleChoose("B")}
                        />
                      }
                    />
                  </motion.div>
                ) : (
                  picked && (
                    <motion.div
                      key="reveal"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <p className="text-center font-mono text-[10px] uppercase tracking-[0.32em] text-text-muted">
                        Identities revealed
                      </p>
                      <h3 className="mt-3 text-center font-display text-2xl font-extrabold uppercase text-text-primary sm:text-3xl">
                        {pickedStronger
                          ? "You called the stronger answer"
                          : "You went against the crowd"}
                      </h3>

                      <div className="mt-8 sm:mt-10">
                        <BattleVersusLayout
                          left={
                            <BlindOptionColumn
                              slot="A"
                              answer={answerFor("A")}
                              selected={picked === "A"}
                              voted
                              onChoose={() => {}}
                              revealLabel={revealFor("A").label}
                              revealAccent={revealFor("A").accent}
                            />
                          }
                          right={
                            <BlindOptionColumn
                              slot="B"
                              answer={answerFor("B")}
                              selected={picked === "B"}
                              voted
                              onChoose={() => {}}
                              revealLabel={revealFor("B").label}
                              revealAccent={revealFor("B").accent}
                            />
                          }
                        />
                      </div>

                      <div className="mt-10 space-y-8 sm:mt-12 sm:space-y-10">
                        <CrowdPreference
                          optionAPercent={optionAPercent}
                          optionBPercent={optionBPercent}
                          totalVotes={totalVotes}
                        />
                        <OutthinkScore
                          score={mockOutthinkScore.score}
                          total={mockOutthinkScore.total}
                        />
                      </div>
                    </motion.div>
                  )
                )}
              </AnimatePresence>
            </div>

            <div className="mt-10 text-center sm:mt-12">
              <a
                href="#challenge"
                className="font-mono text-[10px] uppercase tracking-[0.32em] text-text-muted transition-colors hover:text-human"
              >
                {revealed ? "Next challenge →" : "Can you outthink again? →"}
              </a>
            </div>
          </>
        )}
      </FadeIn>
    </Section>
  );
}
