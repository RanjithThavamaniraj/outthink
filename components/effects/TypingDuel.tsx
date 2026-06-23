"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { typingPairs } from "@/lib/typing-pairs";

function sleep(ms: number, cancelled: () => boolean) {
  return new Promise<void>((resolve) => {
    const id = setTimeout(() => {
      if (!cancelled()) resolve();
    }, ms);
  });
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

async function typeHuman(
  text: string,
  onUpdate: (val: string) => void,
  cancelled: () => boolean,
) {
  let typed = "";
  let typoDone = false;
  const typoAt = Math.floor(text.length * randomBetween(0.3, 0.7));

  for (let i = 0; i < text.length; i++) {
    if (cancelled()) return;

    if (!typoDone && i === typoAt && text.length > 8) {
      typoDone = true;
      const deleteCount = Math.random() > 0.5 ? 2 : 1;
      typed = text.slice(0, Math.max(0, typed.length - deleteCount));
      onUpdate(typed);
      await sleep(randomBetween(120, 200), cancelled);
      if (cancelled()) return;
      if (Math.random() > 0.5) await sleep(400, cancelled);
    }

    typed += text[i];
    onUpdate(typed);

    let delay = randomBetween(80, 200);
    if (Math.random() < 0.08) delay += 400;
    await sleep(delay, cancelled);
  }
}

async function typeAI(
  text: string,
  onUpdate: (val: string) => void,
  cancelled: () => boolean,
) {
  let typed = "";
  for (let i = 0; i < text.length; i++) {
    if (cancelled()) return;
    typed += text[i];
    onUpdate(typed);
    await sleep(randomBetween(22, 28), cancelled);
  }
}

function BlinkingCursor({ variant }: { variant: "human" | "ai" }) {
  if (variant === "ai") {
    return (
      <span className="inline-block w-[6px] animate-[underscore-blink_2s_step-end_infinite] border-b border-ai align-baseline" />
    );
  }
  return (
    <span className="ml-px inline-block h-[1em] w-[2px] animate-pulse bg-human align-middle" />
  );
}

export function TypingDuel({
  className = "",
  bare = false,
}: {
  className?: string;
  bare?: boolean;
}) {
  const [pairIndex, setPairIndex] = useState(0);
  const [prompt, setPrompt] = useState<string>(typingPairs[0].prompt);
  const [humanText, setHumanText] = useState("");
  const [aiText, setAiText] = useState("");
  const [visible, setVisible] = useState(true);
  const cancelledRef = useRef(false);

  useEffect(() => {
    cancelledRef.current = false;
    let pairIdx = 0;

    const cancelled = () => cancelledRef.current;

    const runLoop = async () => {
      while (!cancelled()) {
        const currentPair = typingPairs[pairIdx];
        setPairIndex(pairIdx);
        setPrompt(currentPair.prompt);
        setVisible(true);
        setHumanText("");
        setAiText("");

        await Promise.all([
          typeHuman(currentPair.human, setHumanText, cancelled),
          typeAI(currentPair.ai, setAiText, cancelled),
        ]);

        if (cancelled()) return;

        await sleep(1500, cancelled);
        if (cancelled()) return;

        setVisible(false);
        await sleep(400, cancelled);
        if (cancelled()) return;

        pairIdx = (pairIdx + 1) % typingPairs.length;
      }
    };

    runLoop();

    return () => {
      cancelledRef.current = true;
    };
  }, []);

  return (
    <div
      className={
        bare
          ? `text-left ${className}`
          : `rounded-xl border border-border bg-[rgba(255,255,255,0.02)] p-6 text-left ${className}`
      }
      aria-live="polite"
      aria-label="Live typing duel between human and AI"
    >
      <p
        className={`mb-4 text-center font-mono uppercase tracking-widest ${
          bare
            ? "text-[10px] text-text-muted/55"
            : "text-[11px] text-text-muted"
        }`}
      >
        {prompt}
      </p>

      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={pairIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className={
              bare
                ? "grid grid-cols-2 gap-10 sm:gap-16"
                : "grid grid-cols-[1fr_1px_1fr] gap-0"
            }
          >
            <div className={bare ? "" : "pr-4 sm:pr-6"}>
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-human">
                Human
              </p>
              <p className="min-h-[4.5rem] font-mono text-sm leading-relaxed text-human sm:text-[13px]">
                {humanText}
                <BlinkingCursor variant="human" />
              </p>
            </div>

            {!bare && <div className="typing-duel-divider w-px" />}

            <div className={bare ? "" : "pl-4 sm:pl-6"}>
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-ai">
                AI
              </p>
              <p className="min-h-[4.5rem] font-mono text-sm leading-relaxed text-ai sm:text-[13px]">
                {aiText}
                <BlinkingCursor variant="ai" />
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
