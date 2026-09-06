"use client";

import React from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export interface JourneyMilestone {
  id: string;
  year: string;
  title: string;
  story: string;
}

const defaultUnfilteredMilestones: JourneyMilestone[] = [
  {
    id: "u1",
    year: "2024",
    title: "Learning to Slow Down & Listen",
    story:
      "Began spending hours taking long walks with no destination, discovering that the thoughts that arrive in stillness are often the ones worth keeping.",
  },
  {
    id: "u2",
    year: "2023",
    title: "The Year of Ink & Cinema",
    story:
      "Filled journals with half-written poems, late-night character sketches, and rewatched Marvel phases until I could recite dialogues in rhythm.",
  },
  {
    id: "u3",
    year: "2022",
    title: "Curiosity Takes Root",
    story:
      "Discovered how thrilling it is to take something complex apart just to understand how ordinary people make extraordinary things work.",
  },
  {
    id: "u4",
    year: "Earlier Days",
    title: "The Habit of Observing",
    story:
      "Turned small moments into full narratives in my head, finding beauty in rainy windows, stray dogs, and quiet library corners.",
  },
];

export function UnfilteredJourneyTimeline({
  milestones = defaultUnfilteredMilestones,
}: {
  milestones?: JourneyMilestone[];
}) {
  return (
    <section id="journey" className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-widest text-[var(--accent-gold)] font-medium">
          Personal Milestones
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[var(--text-primary)] mt-3">
          The Journey
        </h2>
        <div className="gold-hairline w-24 mx-auto mt-4" />
        <p className="text-sm text-[var(--text-primary)]/80 max-w-lg mx-auto mt-4 leading-relaxed">
          Not a checklist of accolades, but the chapters that shaped how I see the world.
        </p>
      </div>

      <div className="relative border-l border-[var(--border-subtle)] ml-4 sm:ml-32 space-y-12 pl-6 sm:pl-8">
        {milestones.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group"
          >
            {/* Year Badge on the Left (for desktop) */}
            <div className="hidden sm:block absolute -left-36 top-0 text-right w-24">
              <span className="font-serif text-lg font-medium text-[var(--accent-gold)]">
                {item.year}
              </span>
            </div>

            {/* Glowing Timeline Marker */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-[var(--bg-base)] border-2 border-[var(--accent-gold)] group-hover:bg-[var(--accent-gold)] group-hover:shadow-[0_0_12px_var(--accent-gold)] transition-all duration-300 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] group-hover:bg-[var(--bg-base)]" />
            </div>

            {/* Content Card */}
            <div className="p-6 rounded-2xl bg-[var(--card-surface)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)]/60 transition-all duration-300">
              <div className="sm:hidden text-xs font-mono text-[var(--accent-gold)] mb-1">
                {item.year}
              </div>
              <h3 className="font-serif text-xl font-medium text-[var(--text-primary)] mb-2 flex items-center gap-2">
                {item.title}
                <Sparkles className="w-3.5 h-3.5 text-[var(--accent-gold)]/60 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-[var(--text-primary)]/80 leading-relaxed">
                {item.story}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
