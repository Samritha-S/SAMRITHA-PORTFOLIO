"use client";

import React from "react";
import { GithubIcon } from "@/components/shared/icons";
import { BklitAreaChart } from "@/components/bklit/area-chart";
import { BklitCommitGraph } from "@/components/bklit/commit-graph";
import ConstellationField from "@/components/kokonutui/constellation-field";
import { Bug, Globe, ExternalLink } from "lucide-react";
import { KokonutCard } from "@/components/kokonutui/card";
import { useView } from "@/context/view-context";

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
  const { sections } = useView();
  const github = sections.github;
  const CARD_ICONS = [Bug, Globe];
  return (
    <section id="github" className="py-24 px-4 sm:px-6 lg:px-8 section-base relative overflow-hidden">
      <ConstellationField
        className="absolute inset-0 pointer-events-none"
        backgroundColor="transparent"
        density={12000}
        connectionDistance={135}
        speed={0.10}
      />
      <div className="max-w-6xl mx-auto relative z-10 space-y-16">
        <div className="text-center">
          <span className="text-xs uppercase tracking-widest text-[var(--accent-gold)] font-mono flex items-center justify-center gap-1.5">
            <GithubIcon className="w-3.5 h-3.5" />
            Engineering Activity &amp; Community
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[var(--text-primary)] mt-3">
            GitHub &amp; Open Source
          </h2>
          <div className="gold-hairline w-24 mx-auto mt-4" />
          <div className="mt-4">
            <a
              href={github.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono text-[var(--accent-gold)] hover:underline border border-[var(--accent-gold)]/40 px-3.5 py-1.5 rounded-full bg-[var(--bg-elevated)]"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              {github.handle}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Open Source & Community Leadership Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {github.cards.map((card, idx) => {
            const Icon = CARD_ICONS[idx % CARD_ICONS.length];
            return (
              <KokonutCard key={card.title} glow className="p-6">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-xs font-mono text-[var(--accent-gold)] uppercase tracking-wider">
                    {card.eyebrow}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[var(--accent-gold)] px-2.5 py-0.5 rounded-full bg-[var(--bg-base)] border border-[var(--accent-gold)]/30 font-semibold">
                    <Icon className="w-3 h-3" />
                    {card.badge}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-medium text-[var(--text-primary)] mb-2">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-primary)]/80 leading-relaxed font-sans">
                  {card.description}
                </p>
              </KokonutCard>
            );
          })}
        </div>

        {/* Telemetry Charts */}
        <div className="space-y-8">
          <BklitAreaChart
            data={telemetryData}
            title="Development Velocity &amp; Sprint Cadence"
            description="Aggregated commit distribution, pull requests, and CI/CD runs"
            height={240}
          />

          <BklitCommitGraph />
        </div>
      </div>
    </section>
  );
}