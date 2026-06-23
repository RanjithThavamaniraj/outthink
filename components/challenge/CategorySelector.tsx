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

function accentGlow(hex: string, strength: number) {
  const inner = Math.round(strength * 0.35 * 255)
    .toString(16)
    .padStart(2, "0");
  const outer = Math.round(strength * 0.18 * 255)
    .toString(16)
    .padStart(2, "0");
  return `0 0 20px ${hex}${inner}, 0 0 40px ${hex}${outer}`;
}

export function CategorySelector({
  categories,
  selectedId,
  onSelect,
  loading = false,
}: CategorySelectorProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-3xl max-h-[min(72vw,24rem)] sm:aspect-[16/10] sm:max-h-[min(52vw,26rem)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 50% 45% at 50% 50%, rgba(74,222,128,0.04) 0%, transparent 70%)",
        }}
      />

      <NeuralNodeCanvas
        categories={categories}
        selectedId={selectedId}
        hoveredId={hoveredId}
      />

      <div className="category-frontier-clash" aria-hidden />

      {categories.map((category, index) => {
        const isSelected = selectedId === category.id;
        const isHovered = hoveredId === category.id;
        const isActive = isSelected || isHovered;

        return (
          <motion.button
            key={category.id}
            type="button"
            disabled={loading}
            onClick={() => onSelect(category)}
            onMouseEnter={() => setHoveredId(category.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="absolute z-10 flex w-[7.5rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center focus:outline-none focus-visible:ring-1 focus-visible:ring-human/50 disabled:opacity-50 sm:w-[8.5rem]"
            style={{
              left: `${category.node.x}%`,
              top: `${category.node.y}%`,
            }}
            initial={{ opacity: 0, scale: 0.82, y: 8 }}
            animate={{
              opacity: 1,
              scale: isSelected ? 1.08 : isHovered ? 1.04 : 1,
              y: 0,
            }}
            whileTap={{ scale: isSelected ? 1.04 : 0.96 }}
            transition={{
              opacity: { duration: 0.5, delay: index * 0.07 },
              scale: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
              y: { duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] },
            }}
          >
            <span
              className="relative flex h-12 w-12 items-center justify-center rounded-full border text-lg transition-all duration-300 sm:h-14 sm:w-14 sm:text-xl"
              style={{
                borderColor: isActive
                  ? `${category.accent}99`
                  : "rgba(255,255,255,0.08)",
                backgroundColor: isActive
                  ? `${category.accent}14`
                  : "rgba(5,5,5,0.55)",
                boxShadow: isActive ? accentGlow(category.accent, 1) : "none",
              }}
            >
              <span className="relative z-10">{category.icon}</span>
              {isActive && (
                <motion.span
                  layoutId="category-node-pulse"
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: `${category.accent}18` }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                />
              )}
            </span>

            <span
              className="mt-2.5 font-mono text-[8px] uppercase tracking-[0.22em] sm:text-[9px]"
              style={{ color: isActive ? category.accent : "rgba(100,116,139,0.7)" }}
            >
              {category.pillar}
            </span>

            <span
              className={`mt-1 max-w-[8.5rem] font-display text-[11px] font-extrabold uppercase leading-tight tracking-wide sm:max-w-[9.5rem] sm:text-xs ${
                isActive ? "text-text-primary" : "text-text-muted"
              }`}
            >
              {category.name}
            </span>

            <span
              className={`mt-1.5 max-w-[9rem] text-[9px] leading-relaxed sm:max-w-[10rem] sm:text-[10px] ${
                isActive ? "text-text-muted" : "text-text-muted/45"
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
