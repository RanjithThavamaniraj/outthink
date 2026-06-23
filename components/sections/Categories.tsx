"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { FadeIn, staggerContainer, staggerItem } from "@/components/animations/FadeIn";
import { categories, trendingChallenges } from "@/lib/data";

const FEATURED_ID = "creativity";

const cardAccent: Record<string, "human" | "ai"> = {
  logic: "ai",
  creativity: "human",
  predictions: "ai",
  writing: "human",
  "business-ideas": "ai",
};

function accentTitleClass(accent: "human" | "ai") {
  return accent === "human" ? "text-human" : "text-ai";
}

function CategoryCard({
  id,
  title,
  description,
  icon,
  featured = false,
  className = "",
}: (typeof categories)[number] & { featured?: boolean; className?: string }) {
  const accent = cardAccent[id] ?? "human";
  const titleColor = accentTitleClass(accent);

  return (
    <motion.article
      variants={staggerItem}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25 }}
      className={`scanline-card-surface group relative overflow-hidden border border-border transition-colors hover:border-border-hover ${className} ${
        featured
          ? "category-hero-clip min-h-[300px] sm:min-h-[360px] lg:min-h-[400px]"
          : "category-card-clip min-h-[176px] sm:min-h-[192px]"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            accent === "human"
              ? "radial-gradient(circle at 75% 15%, rgba(74,222,128,0.07), transparent 50%)"
              : "radial-gradient(circle at 75% 15%, rgba(96,165,250,0.07), transparent 50%)",
        }}
      />

      <div
        className={`pointer-events-none absolute left-3 top-4 select-none font-display font-extrabold uppercase opacity-[0.07] transition-opacity duration-500 group-hover:opacity-[0.12] ${
          featured
            ? "text-[3.5rem] sm:text-[5rem] lg:text-[6rem]"
            : "text-[2.25rem] sm:text-[2.75rem]"
        } ${titleColor}`}
        aria-hidden
      >
        {title}
      </div>

      <div className="relative flex h-full flex-col justify-end p-5 sm:p-6">
        <div className="mb-auto flex items-start justify-between gap-3 pt-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-text-muted">
            Challenge
          </span>
          <span
            className={`font-display text-lg opacity-40 transition-opacity group-hover:opacity-70 sm:text-xl ${titleColor}`}
            aria-hidden
          >
            {icon}
          </span>
        </div>

        <h3
          className={`font-display font-extrabold uppercase leading-[0.95] ${titleColor} ${
            featured
              ? "text-2xl sm:text-3xl lg:text-[2.5rem]"
              : "text-base sm:text-lg"
          }`}
        >
          {title}
        </h3>

        <p
          className={`mt-3 leading-relaxed text-text-muted ${
            featured ? "max-w-md text-sm sm:text-base" : "text-xs sm:text-sm"
          }`}
        >
          {description}
        </p>

        <span
          className={`mt-4 inline-flex font-mono text-[10px] uppercase tracking-[0.22em] opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${titleColor}`}
        >
          Start challenge →
        </span>
      </div>

      <div
        className={`pointer-events-none absolute left-0 top-0 h-px w-1/2 ${
          accent === "human" ? "bg-human/30" : "bg-ai/30"
        }`}
      />
    </motion.article>
  );
}

function TrendingRail() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="relative"
    >
      <div className="mb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-text-muted">
          Active now
        </p>
        <h3 className="scanline-heading mt-3 font-display font-extrabold uppercase text-human">
          Live rail
        </h3>
      </div>

      <div className="relative pl-8">
        <div
          className="absolute bottom-2 left-[11px] top-2 w-px opacity-40"
          style={{
            backgroundImage: `repeating-linear-gradient(
              to bottom,
              rgba(245,245,245,0.35) 0,
              rgba(245,245,245,0.35) 2px,
              transparent 2px,
              transparent 6px
            )`,
          }}
        />

        <div className="space-y-8">
          {trendingChallenges.map((item) => (
            <motion.div
              key={item.id}
              variants={staggerItem}
              className="group relative flex gap-4"
            >
              <div
                className={`absolute -left-8 top-1.5 z-10 flex h-6 w-6 items-center justify-center border border-border bg-background font-mono text-[9px] ${
                  item.side === "human" ? "text-human" : "text-ai"
                }`}
              >
                {item.icon}
              </div>

              <div className="min-w-0 flex-1 border-b border-border pb-6 transition-colors group-hover:border-border-hover">
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
                <p className="mt-2 font-mono text-[11px] text-text-muted">
                  {item.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Categories() {
  const featured = categories.find((c) => c.id === FEATURED_ID) ?? categories[0];
  const gridCategories = categories.filter((c) => c.id !== featured.id);

  return (
    <Section id="categories" className="relative overflow-hidden bg-background">
      <FadeIn>
        <div className="relative max-w-4xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-text-muted">
            Challenge Categories
          </p>
          <h2 className="scanline-heading mt-4 font-display font-extrabold uppercase text-text-primary">
            Five challenges
          </h2>
          <p className="mt-2 font-display text-xl font-extrabold uppercase text-ai sm:text-2xl">
            One question
          </p>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-text-muted sm:text-base">
            Pick your strength or step outside your comfort zone. Every category
            pits your mind against the best AI models.
          </p>
          <div
            className="mt-6 h-px w-32 opacity-50"
            style={{
              backgroundImage: `repeating-linear-gradient(
                to right,
                rgba(245,245,245,0.4) 0,
                rgba(245,245,245,0.4) 4px,
                transparent 4px,
                transparent 8px
              )`,
            }}
          />
        </div>
      </FadeIn>

      <div className="relative mt-12 grid gap-10 lg:grid-cols-12 lg:gap-10 xl:gap-12">
        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <CategoryCard {...featured} featured className="sm:col-span-2" />
          {gridCategories.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </motion.div>

        <div className="lg:col-span-5 lg:border-l lg:border-border lg:pl-8 xl:pl-10">
          <TrendingRail />
        </div>
      </div>
    </Section>
  );
}
