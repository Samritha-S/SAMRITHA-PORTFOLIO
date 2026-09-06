"use client";

import React, { useState } from "react";
import { motion } from "motion/react";

interface DataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
}

interface AreaChartProps {
  data: DataPoint[];
  title?: string;
  description?: string;
  height?: number;
}

export function BklitAreaChart({
  data,
  title = "Development Velocity & Code Impact",
  description = "Weekly commits, pull requests, and system builds over time",
  height = 220,
}: AreaChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const chartWidth = 600;
  const paddingX = 30;
  const paddingY = 25;
  const usableWidth = chartWidth - paddingX * 2;
  const usableHeight = height - paddingY * 2;

  // Generate SVG path points
  const points = data.map((d, index) => {
    const x = paddingX + (index / (data.length - 1)) * usableWidth;
    const y = height - paddingY - (d.value / maxValue) * usableHeight;
    return { x, y, data: d };
  });

  const pathD = points.reduce((acc, point, index) => {
    if (index === 0) return `M ${point.x},${point.y}`;
    // Catmull-Rom or cubic Bezier smoothing
    const prev = points[index - 1];
    const cp1x = prev.x + (point.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (point.x - prev.x) / 2;
    const cp2y = point.y;
    return `${acc} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${point.x},${point.y}`;
  }, "");

  const areaD = `${pathD} L ${points[points.length - 1].x},${height - paddingY} L ${points[0].x},${height - paddingY} Z`;

  return (
    <div className="w-full rounded-2xl bg-[var(--card-surface)] border border-[var(--border-subtle)] p-6 backdrop-blur-md relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
        <div>
          <h4 className="font-serif text-lg sm:text-xl font-medium text-[var(--text-primary)]">
            {title}
          </h4>
          <p className="text-xs text-[var(--text-primary)]/70 mt-0.5">
            {description}
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 text-[var(--accent-gold)]">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-gold)] shadow-[0_0_8px_var(--accent-gold)]" />
            Impact Metric
          </span>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${chartWidth} ${height}`}
          className="w-full h-auto overflow-visible select-none"
        >
          <defs>
            <linearGradient id="bklitGoldGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent-gold)" stopOpacity="0.4" />
              <stop offset="85%" stopColor="var(--accent-gold)" stopOpacity="0.02" />
              <stop offset="100%" stopColor="var(--accent-gold)" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="bklitStrokeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--accent-primary)" />
              <stop offset="50%" stopColor="var(--accent-gold)" />
              <stop offset="100%" stopColor="var(--accent-gold)" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.33, 0.66, 1].map((ratio, i) => {
            const y = height - paddingY - ratio * usableHeight;
            return (
              <line
                key={i}
                x1={paddingX}
                y1={y}
                x2={chartWidth - paddingX}
                y2={y}
                stroke="var(--border-subtle)"
                strokeDasharray="4 4"
                strokeWidth="1"
                opacity={0.4}
              />
            );
          })}

          {/* Area fill */}
          <motion.path
            d={areaD}
            fill="url(#bklitGoldGrad)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          {/* Stroke path */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="url(#bklitStrokeGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          {/* Interactive points */}
          {points.map((p, i) => (
            <g key={i}>
              <circle
                cx={p.x}
                cy={p.y}
                r={hoveredIndex === i ? 5.5 : 3}
                className="cursor-pointer transition-all duration-200"
                fill={hoveredIndex === i ? "var(--text-primary)" : "var(--accent-gold)"}
                stroke="var(--bg-base)"
                strokeWidth="2"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
              {/* Vertical guideline on hover */}
              {hoveredIndex === i && (
                <line
                  x1={p.x}
                  y1={paddingY}
                  x2={p.x}
                  y2={height - paddingY}
                  stroke="var(--accent-gold)"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                  opacity={0.7}
                />
              )}
            </g>
          ))}
        </svg>

        {/* Hover Tooltip Box */}
        {hoveredIndex !== null && points[hoveredIndex] && (
          <div
            style={{
              left: `${(points[hoveredIndex].x / chartWidth) * 100}%`,
              top: `${(points[hoveredIndex].y / height) * 100}%`,
            }}
            className="absolute -translate-x-1/2 -translate-y-12 px-3 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--accent-gold)] text-xs text-[var(--text-primary)] shadow-lg pointer-events-none z-20 whitespace-nowrap"
          >
            <div className="font-semibold text-[var(--accent-gold)]">
              {points[hoveredIndex].data.value} commits / actions
            </div>
            <div className="text-[10px] opacity-80">
              {points[hoveredIndex].data.label}
            </div>
          </div>
        )}
      </div>

      {/* Axis Labels */}
      <div className="flex justify-between items-center px-4 pt-2 text-[11px] text-[var(--text-primary)]/60">
        {data.map((d, i) => (
          <span key={i} className="hidden sm:inline-block">
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}
