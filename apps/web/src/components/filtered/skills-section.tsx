"use client";

import React from "react";
import { Sparkles, Terminal, Code, Database, Cpu, Wrench } from "lucide-react";
import { KokonutCard } from "@/components/kokonutui/card";

export function SkillsSection() {
  const skillGroups = [
    {
      category: "Languages",
      icon: Code,
      items: ["Java", "Python", "C", "JavaScript", "TypeScript"],
    },
    {
      category: "Frontend",
      icon: Sparkles,
      items: ["React", "Next.js", "React Native", "Redux Toolkit", "Tailwind CSS"],
    },
    {
      category: "Backend",
      icon: Terminal,
      items: ["Node.js", "Express", "Fastify", "FastAPI"],
    },
    {
      category: "Databases & Infra",
      icon: Database,
      items: ["PostgreSQL", "MongoDB", "AWS S3", "Pinecone"],
    },
    {
      category: "AI / CV",
      icon: Cpu,
      items: ["GPT APIs", "Claude", "CLIP", "OpenCV", "FFmpeg"],
    },
    {
      category: "Tools & Protocols",
      icon: Wrench,
      items: ["Git", "GitHub", "VS Code", "REST APIs", "WebSockets"],
    },
  ];

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-widest text-[var(--accent-gold)] font-mono">
          Technical Inventory
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[var(--text-primary)] mt-3">
          Knowledge & Continuous Learning
        </h2>
        <div className="gold-hairline w-24 mx-auto mt-4" />
      </div>

      {/* Currently Learning Banner */}
      <div className="mb-12 p-6 rounded-2xl bg-[var(--card-surface)] border border-[var(--accent-gold)]/40 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-gold)] font-semibold">
              Currently Learning
            </span>
            <p className="text-base sm:text-lg font-serif text-[var(--text-primary)] mt-1">
              Data Structures &amp; Algorithms, Advanced Full-Stack Development, Artificial Intelligence, Open Source
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-[var(--bg-base)] border border-[var(--accent-gold)]/40 text-[var(--accent-gold)] shrink-0 self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-gold)] animate-pulse" />
            Active Focus
          </span>
        </div>
      </div>

      {/* What I Know Grid */}
      <div className="mb-12">
        <h3 className="font-serif text-2xl font-medium text-[var(--text-primary)] mb-6 text-center sm:text-left">
          What I Know
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group) => {
            const Icon = group.icon;
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

      {/* What I Want to Learn Next */}
      <div className="p-8 rounded-2xl bg-[var(--card-surface)] border border-[var(--border-subtle)] backdrop-blur-md">
        <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-gold)] font-semibold block mb-2">
          What I Want to Learn Next
        </span>
        <p className="text-base sm:text-lg text-[var(--text-primary)] leading-relaxed mb-6 font-serif">
          Deeper Software Engineering, AI Engineering, Open Source contribution, Cloud &amp; DevOps, CS Fundamentals
        </p>
        <blockquote className="border-l-2 border-[var(--accent-gold)] pl-4 italic text-sm text-[var(--text-primary)]/80">
          &ldquo;I&apos;m not trying to learn everything. I&apos;m trying to understand what I build.&rdquo;
        </blockquote>
      </div>
    </section>
  );
}
