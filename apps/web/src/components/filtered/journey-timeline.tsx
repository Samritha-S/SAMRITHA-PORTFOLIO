"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Code2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export interface TechMilestone {
  id: string;
  year: string;
  title: string;
  story: string;
}

const defaultFilteredMilestones: TechMilestone[] = [
  {
    id: "f1",
    year: "2026",
    title: "Research Abstract Published at ICSHI 2026",
    story:
      "Sole author of an AICTE-sponsored research abstract on Digital Twins in Healthcare.",
  },
  {
    id: "f2",
    year: "2026",
    title: "IEEE Computer Society Hack Battle (HB-26)",
    story:
      "36-hour hackathon participant on Developer Tooling; led ingestion and chunking for codebase intelligence.",
  },
  {
    id: "f3",
    year: "2026",
    title: "Smart India Hackathon 2026",
    story:
      "Hardware-track submission for FenceSense, an intelligent electric fence monitoring system.",
  },
  {
    id: "f4",
    year: "2026",
    title: "PromptWars Virtual (StadiumPulse)",
    story:
      "Five challenges completed; engineered StadiumPulse, a GenAI crowd safety and stadium operations system.",
  },
  {
    id: "f5",
    year: "2026",
    title: "Founder's Office Intern — Imagivite Technology Pvt. Ltd.",
    story:
      "Bookymet QA testing and authored BRDs/PRDs for a regional ride-hailing venture.",
  },
  {
    id: "f6",
    year: "2026",
    title: "ABTalks Vicodathon",
    story:
      "Solo redesign of the ABTalks platform across three mobile-first screens using Antigravity and Vite/React/Tailwind.",
  },
];

import { useView } from "@/context/view-context";

export function FilteredJourneyTimeline({
  milestones: propMilestones = defaultFilteredMilestones,
}: {
  milestones?: TechMilestone[];
}) {
  const { liveContent } = useView();
  const [milestones, setMilestones] = useState<TechMilestone[]>(propMilestones);

  useEffect(() => {
    if (liveContent.milestones.length > 0) {
      const filtered = liveContent.milestones.filter((m) => m.view === "filtered");
      if (filtered.length > 0) setMilestones(filtered);
    }
  }, [liveContent.milestones]);

  useEffect(() => {
    supabase
      .from("milestones")
      .select("*")
      .eq("view", "filtered")
      .order("display_order", { ascending: true })
      .then(
        ({ data }) => {
          if (data && data.length > 0) setMilestones(data);
        },
        () => {}
      );
  }, []);

  return (
    <section id="journey-tech" className="py-24 px-4 sm:px-6 lg:px-8 section-base relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-[var(--accent-gold)] font-mono">
            Engineering Evolution
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[var(--text-primary)] mt-3">
            Technical Milestones
          </h2>
          <div className="gold-hairline w-24 mx-auto mt-4" />
          <p className="text-sm text-[var(--text-primary)]/80 max-w-lg mx-auto mt-4 leading-relaxed">
            The continuous evolution of technical craft, systems architecture, and engineering discipline.
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
                {/* Year Badge on the Left (for desktop) */}
                <div className="hidden sm:block absolute -left-36 top-1 text-right w-20">
                  <span className="font-mono text-sm font-semibold text-[var(--accent-primary)] tracking-wide group-hover:text-[var(--accent-gold)] transition-colors">
                    {item.year}
                  </span>
                </div>

                {/* Marker */}
                <div className="absolute -left-[30px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-sm bg-[var(--bg-base)] border-2 border-[var(--accent-gold)] shadow-[0_0_10px_var(--gold-glow)] group-hover:bg-[var(--accent-gold)] group-hover:shadow-[0_0_16px_var(--accent-gold)] transition-all duration-300 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-sm bg-[var(--accent-gold)] group-hover:bg-[var(--bg-base)]" />
                </div>

                {/* Content Card on Alternating Slate / Rosewood Surface */}
                <div
                  className={`p-6 sm:p-7 rounded-xl border border-[var(--border-subtle)] hover:border-[var(--accent-gold)]/60 transition-all duration-300 shadow-sm ${
                    index % 2 === 0
                      ? "bg-[var(--surface-dusk)]"
                      : "bg-[var(--surface-amethyst)]"
                  }`}
                >
                  <div className="sm:hidden text-xs font-mono font-bold text-[var(--accent-primary)] mb-1.5">
                    {item.year}
                  </div>
                  <h3 className="font-serif text-xl font-medium text-[var(--text-primary)] mb-2.5 flex items-center justify-between">
                    <span>{item.title}</span>
                    <Code2 className="w-4 h-4 text-[var(--accent-gold)]/70 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm text-[var(--text-primary)]/85 leading-relaxed font-sans">
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
