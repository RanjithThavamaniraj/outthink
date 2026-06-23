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
      className={`fixed top-8 left-0 right-0 z-50 border-b border-border bg-background transition-all duration-300`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between sm:h-20">
          <a
            href="#"
            className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            OUT<span className="text-human">THINK</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-text-primary transition-colors hover:text-human"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#hero-section"
            className="rounded-full bg-human px-4 py-2 text-sm font-semibold text-background transition-colors hover:bg-[#22C55E] sm:px-5 sm:py-2.5"
          >
            Start Challenge
          </a>
        </div>
      </Container>
    </motion.header>
  );
}
