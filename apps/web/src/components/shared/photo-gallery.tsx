"use client";

import React, { useState } from "react";
import { useView } from "@/context/view-context";
import { X, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  story: string;
  date: string;
  aspect: string;
  tag: string;
  gradient: string;
  icon: string;
}

const unfilteredGallery: GalleryItem[] = [
  {
    id: "ug1",
    title: "Afternoon Light in the Corner",
    caption: "Golden hour streaming across handwritten notes and warm chai.",
    story:
      "There is a particular quietness that settles around 4:30 PM when the sun slants low through the balcony blinds. No deadlines, just ink on notebook paper and steam curling from a cup.",
    date: "Autumn 2024",
    aspect: "aspect-[4/3]",
    tag: "Atmosphere",
    gradient: "from-[#634832] via-[#4A3728] to-[#2B1F17]",
    icon: "☕",
  },
  {
    id: "ug2",
    title: "Rain on Ancient Stone",
    caption: "Quiet walk after a monsoon downpour, washed clean.",
    story:
      "Wandering through old cobblestone streets right after the sky clears. The smell of petrichor rising from heated granite and leaves dripping rhythmically overhead.",
    date: "Monsoon 2024",
    aspect: "aspect-[3/4]",
    tag: "Wandering",
    gradient: "from-[#2E3D48] via-[#202E38] to-[#141C24]",
    icon: "🌧️",
  },
  {
    id: "ug3",
    title: "Stray Friend Encounter",
    caption: "A friendly golden companion who demanded three full minutes of belly rubs.",
    story:
      "Came across this golden-coated street hero basking on a sunlit step. Walked up, offered a hand, and immediately received the gentlest nose nudge in return.",
    date: "July 2024",
    aspect: "aspect-square",
    tag: "Companions",
    gradient: "from-[#594A38] via-[#3E3427] to-[#262018]",
    icon: "🐕",
  },
  {
    id: "ug4",
    title: "Stacked Paperbacks & Highlighters",
    caption: "Poetry and prose marked with asterisks and folded corners.",
    story:
      "Books are meant to be lived in, not kept pristine. Margins filled with spontaneous questions, underlined phrases that hit like a physical weight, and dog-eared favorite pages.",
    date: "May 2024",
    aspect: "aspect-[4/3]",
    tag: "Reading",
    gradient: "from-[#483B52] via-[#362C3E] to-[#1E1724]",
    icon: "📖",
  },
];

const filteredGallery: GalleryItem[] = [
  {
    id: "fg1",
    title: "Hackathon 2AM Whiteboarding",
    caption: "Mapping out WebSocket event buses and distributed queue schemas.",
    story:
      "Midnight caffeine sprint during Smart India Hackathon. Dissecting the event pipeline on a half-erased glass partition while the live telemetry server was compiling.",
    date: "Hackathon Sprint",
    aspect: "aspect-[4/3]",
    tag: "Systems Design",
    gradient: "from-[#1B3A4B] via-[#102533] to-[#0A161F]",
    icon: "⚡",
  },
  {
    id: "fg2",
    title: "StadiumPulse Live Sensor Rig",
    caption: "Testing IoT hardware node latency during stadium load simulations.",
    story:
      "Calibrating ultrasound proximity nodes and thermal camera streams to track mock queue congestion in real time. Down to sub-80ms packet latency.",
    date: "Hardware Lab",
    aspect: "aspect-[3/4]",
    tag: "Hardware & IoT",
    gradient: "from-[#1F3D36] via-[#142924] to-[#0B1714]",
    icon: "📡",
  },
  {
    id: "fg3",
    title: "First Runner-Up Trophy & Pitch",
    caption: "Presenting the CarbonTrace live mitigation simulator to enterprise judges.",
    story:
      "Pitching live data pipelines to enterprise sustainability directors. Defending our carbon offset calculation logic under intense Q&A and taking second place overall.",
    date: "National Finals",
    aspect: "aspect-square",
    tag: "Awards",
    gradient: "from-[#3A331A] via-[#262111] to-[#141209]",
    icon: "🏆",
  },
  {
    id: "fg4",
    title: "Open Source Sprint",
    caption: "Collaborating with fellow builders across terminal sessions and pull requests.",
    story:
      "Fixing race conditions in distributed job queues. The irreplaceable thrill when tests flip green across the CI matrix and the PR is merged into upstream main.",
    date: "Code Sprint",
    aspect: "aspect-[4/3]",
    tag: "Community",
    gradient: "from-[#2A2B42] via-[#1C1D2D] to-[#10101A]",
    icon: "💻",
  },
];

export function PhotoGallery() {
  const { isFiltered } = useView();
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const items = isFiltered ? filteredGallery : unfilteredGallery;

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 section-elevated relative">
      <div className="max-w-6xl mx-auto">
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

        {/* Clean Modern Masonry / Responsive Grid (No rotation, no tape) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedItem(item)}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="group cursor-pointer rounded-xl bg-[var(--bg-base)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)]/80 hover:shadow-[0_8px_30px_var(--gold-glow)] transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Image Frame with Aspect Ratio */}
              <div
                className={`${item.aspect} w-full bg-gradient-to-br ${item.gradient} relative flex items-center justify-center overflow-hidden`}
              >
                <span className="text-4xl filter drop-shadow-md transform group-hover:scale-110 transition-transform duration-300 select-none">
                  {item.icon}
                </span>

                {/* Subtle Hover Zoom Overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-1.5 text-xs text-[var(--text-primary)] font-medium backdrop-blur-[2px]">
                  <ZoomIn className="w-4 h-4 text-[var(--accent-gold)]" />
                  <span>View Story</span>
                </div>

                {/* Category Tag pill */}
                <span className="absolute top-3 left-3 text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-[var(--bg-base)]/90 border border-[var(--border-subtle)] text-[var(--accent-secondary)]">
                  {item.tag}
                </span>
              </div>

              {/* Card Meta Content */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-medium text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent-gold)] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[var(--text-primary)]/70 leading-relaxed line-clamp-2 font-sans">
                    {item.caption}
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-[var(--border-subtle)] flex items-center justify-between text-[10px] text-[var(--text-primary)]/50">
                  <span>{item.date}</span>
                  <span className="text-[var(--accent-gold)] font-mono">Open Lightbox →</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal on Click */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="relative w-full max-w-2xl bg-[var(--bg-base)] border border-[var(--accent-gold)]/60 rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                aria-label="Close Lightbox"
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 text-white hover:text-[var(--accent-gold)] transition-colors z-20 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Large Image / Art Preview */}
              <div
                className={`h-56 sm:h-72 w-full bg-gradient-to-br ${selectedItem.gradient} relative flex items-center justify-center border-b border-[var(--border-subtle)]`}
              >
                <span className="text-6xl sm:text-7xl filter drop-shadow-xl select-none">
                  {selectedItem.icon}
                </span>

                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-[var(--bg-base)]/90 border border-[var(--accent-gold)]/50 text-[var(--accent-gold)]">
                    {selectedItem.tag}
                  </span>
                  <span className="text-xs font-mono text-white/80 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm">
                    {selectedItem.date}
                  </span>
                </div>
              </div>

              {/* Modal Body & Narrative Story */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[var(--text-primary)]">
                  {selectedItem.title}
                </h3>

                <p className="text-sm sm:text-base text-[var(--accent-gold)] italic font-serif">
                  &ldquo;{selectedItem.caption}&rdquo;
                </p>

                <div className="gold-hairline w-full my-2" />

                <p className="text-sm text-[var(--text-primary)]/85 leading-relaxed font-sans">
                  {selectedItem.story}
                </p>

                <div className="pt-4 flex justify-between items-center text-xs text-[var(--text-primary)]/50 font-mono">
                  <span>Samritha S • Visual Archive</span>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="text-[var(--accent-gold)] hover:underline cursor-pointer"
                  >
                    Press ESC or Click Outside to Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
