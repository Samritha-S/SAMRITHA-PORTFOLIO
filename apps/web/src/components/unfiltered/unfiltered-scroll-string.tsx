"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function UnfilteredScrollStringWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Target the container so that as soon as the top enters the lower viewport, drawing begins,
  // and stays drawn ahead of the viewport down past the 3/4th (80%) mark
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.8"],
  });

  // Fast-reacting spring with tight responsiveness so curves flow briskly with scroll speed
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 500,
    damping: 38,
    mass: 0.4,
    restDelta: 0.0005,
  });

  return (
    <div ref={containerRef} className="relative w-full">
      {/* High-frequency fast-curving ribbon that stays ahead and below 3/4th of the screen */}
      <div className="pointer-events-none absolute inset-0 w-full h-full z-20 overflow-hidden">
        <svg
          className="w-full h-full opacity-90"
          viewBox="0 0 1200 4200"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="ribbonGoldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#D4AF7A" floodOpacity="0.9" />
              <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#D4AF7A" floodOpacity="0.45" />
            </filter>
          </defs>

          <motion.path
            d="M 880 0 C 1020 63, 660 147, 740 210 C 660 273, 1100 357, 1020 420 C 1120 483, 660 567, 740 630 C 660 693, 1100 777, 1020 840 C 1120 903, 660 987, 740 1050 C 660 1113, 1100 1197, 1020 1260 C 1120 1323, 660 1407, 740 1470 C 660 1533, 1100 1617, 1020 1680 C 1120 1743, 660 1827, 740 1890 C 660 1953, 1100 2037, 1020 2100 C 1120 2163, 660 2247, 740 2310 C 660 2373, 1100 2457, 1020 2520 C 1120 2583, 660 2667, 740 2730 C 660 2793, 1100 2877, 1020 2940 C 1120 3003, 660 3087, 740 3150 C 660 3213, 1100 3297, 1020 3360 C 1120 3423, 660 3507, 740 3570 C 660 3633, 1100 3717, 1020 3780 C 1120 3843, 660 3927, 740 3990 C 660 4053, 1080 4137, 980 4200"
            stroke="#D4AF7A"
            strokeWidth={2.5}
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
