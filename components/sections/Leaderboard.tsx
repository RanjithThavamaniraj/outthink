"use client";

import { useMemo, useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/animations/FadeIn";
import { leaderboard } from "@/lib/data";

/** Visible header strip for stacked passes behind the front card. */
const HEADER_PEEK = 52;
/** Fixed header block height — must match HEADER_PEEK. */
const HEADER_HEIGHT = 52;
/** Approximate full pass height (header + body). */
const CARD_FULL_HEIGHT = 204;

type Player = (typeof leaderboard)[number];

function headerStyle(rank: number): React.CSSProperties {
  if (rank === 1) {
    return {
      background:
        "linear-gradient(135deg, rgba(74,222,128,0.95) 0%, rgba(34,197,94,0.75) 45%, rgba(5,5,5,0.2) 100%)",
    };
  }
  if (rank === 2) {
    return {
      background:
        "linear-gradient(135deg, rgba(245,245,245,0.22) 0%, rgba(245,245,245,0.08) 50%, rgba(5,5,5,0.15) 100%)",
    };
  }
  if (rank === 3) {
    return {
      background:
        "linear-gradient(135deg, rgba(96,165,250,0.9) 0%, rgba(59,130,246,0.65) 50%, rgba(5,5,5,0.2) 100%)",
    };
  }
  return {
    background:
      "linear-gradient(135deg, rgba(17,17,17,1) 0%, rgba(10,10,10,1) 100%)",
  };
}

function PassHeader({ player }: { player: Player }) {
  return (
    <div
      className="flex h-[52px] shrink-0 items-center justify-between px-5 sm:px-6"
      style={headerStyle(player.rank)}
    >
      <div className="min-w-0">
        <p
          className={`truncate font-mono text-[9px] uppercase tracking-[0.28em] ${
            player.rank <= 3 ? "text-background/70" : "text-text-muted"
          }`}
        >
          Outthink Pass
        </p>
        <p
          className={`truncate font-display text-sm font-bold uppercase tracking-wide ${
            player.rank === 1 || player.rank === 3
              ? "text-background"
              : "text-text-primary"
          }`}
        >
          Competitor #{player.rank}
        </p>
      </div>
      <span
        className={`ml-3 shrink-0 font-display text-2xl font-extrabold tabular-nums ${
          player.rank === 1 || player.rank === 3
            ? "text-background/90"
            : "text-text-primary/80"
        }`}
      >
        {String(player.rank).padStart(2, "0")}
      </span>
    </div>
  );
}

function WalletPass({
  player,
  isTop,
  onFocus,
}: {
  player: Player;
  isTop: boolean;
  onFocus: () => void;
}) {
  const winPercent = Math.min((player.wins / 50) * 100, 100);

  return (
    <motion.button
      type="button"
      layout="position"
      onClick={onFocus}
      className={`wallet-pass block w-full overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-human/40 ${
        isTop ? "wallet-pass-top" : ""
      }`}
      whileTap={{ scale: isTop ? 0.992 : 0.988 }}
      transition={{ layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
    >
      <PassHeader player={player} />

      {isTop && (
        <div className="bg-background-secondary px-5 py-4 sm:px-6 sm:py-5">
          <div className="flex items-center gap-4">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                player.rank === 1
                  ? "bg-human/20 text-human"
                  : player.rank === 3
                    ? "bg-ai/20 text-ai"
                    : "bg-background-tertiary text-text-primary"
              }`}
            >
              {player.avatar}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-lg font-bold text-text-primary">
                {player.name}
              </p>
              <p className="mt-0.5 text-sm text-text-muted">
                {player.wins} wins · {player.streak} day streak
              </p>
            </div>

            {player.rank === 1 && (
              <span className="hidden shrink-0 rounded-full bg-human/15 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-human sm:inline">
                Top mind
              </span>
            )}
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted">
              <span>Win velocity</span>
              <span className="tabular-nums text-text-primary/80">
                {player.wins}/50
              </span>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-background-tertiary">
              <motion.div
                className={`h-full rounded-full ${
                  player.rank === 3 ? "bg-ai" : "bg-human"
                }`}
                initial={{ width: 0 }}
                whileInView={{ width: `${winPercent}%` }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.9,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </div>
          </div>
        </div>
      )}
    </motion.button>
  );
}

/** Rank #1 starts on top; lower ranks peek above. */
function initialStackOrder() {
  return leaderboard.map((_, i) => leaderboard.length - 1 - i);
}

export function Leaderboard() {
  const [stackOrder, setStackOrder] = useState(initialStackOrder);

  const stackHeight = useMemo(
    () => (stackOrder.length - 1) * HEADER_PEEK + CARD_FULL_HEIGHT,
    [stackOrder.length],
  );

  const bringToFront = (index: number) => {
    setStackOrder((prev) => [...prev.filter((i) => i !== index), index]);
  };

  return (
    <Section id="leaderboard" className="overflow-hidden">
      <FadeIn>
        <div className="mx-auto max-w-md text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-text-muted">
            Leaderboard
          </p>
          <h2 className="mt-4 font-display text-3xl font-extrabold uppercase tracking-tight text-text-primary sm:text-4xl">
            Top minds
          </h2>
          <p className="mt-3 text-sm text-text-muted">
            Tap a pass to bring it forward.
          </p>
        </div>
      </FadeIn>

      <div
        className="relative mx-auto mt-14 w-full max-w-md"
        style={{ height: stackHeight }}
      >
        <LayoutGroup>
          {stackOrder.map((playerIndex, stackPosition) => {
            const player = leaderboard[playerIndex];
            const isTop = stackPosition === stackOrder.length - 1;

            return (
              <motion.div
                key={player.rank}
                layout
                className="absolute left-0 right-0 overflow-hidden"
                style={{
                  zIndex: stackPosition,
                  height: isTop ? CARD_FULL_HEIGHT : HEADER_HEIGHT,
                }}
                animate={{ top: stackPosition * HEADER_PEEK }}
                transition={{
                  top: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                  layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                }}
              >
                <WalletPass
                  player={player}
                  isTop={isTop}
                  onFocus={() => bringToFront(playerIndex)}
                />
              </motion.div>
            );
          })}
        </LayoutGroup>
      </div>

      <FadeIn delay={0.25} className="mt-10 text-center">
        <a
          href="#leaderboard"
          className="font-mono text-[10px] uppercase tracking-[0.28em] text-text-muted transition-colors hover:text-human"
        >
          View full leaderboard →
        </a>
      </FadeIn>
    </Section>
  );
}
