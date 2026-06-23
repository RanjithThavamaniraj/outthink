"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { NeuralBattlefield } from "@/components/effects/NeuralBattlefield";
import { HeroHandsBlend } from "@/components/effects/HeroHandsBlend";
import { HumanEdgePillar } from "@/components/effects/HumanEdgePillar";
import { TypingDuel } from "@/components/effects/TypingDuel";
import { LiveMomentumIndicator } from "@/components/effects/LiveMomentumIndicator";

function BentoTile({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`overflow-hidden border border-border/80 bg-background-secondary/55 backdrop-blur-md ${className}`}
    >
      {children}
    </motion.div>
  );
}

function FeaturedChallengePanel() {
  return (
    <BentoTile
      delay={0.45}
      className="flex flex-1 flex-col justify-center rounded-[44px] p-6 sm:p-8"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ai">
        Live Challenge
      </p>
      <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-text-primary sm:text-2xl">
        Get ready to prove human creativity still wins
      </h3>
      <a
        href="#featured"
        className="mt-4 inline-flex w-fit items-center gap-2 text-sm text-human transition-colors hover:text-[#22C55E]"
      >
        View featured battle →
      </a>
    </BentoTile>
  );
}

function CircleInset() {
  return (
    <BentoTile
      delay={0.5}
      className="relative flex aspect-square w-full max-w-[140px] items-center justify-center rounded-full sm:max-w-none sm:w-[140px]"
    >
      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-human/30 to-ai/30" />
      <div
        className="absolute inset-4 rounded-full border border-border"
        style={{
          background:
            "conic-gradient(from 180deg, rgba(74,222,128,0.3), rgba(96,165,250,0.3), rgba(74,222,128,0.3))",
        }}
      />
      <div className="relative text-center">
        <p className="font-display text-2xl font-bold text-text-primary">VS</p>
        <p className="font-mono text-[9px] uppercase tracking-widest text-text-muted">
          Live
        </p>
      </div>
    </BentoTile>
  );
}

function HeroStatusBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="mt-4 flex flex-col gap-4 rounded-[32px] border border-border bg-background-secondary/80 px-5 py-4 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:px-6"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-human/30 bg-human/10">
          <span className="h-2 w-2 rounded-full bg-human animate-pulse" />
        </div>
        <p className="text-sm text-text-muted">
          Exploring the intersection of{" "}
          <span className="text-human">human intuition</span> and{" "}
          <span className="text-ai">machine intelligence</span>
        </p>
      </div>
      <div className="flex items-center gap-4 sm:gap-6">
        <span className="font-mono text-xs text-text-muted">
          {new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          })}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-human" />
          <span className="h-1.5 w-1.5 rounded-full bg-border" />
          <span className="h-1.5 w-1.5 rounded-full bg-border" />
        </div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section
      id="hero-section"
      className="relative overflow-hidden pb-8 pt-28 sm:pt-32 lg:pb-12"
    >
      <NeuralBattlefield />

      <HeroHandsBlend variant="ambient" className="z-[1]" />

      <div className="pointer-events-none absolute inset-0 z-[2]">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle 600px at 30% 40%, rgba(74,222,128,0.04) 0%, transparent 70%),
              radial-gradient(circle 600px at 70% 40%, rgba(96,165,250,0.04) 0%, transparent 70%)
            `,
          }}
        />
      </div>

      <Container className="relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-4">
          {/* Left — Human Edge Pillar */}
          <div className="relative lg:col-span-5">
            <HumanEdgePillar />
          </div>

          {/* Right — Messaging + secondary panels */}
          <div className="flex flex-col gap-3 sm:gap-4 lg:col-span-7">
            <BentoTile
              delay={0.15}
              className="flex flex-1 flex-col rounded-[52px] border-border bg-background-secondary/90 p-6 backdrop-blur-xl sm:p-8 lg:min-h-[480px] lg:p-10"
            >
              <FadeIn delay={0.1}>
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <motion.div
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background-tertiary px-3 py-1.5 text-xs text-text-muted"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-human" />
                    Live battles happening now
                  </motion.div>
                  <LiveMomentumIndicator className="inline-flex" />
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <h1 className="font-display text-4xl font-extrabold uppercase leading-[1.02] tracking-tight text-text-primary sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
                  Can You{" "}
                  <span className="hero-title-shimmer">Outthink</span> AI?
                </h1>
              </FadeIn>

              <FadeIn delay={0.3}>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-text-primary sm:text-lg">
                  Daily battles between humans and artificial intelligence.
                  Compete, vote, climb the leaderboard and prove that human
                  creativity still matters.
                </p>
              </FadeIn>

              <FadeIn delay={0.38}>
                <div className="mt-6">
                  <TypingDuel className="mt-0" />
                </div>
              </FadeIn>

              <FadeIn delay={0.45}>
                <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
                  <Button href="#hero-section">Start Challenge</Button>
                  <Button href="#featured" variant="secondary">
                    Explore Battles
                  </Button>
                  <div className="hidden items-center gap-2 sm:flex">
                    <a
                      href="#leaderboard"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background-tertiary text-sm text-text-primary transition-colors hover:border-border-hover"
                      aria-label="Leaderboard"
                    >
                      ↑
                    </a>
                    <a
                      href="#categories"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-ai/40 bg-ai/10 text-sm text-ai transition-colors hover:bg-ai/20"
                      aria-label="Categories"
                    >
                      ◇
                    </a>
                  </div>
                </div>
              </FadeIn>
            </BentoTile>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto] sm:gap-4">
              <FeaturedChallengePanel />
              <div className="flex justify-center sm:block">
                <CircleInset />
              </div>
            </div>
          </div>
        </div>

        <HeroStatusBar />
      </Container>
    </section>
  );
}
