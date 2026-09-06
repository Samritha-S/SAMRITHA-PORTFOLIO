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
    <section id="journey" className="py-24 px-4 sm:px-6 lg:px-8 section-base relative">
      <div className="max-w-4xl mx-auto">
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

        {/* Timeline Container with Glowing Gold Spine */}
        <div className="relative pl-8 sm:pl-36">
          {/* Continuous Glowing Gold Spine */}
          <div className="absolute left-2 sm:left-28 top-3 bottom-6 w-[2px] gold-spine rounded-full pointer-events-none" />

          <div className="space-y-12">
            {milestones.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Year Label on the Left (Desktop) */}
                <div className="hidden sm:block absolute -left-36 top-1 text-right w-20">
                  <span className="font-serif text-base font-semibold text-[var(--accent-primary)] tracking-wide group-hover:text-[var(--accent-gold)] transition-colors">
                    {item.year}
                  </span>
                </div>

                {/* Glowing Gold Timeline Node */}
                <div className="absolute -left-[30px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[var(--bg-base)] border-2 border-[var(--accent-gold)] shadow-[0_0_10px_var(--gold-glow)] group-hover:bg-[var(--accent-gold)] group-hover:shadow-[0_0_16px_var(--accent-gold)] transition-all duration-300 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] group-hover:bg-[var(--bg-base)]" />
                </div>

                {/* Narrative Entry: Alternates Pastel Blue and Lavender with Beige text */}
                <div
                  className={`p-6 sm:p-7 rounded-xl border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] transition-all duration-300 shadow-md relative ${
                    index % 2 === 0
                      ? "bg-[#607785] text-[#F7F4D5]"
                      : "bg-[#7E6B8F] text-[#F7F4D5]"
                  }`}
                >
                  <div className="sm:hidden text-xs font-serif font-bold text-[#D3968C] mb-1.5">
                    {item.year}
                  </div>
                  <h3 className="font-serif text-xl font-medium text-[#F7F4D5] mb-2.5 flex items-center justify-between">
                    <span>{item.title}</span>
                    <Sparkles className="w-4 h-4 text-[#D3968C] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm text-[#F7F4D5]/90 leading-relaxed font-sans">
                    {item.story}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
