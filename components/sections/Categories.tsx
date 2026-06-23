"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { FadeIn, staggerContainer, staggerItem } from "@/components/animations/FadeIn";
import { categories } from "@/lib/data";

export function Categories() {
  return (
    <Section id="categories">
      <FadeIn>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-human">
            Challenge Categories
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Five arenas. One question.
          </h2>
          <p className="mt-4 text-muted">
            Pick your strength or step outside your comfort zone. Every category
            pits your mind against the best AI models.
          </p>
        </div>
      </FadeIn>

      <motion.div
        className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {categories.map((category) => (
          <motion.article
            key={category.id}
            variants={staggerItem}
            className="micro-card group relative overflow-hidden rounded-2xl border border-border bg-surface-elevated p-6 transition-colors hover:border-border-hover"
          >
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-human/5 transition-transform group-hover:scale-150" />
            <span className="font-display text-2xl text-human">{category.icon}</span>
            <h3 className="mt-4 font-display text-xl font-semibold text-white">
              {category.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {category.description}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-human opacity-0 transition-opacity group-hover:opacity-100">
              Enter arena →
            </span>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}
