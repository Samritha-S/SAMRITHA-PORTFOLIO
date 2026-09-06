"use client";

import React from "react";
import { motion } from "motion/react";

export function BeamsBackground({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none -z-10 ${className}`}
      aria-hidden="true"
    >
      {/* Primary Atmospheric Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[450px] rounded-full bg-[var(--accent-gold)]/10 blur-[130px]" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[350px] rounded-full bg-[var(--bg-elevated)]/30 blur-[120px]" />

      {/* Slow Drifting Beam 1 */}
      <motion.div
        animate={{
          x: ["-8%", "8%", "-8%"],
          rotate: [-12, -4, -12],
          opacity: [0.12, 0.22, 0.12],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-32 left-1/3 w-[380px] h-[850px] bg-gradient-to-b from-[var(--accent-gold)]/25 via-[var(--bg-elevated)]/15 to-transparent blur-3xl transform -rotate-12 origin-top"
      />

      {/* Slow Drifting Beam 2 */}
      <motion.div
        animate={{
          x: ["6%", "-6%", "6%"],
          rotate: [15, 8, 15],
          opacity: [0.1, 0.18, 0.1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-24 right-1/4 w-[340px] h-[780px] bg-gradient-to-b from-[var(--accent-primary)]/20 via-[var(--accent-gold)]/10 to-transparent blur-3xl transform rotate-12 origin-top"
      />
    </div>
  );
}
