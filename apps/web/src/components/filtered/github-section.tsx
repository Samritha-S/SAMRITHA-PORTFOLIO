"use client";

import React, { useEffect, useState } from "react";
import { GithubIcon } from "@/components/shared/icons";
import { BklitAreaChart } from "@/components/bklit/area-chart";
import { BklitCommitGraph, CommitMetricCard } from "@/components/bklit/commit-graph";
import ConstellationField from "@/components/kokonutui/constellation-field";
import {
  Bug,
  Globe,
  ExternalLink,
  GitCommit,
  Star,
  Terminal,
  FolderGit2,
  Code2,
  Flame,
  Trophy,
  CheckCircle2,
} from "lucide-react";
import { KokonutCard } from "@/components/kokonutui/card";
import { useView } from "@/context/view-context";
import type { GitHubTelemetry, LeetCodeTelemetry, HeatmapCell } from "@/app/api/telemetry/route";

type TelemetryTab = "combined" | "github" | "leetcode";

const fallbackVelocity = Array.from({ length: 12 }, (_, i) => ({
  label: `W${i + 1}`,
  value: 0,
}));

export function GitHubSection() {
  const { sections } = useView();
  const github = sections.github;
  const CARD_ICONS = [Bug, Globe];

  const [tab, setTab] = useState<TelemetryTab>("combined");
  const [ghData, setGhData] = useState<GitHubTelemetry | null>(null);
  const [lcData, setLcData] = useState<LeetCodeTelemetry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const ghUser = encodeURIComponent(github.username || "Samritha-S");
    const lcUser = encodeURIComponent(github.leetcodeUsername || "sam0mega404");

    fetch(`/api/telemetry?github=${ghUser}&leetcode=${lcUser}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (!active || !json) return;
        setGhData(json.github ?? null);
        setLcData(json.leetcode ?? null);
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [github.username, github.leetcodeUsername]);

  const combinedHeatmap: HeatmapCell[][] | undefined = React.useMemo(() => {
    if (!ghData?.heatmapWeeks) return lcData?.heatmapWeeks;
    if (!lcData?.heatmapWeeks) return ghData.heatmapWeeks;
    return ghData.heatmapWeeks.map((week, wIdx) =>
      week.map((cell, dIdx) => ({
        date: cell.date,
        count: cell.count + (lcData.heatmapWeeks[wIdx]?.[dIdx]?.count ?? 0),
      }))
    );
  }, [ghData, lcData]);

  const combinedVelocity = React.useMemo(() => {
    const ghVel = ghData?.weeklyVelocity ?? fallbackVelocity;
    const lcVel = lcData?.weeklyVelocity ?? fallbackVelocity;
    return ghVel.map((pt, idx) => ({
      label: pt.label,
      value: pt.value + (lcVel[idx]?.value ?? 0),
    }));
  }, [ghData, lcData]);

  const activeMetrics: CommitMetricCard[] = React.useMemo(() => {
    if (tab === "github") {
      return [
        {
          label: "Contributions (1Y)",
          value: loading ? "…" : ghData?.totalContributions ?? 0,
          icon: <GitCommit className="w-3.5 h-3.5 text-[var(--accent-gold)]" />,
        },
        {
          label: "Public Repos",
          value: loading ? "…" : ghData?.publicRepos ?? 0,
          icon: <FolderGit2 className="w-3.5 h-3.5 text-[var(--accent-gold)]" />,
        },
        {
          label: "Total Stars",
          value: loading ? "…" : ghData?.totalStars ?? 0,
          icon: <Star className="w-3.5 h-3.5 text-[var(--accent-gold)]" />,
        },
        {
          label: "Active Streak",
          value: loading ? "…" : `${ghData?.currentStreak ?? 0} Days`,
          icon: <Terminal className="w-3.5 h-3.5 text-[var(--accent-gold)]" />,
        },
      ];
    }

    if (tab === "leetcode") {
      return [
        {
          label: "Problems Solved",
          value: loading ? "…" : lcData?.totalSolved ?? 0,
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-gold)]" />,
        },
        {
          label: "Easy / Med / Hard",
          value: loading
            ? "…"
            : `${lcData?.easySolved ?? 0} / ${lcData?.mediumSolved ?? 0} / ${lcData?.hardSolved ?? 0}`,
          icon: <Code2 className="w-3.5 h-3.5 text-[var(--accent-gold)]" />,
        },
        {
          label: "Global Ranking",
          value: loading ? "…" : lcData?.ranking ? `#${lcData.ranking.toLocaleString()}` : "—",
          icon: <Trophy className="w-3.5 h-3.5 text-[var(--accent-gold)]" />,
        },
        {
          label: "LeetCode Streak",
          value: loading ? "…" : `${lcData?.streak ?? 0} Days`,
          icon: <Flame className="w-3.5 h-3.5 text-[var(--accent-gold)]" />,
        },
      ];
    }

    return [
      {
        label: "GitHub (1Y)",
        value: loading ? "…" : ghData?.totalContributions ?? 0,
        icon: <GitCommit className="w-3.5 h-3.5 text-[var(--accent-gold)]" />,
      },
      {
        label: "LeetCode Solved",
        value: loading ? "…" : lcData?.totalSolved ?? 0,
        icon: <Code2 className="w-3.5 h-3.5 text-[var(--accent-gold)]" />,
      },
      {
        label: "Public Repos",
        value: loading ? "…" : ghData?.publicRepos ?? 0,
        icon: <FolderGit2 className="w-3.5 h-3.5 text-[var(--accent-gold)]" />,
      },
      {
        label: "Best Streak",
        value: loading ? "…" : `${Math.max(ghData?.currentStreak ?? 0, lcData?.streak ?? 0)} Days`,
        icon: <Flame className="w-3.5 h-3.5 text-[var(--accent-gold)]" />,
      },
    ];
  }, [tab, loading, ghData, lcData]);

  const activeVelocity =
    tab === "github"
      ? ghData?.weeklyVelocity ?? fallbackVelocity
      : tab === "leetcode"
        ? lcData?.weeklyVelocity ?? fallbackVelocity
        : combinedVelocity;

  const activeHeatmap =
    tab === "github"
      ? ghData?.heatmapWeeks
      : tab === "leetcode"
        ? lcData?.heatmapWeeks
        : combinedHeatmap;

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
            Engineering Activity &amp; Problem Solving
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[var(--text-primary)] mt-3">
            GitHub, LeetCode &amp; Open Source
          </h2>
          <div className="gold-hairline w-24 mx-auto mt-4" />
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
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
            <a
              href={`https://leetcode.com/u/${encodeURIComponent(github.leetcodeUsername || "sam0mega404")}/`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono text-[var(--accent-gold)] hover:underline border border-[var(--accent-gold)]/40 px-3.5 py-1.5 rounded-full bg-[var(--bg-elevated)]"
            >
              <Code2 className="w-3.5 h-3.5" />
              leetcode.com/u/{github.leetcodeUsername || "sam0mega404"}
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

        {/* Telemetry Source Switcher */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-1 p-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
              {(
                [
                  { id: "combined", label: "All Activity" },
                  { id: "github", label: "GitHub" },
                  { id: "leetcode", label: "LeetCode" },
                ] as const
              ).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono transition-colors cursor-pointer ${
                    tab === item.id
                      ? "bg-[var(--accent-gold)] text-[#011627] font-semibold"
                      : "text-[var(--text-primary)]/75 hover:text-[var(--text-primary)]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <BklitAreaChart
            data={activeVelocity}
            title={
              tab === "github"
                ? "GitHub Weekly Commit & Contribution Velocity"
                : tab === "leetcode"
                  ? "LeetCode Weekly Problem-Solving Velocity"
                  : "Combined Engineering & DSA Velocity (12 Weeks)"
            }
            description={
              tab === "github"
                ? `Live 12-week contribution cadence for @${github.username}`
                : tab === "leetcode"
                  ? `Live 12-week submission cadence for @${github.leetcodeUsername || github.username}`
                  : "Merged weekly GitHub contributions and LeetCode submissions"
            }
            height={240}
          />

          <BklitCommitGraph
            metrics={activeMetrics}
            heatmapWeeks={activeHeatmap}
            footerLabel={
              tab === "github"
                ? `24-week live GitHub contribution heatmap (@${github.username})`
                : tab === "leetcode"
                  ? `24-week live LeetCode submission heatmap (@${github.leetcodeUsername || github.username})`
                  : "24-week combined GitHub & LeetCode activity heatmap"
            }
          />
        </div>
      </div>
    </section>
  );
}
