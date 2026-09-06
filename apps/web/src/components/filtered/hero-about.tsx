"use client";

import React from "react";
import { Terminal, Code2, ArrowDown } from "lucide-react";
import { ParticleButton } from "@/components/kokonutui/particle-button";
import { KokonutCard } from "@/components/kokonutui/card";

export function FilteredHeroAbout() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle cool grid overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#C9A24B_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          {/* Engineering Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--accent-gold)]/40 text-xs text-[var(--accent-gold)] mb-8 font-mono shadow-sm">
            <Terminal className="w-3.5 h-3.5" />
            <span>Computer Science Student • Full-Stack Developer • Builder</span>
          </div>

          {/* Locked Copy §5.3 */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[var(--text-primary)] tracking-tight leading-[1.15] mb-6">
            Hi, I&apos;m Samritha.
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-[var(--accent-gold)] mb-6">
            I build technology that turns ideas into useful, tangible experiences.
          </p>

          <p className="text-sm sm:text-base text-[var(--text-primary)]/80 leading-relaxed max-w-2xl mx-auto mb-6">
            From full-stack applications and AI-powered platforms to hackathon prototypes and digital-twin solutions, I enjoy taking a problem from &ldquo;what if?&rdquo; to &ldquo;it works.&rdquo;
          </p>

          <p className="text-sm sm:text-base text-[var(--text-primary)]/80 leading-relaxed max-w-2xl mx-auto mb-8">
            Currently exploring software engineering, AI, open source, and everything in between.
          </p>

          <div className="inline-block font-mono text-xs text-[var(--accent-gold)] tracking-widest uppercase border-y border-[var(--accent-gold)]/30 py-2 px-6 mb-10">
            Build. Learn. Break. Improve. Repeat.
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
              className="px-6 py-2.5 rounded-full border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] text-xs sm:text-sm font-medium text-[var(--text-primary)] transition-colors flex items-center gap-2"
            >
              Technical Philosophy
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
          <span className="text-xs uppercase tracking-widest text-[var(--accent-gold)] font-mono">
            Engineering Background
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[var(--text-primary)] mt-3">
            About Samritha
          </h2>
          <div className="gold-hairline w-24 mx-auto mt-4" />
        </div>

        <KokonutCard glow className="p-8 sm:p-12 space-y-6">
          {/* Locked Copy §5.4 */}
          <p className="text-sm sm:text-base text-[var(--text-primary)]/85 leading-relaxed">
            I&apos;m Samritha, a Computer Science and Engineering student who enjoys building, experimenting, and figuring things out along the way.
          </p>

          <p className="text-sm sm:text-base text-[var(--text-primary)]/85 leading-relaxed">
            My approach to technology is very hands-on. I learn best when I have something to build — whether that&apos;s a web application, an AI-powered tool, a mobile application, or a hackathon prototype built under a ridiculous deadline.
          </p>

          <p className="text-sm sm:text-base text-[var(--text-primary)]/85 leading-relaxed">
            I&apos;ve worked across different stages of development, from designing interfaces and building frontend systems to developing APIs, working with databases, integrating AI, and deploying applications. I&apos;ve also had the opportunity to lead teams, collaborate with other builders, and work on problems outside my usual comfort zone.
          </p>

          <p className="text-sm sm:text-base text-[var(--text-primary)]/85 leading-relaxed">
            I&apos;m particularly interested in the intersection of software engineering, AI, and real-world problem solving.
          </p>

          <div className="p-4 rounded-xl bg-[var(--bg-base)] border border-[var(--accent-gold)]/40 font-mono text-xs sm:text-sm text-[var(--accent-gold)]">
            <p>I don&apos;t consider myself someone who already knows everything.</p>
            <p className="mt-1 text-[var(--text-primary)] font-semibold">
              I&apos;m someone who is comfortable not knowing something — and stubborn enough to learn it.
            </p>
          </div>
        </KokonutCard>
      </section>
    </>
  );
}
