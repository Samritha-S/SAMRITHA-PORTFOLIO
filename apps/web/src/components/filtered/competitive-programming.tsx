"use client";

import React from "react";
import { Award, Code2, TrendingUp } from "lucide-react";
import { KokonutCard } from "@/components/kokonutui/card";

export function CompetitiveProgrammingSection() {
  const platforms = [
    {
      name: "LeetCode",
      handle: "@samritha",
      solved: "450+",
      badge: "Knight (Top 5%)",
      rating: "1920+",
      breakdown: { easy: 180, medium: 220, hard: 50 },
      icon: Code2,
      link: "https://leetcode.com",
    },
    {
      name: "Codeforces",
      handle: "samritha_s",
      solved: "160+",
      badge: "Pupil / Specialist",
      rating: "1350+",
      icon: TrendingUp,
      link: "https://codeforces.com",
    },
    {
      name: "HackerRank",
      handle: "samritha",
      solved: "6 Stars",
      badge: "Problem Solving & Python Gold",
      rating: "Top Percentile",
      icon: Award,
      link: "https://hackerrank.com",
    },
  ];

  return (
    <section id="competitive" className="py-24 px-4 sm:px-6 lg:px-8 section-elevated relative">
      <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-widest text-[var(--accent-gold)] font-mono">
          Algorithmic Rigor
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[var(--text-primary)] mt-3">
          Competitive Programming & Problem Solving
        </h2>
        <div className="gold-hairline w-24 mx-auto mt-4" />
        <p className="text-sm text-[var(--text-primary)]/80 max-w-xl mx-auto mt-4 leading-relaxed">
          Consistent practice with algorithmic data structures, dynamic programming, and computational complexity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {platforms.map((p) => {
          const Icon = p.icon;
          return (
            <KokonutCard key={p.name} glow className="flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2 text-[var(--accent-gold)]">
                    <Icon className="w-5 h-5" />
                    <h3 className="font-serif text-xl font-medium text-[var(--text-primary)]">
                      {p.name}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-[var(--accent-gold)] px-2 py-0.5 rounded bg-[var(--bg-base)] border border-[var(--accent-gold)]/30">
                    {p.badge}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-xs py-1 border-b border-[var(--border-subtle)]">
                    <span className="text-[var(--text-primary)]/70">Problems Solved</span>
                    <span className="font-mono font-semibold text-[var(--text-primary)]">
                      {p.solved}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs py-1 border-b border-[var(--border-subtle)]">
                    <span className="text-[var(--text-primary)]/70">Rating / Milestone</span>
                    <span className="font-mono text-[var(--accent-gold)] font-semibold">
                      {p.rating}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs py-1">
                    <span className="text-[var(--text-primary)]/70">Handle</span>
                    <span className="font-mono text-[var(--text-primary)]">{p.handle}</span>
                  </div>
                </div>

                {p.breakdown && (
                  <div className="flex gap-2 pt-2 text-[11px] font-mono">
                    <span className="px-2 py-1 rounded bg-[var(--bg-base)] text-emerald-400 border border-emerald-500/20">
                      Easy: {p.breakdown.easy}
                    </span>
                    <span className="px-2 py-1 rounded bg-[var(--bg-base)] text-amber-400 border border-amber-500/20">
                      Med: {p.breakdown.medium}
                    </span>
                    <span className="px-2 py-1 rounded bg-[var(--bg-base)] text-rose-400 border border-rose-500/20">
                      Hard: {p.breakdown.hard}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--border-subtle)]">
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-[var(--accent-gold)] hover:underline flex items-center gap-1 font-medium"
                >
                  View Verified Profile &rarr;
                </a>
              </div>
            </KokonutCard>
          );
        })}
      </div>
      </div>
    </section>
  );
}
