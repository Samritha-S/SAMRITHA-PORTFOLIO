"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Music,
  Compass,
  Footprints,
  BookOpen,
  Sparkles,
  Heart,
  Volume2,
  VolumeX,
} from "lucide-react";

export function InterestsSection() {
  return (
    <section id="interests" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-widest text-[var(--accent-gold)] font-medium">
          The Things That Make Me Me
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[var(--text-primary)] mt-3">
          Interests & Little Obsessions
        </h2>
        <div className="gold-hairline w-24 mx-auto mt-4" />
        <p className="text-sm text-[var(--text-primary)]/80 max-w-xl mx-auto mt-4 leading-relaxed">
          Not certificates, not deadlines — just the passions, curiosities, and quirks
          that breathe life into ordinary days.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. Music Waveform Scrub Module */}
        <MusicModule />

        {/* 2. Mint Chocolate Chip Module */}
        <MintChocChipModule />

        {/* 3. Marvel Comic Flip Module */}
        <MarvelModule />

        {/* 4. Walking / Path Wanderer Module */}
        <WalkingModule />

        {/* 5. Pet Every Dog I See (Interactive Cursor Follow) */}
        <DogPettingModule />

        {/* 6. Poetry & Writing Module */}
        <PoetryModule />

        {/* 7. Travelling Postcard Stack (Span 2 or 3) */}
        <div className="md:col-span-2 lg:col-span-3">
          <TravellingPostcardsModule />
        </div>
      </div>
    </section>
  );
}

/* 1. Music Waveform */
function MusicModule() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrubPosition, setScrubPosition] = useState(35);
  const bars = [40, 65, 85, 30, 95, 75, 45, 90, 60, 100, 70, 50, 80, 65, 90, 40, 75, 95, 55, 35];

  return (
    <div className="rounded-2xl p-6 bg-[var(--card-surface)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)]/60 transition-all duration-300 relative overflow-hidden group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-[var(--accent-gold)]">
          <Music className="w-5 h-5" />
          <span className="text-xs uppercase tracking-wider font-semibold">Music</span>
        </div>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label="Toggle music sound state"
          suppressHydrationWarning
          className="p-1.5 rounded-full bg-[var(--bg-base)] border border-[var(--border-subtle)] text-[var(--accent-gold)] hover:scale-110 transition-transform cursor-pointer"
        >
          {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>

      <h3 className="font-serif text-xl font-medium text-[var(--text-primary)] mb-2">
        Songs on Infinite Loop
      </h3>
      <p className="text-xs text-[var(--text-primary)]/75 leading-relaxed mb-6">
        The songs I replay too much until every note, bassline, and subtle whisper feels like a home I know by heart.
      </p>

      {/* Interactive Waveform Scrub */}
      <div
        className="h-16 flex items-end justify-between gap-1 py-2 cursor-pointer bg-[var(--bg-base)]/50 rounded-xl px-3 border border-[var(--border-subtle)]"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const percent = ((e.clientX - rect.left) / rect.width) * 100;
          setScrubPosition(Math.max(0, Math.min(100, percent)));
        }}
      >
        {bars.map((height, i) => {
          const barPercent = (i / (bars.length - 1)) * 100;
          const isPassed = barPercent <= scrubPosition;
          return (
            <motion.div
              key={i}
              animate={{
                height: isPlaying ? [`${height * 0.4}%`, `${height}%`, `${height * 0.6}%`] : `${height}%`,
              }}
              transition={{
                duration: 0.8 + (i % 5) * 0.15,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                backgroundColor: isPassed ? "var(--accent-gold)" : "rgba(145, 150, 122, 0.3)",
              }}
              className="w-1.5 rounded-full transition-colors duration-150"
            />
          );
        })}
      </div>
      <div className="flex justify-between items-center text-[10px] text-[var(--text-primary)]/60 mt-2">
        <span>Scrub the waveform</span>
        <span className="text-[var(--accent-gold)]">{isPlaying ? "Now Vibing" : "Click to Play"}</span>
      </div>
    </div>
  );
}

/* 2. Mint Chocolate Chip */
function MintChocChipModule() {
  const [bites, setBites] = useState(0);

  return (
    <div
      onClick={() => setBites((b) => (b + 1) % 5)}
      className="rounded-2xl p-6 bg-[var(--card-surface)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)]/60 transition-all duration-300 relative overflow-hidden cursor-pointer select-none group"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs uppercase tracking-wider font-semibold text-[var(--accent-primary)]">
          Guilty Pleasure
        </span>
        <span className="text-xs text-[var(--accent-gold)] font-mono">Bite {bites}/4</span>
      </div>

      <h3 className="font-serif text-xl font-medium text-[var(--text-primary)] mb-2">
        Mint Chocolate Chip
      </h3>
      <p className="text-xs text-[var(--text-primary)]/75 leading-relaxed mb-6">
        Superior flavor debate settled. Crisp, refreshing cooling mint studded with bittersweet chocolate flakes. Pure joy.
      </p>

      {/* Scoop interactive visual */}
      <div className="h-24 flex items-center justify-center relative">
        <motion.div
          animate={{ rotate: bites * 12, scale: 1 - bites * 0.06 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-[#A8D5BA] to-[#7EA18C] shadow-inner relative flex items-center justify-center border border-[var(--accent-gold)]/40"
        >
          {/* Chocolate chips */}
          <span className="absolute top-4 left-5 w-2 h-2 rounded bg-[#3D2B1F]" />
          <span className="absolute bottom-5 right-5 w-2.5 h-2.5 rounded bg-[#3D2B1F]" />
          <span className="absolute top-8 right-6 w-1.5 h-1.5 rounded bg-[#3D2B1F]" />
          <span className="absolute bottom-6 left-6 w-2 h-2 rounded bg-[#3D2B1F]" />
          <span className="text-2xl">🍦</span>
        </motion.div>
      </div>
      <p className="text-center text-[10px] text-[var(--text-primary)]/60 mt-1">
        Tap the scoop to take a taste
      </p>
    </div>
  );
}

/* 3. Marvel Comic Flip */
function MarvelModule() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const quotes = [
    { text: "I love you 3000.", who: "Tony Stark" },
    { text: "Part of the journey is the end.", who: "Iron Man" },
    { text: "Whatever it takes.", who: "The Avengers" },
    { text: "With great power comes great responsibility.", who: "Peter Parker" },
  ];

  return (
    <div
      onClick={() => setQuoteIndex((i) => (i + 1) % quotes.length)}
      className="rounded-2xl p-6 bg-[var(--card-surface)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)]/60 transition-all duration-300 relative overflow-hidden cursor-pointer select-none group"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs uppercase tracking-wider font-semibold text-[var(--accent-gold)]">
          Cinema & Lore
        </span>
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--bg-base)] border border-[var(--border-subtle)] text-[var(--accent-gold)]">
          Marvel Universe
        </span>
      </div>

      <h3 className="font-serif text-xl font-medium text-[var(--text-primary)] mb-2">
        Quoting Movies By Heart
      </h3>
      <p className="text-xs text-[var(--text-primary)]/75 leading-relaxed mb-4">
        Stories of courage, sacrifice, and heroes who bleed and still stand back up.
      </p>

      <div className="p-4 rounded-xl bg-[var(--bg-base)]/70 border border-[var(--accent-gold)]/30 min-h-[85px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={quoteIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <p className="font-serif italic text-sm text-[var(--text-primary)]">
              &ldquo;{quotes[quoteIndex].text}&rdquo;
            </p>
            <span className="block text-[11px] text-[var(--accent-gold)] mt-1 font-sans">
              — {quotes[quoteIndex].who}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="text-center text-[10px] text-[var(--text-primary)]/50 mt-3">
        Tap card to reveal next quote
      </div>
    </div>
  );
}

/* 4. Walking Step Path */
function WalkingModule() {
  const [steps, setSteps] = useState(4200);

  return (
    <div
      onClick={() => setSteps((s) => s + 500)}
      className="rounded-2xl p-6 bg-[var(--card-surface)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)]/60 transition-all duration-300 relative overflow-hidden cursor-pointer group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-[var(--accent-primary)]">
          <Footprints className="w-5 h-5" />
          <span className="text-xs uppercase tracking-wider font-semibold">Walking</span>
        </div>
        <span className="text-xs text-[var(--accent-gold)] font-mono">{steps.toLocaleString()} steps</span>
      </div>

      <h3 className="font-serif text-xl font-medium text-[var(--text-primary)] mb-2">
        Wandering Without a Map
      </h3>
      <p className="text-xs text-[var(--text-primary)]/75 leading-relaxed mb-4">
        Long solitary walks where my best ideas are born, observing small details, architecture, trees, and changing skies.
      </p>

      {/* Path Line Animation */}
      <div className="h-16 flex items-center justify-center relative">
        <svg viewBox="0 0 200 40" className="w-full h-10 overflow-visible">
          <path
            d="M 10 20 Q 50 5 90 25 T 180 15"
            fill="none"
            stroke="var(--accent-gold)"
            strokeWidth="2"
            strokeDasharray="4 4"
            opacity={0.8}
          />
          <circle cx="180" cy="15" r="4" fill="var(--accent-gold)">
            <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
      <p className="text-center text-[10px] text-[var(--text-primary)]/50">
        Click to take another stride
      </p>
    </div>
  );
}

/* 5. Pet Every Dog I See */
function DogPettingModule() {
  const [pets, setPets] = useState(0);
  const [tailWag, setTailWag] = useState(false);

  const handlePet = () => {
    setPets((p) => p + 1);
    setTailWag(true);
    setTimeout(() => setTailWag(false), 600);
  };

  return (
    <div
      onClick={handlePet}
      className="rounded-2xl p-6 bg-[var(--card-surface)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)]/60 transition-all duration-300 relative overflow-hidden cursor-pointer select-none group"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs uppercase tracking-wider font-semibold text-[var(--accent-gold)]">
          Universal Law
        </span>
        <div className="flex items-center gap-1 text-xs text-[var(--accent-gold)]">
          <Heart className="w-3.5 h-3.5 fill-current" />
          <span>{pets} pets given</span>
        </div>
      </div>

      <h3 className="font-serif text-xl font-medium text-[var(--text-primary)] mb-2">
        Petting Every Dog I See
      </h3>
      <p className="text-xs text-[var(--text-primary)]/75 leading-relaxed mb-4">
        Non-negotiable. If there is a furry friend within a 100-meter radius, I will stop, ask, and give them the ear scratches they deserve.
      </p>

      {/* Dog Interactive visual */}
      <div className="h-16 flex items-center justify-center gap-3">
        <span className="text-3xl">🐕</span>
        <motion.span
          animate={{ rotate: tailWag ? [0, 25, -25, 20, 0] : [0, 8, -8, 0] }}
          transition={{ duration: 0.5, repeat: tailWag ? 2 : Infinity }}
          className="text-xl inline-block origin-bottom-left"
        >
          ✨
        </motion.span>
      </div>
      <p className="text-center text-[10px] text-[var(--text-primary)]/50 mt-2">
        Click to pet and wag tail
      </p>
    </div>
  );
}

/* 6. Poetry & Writing */
function PoetryModule() {
  const [verseIdx, setVerseIdx] = useState(0);
  const verses = [
    "I have a habit of turning random thoughts into entire stories in my head.",
    "Words give permanence to things the wind would otherwise steal.",
    "Observing quiet corners where memory chooses to settle.",
  ];

  return (
    <div
      onClick={() => setVerseIdx((v) => (v + 1) % verses.length)}
      className="rounded-2xl p-6 bg-[var(--card-surface)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)]/60 transition-all duration-300 relative overflow-hidden cursor-pointer select-none group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-[var(--accent-gold)]">
          <BookOpen className="w-5 h-5" />
          <span className="text-xs uppercase tracking-wider font-semibold">Poetry & Words</span>
        </div>
        <Sparkles className="w-4 h-4 text-[var(--accent-gold)]" />
      </div>

      <h3 className="font-serif text-xl font-medium text-[var(--text-primary)] mb-2">
        Written in Ink & Moonlight
      </h3>
      <p className="text-xs text-[var(--text-primary)]/75 leading-relaxed mb-4">
        Capturing the fleeting emotions, thoughts, and unspoken beauty of ordinary afternoons.
      </p>

      <div className="p-4 rounded-xl bg-[var(--bg-base)]/80 border border-[var(--accent-gold)]/30 min-h-[75px] flex items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={verseIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="font-serif italic text-sm text-[var(--text-primary)]"
          >
            &ldquo;{verses[verseIdx]}&rdquo;
          </motion.p>
        </AnimatePresence>
      </div>
      <p className="text-center text-[10px] text-[var(--text-primary)]/50 mt-3">
        Tap to turn the page
      </p>
    </div>
  );
}

/* 7. Travelling Postcards Stack */
function TravellingPostcardsModule() {
  const [activeCard, setActiveCard] = useState(0);

  const postcards = [
    {
      place: "Kyoto, Japan",
      note: "Lantern-lit stone alleys, misty bamboo groves, and ancient wooden shrines.",
      tag: "Wanderlust",
      year: "Dream List",
    },
    {
      place: "Amalfi Coast, Italy",
      note: "Pastel houses tumbling down sheer cliffs into sapphire sea waves.",
      tag: "Coastline",
      year: "Dream List",
    },
    {
      place: "Himalayan Ridge",
      note: "Silent high-altitude passes, crisp pine scents, and skies unfiltered by smog.",
      tag: "Mountains",
      year: "Soul Search",
    },
  ];

  return (
    <div className="rounded-2xl p-6 sm:p-8 bg-[var(--card-surface)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)]/60 transition-all duration-300 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div className="flex items-center gap-2 text-[var(--accent-gold)]">
          <Compass className="w-5 h-5" />
          <h3 className="font-serif text-2xl font-medium text-[var(--text-primary)]">
            Travelling & Postcards From the Future
          </h3>
        </div>
        <span className="text-xs text-[var(--text-primary)]/70">
          Click any postcard to bring it to front
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {postcards.map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6, scale: 1.02 }}
            onClick={() => setActiveCard(i)}
            className={`p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
              activeCard === i
                ? "bg-[var(--bg-elevated)] border-[var(--accent-gold)] shadow-[0_4px_25px_var(--gold-glow)]"
                : "bg-[var(--bg-base)]/60 border-[var(--border-subtle)] opacity-75"
            }`}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-base)] border border-[var(--border-subtle)] text-[var(--accent-gold)]">
                {card.tag}
              </span>
              <span className="text-xs text-[var(--text-primary)]/60">{card.year}</span>
            </div>
            <h4 className="font-serif text-lg font-medium text-[var(--text-primary)] mb-2">
              {card.place}
            </h4>
            <p className="text-xs text-[var(--text-primary)]/80 leading-relaxed">
              {card.note}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
