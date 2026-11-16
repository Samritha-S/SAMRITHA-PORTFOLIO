"use client";

import React from "react";
import { Terminal, Code2, ArrowDown } from "lucide-react";
import { ParticleButton } from "@/components/kokonutui/particle-button";
import FlowField from "@/components/kokonutui/flow-field";
import ConstellationField from "@/components/kokonutui/constellation-field";
import { useView } from "@/context/view-context";

export function FilteredHeroAbout() {
  const { settings } = useView();

  const title = settings?.filtered_hero_title || "Samritha S";
  const subtitle =
    settings?.filtered_hero_subtitle ||
    "Computer Science Engineering student at Sona College of Technology, Salem, Tamil Nadu. Expected graduation 2029.";
  const bio =
    settings?.filtered_hero_bio ||
    "Builds GenAI, web and data projects, mostly at hackathons, using Antigravity, Next.js/React, FastAPI and Gemini. Interested in entrepreneurship around MSME-scale problems.";

  return (
    <>
      {/* 1. Hero Section: FlowField noir theme */}
      <FlowField
        theme="noir"
        density="whisper"
        className="min-h-[92vh] pt-28 pb-20 px-4 sm:px-6 lg:px-8 section-base"
      >
        <div className="max-w-3xl mx-auto text-center relative z-10">
          {/* Engineering Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--bg-elevated)]/80 border border-[var(--accent-gold)]/40 text-xs text-[var(--accent-gold)] mb-8 font-mono shadow-sm backdrop-blur-sm">
            <Terminal className="w-3.5 h-3.5" />
            <span>Computer Science Engineering • Sona College of Technology (2029)</span>
          </div>

          {/* Dynamic Copy */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[var(--text-primary)] tracking-tight leading-[1.15] mb-6">
            {title}
          </h1>

          <div className="gold-hairline w-32 mx-auto mb-6" />

          <p className="font-serif text-xl sm:text-2xl text-[var(--accent-gold)] mb-6">
            {subtitle}
          </p>

          <p className="text-sm sm:text-base text-[var(--text-primary)]/80 leading-relaxed max-w-2xl mx-auto mb-6">
            {bio}
          </p>

          {/* Community Roles Badge */}
          <div className="inline-block font-mono text-xs text-[var(--accent-gold)] tracking-wider uppercase border-y border-[var(--accent-gold)]/30 py-2 px-6 mb-10">
            GSSoC Campus Ambassador • Google Student Ambassador
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#projects">
              <ParticleButton variant="gold">
                <Code2 className="w-4 h-4" />
                View Engineering Projects
              </ParticleButton>
            </a>
            <a
              href="#about"
              className="px-6 py-2.5 rounded-full border border-[var(--accent-secondary)] hover:border-[var(--accent-gold)] text-xs sm:text-sm font-medium text-[var(--text-primary)] bg-[var(--bg-base)]/60 hover:bg-[var(--bg-elevated)] transition-all duration-300 flex items-center gap-2 shadow-sm"
            >
              Background
              <ArrowDown className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            </a>
          </div>
        </div>
      </FlowField>

      {/* 2. About Section: On Blue Noir (section-base) */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 section-base relative border-t border-[var(--border-subtle)]/40 overflow-hidden">
        <ConstellationField
          className="absolute inset-0 pointer-events-none"
          backgroundColor="transparent"
          density={10000}
          connectionDistance={130}
          speed={0.12}
        />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[var(--accent-gold)] font-mono">
              Technical Background
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[var(--text-primary)] mt-3">
              About Samritha
            </h2>
            <div className="gold-hairline w-24 mx-auto mt-4" />
          </div>

          <div className="space-y-6">
            <p className="text-sm sm:text-base text-[var(--text-primary)]/90 leading-relaxed">
              Samritha S is a Computer Science Engineering student at Sona College of Technology in Salem, Tamil Nadu, with an expected graduation in 2029.
            </p>

            <p className="text-sm sm:text-base text-[var(--text-primary)]/90 leading-relaxed">
              She builds GenAI, web, and data projects—primarily developed during hackathons—working with Antigravity, Next.js/React, FastAPI, and Gemini.
            </p>

            <p className="text-sm sm:text-base text-[var(--text-primary)]/90 leading-relaxed">
              Her primary entrepreneurial interest centers on solving MSME-scale problems through technology and automation.
            </p>

            <div className="rounded-xl p-6 sm:p-8 font-mono text-xs sm:text-sm text-[var(--accent-gold)] bg-[var(--surface-amethyst)] border border-[var(--border-subtle)] relative overflow-hidden shadow-md">
              <span className="text-xs uppercase tracking-widest text-[var(--accent-gold)] font-mono block mb-2 font-semibold">
                Community Leadership
              </span>
              <p className="text-[var(--text-primary)]">
                • GSSoC Campus Ambassador
              </p>
              <p className="mt-1 text-[var(--text-primary)]">
                • Google Student Ambassador
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
