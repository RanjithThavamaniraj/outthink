"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const navLinks = [{ label: "Leaderboard", href: "#leaderboard" }];

export function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-8 left-0 right-0 z-50 border-b border-border bg-background"
    >
      <Container>
        <div className="flex h-16 items-center justify-between sm:h-20">
          <a
            href="#hero-section"
            className="font-display text-xl font-bold tracking-tight text-text-primary sm:text-2xl"
          >
            OUT<span className="text-human">THINK</span>
          </a>

          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-primary transition-colors hover:text-human"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </Container>
    </motion.header>
  );
}
