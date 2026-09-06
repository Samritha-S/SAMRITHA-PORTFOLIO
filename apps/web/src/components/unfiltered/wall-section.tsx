"use client";

import React, { useState } from "react";
import { MessageSquareHeart, Send, CheckCircle2, User, EyeOff } from "lucide-react";
import { ParticleButton } from "@/components/kokonutui/particle-button";
import { motion } from "motion/react";

interface WallNote {
  id: string;
  name: string | null;
  message: string;
  createdAt: string;
  tilt: string;
}

const initialNotes: WallNote[] = [
  {
    id: "1",
    name: "A fellow wanderer",
    message: "Your writing on ordinary afternoons resonated deeply. Keep observing the little things.",
    createdAt: "Yesterday",
    tilt: "-rotate-1 sm:-rotate-2",
  },
  {
    id: "2",
    name: null, // anonymous
    message: "Pet every dog you see! That is the single best rule for a happy life.",
    createdAt: "3 days ago",
    tilt: "rotate-1 sm:rotate-1.5",
  },
  {
    id: "3",
    name: "Kavya",
    message: "The Water Lily Pond palette is so fresh and cheerful. Loved reading your stories here.",
    createdAt: "Last week",
    tilt: "-rotate-1",
  },
];

export function WallSection() {
  const [notes] = useState<WallNote[]>(initialNotes);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Silent bot prevention
    if (!message.trim()) return;

    setIsSubmitting(true);

    try {
      await fetch("/api/wall", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: isAnonymous ? null : (name.trim() || null),
          message: message.trim(),
          honeypot,
        }),
      });
    } catch {
      // Graceful fallback
    }

    setIsSubmitting(false);
    setSubmitted(true);
    setMessage("");
    setName("");
  };

  return (
    <section id="wall" className="py-24 px-4 sm:px-6 lg:px-8 section-base relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-[var(--accent-gold)] font-medium">
            Community & Notes
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[var(--text-primary)] mt-3">
            The Wall of Little Notes
          </h2>
          <div className="gold-hairline w-24 mx-auto mt-4" />
          <p className="text-sm text-[var(--text-primary)]/80 max-w-lg mx-auto mt-4 leading-relaxed">
            Leave a thought, a quote, a memory, or just say hello. You can sign your name or leave it completely anonymous.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Column: Inset in Midnight green panel */}
          <div className="lg:col-span-5 rounded-2xl p-6 sm:p-7 bg-[#105666] border border-[#D3968C]/30 shadow-lg relative">
            <h3 className="font-serif text-xl font-medium text-[#F7F4D5] flex items-center gap-2 mb-4">
              <MessageSquareHeart className="w-5 h-5 text-[#D3968C]" />
              Pin a Note
            </h3>

            {submitted ? (
              <div className="p-6 rounded-xl bg-[#0A3323] border border-[#D3968C]/40 text-center">
                <CheckCircle2 className="w-8 h-8 text-[#D3968C] mx-auto mb-2" />
                <h4 className="font-serif text-lg font-medium text-[#F7F4D5]">
                  Note Received!
                </h4>
                <p className="text-xs text-[#F7F4D5]/80 mt-1 leading-relaxed">
                  Your message has been placed in Samritha&apos;s mailbox. Once approved by moderation, it will appear on the wall. ✨
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs text-[#D3968C] underline cursor-pointer"
                >
                  Send another note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field for bot protection */}
                <input
                  type="text"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Anonymous toggle */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0A3323] border border-[#839958]/30 text-xs">
                  <span className="text-[#F7F4D5]/80">Post identity:</span>
                  <button
                    type="button"
                    onClick={() => setIsAnonymous(!isAnonymous)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#D3968C]/40 text-xs text-[#D3968C] hover:border-[#D3968C] cursor-pointer transition-colors"
                  >
                    {isAnonymous ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" /> Anonymous
                      </>
                    ) : (
                      <>
                        <User className="w-3.5 h-3.5" /> With Name
                      </>
                    )}
                  </button>
                </div>

                {!isAnonymous && (
                  <div>
                    <label className="block text-xs font-medium text-[#F7F4D5]/90 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sam or Fellow Reader"
                      className="w-full px-4 py-2 text-sm rounded-xl bg-[#0A3323] border border-[#839958]/30 text-[#F7F4D5] placeholder-[#F7F4D5]/40 focus:outline-none focus:border-[#D3968C] transition-colors"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-[#F7F4D5]/90 mb-1">
                    Your Note *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share a thought, book recommendation, or kind word..."
                    className="w-full px-4 py-2 text-sm rounded-xl bg-[#0A3323] border border-[#839958]/30 text-[#F7F4D5] placeholder-[#F7F4D5]/40 focus:outline-none focus:border-[#D3968C] transition-colors resize-none"
                  />
                </div>

                <ParticleButton
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#D3968C] text-[#F7F4D5] border-none hover:brightness-105"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "Sending..." : "Leave Note on Wall"}</span>
                </ParticleButton>
              </form>
            )}
          </div>

          {/* Organic Pinboard Staggered Notes Column: Beige Parchment on Moss Wall */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            {notes.map((note) => (
              <motion.div
                key={note.id}
                whileHover={{ scale: 1.03, rotate: 0, zIndex: 20 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className={`p-6 rounded-xl bg-[#F7F4D5] border border-[#D3968C]/40 shadow-lg hover:border-[#D3968C] hover:shadow-xl transition-all duration-300 relative group cursor-default transform ${note.tilt}`}
              >
                {/* Rosy Pushpin Header Dot */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#D3968C] shadow-md border-2 border-[#839958]" />

                <div className="flex justify-between items-center mb-3 pt-1">
                  <span className="text-xs font-semibold text-[#105666] font-mono">
                    {note.name ? note.name : "Anonymous Wanderer"}
                  </span>
                  <span className="text-[10px] text-[#0A3323]/60 font-medium">
                    {note.createdAt}
                  </span>
                </div>
                <p className="font-serif text-sm sm:text-base text-[#0A3323] leading-relaxed italic">
                  &ldquo;{note.message}&rdquo;
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
