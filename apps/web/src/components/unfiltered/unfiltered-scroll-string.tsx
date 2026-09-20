"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";

export function UnfilteredScrollStringWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Hardware-optimized scroll tracking directly from Motion without layout thrashing
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end end"],
  });

  // Buttery-smooth spring momentum that glides effortlessly with Lenis smooth scroll
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    mass: 0.2,
    restDelta: 0.0005,
  });

  // Ribbon starts at About, loops along margin, sweeps to middle, weaves through Journey, and concludes
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
    C 70 1260, 240 1440, 500 1560
    C 580 1660, 580 1800, 500 1920
    C 420 2040, 420 2160, 500 2260
    C 550 2310, 550 2370, 500 2370
    C 460 2370, 470 2330, 500 2330
  `;

  return (
    <div ref={containerRef} className="relative w-full unfiltered-scroll-container">
      {/* Sleek satin calligraphy ribbon: frames About on the side, sweeps to middle, and concludes at Journey end */}
      <div
        className="pointer-events-none absolute inset-0 w-full h-full z-0 overflow-hidden"
        style={{ willChange: "transform", transform: "translateZ(0)" }}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 2400"
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

            {/* Lightweight GPU-accelerated ribbon drop shadow */}
            <filter id="satinRibbonGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#1a0f24" floodOpacity="0.4" />
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
