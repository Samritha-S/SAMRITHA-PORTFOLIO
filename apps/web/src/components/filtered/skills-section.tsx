"use client";

import React from "react";
import { Sparkles, Terminal, Code, Database, Cpu, Wrench, Layers, BookOpen, GraduationCap } from "lucide-react";
import { KokonutCard } from "@/components/kokonutui/card";
import ConstellationField from "@/components/kokonutui/constellation-field";

import { useView } from "@/context/view-context";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Languages: Code,
  Frontend: Sparkles,
  Backend: Terminal,
  "Databases & Infra": Database,
  "AI & CV": Cpu,
  Tools: Wrench,
  Also: Layers,
};

export function SkillsSection() {
  const { sections } = useView();
  const { currentlyLearning, groups, courseworkTitle, coursework } = sections.skills;

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 section-base relative overflow-hidden">
      <ConstellationField
        className="absolute inset-0 pointer-events-none"
        backgroundColor="transparent"
        density={12000}
        connectionDistance={130}
        speed={0.10}
      />
      <div className="max-w-6xl mx-auto relative z-10 space-y-16">
        <div className="text-center">
          <span className="text-xs uppercase tracking-widest text-[var(--accent-gold)] font-mono">
            Technical Inventory
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[var(--text-primary)] mt-3">
            What I Know
          </h2>
          <div className="gold-hairline w-24 mx-auto mt-4" />
        </div>

        {/* Currently Learning Banner */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[var(--card-surface)] border border-[var(--accent-gold)]/40 backdrop-blur-md shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-gold)] font-semibold flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5" />
                Currently Learning
              </span>
              <ul className="space-y-1 text-sm sm:text-base font-serif text-[var(--text-primary)]">
                {currentlyLearning.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-[var(--bg-base)] border border-[var(--accent-gold)]/40 text-[var(--accent-gold)] shrink-0 self-start sm:self-auto font-mono">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-gold)] animate-pulse" />
              Active Focus
            </span>
          </div>
        </div>

        {/* What I Know Grid */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group) => {
              const Icon = ICON_MAP[group.category] ?? Code;
              return (
                <KokonutCard key={group.category} glow className="p-6">
                  <div className="flex items-center gap-2.5 mb-4 text-[var(--accent-gold)]">
                    <Icon className="w-4 h-4" />
                    <h4 className="font-mono text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">
                      {group.category}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[var(--bg-base)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)]/50 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </KokonutCard>
              );
            })}
          </div>
        </div>

        {/* Coursework (Semester 3) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[var(--card-surface)] border border-[var(--border-subtle)] backdrop-blur-md shadow-md">
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap className="w-5 h-5 text-[var(--accent-gold)]" />
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-[var(--text-primary)]">
              {courseworkTitle}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coursework.map((course) => (
              <div
                key={course.code}
                className="p-4 rounded-xl bg-[var(--bg-base)]/80 border border-[var(--border-subtle)] flex flex-col justify-between"
              >
                <span className="text-sm font-medium text-[var(--text-primary)]">
                  {course.title}
                </span>
                <span className="text-xs font-mono text-[var(--accent-gold)] mt-2">
                  {course.code}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}