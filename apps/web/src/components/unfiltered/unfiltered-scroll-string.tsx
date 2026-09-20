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
            Path spans X: 100 (left margin) ↔ 900 (right margin) — 80% of viewport width.
            Each S-curve completes in 320px of vertical space.
            25 waves over 8000px height matches a long multi-section page.
            The path is monotonically descending so progress = vertical position.
          */}
          <motion.path
            d="
              M 500 0
              C 900 96, 100 224, 200 320
              C 100 416, 900 544, 800 640
              C 900 736, 100 864, 200 960
              C 100 1056, 900 1184, 800 1280
              C 900 1376, 100 1504, 200 1600
              C 100 1696, 900 1824, 800 1920
              C 900 2016, 100 2144, 200 2240
              C 100 2336, 900 2464, 800 2560
              C 900 2656, 100 2784, 200 2880
              C 100 2976, 900 3104, 800 3200
              C 900 3296, 100 3424, 200 3520
              C 100 3616, 900 3744, 800 3840
              C 900 3936, 100 4064, 200 4160
              C 100 4256, 900 4384, 800 4480
              C 900 4576, 100 4704, 200 4800
              C 100 4896, 900 5024, 800 5120
              C 900 5216, 100 5344, 200 5440
              C 100 5536, 900 5664, 800 5760
              C 900 5856, 100 5984, 200 6080
              C 100 6176, 900 6304, 800 6400
              C 900 6496, 100 6624, 200 6720
              C 100 6816, 900 6944, 800 7040
              C 900 7136, 100 7264, 200 7360
              C 100 7456, 900 7584, 800 7680
              C 900 7776, 100 7904, 500 8000
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
