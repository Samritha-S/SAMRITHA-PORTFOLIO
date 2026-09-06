"use client";

import React, { useState } from "react";
import { useView } from "@/context/view-context";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon, TwitterIcon } from "@/components/shared/icons";
import { ParticleButton } from "@/components/kokonutui/particle-button";

export function ContactSection() {
  const { isFiltered } = useView();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate brief network submission
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSubmitting(false);
    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 section-base relative">
      <div className="max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-widest text-[var(--accent-gold)] font-mono">
          {isFiltered ? "Initiate Communication" : "Say Hello"}
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[var(--text-primary)] mt-3">
          Get in Touch
        </h2>
        <div className="gold-hairline w-24 mx-auto mt-4" />
        <p className="text-sm text-[var(--text-primary)]/80 max-w-lg mx-auto mt-4 leading-relaxed">
          {isFiltered
            ? "Looking to collaborate on innovative engineering, hackathons, or open source projects? Let's connect."
            : "Whether you want to share a book recommendation, talk about music, or just exchange warm thoughts, my inbox is always open."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Contact Info / Social Handles */}
        <div className="md:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-[var(--surface-dusk)] border border-[var(--border-subtle)] shadow-md">
            <h3 className="font-serif text-xl font-medium text-[var(--text-primary)] mb-4">
              Direct Channels
            </h3>
            <p className="text-xs text-[var(--text-primary)]/75 leading-relaxed mb-6">
              {isFiltered
                ? "Available for software engineering roles, hackathon collaborations, and tech discussions."
                : "You can reach out through socials or send a direct note right here."}
            </p>

            <div className="space-y-3">
              {/* Unfiltered Socials: Instagram + X */}
              {!isFiltered ? (
                <>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-base)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] transition-colors text-xs text-[var(--accent-primary)] hover:text-[var(--accent-gold)] group"
                  >
                    <InstagramIcon className="w-4 h-4 text-[var(--accent-primary)] group-hover:text-[var(--accent-gold)] group-hover:scale-110 transition-all" />
                    <span className="text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">Instagram • @samritha.s</span>
                  </a>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-base)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] transition-colors text-xs text-[var(--accent-primary)] hover:text-[var(--accent-gold)] group"
                  >
                    <TwitterIcon className="w-4 h-4 text-[var(--accent-primary)] group-hover:text-[var(--accent-gold)] group-hover:scale-110 transition-all" />
                    <span className="text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">X (Twitter) • @samritha_s</span>
                  </a>
                </>
              ) : (
                /* Filtered Socials: Email, LinkedIn, GitHub, X */
                <>
                  <a
                    href="mailto:samritha@example.com"
                    className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-base)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] transition-colors text-xs text-[var(--accent-primary)] hover:text-[var(--accent-gold)] group"
                  >
                    <Mail className="w-4 h-4 text-[var(--accent-primary)] group-hover:text-[var(--accent-gold)] group-hover:scale-110 transition-all" />
                    <span className="text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">Email • samritha@example.com</span>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-base)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] transition-colors text-xs text-[var(--accent-primary)] hover:text-[var(--accent-gold)] group"
                  >
                    <LinkedinIcon className="w-4 h-4 text-[var(--accent-primary)] group-hover:text-[var(--accent-gold)] group-hover:scale-110 transition-all" />
                    <span className="text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">LinkedIn • /in/samritha</span>
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-base)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] transition-colors text-xs text-[var(--accent-primary)] hover:text-[var(--accent-gold)] group"
                  >
                    <GithubIcon className="w-4 h-4 text-[var(--accent-primary)] group-hover:text-[var(--accent-gold)] group-hover:scale-110 transition-all" />
                    <span className="text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">GitHub • @samritha</span>
                  </a>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-base)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] transition-colors text-xs text-[var(--accent-primary)] hover:text-[var(--accent-gold)] group"
                  >
                    <TwitterIcon className="w-4 h-4 text-[var(--accent-primary)] group-hover:text-[var(--accent-gold)] group-hover:scale-110 transition-all" />
                    <span className="text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">X (Twitter) • @samritha_tech</span>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Message Form: Inset in Dusk Blue-tinted panel */}
        <div className="md:col-span-7">
          <div className="p-6 sm:p-8 rounded-2xl bg-[var(--surface-dusk)] border border-[var(--border-subtle)] shadow-md">
            <h3 className="font-serif text-xl font-medium text-[var(--text-primary)] mb-4">
              Send a Direct Message
            </h3>

            {submitted ? (
              <div className="p-6 rounded-xl bg-[var(--bg-base)] border border-[var(--accent-gold)]/50 text-center">
                <CheckCircle2 className="w-8 h-8 text-[var(--accent-gold)] mx-auto mb-2" />
                <h4 className="font-serif text-lg font-medium text-[var(--text-primary)]">
                  Message Sent
                </h4>
                <p className="text-xs text-[var(--text-primary)]/80 mt-1">
                  Thank you for reaching out. I&apos;ll get back to you as soon as I can!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  suppressHydrationWarning
                  className="mt-4 text-xs text-[var(--accent-gold)] underline cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--text-primary)]/80 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    suppressHydrationWarning
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-[var(--bg-base)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-primary)]/40 focus:outline-none focus:border-[var(--accent-gold)] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--text-primary)]/80 mb-1">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    suppressHydrationWarning
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-[var(--bg-base)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-primary)]/40 focus:outline-none focus:border-[var(--accent-gold)] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--text-primary)]/80 mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What would you like to discuss?"
                    suppressHydrationWarning
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-[var(--bg-base)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-primary)]/40 focus:outline-none focus:border-[var(--accent-gold)] transition-colors resize-none"
                  />
                </div>

                <ParticleButton
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? "Transmitting..." : "Send Message"}
                </ParticleButton>
              </form>
            )}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
