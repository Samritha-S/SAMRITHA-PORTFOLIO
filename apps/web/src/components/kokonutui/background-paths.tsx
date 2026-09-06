"use client";

/**
 * @author: @dorianbaffier
 * @description: Background Paths
 * @version: 1.1.0 (recolored to Samritha portfolio palette, added children slot)
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { motion } from "motion/react";
import { memo, useMemo, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Point {
  x: number;
  y: number;
}

interface PathData {
  id: string;
  d: string;
  opacity: number;
  width: number;
  duration: number;
  delay: number;
}

// Path generation function
function generateAestheticPath(
  index: number,
  position: number,
  type: "primary" | "secondary" | "accent"
): string {
  const baseAmplitude =
    type === "primary" ? 150 : type === "secondary" ? 100 : 60;
  const phase = index * 0.2;
  const points: Point[] = [];
  const segments = type === "primary" ? 10 : type === "secondary" ? 8 : 6;

  const startX = 2400;
  const startY = 800;
  const endX = -2400;
  const endY = -800 + index * 25;

  for (let i = 0; i <= segments; i++) {
    const progress = i / segments;
    const eased = 1 - (1 - progress) ** 2;

    const baseX = startX + (endX - startX) * eased;
    const baseY = startY + (endY - startY) * eased;

    const amplitudeFactor = 1 - eased * 0.3;
    const wave1 =
      Math.sin(progress * Math.PI * 3 + phase) *
      (baseAmplitude * 0.7 * amplitudeFactor);
    const wave2 =
      Math.cos(progress * Math.PI * 4 + phase) *
      (baseAmplitude * 0.3 * amplitudeFactor);
    const wave3 =
      Math.sin(progress * Math.PI * 2 + phase) *
      (baseAmplitude * 0.2 * amplitudeFactor);

    points.push({
      x: baseX * position,
      y: baseY + wave1 + wave2 + wave3,
    });
  }

  const pathCommands = points.map((point: Point, i: number) => {
    if (i === 0) return `M ${point.x} ${point.y}`;
    const prevPoint = points[i - 1];
    const tension = 0.4;
    const cp1x = prevPoint.x + (point.x - prevPoint.x) * tension;
    const cp1y = prevPoint.y;
    const cp2x = prevPoint.x + (point.x - prevPoint.x) * (1 - tension);
    const cp2y = point.y;
    return `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${point.x} ${point.y}`;
  });

  return pathCommands.join(" ");
}

const generateUniqueId = (prefix: string): string =>
  `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

// Memoized FloatingPaths component
const FloatingPaths = memo(function FloatingPaths({
  position,
}: {
  position: number;
}) {
  const primaryPaths: PathData[] = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: generateUniqueId("primary"),
        d: generateAestheticPath(i, position, "primary"),
        opacity: 0.08 + i * 0.01,
        width: 3.5 + i * 0.25,
        duration: 25,
        delay: 0,
      })),
    [position]
  );

  const secondaryPaths: PathData[] = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        id: generateUniqueId("secondary"),
        d: generateAestheticPath(i, position, "secondary"),
        opacity: 0.06 + i * 0.008,
        width: 2.5 + i * 0.2,
        duration: 20,
        delay: 0,
      })),
    [position]
  );

  const accentPaths: PathData[] = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: generateUniqueId("accent"),
        d: generateAestheticPath(i, position, "accent"),
        opacity: 0.04 + i * 0.006,
        width: 1.8 + i * 0.15,
        duration: 15,
        delay: 0,
      })),
    [position]
  );

  const sharedAnimationProps = {
    opacity: 1,
    scale: 1,
  };
  const sharedTransition = {
    opacity: { duration: 1 },
    scale: { duration: 1 },
  };

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="h-full w-full"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        viewBox="-2400 -800 4800 1600"
        style={{ willChange: "transform", transform: "translateZ(0)" }}
      >
        <title>Background Paths</title>
        <defs>
          {/* Mystic Amethyst Refined Waves on Deep Plum:
              Amethyst / Orchid (#8B5FBF) → Champagne Gold (#D4AF7A) → Dusty Rose (#C98FA0) */}
          <linearGradient id="portfolioGradient" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(139, 95, 191, 0.35)" />     {/* Amethyst #8B5FBF */}
            <stop offset="50%" stopColor="rgba(212, 175, 122, 0.35)" />   {/* Champagne Gold #D4AF7A */}
            <stop offset="100%" stopColor="rgba(201, 143, 160, 0.3)" />   {/* Dusty Rose #C98FA0 */}
          </linearGradient>
        </defs>

        <g className="primary-waves">
          {primaryPaths.map((path) => (
            <motion.path
              animate={{
                ...sharedAnimationProps,
                y: [0, -15, 0],
              }}
              d={path.d}
              initial={{ opacity: 0, scale: 0.8 }}
              key={path.id}
              stroke="url(#portfolioGradient)"
              strokeLinecap="round"
              strokeWidth={path.width}
              style={{ opacity: path.opacity }}
              transition={{
                ...sharedTransition,
                y: {
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  repeatType: "reverse",
                },
              }}
            />
          ))}
        </g>

        <g className="secondary-waves" style={{ opacity: 0.45 }}>
          {secondaryPaths.map((path) => (
            <motion.path
              animate={{
                ...sharedAnimationProps,
                y: [0, -10, 0],
              }}
              d={path.d}
              initial={{ opacity: 0, scale: 0.9 }}
              key={path.id}
              stroke="url(#portfolioGradient)"
              strokeLinecap="round"
              strokeWidth={path.width}
              style={{ opacity: path.opacity }}
              transition={{
                ...sharedTransition,
                y: {
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  repeatType: "reverse",
                },
              }}
            />
          ))}
        </g>

        <g className="accent-waves" style={{ opacity: 0.3 }}>
          {accentPaths.map((path) => (
            <motion.path
              animate={{
                ...sharedAnimationProps,
                y: [0, -5, 0],
              }}
              d={path.d}
              initial={{ opacity: 0, scale: 0.95 }}
              key={path.id}
              stroke="url(#portfolioGradient)"
              strokeLinecap="round"
              strokeWidth={path.width}
              style={{ opacity: path.opacity }}
              transition={{
                ...sharedTransition,
                y: {
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  repeatType: "reverse",
                },
              }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
});

export interface BackgroundPathsProps {
  /** Fallback simple title, used only if `children` isn't provided. */
  title?: string;
  /** Full hero content (badge, headline, subcopy, CTAs) — pass your real
   *  "Hi, I'm Samritha." hero JSX here instead of relying on `title`. */
  children?: ReactNode;
  className?: string;
}

export default memo(function BackgroundPaths({
  title = "Background Paths",
  children,
  className,
}: BackgroundPathsProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[var(--bg-base)]",
        className
      )}
    >
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center md:px-6">
        <motion.div
          animate={{ opacity: 1 }}
          className="mx-auto max-w-4xl"
          initial={{ opacity: 0 }}
          transition={{ duration: 2 }}
        >
          {children ?? (
            <motion.h1
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-primary)]/70 bg-clip-text font-bold text-3xl text-transparent tracking-tighter sm:text-5xl md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 1.2, ease: [0.2, 0.65, 0.3, 0.9] }}
            >
              {title}
            </motion.h1>
          )}
        </motion.div>
      </div>
    </div>
  );
});
