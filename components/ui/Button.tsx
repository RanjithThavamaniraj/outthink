"use client";

import { type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "ghost" | "human";

type ButtonProps = Omit<HTMLMotionProps<"button">, "children"> & {
  children: ReactNode;
  variant?: ButtonVariant;
  href?: string;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-human text-background font-semibold hover:bg-[#22C55E] shadow-[0_0_40px_-8px_rgba(74,222,128,0.4)]",
  secondary:
    "border border-ai bg-transparent text-ai hover:bg-ai/8",
  ghost: "bg-transparent text-text-primary hover:bg-white/8",
  human:
    "border border-human/30 bg-human/15 text-human hover:bg-human/25",
};

export function Button({
  children,
  variant = "primary",
  className = "",
  href,
  ...props
}: ButtonProps) {
  const classes = `micro-button-glow inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors ${variants[variant]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      className={classes}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
