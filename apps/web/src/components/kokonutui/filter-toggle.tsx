"use client";

import React from "react";
import { useView } from "@/context/view-context";
import { Sparkles, Terminal } from "lucide-react";
import { motion } from "motion/react";

export function FilterToggle() {
  const { isFiltered, toggleView, isTransitioning } = useView();

  return (
    <div className="relative flex items-center">
      {/* Segmented Dual-Pill Container */}
      <div
        role="group"
        aria-label="Filter the site perspective switch"
        className="relative inline-flex items-center p-1 rounded-full border border-[var(--accent-gold)]/40 bg-[var(--bg-base)]/80 backdrop-blur-md shadow-sm transition-all duration-300 hover:border-[var(--accent-gold)]"
      >
        {/* Unfiltered Option */}
        <button
          type="button"
          onClick={() => {
            if (isFiltered && !isTransitioning) toggleView();
          }}
          disabled={isTransitioning}
          aria-pressed={!isFiltered}
          className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full text-xs font-medium tracking-wide transition-colors duration-200 cursor-pointer ${
            !isFiltered
              ? "text-[#0A3323] font-semibold"
              : "text-[var(--text-primary)]/70 hover:text-[var(--text-primary)]"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Unfiltered</span>
          <span className="text-[10px] opacity-70 hidden sm:inline">(Raw)</span>

          {!isFiltered && (
            <motion.div
              layoutId="filter-active-capsule"
              transition={{ type: "spring", stiffness: 450, damping: 32 }}
              className="absolute inset-0 bg-[var(--accent-gold)] rounded-full shadow-md -z-10"
            />
          )}
        </button>

        {/* Filtered Option */}
        <button
          type="button"
          onClick={() => {
            if (!isFiltered && !isTransitioning) toggleView();
          }}
          disabled={isTransitioning}
          aria-pressed={isFiltered}
          className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full text-xs font-medium tracking-wide transition-colors duration-200 cursor-pointer ${
            isFiltered
              ? "text-white font-semibold"
              : "text-[var(--text-primary)]/70 hover:text-[var(--text-primary)]"
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Filtered</span>
          <span className="text-[10px] opacity-70 hidden sm:inline">(Tech)</span>

          {isFiltered && (
            <motion.div
              layoutId="filter-active-capsule"
              transition={{ type: "spring", stiffness: 450, damping: 32 }}
              className="absolute inset-0 bg-[var(--accent-primary)] rounded-full shadow-md border border-[var(--accent-gold)]/60 -z-10"
            />
          )}
        </button>
      </div>

      {/* Ripple Glow Ring when Transitioning */}
      {isTransitioning && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0.8 }}
          animate={{ scale: 1.25, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0 rounded-full border-2 border-[var(--accent-gold)] pointer-events-none"
        />
      )}
    </div>
  );
}
