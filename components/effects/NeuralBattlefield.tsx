"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  phase: number;
  gridCol?: number;
  gridRow?: number;
};

type Connection = {
  from: number;
  to: number;
  life: number;
  maxLife: number;
};

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function NeuralBattlefield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frontierRef = useRef(0.5);
  const targetFrontierRef = useRef(0.5);
  const nextShiftRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let humanNodes: Node[] = [];
    let aiNodes: Node[] = [];
    let humanConnections: Connection[] = [];
    let aiConnections: Connection[] = [];
    let raf = 0;
    let lastTime = performance.now();

    const initNodes = () => {
      humanNodes = Array.from({ length: 10 }, () => ({
        x: randomBetween(width * 0.05, width * 0.42),
        y: randomBetween(height * 0.1, height * 0.9),
        vx: randomBetween(-0.3, 0.3),
        vy: randomBetween(-0.25, 0.25),
        radius: randomBetween(2, 4),
        color: "#4ADE80",
        phase: randomBetween(0, Math.PI * 2),
      }));

      aiNodes = Array.from({ length: 12 }, (_, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        return {
          x: width * 0.58 + col * (width * 0.09),
          y: height * 0.2 + row * (height * 0.22),
          vx: 0,
          vy: 0,
          radius: 2.5,
          color: "#60A5FA",
          phase: 0,
          gridCol: col,
          gridRow: row,
        };
      });
    };

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = rect?.width ?? window.innerWidth;
      height = rect?.height ?? window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (humanNodes.length === 0) initNodes();
    };

    const maybeAddConnection = (
      nodes: Node[],
      connections: Connection[],
      maxDist: number,
    ) => {
      if (connections.length > 6) return;
      if (Math.random() > 0.02) return;
      const from = Math.floor(Math.random() * nodes.length);
      const to = Math.floor(Math.random() * nodes.length);
      if (from === to) return;
      const a = nodes[from];
      const b = nodes[to];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist < maxDist) {
        connections.push({ from, to, life: 0, maxLife: randomBetween(80, 160) });
      }
    };

    const draw = (now: number) => {
      const dt = Math.min((now - lastTime) / 16.67, 2);
      lastTime = now;

      if (now > nextShiftRef.current) {
        targetFrontierRef.current = randomBetween(0.44, 0.56);
        nextShiftRef.current = now + randomBetween(6000, 8000);
      }
      frontierRef.current +=
        (targetFrontierRef.current - frontierRef.current) * 0.02;

      const frontierX = width * frontierRef.current;

      ctx.clearRect(0, 0, width, height);

      for (const node of humanNodes) {
        node.phase += 0.01 * dt;
        node.x += node.vx * dt + Math.sin(node.phase) * 0.15;
        node.y += node.vy * dt + Math.cos(node.phase * 0.7) * 0.12;
        if (node.x < width * 0.02 || node.x > frontierX - 20) node.vx *= -1;
        if (node.y < height * 0.05 || node.y > height * 0.95) node.vy *= -1;
      }

      for (const node of aiNodes) {
        const baseX = width * 0.58 + (node.gridCol ?? 0) * (width * 0.09);
        const baseY = height * 0.2 + (node.gridRow ?? 0) * (height * 0.22);
        const t = now * 0.001;
        node.x = baseX + Math.sin(t + (node.gridCol ?? 0)) * 6;
        node.y = baseY + Math.cos(t * 0.8 + (node.gridRow ?? 0)) * 5;
      }

      maybeAddConnection(humanNodes, humanConnections, width * 0.25);
      maybeAddConnection(aiNodes, aiConnections, width * 0.2);

      const drawConnections = (
        nodes: Node[],
        connections: Connection[],
        color: string,
        precise: boolean,
      ) => {
        for (let i = connections.length - 1; i >= 0; i--) {
          const c = connections[i];
          c.life += dt;
          if (c.life > c.maxLife) {
            connections.splice(i, 1);
            continue;
          }
          const alpha = precise
            ? 0.15 * (1 - c.life / c.maxLife)
            : 0.12 * (1 - c.life / c.maxLife);
          const a = nodes[c.from];
          const b = nodes[c.to];
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          if (precise) {
            ctx.lineTo(b.x, b.y);
          } else {
            const mx = (a.x + b.x) / 2 + Math.sin(c.life * 0.1) * 8;
            const my = (a.y + b.y) / 2 + Math.cos(c.life * 0.08) * 8;
            ctx.quadraticCurveTo(mx, my, b.x, b.y);
          }
          ctx.strokeStyle = color.replace("ALPHA", String(alpha));
          ctx.lineWidth = precise ? 0.8 : 0.6;
          ctx.stroke();
        }
      };

      drawConnections(
        humanNodes,
        humanConnections,
        "rgba(74, 222, 128, ALPHA)",
        false,
      );
      drawConnections(
        aiNodes,
        aiConnections,
        "rgba(96, 165, 250, ALPHA)",
        true,
      );

      for (const node of humanNodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color + "66";
        ctx.fill();
      }

      for (const node of aiNodes) {
        ctx.beginPath();
        ctx.rect(
          node.x - node.radius,
          node.y - node.radius,
          node.radius * 2,
          node.radius * 2,
        );
        ctx.fillStyle = node.color + "55";
        ctx.fill();
      }

      const gradient = ctx.createLinearGradient(
        frontierX - 30,
        0,
        frontierX + 30,
        0,
      );
      gradient.addColorStop(0, "rgba(74, 222, 128, 0)");
      gradient.addColorStop(0.5, "rgba(74, 222, 128, 0.08)");
      gradient.addColorStop(1, "rgba(96, 165, 250, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(frontierX - 30, 0, 60, height);

      ctx.beginPath();
      ctx.moveTo(frontierX, height * 0.08);
      ctx.lineTo(frontierX, height * 0.92);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
      ctx.lineWidth = 1;
      ctx.stroke();

      raf = requestAnimationFrame(draw);
    };

    resize();
    nextShiftRef.current = performance.now() + randomBetween(6000, 8000);
    raf = requestAnimationFrame(draw);

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
      aria-hidden
    />
  );
}
