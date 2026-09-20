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

  return (
    <div ref={containerRef} className="relative w-full unfiltered-scroll-container">
      {/* Gold calligraphy ribbon — wide S-curves spanning ~60% of the screen width */}
      <div className="pointer-events-none absolute inset-0 w-full h-full z-0 overflow-hidden">
        <svg
          className="w-full h-full opacity-90"
          viewBox="0 0 1000 8000"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="ribbonGoldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#D4AF7A" floodOpacity="1" />
              <feDropShadow dx="0" dy="0" stdDeviation="7" floodColor="#D4AF7A" floodOpacity="0.5" />
            </filter>
          </defs>

          {/*
            - About section (Y: 0 - 1170): Ribbon sweeps to the left side margin (X: 45 - 95),
              framing the text gracefully without cutting across or interfering with the paragraphs.
            - Transition (Y: 1170 - 1760): Sweeps from the side margin across into the middle.
            - Rest of page (Y: 1760 - 8000): Flows down the middle (X: 420 - 580) centered around X: 500.
          */}
          <motion.path
            d="
              M 500 0
              C 380 40, 140 90, 65 170
              C 40 230, 45 350, 70 420
              C 90 480, 90 600, 60 670
              C 40 730, 45 850, 75 920
              C 95 980, 90 1100, 65 1170
              C 45 1230, 140 1370, 290 1460
              C 420 1540, 530 1650, 500 1760
              C 420 1860, 420 1980, 500 2080
              C 580 2180, 580 2300, 500 2400
              C 420 2500, 420 2620, 500 2720
              C 580 2820, 580 2940, 500 3040
              C 420 3140, 420 3260, 500 3360
              C 580 3460, 580 3580, 500 3680
              C 420 3780, 420 3900, 500 4000
              C 580 4100, 580 4220, 500 4320
              C 420 4420, 420 4540, 500 4640
              C 580 4740, 580 4860, 500 4960
              C 420 5060, 420 5180, 500 5280
              C 580 5380, 580 5500, 500 5600
              C 420 5700, 420 5820, 500 5920
              C 580 6020, 580 6140, 500 6240
              C 420 6340, 420 6460, 500 6560
              C 580 6660, 580 6780, 500 6880
              C 420 6980, 420 7100, 500 7200
              C 580 7300, 580 7420, 500 7520
              C 420 7620, 420 7740, 500 7840
              C 560 7900, 460 7960, 500 8000
            "
            stroke="#D4AF7A"
            strokeWidth={3}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#ribbonGoldGlow)"
            style={{ pathLength }}
          />
        </svg>
      </div>

      {/* Page sections with transparent backgrounds so ribbon at z-0 is visible underneath */}
      <div className="relative z-10 [&_section]:!bg-transparent">{children}</div>
    </div>
  );
}
