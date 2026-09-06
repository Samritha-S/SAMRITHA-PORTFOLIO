"use client";

import React from "react";
import { useView } from "@/context/view-context";
import { Sparkles, Terminal } from "lucide-react";

export function Footer() {
  const { isFiltered } = useView();

  return (
    <footer className="mt-20 border-t border-[var(--border-subtle)] bg-[var(--bg-base)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="gold-hairline max-w-5xl mx-auto mb-10" />

      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[var(--text-primary)]/70">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full border border-[var(--accent-gold)] flex items-center justify-center text-[var(--accent-gold)]">
            {isFiltered ? (
              <Terminal className="w-3 h-3" />
            ) : (
              <Sparkles className="w-3 h-3" />
            )}
          </div>
          <span className="font-serif text-sm font-medium text-[var(--text-primary)]">
            Samritha S
          </span>
          <span className="text-[var(--accent-gold)]">•</span>
          <span>
            {isFiltered ? "Blue Noir Palette" : "Mystic Amethyst Palette"}
          </span>
        </div>

        <p className="font-serif italic text-center sm:text-right text-[var(--accent-gold)]">
          {isFiltered
            ? "“Build. Learn. Break. Improve. Repeat.”"
            : "“Turning random thoughts into entire stories.”"}
        </p>

        <div className="text-[11px] font-mono text-[var(--text-primary)]/50">
          &copy; {new Date().getFullYear()} • Crafted with KokonutUI &amp; Bklit UI
        </div>
      </div>
    </footer>
  );
}
