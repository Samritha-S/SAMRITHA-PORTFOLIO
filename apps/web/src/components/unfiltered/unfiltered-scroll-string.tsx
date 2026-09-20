"use client";

import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function UnfilteredScrollStringWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Raw motion value — 0 to 1 progress through the container
  const rawProgress = useMotionValue(0.02);

  // Smooth responsive spring: stays ahead of the user scroll
  const pathLength = useSpring(rawProgress, {
    stiffness: 400,
    damping: 40,
    mass: 0.2,
    restDelta: 0.0002,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateProgress = () => {
      const rect = container.getBoundingClientRect();
      const containerHeight = rect.height;
      if (!containerHeight) return;

      const vpH = window.innerHeight;
      // Distance scrolled into the container relative to visible screen
      const scrolled = vpH - rect.top;
      // Progress from 0 (at entry) to 1 (when scrolled through to the bottom)
      // Provide a tiny 0.02 initial minimum so the start of the ribbon at top is visible when entering About
      const progress = Math.min(1, Math.max(0.02, scrolled / (containerHeight - vpH * 0.2)));
      rawProgress.set(progress);
    };

    // Calculate immediately on mount
    updateProgress();

    // Listen to both native scroll and Lenis RAF-driven scroll
    window.addEventListener("scroll", updateProgress, { passive: true });
    let rafId: number;
    const rafLoop = () => {
      updateProgress();
      rafId = requestAnimationFrame(rafLoop);
    };
    rafId = requestAnimationFrame(rafLoop);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      cancelAnimationFrame(rafId);
    };
  }, [rawProgress]);

  const ribbonPath = `
    M 70 0
    C 55 350, 90 750, 75 1100
    C 65 1350, 440 1700, 500 2000
    C 540 2200, 580 2400, 500 2600
    C 420 2800, 420 3000, 500 3200
    C 580 3400, 580 3600, 500 3800
    C 420 4000, 420 4200, 500 4400
    C 580 4600, 580 4800, 500 5000
    C 420 5200, 420 5400, 500 5600
    C 580 5800, 580 6000, 500 6200
    C 420 6400, 420 6600, 500 6800
    C 580 7000, 580 7200, 500 7400
    C 420 7600, 470 7850, 500 8000
  `;

  return (
    <div ref={containerRef} className="relative w-full unfiltered-scroll-container">
      {/* Sleek gold calligraphy ribbon: margin guide in About, gliding smoothly into center */}
      <div className="pointer-events-none absolute inset-0 w-full h-full z-0 overflow-hidden">
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 8000"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Layer 1: Soft luminous ambient glow */}
          <motion.path
            d={ribbonPath}
            stroke="#D4AF7A"
            strokeWidth={5.5}
            strokeOpacity={0.25}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ pathLength }}
          />

          {/* Layer 2: Rich satin gold body */}
          <motion.path
            d={ribbonPath}
            stroke="#D4AF7A"
            strokeWidth={2.4}
            strokeOpacity={0.9}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ pathLength }}
          />

          {/* Layer 3: Sleek champagne core gleam */}
          <motion.path
            d={ribbonPath}
            stroke="#FFF2D6"
            strokeWidth={0.8}
            strokeOpacity={0.95}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ pathLength }}
          />
        </svg>
      </div>

      {/* Page sections with transparent backgrounds so ribbon at z-0 is visible underneath */}
      <div className="relative z-10 [&_section]:!bg-transparent">{children}</div>
    </div>
  );
}
