"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function UnfilteredScrollStringWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Tracks the user's active viewport position as they scroll through the sections
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.5", "end end"],
  });

  // Fast, responsive spring tracking so the line tip moves at the user's exact scroll speed
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <div ref={containerRef} className="relative w-full">
      {/* High-visibility, fast-responsive gold string that tracks the user on screen */}
      <div className="pointer-events-none absolute inset-0 w-full h-full z-20 overflow-hidden">
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 4000"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="stringGoldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#D4AF7A" floodOpacity="0.85" />
              <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#D4AF7A" floodOpacity="0.4" />
            </filter>
          </defs>

          <motion.path
            d="M 880 0 C 880 83.5, 929 83.5, 929 167 C 929 250, 950 250, 950 333 C 950 416.5, 929 416.5, 929 500 C 929 583.5, 880 583.5, 880 667 C 880 750, 831 750, 831 833 C 831 916.5, 810 916.5, 810 1000 C 810 1083.5, 831 1083.5, 831 1167 C 831 1250, 880 1250, 880 1333 C 880 1416.5, 929 1416.5, 929 1500 C 929 1583.5, 950 1583.5, 950 1667 C 950 1750, 929 1750, 929 1833 C 929 1916.5, 880 1916.5, 880 2000 C 880 2083.5, 831 2083.5, 831 2167 C 831 2250, 810 2250, 810 2333 C 810 2416.5, 831 2416.5, 831 2500 C 831 2583.5, 880 2583.5, 880 2667 C 880 2750, 929 2750, 929 2833 C 929 2916.5, 950 2916.5, 950 3000 C 950 3083.5, 929 3083.5, 929 3167 C 929 3250, 880 3250, 880 3333 C 880 3416.5, 831 3416.5, 831 3500 C 831 3583.5, 810 3583.5, 810 3667 C 810 3750, 831 3750, 831 3833 C 831 3916.5, 880 3916.5, 880 4000"
            stroke="#D4AF7A"
            strokeWidth={2.25}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#stringGoldGlow)"
            style={{ pathLength }}
          />
        </svg>
      </div>

      {/* Page sections */}
      <div className="relative z-0">{children}</div>
    </div>
  );
}
