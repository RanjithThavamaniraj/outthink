"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import { TypingDuel } from "@/components/effects/TypingDuel";
import { LiveMomentumIndicator } from "@/components/effects/LiveMomentumIndicator";
import { LiveField } from "@/components/sections/LiveField";
import { Container } from "@/components/ui/Container";
import { openCategories } from "@/lib/navigation";

export function Hero() {
  return (
    <section
      id="hero-section"
      className="relative min-h-svh overflow-hidden pt-24 sm:pt-28"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute left-1/2 top-[34%] h-[min(85vh,48rem)] w-[min(200vw,96rem)] -translate-x-1/2 -translate-y-1/2 scale-[2.5] sm:scale-[2.75] lg:scale-[3]">
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

      <Container className="relative z-10 flex min-h-[calc(100svh-6rem)] flex-col items-center justify-center pb-14 sm:pb-16">
        <div className="flex w-full max-w-3xl flex-col items-center py-2 text-center sm:py-3">
            <FadeIn delay={0.15}>
              <h1 className="relative max-w-5xl px-2 py-1 font-display text-4xl font-extrabold uppercase leading-[1.02] tracking-tight sm:px-4 sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.25rem]">
                <span className="text-text-primary/75">Can You </span>
                <span className="hero-title-shimmer relative z-10">Outthink</span>
                <span className="text-text-primary/75"> AI?</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.38} className="mt-4 w-full max-w-2xl sm:mt-5">
              <TypingDuel bare />
            </FadeIn>

            <motion.a
              href="#challenge"
              onClick={openCategories}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.52, duration: 1.1 }}
              className="hero-challenge-invite mt-4 sm:mt-5"
              aria-label="Ready to Outthink? Begin the challenge"
            >
              <span className="hero-challenge-invite-shimmer">
                Ready to Outthink?
              </span>
              <span className="hero-challenge-invite-indicator" aria-hidden />
            </motion.a>

            <FadeIn delay={0.48} className="mt-2">
              <LiveMomentumIndicator
                bare
                advantage
                className="flex justify-center opacity-80"
              />
            </FadeIn>

            <FadeIn delay={0.55} className="mt-4 w-full sm:mt-5">
              <LiveField />
            </FadeIn>
        </div>
      </Container>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background to-transparent"
        aria-hidden
      />
    </section>
  );
}
