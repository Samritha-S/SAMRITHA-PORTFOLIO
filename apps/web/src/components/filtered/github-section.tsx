"use client";

import React from "react";
import { GithubIcon } from "@/components/shared/icons";
import { BklitAreaChart } from "@/components/bklit/area-chart";
import { BklitCommitGraph } from "@/components/bklit/commit-graph";

const telemetryData = [
  { label: "W1", value: 18 },
  { label: "W2", value: 24 },
  { label: "W3", value: 16 },
  { label: "W4", value: 38 },
  { label: "W5", value: 42 },
  { label: "W6", value: 31 },
  { label: "W7", value: 55 },
  { label: "W8", value: 48 },
  { label: "W9", value: 64 },
  { label: "W10", value: 72 },
  { label: "W11", value: 58 },
  { label: "W12", value: 89 },
];

export function GitHubSection() {
  return (
    <section id="github" className="py-24 px-4 sm:px-6 lg:px-8 section-base relative">
      <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-widest text-[var(--accent-gold)] font-mono flex items-center justify-center gap-1.5">
          <GithubIcon className="w-3.5 h-3.5" />
          Bklit UI Data Visualization
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[var(--text-primary)] mt-3">
          GitHub Activity &amp; Engineering Telemetry
        </h2>
        <div className="gold-hairline w-24 mx-auto mt-4" />
        <p className="text-sm text-[var(--text-primary)]/80 max-w-xl mx-auto mt-4 leading-relaxed">
          Real-time snapshot of code commits, pull requests, open-source repositories, and system engineering cadence.
        </p>
      </div>

      <div className="space-y-8">
        {/* Animated Area Chart */}
        <BklitAreaChart
          data={telemetryData}
          title="Development Velocity &amp; Sprint Cadence"
          description="Aggregated commit distribution, pull requests, and CI/CD runs over the last 12 weeks"
          height={240}
        />

        {/* 26-Week Contribution Calendar Grid */}
        <BklitCommitGraph />
      </div>
      </div>
    </section>
  );
}
