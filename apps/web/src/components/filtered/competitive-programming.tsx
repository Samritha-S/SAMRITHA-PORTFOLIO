"use client";

import React from "react";
import { Trophy, Award, BookCheck, Flame, Users } from "lucide-react";
import { KokonutCard } from "@/components/kokonutui/card";
import ConstellationField from "@/components/kokonutui/constellation-field";

export function CompetitiveProgrammingSection() {
  const competitions = [
    {
      title: "PromptWars Virtual",
      organization: "Google for Developers x H2S",
      status: "4 Challenges Completed",
      participants: "46,286 participants",
      ranks: ["#114", "#604", "#832", "#1265"],
      note: "Invited to PromptWars Exclusive Edition (invite-only, Top 400)",
      icon: Flame,
    },
    {
      title: "CodeWars v3.0",
      organization: "Competitive Coding Championship",
      status: "Grand Finalist",
      ranks: ["Grand Finalist"],
      icon: Trophy,
    },
    {
      title: "Zayathon",
      organization: "National Hackathon",
      status: "Consolidation Prize",
      ranks: ["Consolidation Prize"],
      icon: Award,
    },
    {
      title: "Google Build with AI Bootcamp",
      organization: "Google Developer Groups • Coimbatore",
      status: "Attended",
      ranks: ["Participant"],
      icon: Users,
    },
  ];

  return (
    <section id="competitions" className="py-24 px-4 sm:px-6 lg:px-8 section-elevated relative overflow-hidden">
      {/* Anchor shim for legacy #competitive links */}
      <span id="competitive" className="absolute top-0 pointer-events-none" />

      <ConstellationField
        className="absolute inset-0 pointer-events-none"
        backgroundColor="transparent"
        density={11000}
        connectionDistance={135}
        speed={0.10}
      />
      <div className="max-w-6xl mx-auto relative z-10 space-y-16">
        <div className="text-center">
          <span className="text-xs uppercase tracking-widest text-[var(--accent-gold)] font-mono">
            Competitive Record &amp; Publications
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[var(--text-primary)] mt-3">
            Hackathons, Competitions &amp; Research
          </h2>
          <div className="gold-hairline w-24 mx-auto mt-4" />
        </div>

        {/* Competitions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {competitions.map((item) => {
            const Icon = item.icon;
            return (
              <KokonutCard key={item.title} glow className="p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-xs font-mono text-[var(--accent-gold)] uppercase tracking-wider">
                      {item.organization}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[var(--accent-gold)] px-2.5 py-0.5 rounded-full bg-[var(--bg-base)] border border-[var(--accent-gold)]/30 font-semibold">
                      <Icon className="w-3.5 h-3.5" />
                      {item.status}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-medium text-[var(--text-primary)] mb-2">
                    {item.title}
                  </h3>

                  {item.participants && (
                    <p className="text-xs font-mono text-[var(--text-primary)]/70 mb-4">
                      Scale: {item.participants}
                    </p>
                  )}

                  {item.ranks && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.ranks.map((rank) => (
                        <span
                          key={rank}
                          className="px-2.5 py-1 rounded bg-[var(--bg-base)] text-xs font-mono text-[var(--accent-gold)] border border-[var(--accent-gold)]/40 font-semibold"
                        >
                          {rank}
                        </span>
                      ))}
                    </div>
                  )}

                  {item.note && (
                    <div className="p-3 rounded-lg bg-[var(--bg-base)]/80 border border-[var(--accent-gold)]/30 text-xs font-mono text-[var(--text-primary)]">
                      ★ {item.note}
                    </div>
                  )}
                </div>
              </KokonutCard>
            );
          })}
        </div>

        {/* Research Publication Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[var(--surface-dusk)] border border-[var(--accent-gold)]/40 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--bg-base)] border border-[var(--accent-gold)]/40 flex items-center justify-center text-[var(--accent-gold)] shrink-0">
                <BookCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-gold)] font-semibold">
                  Accepted &amp; Published Research
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-[var(--text-primary)] mt-0.5">
                  Research Abstract: Digital Twins in Healthcare
                </h3>
              </div>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono bg-[var(--bg-base)] border border-[var(--accent-gold)]/40 text-[var(--accent-gold)] self-start sm:self-auto">
              2026
            </span>
          </div>

          <div className="pt-4 space-y-2 text-xs sm:text-sm text-[var(--text-primary)]/85 leading-relaxed font-sans">
            <p>
              <strong className="text-[var(--text-primary)]">Conference:</strong> ICSHI 2026 (AICTE-sponsored).
            </p>
            <p>
              <strong className="text-[var(--text-primary)]">Authorship:</strong> Sole author of research abstract accepted and published at the conference.
            </p>
            <p>
              <strong className="text-[var(--text-primary)]">Topic:</strong> Digital Twins in Healthcare.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}