"use client";

import React from "react";
import { useView } from "@/context/view-context";
import { Sparkles, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function FilterToggle() {
  const { isFiltered, toggleView, isTransitioning } = useView();

  const handleToggle = () => {
    toggleView();
  };

  return (
    <div className="relative flex items-center">
      <button
        onClick={handleToggle}
        disabled={isTransitioning}
        aria-label="Filter the site toggle"
        suppressHydrationWarning
        className="group relative flex items-center gap-2.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[var(--accent-gold)]/40 bg-[var(--bg-elevated)]/80 backdrop-blur-md shadow-sm transition-all duration-300 hover:border-[var(--accent-gold)] hover:shadow-[0_0_20px_var(--gold-glow)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)]/50"
      >
        {/* Label */}
        <span className="text-xs sm:text-sm font-medium tracking-wide text-[var(--text-primary)] select-none">
          Filter the site
        </span>

        {/* Status Pill / Switch */}
        <div className="relative w-12 h-6 sm:w-14 sm:h-7 rounded-full bg-[var(--bg-base)] border border-[var(--border-subtle)] p-0.5 flex items-center transition-colors">
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs shadow-md ${
              isFiltered
                ? "ml-auto bg-[var(--accent-primary)] text-white"
                : "mr-auto bg-[var(--accent-gold)] text-[#2C3436]"
            }`}
          >
            <AnimatePresence mode="wait">
              {isFiltered ? (
                <motion.div
                  key="filtered-icon"
                  initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Terminal className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </motion.div>
              ) : (
                <motion.div
                  key="unfiltered-icon"
                  initial={{ opacity: 0, scale: 0.5, rotate: 45 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* State Tag */}
        <span
          className={`text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-colors duration-300 hidden md:inline-block ${
            isFiltered
              ? "text-[var(--text-primary)]/80"
              : "text-[var(--accent-gold)]"
          }`}
        >
          {isFiltered ? "Filtered (Tech)" : "Unfiltered (Raw)"}
        </span>
      </button>

      {/* Ripple/Glow ring on toggle */}
      {isTransitioning && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0.8 }}
          animate={{ scale: 1.4, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0 rounded-full border-2 border-[var(--accent-gold)] pointer-events-none"
        />
      )}
    </div>
  );
}
