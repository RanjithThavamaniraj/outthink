"use client";

import { useEffect, useRef } from "react";
import type { ChallengeCategory } from "@/lib/types/challenge";

type NeuralNodeCanvasProps = {
  categories: ChallengeCategory[];
  selectedId: string | null;
  hoveredId: string | null;
};

type Point = { x: number; y: number };

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const normalized = hex.replace("#", "");
  const value =
    normalized.length === 3
      ? normalized
          .split("")
          .map((c) => c + c)
          .join("")
      : normalized;
  const num = Number.parseInt(value, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function nodeCenter(cat: ChallengeCategory, w: number, h: number): Point {
  return { x: (cat.node.x / 100) * w, y: (cat.node.y / 100) * h };
}

export function NeuralNodeCanvas({
  categories,
  selectedId,
  hoveredId,
}: NeuralNodeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const w = rect.width;
      const h = rect.height;
      const centers = categories.map((c) => nodeCenter(c, w, h));
      const hub: Point = { x: w / 2, y: h / 2 };

      ctx.clearRect(0, 0, w, h);

      const drawLine = (
        from: Point,
        to: Point,
        alpha: number,
        accentHex?: string,
      ) => {
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        const grad = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
        if (accentHex) {
          const { r, g, b } = hexToRgb(accentHex);
          grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`);
          grad.addColorStop(0.5, `rgba(245, 245, 245, ${alpha * 0.3})`);
          grad.addColorStop(1, `rgba(96, 165, 250, ${alpha * 0.85})`);
        } else {
          grad.addColorStop(0, `rgba(74, 222, 128, ${alpha})`);
          grad.addColorStop(0.5, `rgba(245, 245, 245, ${alpha * 0.35})`);
          grad.addColorStop(1, `rgba(96, 165, 250, ${alpha})`);
        }
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.stroke();
      };

      centers.forEach((center, i) => {
        const cat = categories[i];
        const isActive =
          selectedId === cat.id || hoveredId === cat.id;

        centers.forEach((other, j) => {
          if (j <= i) return;
          const otherCat = categories[j];
          const linked =
            selectedId === cat.id ||
            selectedId === otherCat.id ||
            hoveredId === cat.id ||
            hoveredId === otherCat.id;
          const accent =
            hoveredId === cat.id || selectedId === cat.id
              ? cat.accent
              : hoveredId === otherCat.id || selectedId === otherCat.id
                ? otherCat.accent
                : undefined;
          drawLine(center, other, linked ? 0.24 : 0.06, accent);
        });

        drawLine(
          hub,
          center,
          isActive ? 0.32 : 0.09,
          isActive ? cat.accent : undefined,
        );
      });

      centers.forEach((center, i) => {
        const cat = categories[i];
        const active =
          selectedId === cat.id || hoveredId === cat.id;
        const { r, g, b } = hexToRgb(cat.accent);

        ctx.beginPath();
        ctx.arc(center.x, center.y, active ? 3.5 : 2, 0, Math.PI * 2);
        ctx.fillStyle = active
          ? `rgba(${r}, ${g}, ${b}, 0.9)`
          : `rgba(${r}, ${g}, ${b}, 0.35)`;
        ctx.fill();

        if (active) {
          ctx.beginPath();
          ctx.arc(center.x, center.y, 8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.12)`;
          ctx.fill();
        }
      });

      ctx.beginPath();
      ctx.arc(hub.x, hub.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(245, 245, 245, 0.35)";
      ctx.fill();
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [categories, selectedId, hoveredId]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
