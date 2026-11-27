"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Sparkles, Heart, ArrowDown } from "lucide-react";
import { ParticleButton } from "@/components/kokonutui/particle-button";
import { useView } from "@/context/view-context";

const EASE_EDITORIAL = [0.22, 1, 0.36, 1] as const;

export function UnfilteredHero() {
  const { settings, sections } = useView();
  const shouldReduceMotion = useReducedMotion();

  const title = settings?.unfiltered_hero_title || "Hi, I'm Samritha.";
  const subtitle = settings?.unfiltered_hero_subtitle || "A little curious, a little chaotic, and always finding something new to love.";
  const bio = settings?.unfiltered_hero_bio || "Here, you'll find the things that make me me — the songs I replay too much, places I want to wander through, stories I want to write, movies I can quote by heart, and all the little things that make ordinary days feel special.";
  const pill = sections.about.unfiltered.pill;

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 14 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: shouldReduceMotion ? 0.2 : 0.6,
      delay: shouldReduceMotion ? 0 : delay,
      ease: EASE_EDITORIAL,
    },
  });

  return (
    <section
      className="min-h-screen pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-28 lg:pb-12 px-6 sm:px-10 lg:pl-24 lg:pr-8 section-base flex items-center justify-center relative overflow-x-hidden"
    >
      <div className="max-w-[1200px] mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,464px)_minmax(0,1fr)] items-center gap-10 sm:gap-12 lg:gap-8 xl:gap-10">
          {/* Left: Existing Hero Introduction */}
          <div className="max-w-[464px] mx-auto lg:mx-0 text-center lg:text-left">
            {/* 1. Gentle Pill */}
            <motion.div
              {...fadeUp(0.05)}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--accent-primary)]/40 text-xs text-[var(--text-primary)] mb-6 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
              <span>{pill}</span>
            </motion.div>

            {/* 2. Dynamic Title */}
            <motion.h1
              {...fadeUp(0.16)}
              className="font-serif text-4xl sm:text-5xl xl:text-6xl font-normal text-[var(--text-primary)] tracking-tight leading-[1.12] mb-5"
            >
              {title}
            </motion.h1>

            {/* Subtle hairline under headline */}
            <motion.div
              {...fadeUp(0.21)}
              className="gold-hairline w-32 mx-auto lg:mx-0 mb-5"
            />

            {/* 3. Italic tagline */}
            <motion.p
              {...fadeUp(0.27)}
              className="font-serif italic text-lg sm:text-2xl text-[var(--accent-primary)] font-medium mb-5"
            >
              {subtitle}
            </motion.p>

            {/* 4. Introductory paragraphs */}
            <motion.p
              {...fadeUp(0.38)}
              className="text-sm sm:text-base text-[var(--text-primary)]/85 leading-relaxed mb-4"
            >
              Welcome to the part of the internet where I&apos;m not talking about projects, certifications, or deadlines.
            </motion.p>

            <motion.p
              {...fadeUp(0.47)}
              className="text-sm sm:text-base text-[var(--text-primary)]/85 leading-relaxed mb-8"
            >
              {bio}
            </motion.p>

            {/* 5. Hero CTAs */}
            <motion.div
              {...fadeUp(0.56)}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <motion.a
                href="#about"
                whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                whileTap={shouldReduceMotion ? undefined : { y: 0 }}
                transition={{ duration: 0.25, ease: EASE_EDITORIAL }}
                className="inline-block"
              >
                <ParticleButton
                  variant="primary"
                  className="bg-[var(--accent-primary)] text-[var(--text-on-dark)] font-semibold border-none hover:brightness-105 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Come stay a while
                  <Heart className="w-3.5 h-3.5 fill-current text-[var(--accent-gold)]" />
                </ParticleButton>
              </motion.a>
              <motion.a
                href="#interests"
                whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                whileTap={shouldReduceMotion ? undefined : { y: 0 }}
                transition={{ duration: 0.25, ease: EASE_EDITORIAL }}
                className="px-6 py-2.5 rounded-full border border-[var(--accent-primary)]/40 bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-primary)] transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-md text-xs sm:text-sm font-medium"
              >
                Explore Little Things
                <ArrowDown className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
              </motion.a>
            </motion.div>
          </div>

          {/* Right: Complete Canva Scrapbook Collage */}
          <motion.div
            initial={{
              opacity: 0,
              scale: shouldReduceMotion ? 1 : 0.96,
              y: shouldReduceMotion ? 0 : 10,
            }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0.2 : 0.75,
              delay: shouldReduceMotion ? 0 : 0.2,
              ease: EASE_EDITORIAL,
            }}
            className="flex items-center justify-center"
          >
            <motion.div
              animate={shouldReduceMotion ? undefined : { y: [0, -4.5, 0, 4.5, 0] }}
              transition={
                shouldReduceMotion
                  ? undefined
                  : {
                      duration: 7,
                      delay: 0.95,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
              className="w-full flex items-center justify-center"
            >
              <Image
                src="/collage/canva-collage.png"
                alt="Samritha's scrapbook collage"
                width={1024}
                height={768}
                priority
                className="w-full max-w-md sm:max-w-lg lg:max-w-[700px] h-auto object-contain select-none"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function UnfilteredAbout() {
  const { sections } = useView();
  const about = sections.about.unfiltered;

  return (
    <section
      id="about"
      className="py-24 px-4 sm:px-6 lg:px-8 section-base relative border-t border-[var(--border-subtle)]/40"
    >
      <div className="max-w-3xl mx-auto relative z-10">
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
          <p className="font-serif text-xl sm:text-2xl text-[var(--accent-primary)] leading-snug font-medium">
            {about.tagline}
          </p>

          {about.paragraphs.map((p, idx) => (
            <p key={idx} className="text-sm sm:text-base text-[var(--text-primary)]/90 leading-relaxed">
              {p}
            </p>
          ))}

          {/* Pull-quote: Inset panel in Deep Plum */}
          <div className="rounded-xl p-6 sm:p-8 mt-8 relative overflow-hidden bg-[var(--surface-plum)] border border-[var(--accent-secondary)]/35 shadow-md">
            <span className="font-serif text-5xl text-[var(--accent-gold)] leading-none select-none block mb-2 opacity-90">
              &ldquo;
            </span>
            <p className="italic font-serif text-lg sm:text-xl text-[var(--text-on-dark)] font-semibold -mt-3">
              {about.quote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function UnfilteredHeroAbout() {
  return (
    <>
      <UnfilteredHero />
      <UnfilteredAbout />
    </>
  );
}
