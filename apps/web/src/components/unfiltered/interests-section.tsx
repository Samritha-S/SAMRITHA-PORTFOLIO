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
  RotateCw,
} from "lucide-react";

export function InterestsSection() {
  return (
    <section id="interests" className="py-24 px-4 sm:px-6 lg:px-8 section-sage relative border-y border-[var(--border-subtle)]/40">
      <div className="max-w-6xl mx-auto">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-start">
          {/* 1. Music Soundboard Dock (Sharp / Audio Rack Styling) */}
          <MusicModule />

          {/* 2. Mint Chocolate Chip (Tactile Soft Scoop / HoldButton Feel) */}
          <MintChocChipModule />

          {/* 3. Marvel 3D Flip Card (Interactive Comic Card) */}
          <MarvelCardFlipModule />

          {/* 4. Walking Step Path (Cartographic Route Styling) */}
          <WalkingModule />

          {/* 5. Pet Every Dog I See (Organic Warm Pebble Styling) */}
          <DogPettingModule />

          {/* 6. Poetry Notebook (Deckle Edge / Folded Corner Stationery) */}
          <PoetryModule />

          {/* 7. Travelling Postcards Stack (Overlapping Physical Deck) */}
          <div className="md:col-span-2 lg:col-span-3 mt-4">
            <TravellingCardStackModule />
          </div>
        </div>
      </div>
    </section>
  );
}

/* 1. Music Waveform — Audio Deck Container */
function MusicModule() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrubPosition, setScrubPosition] = useState(35);
  const bars = [40, 65, 85, 30, 95, 75, 45, 90, 60, 100, 70, 50, 80, 65, 90, 40, 75, 95, 55, 35];

  return (
    <div className="rounded-lg p-6 bg-[var(--bg-base)] border-l-4 border-l-[var(--accent-secondary)] border-y border-r border-[var(--border-subtle)] hover:border-[var(--accent-gold)]/60 transition-all duration-300 relative overflow-hidden shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-[var(--accent-secondary)]">
          <Music className="w-5 h-5" />
          <span className="text-xs uppercase tracking-wider font-semibold font-mono">
            Track Audio Dock
          </span>
        </div>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label="Toggle music sound state"
          className="p-1.5 rounded-md bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--accent-gold)] hover:scale-105 transition-transform cursor-pointer"
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
        className="h-16 flex items-end justify-between gap-1 py-2 cursor-pointer bg-[var(--bg-elevated)]/60 rounded-md px-3 border border-[var(--border-subtle)]"
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
                backgroundColor: isPassed ? "var(--accent-gold)" : "rgba(96, 119, 133, 0.35)",
              }}
              className="w-1.5 rounded-sm transition-colors duration-150"
            />
          );
        })}
      </div>
      <div className="flex justify-between items-center text-[10px] text-[var(--text-primary)]/60 mt-3">
        <span>Click bar to scrub waveform</span>
        <span className="text-[var(--accent-gold)] font-medium">
          {isPlaying ? "● Now Vibing" : "▶ Tap icon to play"}
        </span>
      </div>
    </div>
  );
}

/* 2. Mint Chocolate Chip — Tactile Scoop Container */
function MintChocChipModule() {
  const [bites, setBites] = useState(0);

  return (
    <div
      onClick={() => setBites((b) => (b + 1) % 5)}
      className="rounded-[28px] p-6 bg-[var(--bg-base)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)]/60 transition-all duration-300 relative overflow-hidden cursor-pointer select-none group shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs uppercase tracking-wider font-semibold text-[var(--accent-secondary)]">
          Guilty Pleasure
        </span>
        <span className="text-xs text-[var(--accent-gold)] font-mono px-2 py-0.5 rounded-full bg-[var(--bg-elevated)]">
          Bite {bites}/4
        </span>
      </div>

      <h3 className="font-serif text-xl font-medium text-[var(--text-primary)] mb-2">
        Mint Chocolate Chip
      </h3>
      <p className="text-xs text-[var(--text-primary)]/75 leading-relaxed mb-4">
        Superior flavor debate settled. Crisp, refreshing cooling mint studded with bittersweet chocolate flakes. Pure joy.
      </p>

      {/* Scoop interactive visual */}
      <div className="h-24 flex items-center justify-center relative my-2">
        <motion.div
          animate={{ rotate: bites * 12, scale: 1 - bites * 0.05 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 350, damping: 20 }}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-[#A8D5BA] to-[#7EA18C] shadow-inner relative flex items-center justify-center border-2 border-[var(--accent-gold)]/50"
        >
          {/* Chocolate chips */}
          <span className="absolute top-4 left-5 w-2 h-2 rounded-sm bg-[#3D2B1F]" />
          <span className="absolute bottom-5 right-5 w-2.5 h-2.5 rounded-sm bg-[#3D2B1F]" />
          <span className="absolute top-8 right-6 w-1.5 h-1.5 rounded-sm bg-[#3D2B1F]" />
          <span className="absolute bottom-6 left-6 w-2 h-2 rounded-sm bg-[#3D2B1F]" />
          <span className="text-2xl select-none">🍦</span>
        </motion.div>
      </div>
      <p className="text-center text-[11px] text-[var(--accent-gold)] font-medium mt-1">
        Tap the scoop to take a taste
      </p>
    </div>
  );
}

/* 3. Marvel 3D Card Flip Module */
function MarvelCardFlipModule() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const quotes = [
    { text: "I love you 3000.", who: "Tony Stark" },
    { text: "Part of the journey is the end.", who: "Iron Man" },
    { text: "Whatever it takes.", who: "The Avengers" },
    { text: "With great power comes great responsibility.", who: "Peter Parker" },
  ];

  const handleFlip = () => {
    if (isFlipped) {
      setQuoteIndex((i) => (i + 1) % quotes.length);
    }
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      onClick={handleFlip}
      className="perspective-1000 h-[280px] cursor-pointer select-none group"
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        className="w-full h-full relative transform-style-3d rounded-xl"
      >
        {/* FRONT FACE */}
        <div className="absolute inset-0 backface-hidden rounded-xl p-6 bg-[var(--bg-base)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)]/70 transition-colors flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-wider font-semibold text-[var(--accent-secondary)]">
                Cinema & Lore
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded font-mono bg-[#E23636]/20 text-[#E23636] border border-[#E23636]/40 font-bold">
                MARVEL
              </span>
            </div>
            <h3 className="font-serif text-xl font-medium text-[var(--text-primary)] mb-2">
              Quoting Movies By Heart
            </h3>
            <p className="text-xs text-[var(--text-primary)]/75 leading-relaxed">
              Stories of courage, sacrifice, and heroes who bleed and still stand back up.
            </p>
          </div>

          <div className="p-3 rounded-lg panel-inset flex items-center justify-between">
            <span className="text-xs text-[var(--text-primary)]/70">Click to flip card</span>
            <RotateCw className="w-4 h-4 text-[var(--accent-gold)] group-hover:rotate-180 transition-transform duration-500" />
          </div>
        </div>

        {/* BACK FACE (180deg flipped) */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl p-6 bg-[var(--surface-amethyst)] border-2 border-[var(--accent-gold)]/60 flex flex-col justify-between shadow-md">
          <div className="flex justify-between items-center text-[10px] font-mono text-[var(--accent-gold)]">
            <span>MEMORIZED LINE</span>
            <span>{quoteIndex + 1}/{quotes.length}</span>
          </div>

          <div className="text-center my-auto">
            <p className="font-serif italic text-lg text-[var(--text-primary)] leading-snug">
              &ldquo;{quotes[quoteIndex].text}&rdquo;
            </p>
            <span className="block text-xs font-mono text-[var(--accent-gold)] mt-2">
              — {quotes[quoteIndex].who}
            </span>
          </div>

          <div className="text-center text-[10px] text-[var(--accent-gold)]/80">
            Tap to flip & cycle next quote
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* 4. Walking Step Path — Cartographic Tracker */
function WalkingModule() {
  const [steps, setSteps] = useState(4200);

  return (
    <div
      onClick={() => setSteps((s) => s + 500)}
      className="rounded-xl p-6 bg-[var(--bg-base)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)]/60 transition-all duration-300 relative overflow-hidden cursor-pointer group shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-[var(--accent-secondary)]">
          <Footprints className="w-5 h-5" />
          <span className="text-xs uppercase tracking-wider font-semibold">Wandering</span>
        </div>
        <span className="text-xs text-[var(--accent-gold)] font-mono px-2 py-0.5 rounded bg-[var(--bg-elevated)]">
          {steps.toLocaleString()} steps
        </span>
      </div>

      <h3 className="font-serif text-xl font-medium text-[var(--text-primary)] mb-2">
        Wandering Without a Map
      </h3>
      <p className="text-xs text-[var(--text-primary)]/75 leading-relaxed mb-4">
        Long solitary walks where my best ideas are born, observing small details, architecture, trees, and changing skies.
      </p>

      {/* Path Line Animation */}
      <div className="h-16 flex items-center justify-center relative panel-inset rounded-lg px-4">
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
      <p className="text-center text-[11px] text-[var(--accent-gold)] font-medium mt-3">
        Click to take another stride
      </p>
    </div>
  );
}

/* 5. Pet Every Dog I See — Organic Rounded Container */
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
      className="rounded-[32px] p-6 bg-[var(--bg-base)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)]/60 transition-all duration-300 relative overflow-hidden cursor-pointer select-none group shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs uppercase tracking-wider font-semibold text-[var(--accent-secondary)]">
          Universal Law
        </span>
        <div className="flex items-center gap-1.5 text-xs text-[var(--accent-gold)] font-mono px-2.5 py-0.5 rounded-full bg-[var(--bg-elevated)]">
          <Heart className="w-3.5 h-3.5 fill-current" />
          <span>{pets} pats</span>
        </div>
      </div>

      <h3 className="font-serif text-xl font-medium text-[var(--text-primary)] mb-2">
        Petting Every Dog I See
      </h3>
      <p className="text-xs text-[var(--text-primary)]/75 leading-relaxed mb-4">
        Non-negotiable. If there is a furry friend within a 100-meter radius, I will stop, ask, and give them the ear scratches they deserve.
      </p>

      {/* Dog Interactive visual */}
      <div className="h-16 flex items-center justify-center gap-3 panel-inset rounded-full py-2">
        <span className="text-3xl">🐕</span>
        <motion.span
          animate={{ rotate: tailWag ? [0, 25, -25, 20, 0] : [0, 8, -8, 0] }}
          transition={{ duration: 0.5, repeat: tailWag ? 2 : Infinity }}
          className="text-xl inline-block origin-bottom-left"
        >
          ✨
        </motion.span>
      </div>
      <p className="text-center text-[11px] text-[var(--accent-gold)] font-medium mt-3">
        Click to pet & wag tail
      </p>
    </div>
  );
}

/* 6. Poetry Notebook — Deckle-Edge Folded Stationery */
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
      className="rounded-tl-2xl rounded-br-2xl rounded-tr-sm rounded-bl-sm p-6 bg-[var(--bg-base)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)]/60 transition-all duration-300 relative overflow-hidden cursor-pointer select-none group shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-[var(--accent-secondary)]">
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

      <div className="p-4 rounded-md panel-inset min-h-[75px] flex items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={verseIdx}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="font-serif italic text-sm text-[var(--text-primary)]"
          >
            &ldquo;{verses[verseIdx]}&rdquo;
          </motion.p>
        </AnimatePresence>
      </div>
      <p className="text-center text-[11px] text-[var(--accent-gold)] font-medium mt-3">
        Tap to turn the page
      </p>
    </div>
  );
}

/* 7. Travelling Postcards Stack — Overlapping Physical Deck */
function TravellingCardStackModule() {
  const [cards, setCards] = useState([
    {
      id: "p1",
      place: "Kyoto, Japan",
      note: "Lantern-lit stone alleys, misty bamboo groves, and ancient wooden shrines smelling of cedar.",
      tag: "Wanderlust",
      year: "Dream Destination",
      rotation: "-rotate-2",
    },
    {
      id: "p2",
      place: "Amalfi Coast, Italy",
      note: "Pastel houses tumbling down sheer lemon-scented cliffs into sapphire Mediterranean sea waves.",
      tag: "Coastline",
      year: "Dream Destination",
      rotation: "rotate-2",
    },
    {
      id: "p3",
      place: "Himalayan Ridge",
      note: "Silent high-altitude passes, crisp pine scents, prayer flags, and skies unfiltered by city smog.",
      tag: "Mountains",
      year: "Soul Search",
      rotation: "-rotate-1",
    },
  ]);

  // Click top card to send to back (CardStack shuffle effect)
  const shuffleDeck = () => {
    setCards((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

  return (
    <div className="rounded-2xl p-6 sm:p-8 bg-[var(--bg-base)] border border-[var(--border-subtle)] shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div className="flex items-center gap-2.5 text-[var(--accent-secondary)]">
          <Compass className="w-5 h-5 text-[var(--accent-gold)]" />
          <h3 className="font-serif text-2xl font-medium text-[var(--text-primary)]">
            Travelling & Postcards From the Future
          </h3>
        </div>
        <button
          onClick={shuffleDeck}
          className="text-xs text-[var(--accent-gold)] hover:underline flex items-center gap-1.5 cursor-pointer"
        >
          <span>Tap postcard to cycle deck</span>
          <RotateCw className="w-3 h-3" />
        </button>
      </div>

      {/* Overlapping Postcard Cards Grid / Stack */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
        {cards.map((card, i) => (
          <motion.div
            key={card.id}
            layout
            onClick={shuffleDeck}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`p-6 rounded-lg border cursor-pointer transition-all duration-300 relative shadow-md bg-[var(--surface-dusk)] border-[var(--border-subtle)] hover:border-[var(--accent-gold)] ${
              i === 0 ? "border-[var(--accent-gold)] shadow-[0_4px_20px_var(--gold-glow)]" : ""
            }`}
          >
            {/* Airmail style header stamp */}
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-base)] border border-[var(--accent-gold)]/40 text-[var(--accent-gold)]">
                {card.tag}
              </span>
              <span className="text-[10px] font-mono text-[var(--text-primary)]/50 tracking-wider">
                AIRMAIL
              </span>
            </div>

            <h4 className="font-serif text-lg font-medium text-[var(--text-primary)] mb-2">
              {card.place}
            </h4>
            <p className="text-xs text-[var(--text-primary)]/80 leading-relaxed font-serif italic">
              &ldquo;{card.note}&rdquo;
            </p>

            <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex justify-between items-center text-[10px] text-[var(--text-primary)]/50 font-mono">
              <span>{card.year}</span>
              <span className="text-[var(--accent-gold)]">№ 0{i + 1}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
