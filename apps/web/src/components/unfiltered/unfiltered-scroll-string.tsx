"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function UnfilteredScrollStringWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.95"],
  });

  // Smooth liquid momentum matching the scroll down
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Continuous thin ribbon string flowing downward from top of About to the end of the page */}
      <div className="pointer-events-none absolute inset-0 w-full h-full z-10 overflow-hidden">
        <svg
          className="w-full h-full opacity-60"
          viewBox="0 0 1200 3200"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M 950 40 C 1050 120, 1100 240, 1020 300 C 940 360, 880 280, 930 200 C 980 120, 1060 220, 1020 380 C 980 540, 820 620, 850 780 C 880 940, 1000 980, 980 1080 C 960 1180, 870 1150, 860 1060 C 850 970, 930 1020, 950 1180 C 970 1340, 840 1440, 870 1600 C 900 1760, 1020 1800, 990 1900 C 960 2000, 880 1960, 890 1880 C 900 1800, 980 1860, 960 2020 C 940 2180, 800 2280, 840 2440 C 880 2600, 980 2700, 950 2850 C 920 3000, 820 3100, 860 3200"
            stroke="#D4AF7A"
            strokeWidth={1.75}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ pathLength }}
          />
        </svg>
      </div>

      {/* Page sections */}
      <div className="relative z-0">{children}</div>
    </div>
  );
}
