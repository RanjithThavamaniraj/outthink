"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

export function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-8 left-0 right-0 z-50 border-b border-border bg-background"
    >
      <Container>
        <div className="flex h-16 items-center sm:h-20">
          <a
            href="#hero-section"
            className="font-display text-xl font-bold tracking-tight text-text-primary sm:text-2xl"
          >
            OUT<span className="text-human">THINK</span>
          </a>
        </div>
      </Container>
    </motion.header>
  );
}
