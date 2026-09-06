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
          <div className={`p-6 rounded-2xl border border-[var(--border-subtle)] shadow-md ${
            isFiltered ? "bg-[var(--surface-dusk)]" : "bg-[#105666] text-[#F7F4D5]"
          }`}>
            <h3 className={`font-serif text-xl font-medium mb-4 ${isFiltered ? "text-[var(--text-primary)]" : "text-[#F7F4D5]"}`}>
              Direct Channels
            </h3>
            <p className={`text-xs leading-relaxed mb-6 ${isFiltered ? "text-[var(--text-primary)]/75" : "text-[#F7F4D5]/80"}`}>
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
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#0A3323] border border-[#839958]/30 hover:border-[#D3968C] transition-colors text-xs text-[#D3968C] group"
                  >
                    <InstagramIcon className="w-4 h-4 text-[#D3968C] group-hover:scale-110 transition-all" />
                    <span className="text-[#F7F4D5] group-hover:text-[#D3968C] transition-colors">Instagram • @samritha.s</span>
                  </a>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#0A3323] border border-[#839958]/30 hover:border-[#D3968C] transition-colors text-xs text-[#D3968C] group"
                  >
                    <TwitterIcon className="w-4 h-4 text-[#D3968C] group-hover:scale-110 transition-all" />
                    <span className="text-[#F7F4D5] group-hover:text-[#D3968C] transition-colors">X (Twitter) • @samritha_s</span>
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

        {/* Message Form: Dark green panel on unfiltered */}
        <div className="md:col-span-7">
          <div className={`p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] shadow-md ${
            isFiltered ? "bg-[var(--surface-dusk)]" : "bg-[#0A3323] text-[#F7F4D5]"
          }`}>
            <h3 className={`font-serif text-xl font-medium mb-4 ${isFiltered ? "text-[var(--text-primary)]" : "text-[#F7F4D5]"}`}>
              Send a Direct Message
            </h3>

            {submitted ? (
              <div className={`p-6 rounded-xl text-center border ${
                isFiltered ? "bg-[var(--bg-base)] border-[var(--accent-gold)]/50" : "bg-[#105666] border-[#D3968C]/50 text-[#F7F4D5]"
              }`}>
                <CheckCircle2 className={`w-8 h-8 mx-auto mb-2 ${isFiltered ? "text-[var(--accent-gold)]" : "text-[#D3968C]"}`} />
                <h4 className="font-serif text-lg font-medium">
                  Message Sent
                </h4>
                <p className={`text-xs mt-1 ${isFiltered ? "text-[var(--text-primary)]/80" : "text-[#F7F4D5]/85"}`}>
                  Thank you for reaching out. I&apos;ll get back to you as soon as I can!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  suppressHydrationWarning
                  className={`mt-4 text-xs underline cursor-pointer ${isFiltered ? "text-[var(--accent-gold)]" : "text-[#D3968C]"}`}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={`block text-xs font-medium mb-1 ${isFiltered ? "text-[var(--text-primary)]/80" : "text-[#F7F4D5]/90"}`}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    suppressHydrationWarning
                    className={`w-full px-4 py-2.5 text-sm rounded-xl border border-[var(--border-subtle)] transition-colors ${
                      isFiltered
                        ? "bg-[var(--bg-base)] text-[var(--text-primary)] placeholder-[var(--text-primary)]/40 focus:border-[var(--accent-gold)]"
                        : "bg-[#105666] text-[#F7F4D5] placeholder-[#F7F4D5]/40 focus:border-[#D3968C]"
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-1 ${isFiltered ? "text-[var(--text-primary)]/80" : "text-[#F7F4D5]/90"}`}>
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    suppressHydrationWarning
                    className={`w-full px-4 py-2.5 text-sm rounded-xl border border-[var(--border-subtle)] transition-colors ${
                      isFiltered
                        ? "bg-[var(--bg-base)] text-[var(--text-primary)] placeholder-[var(--text-primary)]/40 focus:border-[var(--accent-gold)]"
                        : "bg-[#105666] text-[#F7F4D5] placeholder-[#F7F4D5]/40 focus:border-[#D3968C]"
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-1 ${isFiltered ? "text-[var(--text-primary)]/80" : "text-[#F7F4D5]/90"}`}>
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What would you like to discuss?"
                    suppressHydrationWarning
                    className={`w-full px-4 py-2.5 text-sm rounded-xl border border-[var(--border-subtle)] transition-colors resize-none ${
                      isFiltered
                        ? "bg-[var(--bg-base)] text-[var(--text-primary)] placeholder-[var(--text-primary)]/40 focus:border-[var(--accent-gold)]"
                        : "bg-[#105666] text-[#F7F4D5] placeholder-[#F7F4D5]/40 focus:border-[#D3968C]"
                    }`}
                  />
                </div>

                <ParticleButton
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full ${isFiltered ? "" : "bg-[#D3968C] text-[#F7F4D5] border-none hover:brightness-105"}`}
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
