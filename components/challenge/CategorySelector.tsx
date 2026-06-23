"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { NeuralNodeCanvas } from "@/components/challenge/NeuralNodeCanvas";
import type { ChallengeCategory } from "@/lib/types/challenge";

type CategorySelectorProps = {
  categories: ChallengeCategory[];
  selectedId: string | null;
  onSelect: (category: ChallengeCategory) => void;
  loading?: boolean;
};

export function CategorySelector({
  categories,
  selectedId,
  onSelect,
  loading = false,
}: CategorySelectorProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-3xl max-h-[min(72vw,22rem)] sm:aspect-[16/10] sm:max-h-[min(52vw,24rem)]">
      <NeuralNodeCanvas
        categories={categories}
        selectedId={selectedId}
        hoveredId={hoveredId}
      />

      {categories.map((category) => {
        const isSelected = selectedId === category.id;
        const isHovered = hoveredId === category.id;

        return (
          <motion.button
            key={category.id}
            type="button"
            disabled={loading}
            onClick={() => onSelect(category)}
            onMouseEnter={() => setHoveredId(category.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center focus:outline-none focus-visible:ring-1 focus-visible:ring-human/50 disabled:opacity-50"
            style={{
              left: `${category.node.x}%`,
              top: `${category.node.y}%`,
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            animate={{
              scale: isSelected ? 1.06 : 1,
            }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-full border font-display text-lg transition-all duration-300 sm:h-14 sm:w-14 sm:text-xl ${
                isSelected
                  ? "border-human/50 bg-human/10 text-human shadow-[0_0_24px_rgba(74,222,128,0.2)]"
                  : isHovered
                    ? "border-border-hover bg-background-secondary/80 text-text-primary"
                    : "border-border bg-background/60 text-text-muted"
              }`}
            >
              {category.icon}
            </span>
            <span
              className={`mt-3 max-w-[8.5rem] font-display text-xs font-extrabold uppercase tracking-wide sm:max-w-[10rem] sm:text-sm ${
                isSelected ? "text-text-primary" : "text-text-muted"
              }`}
            >
              {category.name}
            </span>
            <span
              className={`mt-1.5 max-w-[9rem] text-[10px] leading-relaxed sm:max-w-[11rem] sm:text-[11px] ${
                isSelected || isHovered
                  ? "text-text-muted"
                  : "text-text-muted/50"
              }`}
            >
              {category.description}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
