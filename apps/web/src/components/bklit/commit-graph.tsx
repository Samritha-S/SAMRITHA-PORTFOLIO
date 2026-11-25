"use client";

import React, { useState } from "react";

export interface CommitMetricCard {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}

export interface CommitCell {
  date: string;
  count: number;
}

interface BklitCommitGraphProps {
  metrics?: CommitMetricCard[];
  heatmapWeeks?: CommitCell[][];
  footerLabel?: string;
}

export function BklitCommitGraph({
  metrics = [],
  heatmapWeeks,
  footerLabel = "Continuous open source & engineering telemetry",
}: BklitCommitGraphProps) {
  const [hoveredCell, setHoveredCell] = useState<CommitCell | null>(null);

  const weeks = 24;
  const daysPerWeek = 7;
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const grid: CommitCell[][] =
    heatmapWeeks && heatmapWeeks.length > 0
      ? heatmapWeeks
      : Array.from({ length: weeks }).map((_, weekIndex) =>
          Array.from({ length: daysPerWeek }).map((__, dayIndex) => ({
            date: `Week ${weekIndex + 1}, ${days[dayIndex]}`,
            count: 0,
          }))
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
      {metrics.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="p-3 rounded-xl bg-[var(--bg-base)]/60 border border-[var(--border-subtle)]"
            >
              <div className="flex items-center gap-2 text-xs text-[var(--text-primary)]/70">
                {metric.icon}
                {metric.label}
              </div>
              <div className="text-xl font-semibold text-[var(--text-primary)] mt-1">
                {metric.value}
              </div>
            </div>
          ))}
        </div>
      )}

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
            <span>{footerLabel}</span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <span>Less</span>
          {[0, 1, 4, 8].map((val) => (
            <div
              key={val}
              style={{ backgroundColor: getColor(val) }}
              className="w-2.5 h-2.5 rounded-[2px]"
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
