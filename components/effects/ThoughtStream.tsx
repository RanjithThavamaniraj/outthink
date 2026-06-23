"use client";

import { useEffect, useRef } from "react";

const HUMAN_WORDS = [
  "intuition", "empathy", "creativity", "wonder", "doubt",
  "instinct", "curiosity", "emotion", "imagination", "memory",
  "humor", "ethics", "dream", "love", "fear",
];

const AI_WORDS = [
  "compute", "predict", "optimize", "pattern", "classify",
  "tokenize", "inference", "gradient", "latency", "vector",
  "embedding", "neural", "weights", "query", "sigmoid",
];

type Word = {
  text: string;
  x: number;
  y: number;
  speed: number;
  opacity: number;
  column: "human" | "ai";
};

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function pickWord(pool: string[]) {
  return pool[Math.floor(Math.random() * pool.length)];
}

export function ThoughtStream() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wordsRef = useRef<Word[]>([]);
  const rafRef = useRef<number>(0);
  const scrollMultiplierRef = useRef(1);
  const heroMultiplierRef = useRef(1);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const initWords = () => {
      const words: Word[] = [];
      for (let i = 0; i < 15; i++) {
        words.push({
          text: pickWord(HUMAN_WORDS),
          x: randomBetween(0.05, 0.45) * width,
          y: randomBetween(0, height),
          speed: height / randomBetween(18, 25),
          opacity: randomBetween(0.025, 0.06),
          column: "human",
        });
      }
      for (let i = 0; i < 15; i++) {
        words.push({
          text: pickWord(AI_WORDS),
          x: randomBetween(0.55, 0.95) * width,
          y: randomBetween(0, height),
          speed: height / randomBetween(18, 25),
          opacity: randomBetween(0.025, 0.06),
          column: "ai",
        });
      }
      wordsRef.current = words;
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (wordsRef.current.length === 0) initWords();
    };

    const onScroll = () => {
      scrollMultiplierRef.current = 1.3;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        scrollMultiplierRef.current = 1;
      }, 150);
    };

    const hero = document.getElementById("hero-section");
    const onHeroEnter = () => { heroMultiplierRef.current = 0.4; };
    const onHeroLeave = () => { heroMultiplierRef.current = 1; };

    let lastTime = performance.now();

    const draw = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      const multiplier =
        scrollMultiplierRef.current * heroMultiplierRef.current;

      ctx.clearRect(0, 0, width, height);

      for (const word of wordsRef.current) {
        word.y -= word.speed * multiplier * dt;

        if (word.y < -20) {
          word.y = height + 20;
          word.text =
            word.column === "human"
              ? pickWord(HUMAN_WORDS)
              : pickWord(AI_WORDS);
          word.x =
            word.column === "human"
              ? randomBetween(0.05, 0.45) * width
              : randomBetween(0.55, 0.95) * width;
          word.speed = height / randomBetween(18, 25);
          word.opacity = randomBetween(0.025, 0.06);
        }

        ctx.font = "11px ui-monospace, monospace";
        ctx.letterSpacing = "0.08em";
        ctx.fillStyle =
          word.column === "human"
            ? `rgba(74, 222, 128, 0.04)`
            : `rgba(96, 165, 250, 0.04)`;
        ctx.fillText(word.text, word.x, word.y);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    rafRef.current = requestAnimationFrame(draw);

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    hero?.addEventListener("mouseenter", onHeroEnter);
    hero?.addEventListener("mouseleave", onHeroLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      hero?.removeEventListener("mouseenter", onHeroEnter);
      hero?.removeEventListener("mouseleave", onHeroLeave);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden
    />
  );
}
