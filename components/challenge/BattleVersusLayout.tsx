"use client";

import type { ReactNode } from "react";

type BattleVersusLayoutProps = {
  left: ReactNode;
  right: ReactNode;
};

export function BattleVersusLayout({ left, right }: BattleVersusLayoutProps) {
  return (
    <div className="relative">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-8">
        {left}

        <div className="flex items-center gap-4 md:hidden" aria-hidden>
          <div className="h-px flex-1 bg-border/60" />
          <span className="battle-vs-badge font-mono text-[10px] uppercase tracking-[0.45em] text-text-muted/35">
            VS
          </span>
          <div className="h-px flex-1 bg-border/60" />
        </div>

        {right}
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border to-transparent md:block"
        aria-hidden
      />

      <span
        className="battle-vs-badge pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.45em] text-text-muted/35 md:block"
        aria-hidden
      >
        VS
      </span>
    </div>
  );
}
