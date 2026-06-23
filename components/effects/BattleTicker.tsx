"use client";

import { useEffect, useRef } from "react";
import { battles } from "@/lib/battles";

function TickerItem({
  human,
  task,
  winner,
  margin,
  time,
}: (typeof battles)[number]) {
  if (winner === "human") {
    return (
      <span className="whitespace-nowrap px-4 md:px-8">
        🧠{" "}
        <span className="text-white/70">{human}</span>{" "}
        <span className="text-human">beat AI</span> on {task} · {margin} ·{" "}
        {time}
      </span>
    );
  }

  return (
    <span className="whitespace-nowrap px-4 md:px-8">
      🤖 AI{" "}
      <span className="text-ai">beat {human}</span> on {task} · {margin}{" "}
      · {time}
    </span>
  );
}

export function BattleTicker() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const setDuration = () => {
      const halfWidth = track.scrollWidth / 2;
      const duration = halfWidth / 40;
      track.style.animationDuration = `${duration}s`;
    };

    setDuration();
    const ro = new ResizeObserver(setDuration);
    ro.observe(track);

    return () => ro.disconnect();
  }, []);

  const items = [...battles, ...battles];

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-8 overflow-hidden border-b border-[rgba(96,165,250,0.15)] bg-background-secondary"
      aria-hidden
    >
      <div
        ref={trackRef}
        className="ticker-track flex h-full w-max items-center"
      >
        {items.map((battle, i) => (
          <span
            key={`${battle.human}-${battle.task}-${i}`}
            className="font-mono text-[10px] tracking-[0.05em] text-[#888] md:text-[11px]"
          >
            <TickerItem {...battle} />
            <span className="text-[#444]"> · </span>
          </span>
        ))}
      </div>
    </div>
  );
}
