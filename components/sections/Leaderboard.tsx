"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { FadeIn, staggerContainer, staggerItem } from "@/components/animations/FadeIn";
import { leaderboard } from "@/lib/data";

export function Leaderboard() {
  return (
    <Section id="leaderboard">
      <FadeIn>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-human">
            Leaderboard
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Top competitors this week
          </h2>
          <p className="mt-4 text-muted">
            The minds consistently outthinking the machines.
          </p>
        </div>
      </FadeIn>

      <motion.div
        className="mx-auto mt-12 max-w-2xl"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {leaderboard.map((player) => (
          <motion.div
            key={player.rank}
            variants={staggerItem}
            whileHover={{ x: 4 }}
            className="group flex items-center gap-4 border-b border-border py-4 first:rounded-t-2xl last:rounded-b-2xl last:border-b-0"
          >
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center font-display text-sm font-bold ${
                player.rank === 1
                  ? "text-human"
                  : player.rank === 2
                    ? "text-text-primary"
                    : player.rank === 3
                      ? "text-ai"
                      : "text-muted"
              }`}
            >
              {player.rank}
            </span>

            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                player.rank === 1
                  ? "bg-human/20 text-human"
                  : "bg-background-tertiary text-text-primary"
              }`}
            >
              {player.avatar}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-white">{player.name}</p>
              <p className="text-sm text-muted">
                {player.wins} wins · {player.streak} day streak
              </p>
            </div>

            {player.rank === 1 && (
              <span className="hidden rounded-full bg-human/15 px-3 py-1 text-xs font-medium text-human sm:inline">
                #1 This Week
              </span>
            )}

            <motion.div
              className="h-2 w-16 overflow-hidden rounded-full bg-white/10 sm:w-24"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="h-full rounded-full bg-human"
                initial={{ width: 0 }}
                whileInView={{ width: `${(player.wins / 50) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: player.rank * 0.1 }}
              />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      <FadeIn delay={0.3} className="mt-8 text-center">
        <a
          href="#"
          className="text-sm font-medium text-human transition-colors hover:text-human/80"
        >
          View full leaderboard →
        </a>
      </FadeIn>
    </Section>
  );
}
