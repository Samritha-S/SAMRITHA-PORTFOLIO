"use client";

import React from "react";
import { Sparkles, Heart, ArrowDown } from "lucide-react";
import { ParticleButton } from "@/components/kokonutui/particle-button";
import BackgroundPaths from "@/components/kokonutui/background-paths";

export function UnfilteredHeroAbout() {
  return (
    <>
      {/* 1. Hero Section: BackgroundPaths on Weathered Pewter */}
      <BackgroundPaths
        className="min-h-[92vh] pt-28 pb-20 px-4 sm:px-6 lg:px-8 section-base"
      >
        <div className="max-w-3xl mx-auto text-center relative z-10">
          {/* Gentle Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#105666] border border-[#105666] text-xs text-[#F7F4D5] mb-8 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D8A7A0]" />
            <span>Unfiltered Personal Space</span>
          </div>

          {/* Locked Copy §5.1 */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[var(--text-primary)] tracking-tight leading-[1.15] mb-6">
            Hi, I&apos;m Samritha.
          </h1>

          {/* Subtle hairline under headline */}
          <div className="gold-hairline w-32 mx-auto mb-6" />

          <p className="font-serif italic text-lg sm:text-2xl text-[var(--accent-secondary)] font-medium mb-6">
            A little curious, a little chaotic, and always finding something new to love.
          </p>

          <p className="text-sm sm:text-base text-[var(--text-primary)]/90 leading-relaxed max-w-2xl mx-auto mb-6">
            Welcome to the part of the internet where I&apos;m not talking about projects, certifications, or deadlines.
          </p>

          <p className="text-sm sm:text-base text-[var(--text-primary)]/90 leading-relaxed max-w-2xl mx-auto mb-10">
            Here, you&apos;ll find the things that make me me — the songs I replay too much, places I want to wander through, stories I want to write, movies I can quote by heart, and all the little things that make ordinary days feel special.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#about">
              <ParticleButton className="bg-[var(--accent-primary)] text-[#F7F4D5] border-none hover:brightness-105 shadow-md">
                Come stay a while
                <Heart className="w-3.5 h-3.5 fill-current text-[#F7F4D5]" />
              </ParticleButton>
            </a>
            <a
              href="#interests"
              className="px-6 py-2.5 rounded-full border border-[var(--accent-secondary)] bg-[var(--accent-secondary)] text-[#F7F4D5] hover:brightness-110 transition-all duration-300 flex items-center gap-2 shadow-md text-xs sm:text-sm font-medium"
            >
              Explore Little Things
              <ArrowDown className="w-3.5 h-3.5 text-[#F7F4D5]" />
            </a>
          </div>
        </div>
      </BackgroundPaths>

      {/* 2. About Section: On Weathered Pewter (section-base) */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 section-base relative border-t border-[var(--border-subtle)]/40">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[var(--accent-gold)] font-medium">
              A Quiet Introduction
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[var(--text-primary)] mt-3">
              About Samritha
            </h2>
            <div className="gold-hairline w-24 mx-auto mt-4" />
          </div>

          <div className="space-y-6">
            {/* Locked Copy §5.2 */}
            <p className="font-serif text-xl sm:text-2xl text-[var(--accent-gold)] leading-snug">
              I&apos;m Samritha — but Sam works just fine.
            </p>

            <p className="text-sm sm:text-base text-[var(--text-primary)]/90 leading-relaxed">
              I&apos;m someone who&apos;s constantly observing, thinking, questioning, and imagining. I tend to notice little details that other people might overlook, and I have a habit of turning random thoughts into entire stories in my head.
            </p>

            <p className="text-sm sm:text-base text-[var(--text-primary)]/90 leading-relaxed">
              I&apos;m drawn to things that have character — people with interesting stories, places that feel different, ideas that make me stop and think, and moments that somehow become memories.
            </p>

            <p className="text-sm sm:text-base text-[var(--text-primary)]/90 leading-relaxed">
              I&apos;m still figuring out who I&apos;m becoming, and I don&apos;t think I need to have the whole answer yet. There are plenty of things I want to experience, places I want to see, and versions of myself I haven&apos;t met yet.
            </p>

            <p className="text-sm sm:text-base text-[var(--text-primary)]/90 leading-relaxed">
              So this page is a small snapshot of me right now — not a finished version, just a work in progress.
            </p>

            {/* Pull-quote: Inset panel in Rosy brown */}
            <div className="rounded-xl p-6 sm:p-8 mt-8 relative overflow-hidden bg-[var(--surface-amethyst)] border border-[#105666]/30 shadow-md">
              <span className="font-serif text-5xl text-[#F7F4D5] leading-none select-none block mb-2 opacity-90">
                &ldquo;
              </span>
              <p className="italic font-serif text-lg sm:text-xl text-[#F7F4D5] font-semibold -mt-3">
                And honestly, I think that&apos;s more interesting.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
