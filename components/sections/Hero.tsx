"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import { TypingDuel } from "@/components/effects/TypingDuel";
import { LiveMomentumIndicator } from "@/components/effects/LiveMomentumIndicator";

export function Hero() {
  return (
    <section
      id="hero-section"
      className="relative min-h-screen overflow-hidden pb-16 pt-28 sm:pt-32 sm:pb-20"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute left-1/2 top-[34%] h-[min(90vh,52rem)] w-[min(200vw,96rem)] -translate-x-1/2 -translate-y-1/2 scale-[2.5] sm:scale-[2.75] lg:scale-[3]">
          <Image
            src="/hero-hands.png"
            alt=""
            fill
            priority
            className="object-contain object-[center_38%] opacity-[0.22] sm:opacity-[0.24] lg:opacity-[0.26]"
            sizes="100vw"
          />
        </div>

        <div className="hero-fingertip-pulse" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_38%,transparent_0%,#050505_78%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="relative z-10 flex min-h-[calc(100vh-7rem)] flex-col items-center px-6 py-12 text-center sm:px-10">
        <div className="flex w-full max-w-3xl flex-1 flex-col items-center justify-center">
          <FadeIn delay={0.15}>
            <h1 className="relative max-w-5xl px-2 py-10 font-display text-4xl font-extrabold uppercase leading-[1.02] tracking-tight sm:px-6 sm:py-14 sm:text-5xl md:py-16 md:text-6xl lg:py-20 lg:text-7xl xl:text-[5.25rem]">
              <span className="text-text-primary/75">Can You </span>
              <span className="hero-title-shimmer relative z-10">Outthink</span>
              <span className="text-text-primary/75"> AI?</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.28}>
            <LiveMomentumIndicator
              bare
              advantage
              className="mt-1 flex justify-center"
            />
          </FadeIn>

          <FadeIn
            delay={0.42}
            className="mt-20 w-full max-w-2xl sm:mt-24 lg:mt-28"
          >
            <TypingDuel bare />
          </FadeIn>

          <motion.a
            href="#stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.58, duration: 1.1 }}
            className="hero-challenge-invite mt-14 sm:mt-16"
            aria-label="Ready to Outthink?"
          >
            Ready to Outthink?
            <span className="hero-challenge-invite-indicator" aria-hidden />
          </motion.a>

          <FadeIn delay={0.62}>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-text-muted/65 sm:mt-10">
              Daily battles between humans and AI. Compete, vote, and prove human
              creativity still matters.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
