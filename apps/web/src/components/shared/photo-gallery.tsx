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
    gradient: "from-[#2E1F3D] via-[#8B5FBF] to-[#D4AF7A]",
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
    gradient: "from-[#3D2B52] via-[#C98FA0] to-[#2E1F3D]",
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
    gradient: "from-[#8B5FBF] via-[#3D2B52] to-[#D4AF7A]",
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
    gradient: "from-[#2E1F3D] via-[#C98FA0] to-[#8B5FBF]",
    icon: "📖",
  },
  {
    id: "ug5",
    title: "Film Grain on Evening Skyline",
    caption: "Dusk turning from amber gold to indigo across city rooftops.",
    story:
      "Watching the streetlights flicker alive one by one as the horizon softens into dusk. A snapshot captured on 35mm film with warm natural grain.",
    date: "August 2024",
    aspect: "aspect-[3/4]",
    tag: "Film Grain",
    gradient: "from-[#3D2B52] via-[#D4AF7A] to-[#2E1F3D]",
    icon: "🎞️",
  },
  {
    id: "ug6",
    title: "Quiet Train Window Reflections",
    caption: "Miles slipping past green fields on an unhurried journey.",
    story:
      "Looking out of a train window with headphones on, watching shadows race across fields while the world blurs into abstract brushstrokes.",
    date: "April 2024",
    aspect: "aspect-square",
    tag: "Journeys",
    gradient: "from-[#8B5FBF] via-[#C98FA0] to-[#3D2B52]",
    icon: "🚂",
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
  {
    id: "fg5",
    title: "Edge Compute Cluster Benchmarks",
    caption: "Stress-testing container clusters under distributed burst traffic.",
    story:
      "Deploying microservice pods across edge nodes to analyze tail latencies and failover recovery windows during sustained benchmark saturation.",
    date: "Infra Lab",
    aspect: "aspect-[3/4]",
    tag: "Infrastructure",
    gradient: "from-[#1A2E3B] via-[#12212B] to-[#0B151C]",
    icon: "⚙️",
  },
  {
    id: "fg6",
    title: "AI Model Evaluation Matrix",
    caption: "Validating multi-modal embedding distances against custom benchmark datasets.",
    story:
      "Comparing embedding cluster separations across high-dimensional vector spaces to verify classifier robustness under real-world noisy sensor inputs.",
    date: "Research",
    aspect: "aspect-square",
    tag: "Machine Learning",
    gradient: "from-[#2C2138] via-[#1E1727] to-[#120D18]",
    icon: "🧠",
  },
];

export function PhotoGallery() {
  const { isFiltered } = useView();
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const items = isFiltered ? filteredGallery : unfilteredGallery;

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 section-base relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-widest text-[var(--accent-gold)] font-mono">
            Visual Archive
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[var(--text-primary)] mt-3">
            {isFiltered ? "Builds, Sprints & Milestones" : "Moments & Film Grain"}
          </h2>
          <div className="gold-hairline w-24 mx-auto mt-4" />
          <p className="text-sm text-[var(--text-primary)]/75 max-w-lg mx-auto mt-4 leading-relaxed">
            {isFiltered
              ? "Behind the scenes at hackathons, hardware prototypes, and system sprints."
              : "Snapshots of quiet places, ordinary afternoons, and fleeting perspectives."}
          </p>
        </div>

        {/* Pure Photo Grid: Images Only — No card wrappers, No text under photos, No tags on grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {items.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.025, y: -4 }}
              onClick={() => setSelectedItem(item)}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={`${item.aspect} w-full rounded-xl overflow-hidden relative cursor-pointer group shadow-md border border-[var(--border-subtle)]/70 hover:border-[var(--accent-gold)] hover:shadow-[0_8px_30px_var(--gold-glow)] transition-all duration-300 bg-gradient-to-br ${item.gradient} flex items-center justify-center`}
            >
              {/* Image Subject */}
              <span className="text-4xl sm:text-5xl filter drop-shadow-md transform group-hover:scale-110 transition-transform duration-300 select-none">
                {item.icon}
              </span>

              {/* Minimal Hover Overlay with Zoom Glyph */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                <div className="w-10 h-10 rounded-full bg-black/60 border border-[var(--accent-gold)]/70 flex items-center justify-center text-[var(--accent-gold)] shadow-lg transform group-hover:scale-100 scale-75 transition-transform duration-300">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal on Click: Captions, story, tag, and date live exclusively here */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Card */}
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
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black border border-white/20 text-white hover:text-[var(--accent-gold)] transition-colors z-20 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* High-Resolution Image Frame */}
              <div
                className={`h-60 sm:h-76 w-full bg-gradient-to-br ${selectedItem.gradient} relative flex items-center justify-center border-b border-[var(--border-subtle)]`}
              >
                <span className="text-6xl sm:text-7xl filter drop-shadow-xl select-none">
                  {selectedItem.icon}
                </span>

                {/* Metadata Pills Inside Lightbox */}
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-[var(--bg-base)]/90 border border-[var(--accent-gold)]/50 text-[var(--accent-gold)]">
                    {selectedItem.tag}
                  </span>
                  <span className="text-xs font-mono text-white/80 bg-black/50 px-2.5 py-1 rounded-full backdrop-blur-sm">
                    {selectedItem.date}
                  </span>
                </div>
              </div>

              {/* Lightbox Story Body */}
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
                    Click Outside or Press ESC to Close
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
