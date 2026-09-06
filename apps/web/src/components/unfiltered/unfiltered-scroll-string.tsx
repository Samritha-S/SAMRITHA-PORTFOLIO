"use client";

import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function UnfilteredScrollStringWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Raw motion value — 0 to 1 progress through the container
  const rawProgress = useMotionValue(0);

  // Very stiff spring: responds instantly and stays ahead of the user
  const pathLength = useSpring(rawProgress, {
    stiffness: 800,
    damping: 50,
    mass: 0.2,
    restDelta: 0.0002,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateProgress = () => {
      const rect = container.getBoundingClientRect();
      const containerHeight = rect.height;
      // How far the top of the container is above the current viewport bottom (start trigger)
      // We want progress=0 when container top is at viewport bottom, progress=1 when container bottom is at top
      const vpH = window.innerHeight;
      // Distance scrolled into the container relative to the full container height
      // Offset: start drawing when container top is 90% down screen, finish when container bottom leaves top
      const scrolled = vpH * 0.9 - rect.top;
      const total = containerHeight + vpH * 0.9;
      const progress = Math.min(1, Math.max(0, scrolled / total));
      rawProgress.set(progress);
    };

    // Listen to both native scroll and Lenis RAF-driven scroll
    window.addEventListener("scroll", updateProgress, { passive: true });
    // Also fire on every animation frame so Lenis smooth scroll is captured
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
    <div ref={containerRef} className="relative w-full">
      {/* Gold calligraphy ribbon — wide S-curves spanning ~60% of the screen width */}
      <div className="pointer-events-none absolute inset-0 w-full h-full z-20 overflow-hidden">
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

      {/* Page sections */}
      <div className="relative z-0">{children}</div>
    </div>
  );
}
