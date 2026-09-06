"use client";

/**
 * @name: ConstellationField
 * @description: Drifting gold nodes on a dark background that draw a thin line
 *   between any two nodes within connection range — a slow, quiet constellation
 *   effect for empty/negative space on the Filtered (technical) view.
 * @version: 1.0.0 — custom-built for the Samritha portfolio.
 */

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export interface ConstellationFieldProps {
  className?: string;
  /** Background fill. Defaults to Blue Noir for the Filtered view. */
  backgroundColor?: string;
  /** Node + line color. Defaults to antique gold. */
  nodeColor?: string;
  /** Roughly one node per this many px² — lower = denser. */
  density?: number;
  /** Max distance (px) at which two nodes draw a connecting line. */
  connectionDistance?: number;
  /** Drift speed in px/frame. Keep this low — this effect should read as still, not busy. */
  speed?: number;
}

export default function ConstellationField({
  className,
  backgroundColor = "#011627", // Blue Noir
  nodeColor = "201, 162, 75", // antique gold, as an "r, g, b" triplet for rgba() use
  density = 9000,
  connectionDistance = 140,
  speed = 0.12,
}: ConstellationFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio ?? 1;
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let animId = 0;

    const spawnNode = (): Node => ({
      x: Math.random() * (width || window.innerWidth),
      y: Math.random() * (height || window.innerHeight),
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
    });

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = rect?.width ?? window.innerWidth;
      height = rect?.height ?? window.innerHeight;
      if (width === 0 || height === 0) return;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      if (ctx.resetTransform) {
        ctx.resetTransform();
      } else {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      }
      ctx.scale(dpr, dpr);

      const count = Math.max(12, Math.floor((width * height) / density));
      nodes = Array.from({ length: count }, spawnNode);
    };

    let isVisible = true;

    const render = () => {
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);

      // Drift + wrap
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0) n.x = width;
        else if (n.x > width) n.x = 0;
        if (n.y < 0) n.y = height;
        else if (n.y > height) n.y = 0;
      }

      // Connections — drawn first so nodes sit on top
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.35;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(${nodeColor}, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Nodes — soft glow via double-draw (faint halo + solid core)
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${nodeColor}, 0.12)`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${nodeColor}, 0.55)`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry?.isIntersecting ?? true;
        if (isVisible && !wasVisible) {
          cancelAnimationFrame(animId);
          animId = requestAnimationFrame(render);
        } else if (!isVisible && wasVisible) {
          cancelAnimationFrame(animId);
        }
      },
      { threshold: 0.02 }
    );

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
      observer.observe(canvas.parentElement);
    }
    render();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      observer.disconnect();
    };
  }, [nodeColor, density, connectionDistance, speed]);

  return (
    <div
      className={cn("relative h-full w-full overflow-hidden", className)}
      style={{
        backgroundColor:
          backgroundColor === "transparent" ? undefined : backgroundColor,
      }}
    >
      <canvas aria-hidden="true" className="absolute inset-0 pointer-events-none" ref={canvasRef} />
    </div>
  );
}
