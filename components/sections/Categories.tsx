"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { FadeIn, staggerContainer, staggerItem } from "@/components/animations/FadeIn";
import { categories, trendingChallenges } from "@/lib/data";

const DUEL_STATS: Record<
  string,
  { humanEdge: number; active: number; featured?: boolean }
> = {
  logic: { humanEdge: 38, active: 1847 },
  creativity: { humanEdge: 64, active: 3204, featured: true },
  predictions: { humanEdge: 44, active: 2103 },
  writing: { humanEdge: 59, active: 2891 },
  "business-ideas": { humanEdge: 46, active: 1566 },
};

function FrontierSpectrum({ humanEdge }: { humanEdge: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isInView) setWidth(humanEdge);
  }, [isInView, humanEdge]);

  const aiEdge = 100 - humanEdge;

  return (
    <div ref={ref} className="mt-8 flex items-center gap-3 sm:gap-4">
      <span className="w-8 shrink-0 text-right font-mono text-[10px] tabular-nums text-human sm:w-10">
        {width}%
      </span>
      <div className="frontier-spectrum min-w-0 flex-1">
        <div
          className="frontier-spectrum-human"
          style={{ width: `${width}%` }}
        />
        <div
          className="frontier-spectrum-marker"
          style={{ left: `${width}%` }}
        />
      </div>
      <span className="w-8 shrink-0 font-mono text-[10px] tabular-nums text-ai sm:w-10">
        {aiEdge}%
      </span>
    </div>
  );
}

function CategoryDuelRow({
  id,
  title,
  description,
  icon,
}: (typeof categories)[number]) {
  const stats = DUEL_STATS[id] ?? { humanEdge: 50, active: 1000 };
  const isFeatured = stats.featured;
  const humanLeads = stats.humanEdge >= 50;

  return (
    <motion.article
      variants={staggerItem}
      className={`category-duel-row group relative ${
        isFeatured ? "py-16 sm:py-20" : "py-12 sm:py-14"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 opacity-60"
        style={{
          background:
            "linear-gradient(90deg, rgba(74,222,128,0.22) 0%, rgba(245,245,245,0.08) 48%, rgba(96,165,250,0.22) 100%)",
        }}
      />
      <div className="category-frontier-clash pointer-events-none" aria-hidden />

      <div className="relative mx-auto max-w-3xl px-2">
        <div className="grid items-center gap-6 sm:grid-cols-[1fr_minmax(0,28rem)_1fr] sm:gap-4">
          <div className="hidden text-right sm:block">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-human/75">
              Human
            </p>
            <p
              className={`mt-1 font-mono text-[11px] ${
                humanLeads ? "text-human/90" : "text-text-muted/60"
              }`}
            >
              {humanLeads ? "Leading front" : "Pushing back"}
            </p>
          </div>

          <div className="text-center">
            {isFeatured && (
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.32em] text-human/80">
                Prime front
              </p>
            )}

            <span
              className={`mb-3 block font-display ${
                isFeatured
                  ? "text-2xl text-text-muted/25 sm:text-3xl"
                  : "text-xl text-text-muted/20"
              }`}
              aria-hidden
            >
              {icon}
            </span>

            <h3
              className={`font-display font-extrabold uppercase leading-[0.95] text-text-primary transition-colors duration-300 group-hover:text-text-primary ${
                isFeatured
                  ? "text-3xl sm:text-4xl lg:text-[2.75rem]"
                  : "text-2xl sm:text-3xl"
              }`}
            >
              {title}
            </h3>

            <p
              className={`mx-auto mt-4 max-w-md leading-relaxed text-text-muted ${
                isFeatured ? "text-sm sm:text-base" : "text-xs sm:text-sm"
              }`}
            >
              {description}
            </p>

            <FrontierSpectrum humanEdge={stats.humanEdge} />

            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted/70">
              {stats.active.toLocaleString()} minds on this front
            </p>

            <div className="mt-4 flex justify-center gap-6 sm:hidden">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-human/70">
                Human
              </span>
              <span className="font-mono text-[10px] text-text-muted/40">vs</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ai/70">
                AI
              </span>
            </div>
          </div>

          <div className="hidden text-left sm:block">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-ai/75">
              AI
            </p>
            <p
              className={`mt-1 font-mono text-[11px] ${
                !humanLeads ? "text-ai/90" : "text-text-muted/60"
              }`}
            >
              {!humanLeads ? "Leading front" : "Pushing back"}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function LiveFrontier() {
  return (
    <motion.aside
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="relative lg:sticky lg:top-32 lg:self-start"
    >
      <div className="mb-10 lg:mb-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-text-muted">
          Active signals
        </p>
        <h3 className="mt-3 font-display text-2xl font-extrabold uppercase text-text-primary sm:text-3xl">
          Live frontier
        </h3>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-text-muted">
          Real battles shifting the balance between human instinct and machine
          precision.
        </p>
      </div>

      <div className="relative pl-6">
        <div
          className="absolute bottom-0 left-[7px] top-0 w-px"
          style={{
            background:
              "linear-gradient(to bottom, rgba(74,222,128,0.35), rgba(96,165,250,0.35))",
          }}
        />

        <div className="space-y-10">
          {trendingChallenges.map((item) => (
            <motion.div
              key={item.id}
              variants={staggerItem}
              className="group relative"
            >
              <div
                className={`absolute -left-6 top-1 h-3.5 w-3.5 rounded-full border border-background transition-shadow duration-300 ${
                  item.side === "human"
                    ? "bg-human shadow-[0_0_12px_rgba(74,222,128,0.15)] group-hover:shadow-[0_0_16px_rgba(74,222,128,0.28)]"
                    : "bg-ai shadow-[0_0_12px_rgba(96,165,250,0.15)] group-hover:shadow-[0_0_16px_rgba(96,165,250,0.28)]"
                }`}
              />

              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-text-muted">
                {item.category}
              </p>
              <p
                className={`mt-2 font-display text-base font-extrabold uppercase leading-tight sm:text-lg ${
                  item.side === "human" ? "text-human" : "text-ai"
                }`}
              >
                {item.title}
              </p>
              <p className="mt-2 font-mono text-[11px] leading-relaxed text-text-muted">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.aside>
  );
}

export function Categories() {
  const orderedCategories = [
    ...categories.filter((c) => c.id === "creativity"),
    ...categories.filter((c) => c.id !== "creativity"),
  ];

  return (
    <Section id="categories" className="relative overflow-hidden bg-background">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 50% 40% at 15% 20%, rgba(74,222,128,0.04) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 85% 80%, rgba(96,165,250,0.04) 0%, transparent 70%)
          `,
        }}
      />

      <FadeIn>
        <div className="relative max-w-3xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-text-muted">
            Challenge Categories
          </p>
          <h2 className="scanline-heading mt-4 font-display font-extrabold uppercase text-text-primary">
            Five fronts
          </h2>
          <p className="mt-2 font-display text-xl font-extrabold uppercase text-ai sm:text-2xl">
            One war of minds
          </p>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-text-muted sm:text-base">
            Each discipline is a battleground where human intuition collides with
            artificial intelligence. Find your edge — or lose it.
          </p>
        </div>
      </FadeIn>

      <div className="relative mt-16 lg:mt-20 lg:grid lg:grid-cols-12 lg:gap-16 xl:gap-20">
        <motion.div
          className="lg:col-span-7 xl:col-span-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="mb-6 flex items-center justify-between px-2 font-mono text-[10px] uppercase tracking-[0.28em] text-text-muted/50 sm:px-0">
            <span className="text-human/60">Human</span>
            <span>Frontier</span>
            <span className="text-ai/60">AI</span>
          </div>

          <div className="divide-y divide-border/40">
            {orderedCategories.map((category) => (
              <CategoryDuelRow key={category.id} {...category} />
            ))}
          </div>
        </motion.div>

        <div className="mt-20 lg:col-span-5 lg:mt-0 xl:col-span-4">
          <LiveFrontier />
        </div>
      </div>
    </Section>
  );
}
