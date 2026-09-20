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
    M 75 40
    C 60 100, 115 150, 115 210
    C 115 265, 50 275, 50 220
    C 50 170, 95 180, 80 290
    C 65 400, 65 500, 110 580
    C 115 645, 50 655, 50 600
    C 50 550, 95 565, 80 690
    C 65 800, 75 920, 110 1000
    C 115 1065, 50 1075, 50 1020
    C 50 970, 95 985, 80 1120
    C 70 1260, 200 1520, 500 1750
    C 580 1900, 580 2050, 500 2200
    C 420 2350, 420 2500, 500 2650
    C 580 2800, 580 2950, 500 3100
    C 420 3250, 420 3400, 500 3550
    C 580 3700, 580 3850, 500 4000
    C 420 4150, 420 4300, 500 4450
    C 580 4600, 580 4750, 500 4900
    C 420 5050, 420 5200, 500 5350
    C 580 5500, 580 5650, 500 5800
    C 420 5950, 420 6100, 500 6250
    C 580 6400, 580 6550, 500 6700
    C 420 6850, 420 7000, 500 7150
    C 580 7300, 580 7450, 500 7600
    C 420 7750, 470 7900, 500 8000
  `;

  return (
    <div ref={containerRef} className="relative w-full unfiltered-scroll-container">
      {/* Sleek satin calligraphy ribbon with cute loops on side and center sweep */}
      <div className="pointer-events-none absolute inset-0 w-full h-full z-0 overflow-hidden">
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 8000"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Satin gold gradient with realistic fabric luster */}
            <linearGradient id="satinGoldRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E5C38D" />
              <stop offset="30%" stopColor="#D4AF7A" />
              <stop offset="55%" stopColor="#FFF4DE" />
              <stop offset="80%" stopColor="#C59B63" />
              <stop offset="100%" stopColor="#D4AF7A" />
            </linearGradient>

            {/* Soft ambient ribbon glow & shadow */}
            <filter id="satinRibbonGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#1a0f24" floodOpacity="0.6" />
              <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#D4AF7A" floodOpacity="0.45" />
            </filter>
          </defs>

          {/* Layer 1: Soft ambient gold aura */}
          <motion.path
            d={ribbonPath}
            stroke="#D4AF7A"
            strokeWidth={7}
            strokeOpacity={0.22}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ pathLength }}
          />

          {/* Layer 2: Main Satin Ribbon Band (tactile width & luster) */}
          <motion.path
            d={ribbonPath}
            stroke="url(#satinGoldRibbon)"
            strokeWidth={4}
            filter="url(#satinRibbonGlow)"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ pathLength }}
          />

          {/* Layer 3: Silk shimmer highlight along the ribbon crest */}
          <motion.path
            d={ribbonPath}
            stroke="#FFFDF7"
            strokeWidth={1.2}
            strokeOpacity={0.85}
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
