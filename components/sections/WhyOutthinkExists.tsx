"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { IntelligencePathways } from "@/components/effects/IntelligencePathways";
import { Container } from "@/components/ui/Container";

const EASE = [0.22, 1, 0.36, 1] as const;

const AI_LINES = [
  "AI can calculate.",
  "AI can generate.",
  "AI can predict.",
] as const;

const HUMAN_TRAITS = ["Humor.", "Intuition.", "Creativity.", "Empathy."] as const;

type RevealBlockProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

function RevealBlock({ children, className = "", delay = 0 }: RevealBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-72px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
};

function StaggerGroup({ children, className = "", stagger = 0.18 }: StaggerGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-72px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerLine({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.p
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: EASE },
        },
      }}
      className={className}
    >
      {children}
    </motion.p>
  );
}

export function WhyOutthinkExists() {
  const closingRef = useRef<HTMLParagraphElement>(null);
  const closingInView = useInView(closingRef, { once: true, margin: "-60px" });

  return (
    <section
      id="why-outthink-exists"
      className="why-exists-section relative overflow-hidden"
    >
      <IntelligencePathways className="pointer-events-none absolute inset-0 h-full w-full" />

      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 55% 50% at 50% 55%, rgba(255,255,255,0.02) 0%, transparent 65%),
            linear-gradient(to bottom, transparent 0%, rgba(5,5,5,0.4) 85%, #050505 100%)
          `,
        }}
      />

      <Container>
        <div className="relative z-[1] mx-auto max-w-xl">
        <RevealBlock>
          <p className="font-mono text-[10px] uppercase tracking-[0.38em] text-text-muted/80">
            Why Outthink exists
          </p>
        </RevealBlock>

        <StaggerGroup className="mt-10 space-y-1 sm:mt-12 sm:space-y-1.5" stagger={0.22}>
          {AI_LINES.map((line) => (
            <StaggerLine
              key={line}
              className="font-display text-2xl font-semibold leading-snug tracking-tight text-text-primary/90 sm:text-3xl"
            >
              {line}
            </StaggerLine>
          ))}
        </StaggerGroup>

        <div className="mt-10 space-y-5 sm:mt-12 sm:space-y-6">
          <RevealBlock delay={0.05}>
            <p className="text-base leading-[1.85] text-text-muted sm:text-lg">
              Every day, machines become faster, smarter, and more capable.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="space-y-1">
              <p className="text-base leading-[1.85] text-text-primary/85 sm:text-lg">
                But intelligence is more than speed.
              </p>
              <p className="text-base leading-[1.85] text-text-muted sm:text-lg">
                More than memory.
              </p>
              <p className="text-base leading-[1.85] text-text-muted sm:text-lg">
                More than patterns.
              </p>
            </div>
          </RevealBlock>

          <StaggerGroup className="space-y-1 pt-2 sm:space-y-1.5" stagger={0.14}>
            {HUMAN_TRAITS.map((trait) => (
              <StaggerLine
                key={trait}
                className="font-display text-xl font-medium tracking-tight text-human/85 sm:text-2xl"
              >
                {trait}
              </StaggerLine>
            ))}
          </StaggerGroup>

          <RevealBlock delay={0.05}>
            <p className="pt-4 text-base leading-[1.85] text-text-primary/80 sm:text-lg">
              These are the traits that make us human.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.08}>
            <p className="text-base leading-[1.85] text-text-muted sm:text-lg">
              Outthink exists to explore a simple question:
            </p>
          </RevealBlock>

          <RevealBlock delay={0.12}>
            <p className="why-exists-question font-display text-xl font-semibold leading-snug tracking-tight text-text-primary sm:text-2xl">
              Does humanity still have an edge?
            </p>
          </RevealBlock>
        </div>

        <motion.p
          ref={closingRef}
          initial={{ opacity: 0, y: 16 }}
          animate={closingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          className="why-exists-closing mt-14 max-w-md sm:mt-16"
        >
          Every challenge brings us closer to the answer.
        </motion.p>
        </div>
      </Container>
    </section>
  );
}
