"use client";

import React, { useState } from "react";
import { GitCommit, GitPullRequest, Star, Terminal } from "lucide-react";

export function BklitCommitGraph() {
  const [hoveredCell, setHoveredCell] = useState<{
    date: string;
    count: number;
  } | null>(null);

  // Generate 26 weeks of commit blocks (182 days)
  const weeks = 24;
  const daysPerWeek = 7;
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Seed realistic commit activity distribution
  const grid = Array.from({ length: weeks }).map((_, weekIndex) =>
    Array.from({ length: daysPerWeek }).map((_, dayIndex) => {
      // Deterministic pseudo-random based on indices for consistent SSR
      const seed = (weekIndex * 7 + dayIndex * 13) % 29;
      let count = 0;
      if (seed > 22) count = 8;
      else if (seed > 15) count = 5;
      else if (seed > 8) count = 2;
      else if (seed > 4) count = 1;

      return {
        date: `Week ${weekIndex + 1}, Day ${days[dayIndex]}`,
        count,
      };
    })
  );

  const getColor = (count: number) => {
    if (count === 0) return "rgba(138, 150, 136, 0.12)";
    if (count <= 2) return "rgba(201, 162, 75, 0.35)";
    if (count <= 5) return "rgba(201, 162, 75, 0.65)";
    return "var(--accent-gold)";
  };

  return (
    <div className="w-full rounded-2xl bg-[var(--card-surface)] border border-[var(--border-subtle)] p-6 backdrop-blur-md">
      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="p-3 rounded-xl bg-[var(--bg-base)]/60 border border-[var(--border-subtle)]">
          <div className="flex items-center gap-2 text-xs text-[var(--text-primary)]/70">
            <GitCommit className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            Total Commits
          </div>
          <div className="text-xl font-semibold text-[var(--text-primary)] mt-1">
            842+
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[var(--bg-base)]/60 border border-[var(--border-subtle)]">
          <div className="flex items-center gap-2 text-xs text-[var(--text-primary)]/70">
            <GitPullRequest className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            Pull Requests
          </div>
          <div className="text-xl font-semibold text-[var(--text-primary)] mt-1">
            124
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[var(--bg-base)]/60 border border-[var(--border-subtle)]">
          <div className="flex items-center gap-2 text-xs text-[var(--text-primary)]/70">
            <Star className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            Repositories
          </div>
          <div className="text-xl font-semibold text-[var(--text-primary)] mt-1">
            18
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[var(--bg-base)]/60 border border-[var(--border-subtle)]">
          <div className="flex items-center gap-2 text-xs text-[var(--text-primary)]/70">
            <Terminal className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            Active Streak
          </div>
          <div className="text-xl font-semibold text-[var(--text-primary)] mt-1">
            48 Days
          </div>
        </div>
      </div>

      {/* Grid Display */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[560px]">
          <div className="flex gap-1.5 justify-between">
            {grid.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-1.5">
                {week.map((cell, dIdx) => (
                  <div
                    key={dIdx}
                    onMouseEnter={() => setHoveredCell(cell)}
                    onMouseLeave={() => setHoveredCell(null)}
                    style={{ backgroundColor: getColor(cell.count) }}
                    className="w-3 h-3 rounded-[3px] transition-transform duration-150 hover:scale-125 cursor-pointer"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer / Legend */}
      <div className="flex items-center justify-between text-xs text-[var(--text-primary)]/70 mt-4 pt-3 border-t border-[var(--border-subtle)]">
        <div>
          {hoveredCell ? (
            <span className="text-[var(--accent-gold)] font-medium">
              {hoveredCell.count} contributions on {hoveredCell.date}
            </span>
          ) : (
            <span>Continuous open source & engineering telemetry</span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[10px]">Less</span>
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[rgba(138,150,136,0.15)]" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[rgba(201,162,75,0.35)]" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[rgba(201,162,75,0.65)]" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[var(--accent-gold)]" />
          <span className="text-[10px]">More</span>
        </div>
      </div>
    </div>
  );
}
