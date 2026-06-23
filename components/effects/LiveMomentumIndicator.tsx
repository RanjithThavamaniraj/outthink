"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";

type Momentum = {
  side: "human" | "ai";
  value: number;
};

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function AnimatedPercent({ value }: { value: number }) {
  const spring = useSpring(value, { stiffness: 90, damping: 22 });
  const rounded = useTransform(spring, (v) => Math.round(v));
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    spring.set(value);
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return unsub;
  }, [value, spring, rounded]);

  return <span className="tabular-nums">+{display}%</span>;
}

export function LiveMomentumIndicator({
  className = "",
  bare = false,
  advantage = false,
}: {
  className?: string;
  bare?: boolean;
  advantage?: boolean;
}) {
  const [momentum, setMomentum] = useState<Momentum>({
    side: "human",
    value: advantage ? 2 : 12,
  });
  const [key, setKey] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const scheduleNext = () => {
      const delay = randomBetween(8000, 12000);
      timeoutRef.current = setTimeout(() => {
        const side = advantage
          ? Math.random() > 0.35
            ? "human"
            : "ai"
          : Math.random() > 0.45
            ? "human"
            : "ai";
        const value = advantage
          ? Math.floor(randomBetween(1, 5))
          : Math.floor(randomBetween(4, 18));
        setMomentum({ side, value });
        setKey((k) => k + 1);
        scheduleNext();
      }, delay);
    };

    scheduleNext();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const isHuman = momentum.side === "human";
  const accentClass = isHuman ? "text-human" : "text-ai";

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.4 }}
          className={
            bare
              ? advantage
                ? `inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted/70`
                : `inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] ${accentClass}`
              : `inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] ${
                  isHuman
                    ? "border-human/30 bg-human/10 text-human"
                    : "border-ai/30 bg-ai/10 text-ai"
                }`
          }
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isHuman ? "bg-human" : "bg-ai"
            } ${advantage ? "opacity-60" : ""} animate-pulse`}
          />
          {advantage ? (
            <>
              <span>
                {isHuman ? "Human Advantage" : "AI Advantage"}
              </span>
              <span className={accentClass}>
                <AnimatedPercent value={momentum.value} />
              </span>
            </>
          ) : (
            <>
              {isHuman ? "Human" : "AI"} Momentum{" "}
              <AnimatedPercent value={momentum.value} />
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
