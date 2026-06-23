"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useSpring, useTransform } from "framer-motion";

const HUMAN_COLOR = "#4ADE80";
const AI_COLOR = "#38BDF8";

const LIVE_FEED = [
  { winner: "human" as const, text: "Sarah defeated GPT-4" },
  { winner: "ai" as const, text: "Claude defeated Ravi" },
  { winner: "human" as const, text: "Mei defeated Gemini" },
  { winner: "ai" as const, text: "GPT-4o defeated Priya" },
  { winner: "human" as const, text: "Carlos defeated Claude" },
  { winner: "ai" as const, text: "Gemini defeated Yuki" },
  { winner: "human" as const, text: "James defeated GPT-4" },
  { winner: "ai" as const, text: "Claude defeated Arjun" },
];

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function EnergyPillar({ humanPercent }: { humanPercent: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boundaryRef = useRef(humanPercent);
  const targetBoundaryRef = useRef(humanPercent);
  const rafRef = useRef(0);
  const timeRef = useRef(0);

  useEffect(() => {
    targetBoundaryRef.current = humanPercent;
  }, [humanPercent]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      timeRef.current = now;

      boundaryRef.current +=
        (targetBoundaryRef.current - boundaryRef.current) * 0.04;

      const boundary = (boundaryRef.current / 100) * height;
      const t = now * 0.001;

      ctx.clearRect(0, 0, width, height);

      const pillarW = width * 0.55;
      const pillarX = (width - pillarW) / 2;

      ctx.fillStyle = "rgba(255,255,255,0.03)";
      ctx.fillRect(pillarX, 0, pillarW, height);

      const humanGrad = ctx.createLinearGradient(0, 0, 0, boundary);
      humanGrad.addColorStop(0, "rgba(74,222,128,0.55)");
      humanGrad.addColorStop(0.6, "rgba(74,222,128,0.2)");
      humanGrad.addColorStop(1, "rgba(74,222,128,0)");

      ctx.fillStyle = humanGrad;
      ctx.fillRect(pillarX, 0, pillarW, boundary);

      for (let i = 0; i < 6; i++) {
        const wave =
          Math.sin(t * 1.2 + i * 0.9) * 4 +
          Math.sin(t * 2.3 + i * 1.4) * 2;
        const y = (boundary / 6) * (i + 0.5) + wave;
        const alpha = 0.08 + Math.sin(t + i) * 0.04;
        ctx.beginPath();
        ctx.ellipse(
          width / 2,
          y,
          pillarW * 0.35,
          3 + Math.sin(t * 1.5 + i) * 1.5,
          0,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = `rgba(74,222,128,${alpha})`;
        ctx.fill();
      }

      const aiGrad = ctx.createLinearGradient(0, boundary, 0, height);
      aiGrad.addColorStop(0, "rgba(56,189,248,0)");
      aiGrad.addColorStop(0.4, "rgba(56,189,248,0.18)");
      aiGrad.addColorStop(1, "rgba(56,189,248,0.5)");

      ctx.fillStyle = aiGrad;
      ctx.fillRect(pillarX, boundary, pillarW, height - boundary);

      ctx.strokeStyle = "rgba(56,189,248,0.12)";
      ctx.lineWidth = 0.5;
      const gridStep = 10;
      for (let y = boundary; y < height; y += gridStep) {
        const offset = ((t * 40) % gridStep);
        ctx.beginPath();
        ctx.moveTo(pillarX, y + offset);
        ctx.lineTo(pillarX + pillarW, y + offset);
        ctx.stroke();
      }
      for (let x = pillarX; x <= pillarX + pillarW; x += gridStep) {
        ctx.beginPath();
        ctx.moveTo(x, boundary);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      const pulse = 0.35 + Math.sin(t * 3) * 0.15;
      const frontierGrad = ctx.createLinearGradient(
        pillarX,
        boundary - 12,
        pillarX,
        boundary + 12,
      );
      frontierGrad.addColorStop(0, "rgba(74,222,128,0)");
      frontierGrad.addColorStop(0.45, `rgba(255,255,255,${pulse * 0.25})`);
      frontierGrad.addColorStop(0.55, `rgba(56,189,248,${pulse * 0.2})`);
      frontierGrad.addColorStop(1, "rgba(56,189,248,0)");
      ctx.fillStyle = frontierGrad;
      ctx.fillRect(pillarX - 4, boundary - 14, pillarW + 8, 28);

      ctx.shadowBlur = 18;
      ctx.shadowColor = "rgba(74,222,128,0.4)";
      ctx.fillStyle = "rgba(74,222,128,0.6)";
      ctx.fillRect(pillarX, 0, pillarW, 2);

      ctx.shadowColor = "rgba(56,189,248,0.4)";
      ctx.fillStyle = "rgba(56,189,248,0.6)";
      ctx.fillRect(pillarX, height - 2, pillarW, 2);
      ctx.shadowBlur = 0;

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    timeRef.current = performance.now();
    rafRef.current = requestAnimationFrame(draw);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
      aria-hidden
    />
  );
}

function AnimatedScore({ value }: { value: number }) {
  const spring = useSpring(value, { stiffness: 60, damping: 18 });
  const rounded = useTransform(spring, (v) => Math.round(v));
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    spring.set(value);
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return unsub;
  }, [value, spring, rounded]);

  return <>{display}</>;
}

function LiveFeed() {
  const items = [...LIVE_FEED, ...LIVE_FEED];

  return (
    <div className="relative mt-6 h-16 w-full max-w-[220px] overflow-hidden mask-feed">
      <div className="live-feed-track flex flex-col gap-3">
        {items.map((item, i) => (
          <p
            key={`${item.text}-${i}`}
            className={`font-mono text-[10px] tracking-wide ${
              item.winner === "human" ? "text-human/80" : "text-[#38BDF8]/80"
            }`}
          >
            {item.winner === "human" ? "🧠" : "🤖"} {item.text}
          </p>
        ))}
      </div>
    </div>
  );
}

type TraitMetric = { label: string; value: number };

const TRAIT_METRICS: TraitMetric[] = [
  { label: "Creativity", value: 32 },
  { label: "Humor", value: 68 },
  { label: "Empathy", value: 91 },
  { label: "Intuition", value: 47 },
  { label: "Logic", value: -14 },
  { label: "Coding", value: -27 },
];

function jitterTrait(current: number, isNegative: boolean): number {
  const delta = Math.floor(Math.random() * 7) - 3;
  let next = current + delta;
  if (isNegative) {
    next = Math.min(-5, Math.max(-35, next));
  } else {
    next = Math.max(15, Math.min(95, next));
  }
  return next;
}

function TraitValue({ value }: { value: number }) {
  const spring = useSpring(value, { stiffness: 80, damping: 20 });
  const rounded = useTransform(spring, (v) => Math.round(v));
  const [display, setDisplay] = useState(value);
  const isPositive = value >= 0;

  useEffect(() => {
    spring.set(value);
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return unsub;
  }, [value, spring, rounded]);

  return (
    <span
      className={`font-mono text-[10px] tabular-nums ${
        isPositive ? "text-human/90" : "text-[#38BDF8]/90"
      }`}
    >
      {display >= 0 ? "+" : ""}
      {display}%
    </span>
  );
}

function EdgeTraits() {
  const [metrics, setMetrics] = useState(TRAIT_METRICS);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((m) => ({
          ...m,
          value: jitterTrait(m.value, m.value < 0),
        })),
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-8 w-full max-w-[220px]">
      <p className="mb-3 text-center font-mono text-[9px] uppercase tracking-[0.28em] text-text-muted">
        Human edge
      </p>
      <div className="space-y-1.5">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="flex items-center justify-between gap-3"
          >
            <span className="font-mono text-[10px] text-text-muted/80">
              {metric.label}
            </span>
            <TraitValue value={metric.value} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function HumanEdgePillar() {
  const [humanScore, setHumanScore] = useState(54);
  const aiScore = 100 - humanScore;

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const schedule = () => {
      const delay = randomBetween(5000, 8000);
      timeout = setTimeout(() => {
        setHumanScore((prev) => {
          const delta = Math.floor(randomBetween(-2, 2));
          return clamp(prev + delta, 51, 58);
        });
        schedule();
      }, delay);
    };

    schedule();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex min-h-[520px] w-full items-center justify-center lg:min-h-[620px]"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <Image
          src="/hero-hands.png"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-[0.22] sm:opacity-[0.28]"
          sizes="(max-width: 1024px) 100vw, 42vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,transparent_0%,#050505_68%)]" />
      </div>

      <div className="relative z-10 flex h-full min-h-[500px] w-full max-w-[240px] flex-col items-center px-2 py-6 lg:min-h-[580px]">
        <div className="text-center">
          <p
            className="font-mono text-[11px] uppercase tracking-[0.28em]"
            style={{ color: HUMAN_COLOR }}
          >
            Human
          </p>
          <p className="font-display text-5xl font-extrabold tabular-nums leading-none text-text-primary sm:text-6xl">
            <AnimatedScore value={humanScore} />%
          </p>
        </div>

        <div className="relative my-5 w-full flex-1 sm:my-6">
          <div
            className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2"
            style={{
              background:
                "linear-gradient(to bottom, rgba(74,222,128,0.15), rgba(255,255,255,0.08), rgba(56,189,248,0.15))",
            }}
          />
          <EnergyPillar humanPercent={humanScore} />
        </div>

        <div className="text-center">
          <p
            className="font-mono text-[11px] uppercase tracking-[0.28em]"
            style={{ color: AI_COLOR }}
          >
            AI
          </p>
          <p className="font-display text-5xl font-extrabold tabular-nums leading-none text-text-primary sm:text-6xl">
            <AnimatedScore value={aiScore} />%
          </p>
        </div>

        <LiveFeed />
        <EdgeTraits />
      </div>
    </motion.div>
  );
}
