"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function UnfilteredScrollStringWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Targets the scroll so the tip of the line is always at or below 3/4th (85%) of the visible screen
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.95"],
  });

  // Fast-reacting spring with high stiffness so bends and drawing match the user's scroll speed instantly
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 420,
    damping: 36,
    mass: 0.6,
    restDelta: 0.0005,
  });

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Expressive looping calligraphy ribbon that bends fast and stays below 3/4th of the viewer's screen */}
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
            d="M 920 0 C 960 120, 1060 220, 1020 340 C 980 440, 840 460, 780 380 C 720 300, 800 180, 900 240 C 980 300, 1040 480, 960 620 C 880 760, 700 840, 720 1000 C 740 1140, 1020 1180, 1000 1320 C 980 1420, 860 1460, 800 1380 C 740 1300, 820 1200, 920 1260 C 1000 1320, 1020 1480, 920 1620 C 820 1760, 680 1840, 720 2000 C 760 2160, 1040 2180, 1010 2320 C 980 2440, 850 2460, 790 2380 C 730 2300, 820 2180, 920 2240 C 1000 2300, 1020 2480, 900 2620 C 780 2760, 660 2860, 720 3020 C 780 3180, 1050 3220, 1010 3380 C 970 3500, 840 3520, 780 3440 C 720 3360, 810 3240, 920 3300 C 1000 3360, 1020 3540, 910 3700 C 800 3840, 700 3940, 780 4060 C 840 4160, 950 4180, 920 4200"
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
