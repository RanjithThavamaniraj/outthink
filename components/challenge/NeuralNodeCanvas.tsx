"use client";

import { useEffect, useRef } from "react";
import type { ChallengeCategory } from "@/lib/types/challenge";

type NeuralNodeCanvasProps = {
  categories: ChallengeCategory[];
  selectedId: string | null;
  hoveredId: string | null;
};

type Point = { x: number; y: number };

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

      const drawLine = (from: Point, to: Point, alpha: number) => {
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        const grad = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
        grad.addColorStop(0, `rgba(74, 222, 128, ${alpha})`);
        grad.addColorStop(0.5, `rgba(245, 245, 245, ${alpha * 0.35})`);
        grad.addColorStop(1, `rgba(96, 165, 250, ${alpha})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.stroke();
      };

      centers.forEach((center, i) => {
        centers.forEach((other, j) => {
          if (j <= i) return;
          const linked =
            selectedId === categories[i].id ||
            selectedId === categories[j].id ||
            hoveredId === categories[i].id ||
            hoveredId === categories[j].id;
          drawLine(center, other, linked ? 0.22 : 0.07);
        });
        drawLine(hub, center, selectedId === categories[i].id ? 0.28 : 0.1);
      });

      centers.forEach((center, i) => {
        const active =
          selectedId === categories[i].id || hoveredId === categories[i].id;
        ctx.beginPath();
        ctx.arc(center.x, center.y, active ? 3 : 2, 0, Math.PI * 2);
        ctx.fillStyle = active
          ? "rgba(245, 245, 245, 0.7)"
          : "rgba(245, 245, 245, 0.25)";
        ctx.fill();
      });
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
