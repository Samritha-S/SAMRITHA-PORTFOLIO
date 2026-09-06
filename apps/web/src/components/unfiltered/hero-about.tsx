"use client";

import React from "react";
import { Sparkles, Heart, ArrowDown } from "lucide-react";
import { ParticleButton } from "@/components/kokonutui/particle-button";
import { KokonutCard } from "@/components/kokonutui/card";

export function UnfilteredHeroAbout() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[var(--accent-gold)]/10 blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          {/* Gentle Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--accent-gold)]/40 text-xs text-[var(--accent-gold)] mb-8 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Unfiltered Personal Space</span>
          </div>

          {/* Locked Copy §5.1 */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[var(--text-primary)] tracking-tight leading-[1.15] mb-6">
            Hi, I&apos;m Samritha. 🌿
          </h1>

          <p className="font-serif italic text-lg sm:text-2xl text-[var(--text-primary)]/90 mb-6">
            A little curious, a little chaotic, and always finding something new to love.
          </p>

          <p className="text-sm sm:text-base text-[var(--text-primary)]/80 leading-relaxed max-w-2xl mx-auto mb-6">
            Welcome to the part of the internet where I&apos;m not talking about projects, certifications, or deadlines.
          </p>

          <p className="text-sm sm:text-base text-[var(--text-primary)]/80 leading-relaxed max-w-2xl mx-auto mb-10">
            Here, you&apos;ll find the things that make me me — the songs I replay too much, places I want to wander through, stories I want to write, movies I can quote by heart, and all the little things that make ordinary days feel special.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#about">
              <ParticleButton>
                Come stay a while
                <Heart className="w-3.5 h-3.5 fill-current" />
              </ParticleButton>
            </a>
            <a
              href="#interests"
              className="px-6 py-2.5 rounded-full border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] text-xs sm:text-sm font-medium text-[var(--text-primary)] transition-colors flex items-center gap-2"
            >
              Explore Little Things
              <ArrowDown className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            </a>
          </div>
        </div>
      </section>

      {/* Gold Divider */}
      <div className="gold-hairline max-w-4xl mx-auto" />

      {/* About Section */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-[var(--accent-gold)] font-medium">
            A Quiet Introduction
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[var(--text-primary)] mt-3">
            About Samritha
          </h2>
          <div className="gold-hairline w-24 mx-auto mt-4" />
        </div>

        <KokonutCard glow className="p-8 sm:p-12 space-y-6">
          {/* Locked Copy §5.2 */}
          <p className="font-serif text-xl sm:text-2xl text-[var(--accent-gold)] leading-snug">
            I&apos;m Samritha — but Sam works just fine.
          </p>

          <p className="text-sm sm:text-base text-[var(--text-primary)]/85 leading-relaxed">
            I&apos;m someone who&apos;s constantly observing, thinking, questioning, and imagining. I tend to notice little details that other people might overlook, and I have a habit of turning random thoughts into entire stories in my head.
          </p>

          <p className="text-sm sm:text-base text-[var(--text-primary)]/85 leading-relaxed">
            I&apos;m drawn to things that have character — people with interesting stories, places that feel different, ideas that make me stop and think, and moments that somehow become memories.
          </p>

          <p className="text-sm sm:text-base text-[var(--text-primary)]/85 leading-relaxed">
            I&apos;m still figuring out who I&apos;m becoming, and I don&apos;t think I need to have the whole answer yet. There are plenty of things I want to experience, places I want to see, and versions of myself I haven&apos;t met yet.
          </p>

          <p className="text-sm sm:text-base text-[var(--text-primary)]/85 leading-relaxed">
            So this page is a small snapshot of me right now — not a finished version, just a work in progress.
          </p>

          <blockquote className="border-l-2 border-[var(--accent-gold)] pl-4 py-1 italic font-serif text-base sm:text-lg text-[var(--accent-gold)]">
            &ldquo;And honestly, I think that&apos;s more interesting.&rdquo;
          </blockquote>
        </KokonutCard>
      </section>
    </>
  );
}
