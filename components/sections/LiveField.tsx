"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { stats } from "@/lib/data";

function useAnimatedStat(
  value: number,
  decimals: number,
  isInView: boolean,
) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, value]);

  if (decimals > 0) return display.toFixed(decimals);
  return Math.floor(display).toLocaleString();
}

type LiveFieldProps = {
  className?: string;
};

export function LiveField({ className = "" }: LiveFieldProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const humans = useAnimatedStat(stats[0].value, 0, isInView);
  const battles = useAnimatedStat(stats[1].value, 0, isInView);
  const winRate = useAnimatedStat(stats[2].value, 1, isInView);

  return (
    <div
      ref={ref}
      id="stats"
      className={`mx-auto max-w-3xl text-center font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted sm:text-[11px] sm:tracking-[0.26em] ${className}`}
    >
      <span className="inline-flex items-center gap-2 text-human/90">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-human" />
        Live field
      </span>

      <p className="mt-2.5 leading-relaxed text-text-muted/80">
        <span className="text-text-primary/90">{humans}+</span> minds competing
        <span className="mx-2 text-text-muted/30">·</span>
        <span className="text-text-primary/90">{battles}+</span> battles fought
        <span className="mx-2 text-text-muted/30">·</span>
        humans lead <span className="text-human">{winRate}%</span>
      </p>
    </div>
  );
}
