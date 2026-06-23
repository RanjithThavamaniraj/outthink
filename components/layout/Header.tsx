"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";

const navLinks = [
  { label: "Challenge", href: "#challenge" },
  { label: "Leaderboard", href: "#leaderboard" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

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

          <nav className="hidden items-center gap-8 md:flex">
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

          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="#challenge"
              className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted transition-colors hover:text-human sm:inline"
            >
              Enter challenge
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span
                className={`h-px w-5 bg-text-primary transition-transform ${
                  menuOpen ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-5 bg-text-primary transition-opacity ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-px w-5 bg-text-primary transition-transform ${
                  menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </Container>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border bg-background md:hidden"
          >
            <Container>
              <nav className="flex flex-col gap-1 py-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-text-primary transition-colors hover:text-human"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#challenge"
                  onClick={() => setMenuOpen(false)}
                  className="py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-human"
                >
                  Enter challenge →
                </a>
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
