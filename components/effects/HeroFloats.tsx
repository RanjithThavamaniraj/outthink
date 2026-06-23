"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

const LIVE_FEED = [
  { winner: "human" as const, text: "Sarah defeated GPT-4" },
  { winner: "ai" as const, text: "Claude defeated Ravi" },
  { winner: "human" as const, text: "Mei defeated Gemini" },
  { winner: "ai" as const, text: "GPT-4o defeated Priya" },
  { winner: "human" as const, text: "Carlos defeated Claude" },
  { winner: "ai" as const, text: "Gemini defeated Yuki" },
] as const;

const TRAIT_METRICS = [
  { label: "Creativity", value: 32 },
  { label: "Humor", value: 68 },
  { label: "Empathy", value: 91 },
  { label: "Intuition", value: 47 },
  { label: "Logic", value: -14 },
  { label: "Coding", value: -27 },
];

type TraitMetric = { label: string; value: number };

const INITIAL_TRAITS: TraitMetric[] = [...TRAIT_METRICS];

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function AnimatedScore({ value }: { value: number }) {
  const spring = useSpring(value, { stiffness: 60, damping: 18 });
  const rounded = useTransform(spring, (v) => Math.round(v));
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    spring.set(value);
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return unsub;
  }, [value, spring, rounded]);

  return <>{display}</>;
}

function TraitValue({ value }: { value: number }) {
  const spring = useSpring(value, { stiffness: 80, damping: 20 });
  const rounded = useTransform(spring, (v) => Math.round(v));
  const [display, setDisplay] = useState(value);
  const isPositive = value >= 0;

  useEffect(() => {
    spring.set(value);
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return unsub;
  }, [value, spring, rounded]);

  return (
    <span
      className={`font-mono text-[11px] tabular-nums ${
        isPositive ? "text-human" : "text-ai"
      }`}
    >
      {display >= 0 ? "+" : ""}
      {display}%
    </span>
  );
}

function jitterTrait(current: number, isNegative: boolean) {
  const delta = Math.floor(Math.random() * 7) - 3;
  let next = current + delta;
  if (isNegative) next = Math.min(-5, Math.max(-35, next));
  else next = Math.max(15, Math.min(95, next));
  return next;
}

export function FloatingScores() {
  const [humanScore, setHumanScore] = useState(54);
  const aiScore = 100 - humanScore;

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timeout = setTimeout(() => {
        setHumanScore((prev) =>
          clamp(prev + Math.floor(randomBetween(-2, 2)), 51, 58),
        );
        schedule();
      }, randomBetween(5000, 8000));
    };
    schedule();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="pointer-events-none absolute left-6 top-[36%] z-20 hidden text-left lg:block xl:left-14 2xl:left-20"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-human/80">
          Human
        </p>
        <p className="font-display text-6xl font-extrabold tabular-nums leading-none text-text-primary xl:text-7xl">
          <AnimatedScore value={humanScore} />%
        </p>
        <p className="mt-2 font-mono text-[10px] text-text-muted">Win rate</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.3 }}
        className="pointer-events-none absolute right-6 top-[36%] z-20 hidden text-right lg:block xl:right-14 2xl:right-20"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-ai/80">
          AI
        </p>
        <p className="font-display text-6xl font-extrabold tabular-nums leading-none text-text-primary xl:text-7xl">
          <AnimatedScore value={aiScore} />%
        </p>
        <p className="mt-2 font-mono text-[10px] text-text-muted">Win rate</p>
      </motion.div>

      <div className="mb-10 flex justify-center gap-16 lg:hidden">
        <div className="text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-human">
            Human
          </p>
          <p className="font-display text-4xl font-extrabold tabular-nums text-text-primary">
            <AnimatedScore value={humanScore} />%
          </p>
        </div>
        <div className="text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ai">
            AI
          </p>
          <p className="font-display text-4xl font-extrabold tabular-nums text-text-primary">
            <AnimatedScore value={aiScore} />%
          </p>
        </div>
      </div>
    </>
  );
}

export function FloatingEdgeMetrics() {
  const [metrics, setMetrics] = useState<TraitMetric[]>(INITIAL_TRAITS);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((m) => ({
          ...m,
          value: jitterTrait(m.value, m.value < 0),
        })),
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="pointer-events-none absolute bottom-[10%] left-6 z-20 hidden w-44 lg:block xl:left-14 2xl:left-20"
    >
      <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-text-muted">
        Human edge
      </p>
      <div className="space-y-2">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="flex items-center justify-between gap-4"
          >
            <span className="font-mono text-[11px] text-text-muted">
              {metric.label}
            </span>
            <TraitValue value={metric.value} />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function FloatingBattleFeed() {
  const items = [...LIVE_FEED, ...LIVE_FEED];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.55 }}
      className="pointer-events-none absolute bottom-[10%] right-6 z-20 hidden w-52 lg:block xl:right-14 2xl:right-20"
    >
      <p className="mb-4 text-right font-mono text-[10px] uppercase tracking-[0.32em] text-text-muted">
        Live battles
      </p>
      <div className="relative h-36 overflow-hidden mask-feed">
        <div className="live-feed-track flex flex-col gap-4 text-right">
          {items.map((item, i) => (
            <p
              key={`${item.text}-${i}`}
              className={`font-mono text-[11px] leading-relaxed ${
                item.winner === "human" ? "text-human/85" : "text-ai/85"
              }`}
            >
              {item.winner === "human" ? "🧠" : "🤖"} {item.text}
            </p>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
