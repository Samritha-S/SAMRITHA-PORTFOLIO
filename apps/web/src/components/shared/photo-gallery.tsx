"use client";

import React from "react";
import { useView } from "@/context/view-context";
import { Camera, Terminal } from "lucide-react";
import { KokonutCard } from "@/components/kokonutui/card";

interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  aspect: string;
  tag: string;
}

const unfilteredGallery: GalleryItem[] = [
  {
    id: "ug1",
    title: "Afternoon Light in the Corner",
    caption: "Golden hour streaming across handwritten notes and warm chai.",
    aspect: "aspect-[4/3]",
    tag: "Atmosphere",
  },
  {
    id: "ug2",
    title: "Rain on Ancient Stone",
    caption: "Quiet walk after a monsoon downpour, washed clean.",
    aspect: "aspect-square",
    tag: "Wandering",
  },
  {
    id: "ug3",
    title: "Stray Friend Encounter",
    caption: "A friendly golden retriever who demanded three full minutes of belly rubs.",
    aspect: "aspect-[3/4]",
    tag: "Companions",
  },
  {
    id: "ug4",
    title: "Stacked Paperbacks & Highlighters",
    caption: "Poetry and prose marked with asterisks and folded corners.",
    aspect: "aspect-[4/3]",
    tag: "Reading",
  },
];

const filteredGallery: GalleryItem[] = [
  {
    id: "fg1",
    title: "Hackathon 2AM Whiteboarding",
    caption: "Mapping out WebSocket event buses and distributed queue schemas.",
    aspect: "aspect-[4/3]",
    tag: "Systems Design",
  },
  {
    id: "fg2",
    title: "StadiumPulse Live Sensor Rig",
    caption: "Testing IoT hardware node latency during stadium load simulations.",
    aspect: "aspect-square",
    tag: "Hardware & IoT",
  },
  {
    id: "fg3",
    title: "First Runner-Up Trophy & Pitch",
    caption: "Presenting the CarbonTrace live mitigation simulator to enterprise judges.",
    aspect: "aspect-[3/4]",
    tag: "Awards",
  },
  {
    id: "fg4",
    title: "Open Source Sprint",
    caption: "Collaborating with fellow builders across terminal sessions and pull requests.",
    aspect: "aspect-[4/3]",
    tag: "Community",
  },
];

export function PhotoGallery() {
  const { isFiltered } = useView();

  const items = isFiltered ? filteredGallery : unfilteredGallery;

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-widest text-[var(--accent-gold)] font-mono">
          Visual Archive
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[var(--text-primary)] mt-3">
          {isFiltered ? "Builds, Sprints & Milestones" : "Moments & Film Grain"}
        </h2>
        <div className="gold-hairline w-24 mx-auto mt-4" />
        <p className="text-sm text-[var(--text-primary)]/80 max-w-xl mx-auto mt-4 leading-relaxed">
          {isFiltered
            ? "Behind the scenes at hackathons, design sprints, and system architectures."
            : "Snapshots of quiet places, ordinary wonder, and fleeting perspectives."}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <KokonutCard key={item.id} glow className="p-4 flex flex-col justify-between">
            {/* Visual Frame Placeholder */}
            <div
              className={`w-full ${item.aspect} rounded-xl bg-[var(--bg-base)] border border-[var(--border-subtle)] flex flex-col items-center justify-center relative overflow-hidden group`}
            >
              <div className="w-12 h-12 rounded-full bg-[var(--bg-elevated)]/60 border border-[var(--accent-gold)]/40 flex items-center justify-center text-[var(--accent-gold)] mb-2 group-hover:scale-110 transition-transform">
                {isFiltered ? (
                  <Terminal className="w-5 h-5" />
                ) : (
                  <Camera className="w-5 h-5" />
                )}
              </div>
              <span className="text-[10px] font-mono text-[var(--accent-gold)]">
                {item.tag}
              </span>
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-xs text-[var(--text-primary)] font-serif">
                  {item.title}
                </span>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-serif text-base font-medium text-[var(--text-primary)]">
                {item.title}
              </h4>
              <p className="text-xs text-[var(--text-primary)]/70 mt-1 leading-relaxed">
                {item.caption}
              </p>
            </div>
          </KokonutCard>
        ))}
      </div>
    </section>
  );
}
