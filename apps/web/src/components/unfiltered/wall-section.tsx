"use client";

import React, { useState } from "react";
import { MessageSquareHeart, Send, CheckCircle2, User, EyeOff } from "lucide-react";
import { ParticleButton } from "@/components/kokonutui/particle-button";

interface WallNote {
  id: string;
  name: string | null;
  message: string;
  createdAt: string;
}

const initialNotes: WallNote[] = [
  {
    id: "1",
    name: "A fellow wanderer",
    message: "Your writing on ordinary afternoons resonated deeply. Keep observing the little things.",
    createdAt: "Yesterday",
  },
  {
    id: "2",
    name: null, // anonymous
    message: "Pet every dog you see! That is the single best rule for a happy life.",
    createdAt: "3 days ago",
  },
  {
    id: "3",
    name: "Kavya",
    message: "The Mystic Amethyst palette is so uniquely you. Loved reading your stories here.",
    createdAt: "Last week",
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
      // Call public wall submission API
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
      // Graceful fallback for offline preview
    }

    setIsSubmitting(false);
    setSubmitted(true);
    setMessage("");
    setName("");
  };

  return (
    <section id="wall" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
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
        {/* Form Column */}
        <div className="lg:col-span-5 rounded-2xl p-6 bg-[var(--card-surface)] border border-[var(--border-subtle)] backdrop-blur-md relative">
          <h3 className="font-serif text-xl font-medium text-[var(--text-primary)] flex items-center gap-2 mb-4">
            <MessageSquareHeart className="w-5 h-5 text-[var(--accent-gold)]" />
            Pin a Note
          </h3>

          {submitted ? (
            <div className="p-6 rounded-xl bg-[var(--bg-base)]/80 border border-[var(--accent-gold)]/40 text-center">
              <CheckCircle2 className="w-8 h-8 text-[var(--accent-gold)] mx-auto mb-2" />
              <h4 className="font-serif text-lg font-medium text-[var(--text-primary)]">
                Note Received!
              </h4>
              <p className="text-xs text-[var(--text-primary)]/80 mt-1 leading-relaxed">
                Your message has been placed in Samritha&apos;s quiet mailbox. Once approved by moderation, it will appear on the wall. ✨
              </p>
              <button
                onClick={() => setSubmitted(false)}
                suppressHydrationWarning
                className="mt-4 text-xs text-[var(--accent-gold)] underline cursor-pointer"
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
                suppressHydrationWarning
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Anonymous toggle */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--bg-base)]/60 border border-[var(--border-subtle)] text-xs">
                <span className="text-[var(--text-primary)]/80">Post identity:</span>
                <button
                  type="button"
                  onClick={() => setIsAnonymous(!isAnonymous)}
                  suppressHydrationWarning
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--border-subtle)] text-xs text-[var(--accent-gold)] hover:border-[var(--accent-gold)] cursor-pointer transition-colors"
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
                  <label className="block text-xs font-medium text-[var(--text-primary)]/80 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sam or Fellow Reader"
                    suppressHydrationWarning
                    className="w-full px-4 py-2 text-sm rounded-xl bg-[var(--bg-base)]/80 border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-primary)]/40 focus:outline-none focus:border-[var(--accent-gold)] transition-colors"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-[var(--text-primary)]/80 mb-1">
                  Your Note *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share a thought, book recommendation, or kind word..."
                  suppressHydrationWarning
                  className="w-full px-4 py-2 text-sm rounded-xl bg-[var(--bg-base)]/80 border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-primary)]/40 focus:outline-none focus:border-[var(--accent-gold)] transition-colors resize-none"
                />
              </div>

              <ParticleButton
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? "Sending..." : "Leave Note on Wall"}</span>
              </ParticleButton>
            </form>
          )}
        </div>

        {/* Existing Notes Board Column */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="p-5 rounded-2xl bg-[var(--card-surface)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)]/60 transition-all duration-300 relative group"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-medium text-[var(--accent-gold)]">
                  {note.name ? note.name : "Anonymous Wanderer"}
                </span>
                <span className="text-[10px] text-[var(--text-primary)]/50">
                  {note.createdAt}
                </span>
              </div>
              <p className="font-serif text-sm text-[var(--text-primary)] leading-relaxed italic">
                &ldquo;{note.message}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
