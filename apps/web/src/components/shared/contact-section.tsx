"use client";

import React, { useState } from "react";
import { useView } from "@/context/view-context";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon, TwitterIcon } from "@/components/shared/icons";
import { ParticleButton } from "@/components/kokonutui/particle-button";
import ConstellationField from "@/components/kokonutui/constellation-field";

export function ContactSection() {
  const { isFiltered, sections } = useView();
  const contact = sections.contact;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json?.error || "Could not send message.");
      }
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Could not send message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 section-base relative overflow-hidden">
      {isFiltered && (
        <ConstellationField
          className="absolute inset-0 pointer-events-none"
          backgroundColor="transparent"
          density={12000}
          connectionDistance={135}
          speed={0.10}
        />
      )}
      <div className="max-w-5xl mx-auto relative z-10">
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
          <div className={`p-6 rounded-2xl border shadow-md ${
            isFiltered ? "bg-[#011627] border-[var(--accent-gold)]/40" : "bg-[var(--surface-forest)] border-[var(--border-subtle)] text-[var(--text-on-dark)]"
          }`}>
            <h3 className={`font-serif text-xl font-medium mb-4 ${isFiltered ? "text-[var(--text-primary)]" : "text-[var(--text-on-dark)]"}`}>
              Direct Channels
            </h3>
            <p className={`text-xs leading-relaxed mb-6 ${isFiltered ? "text-[var(--text-primary)]/80" : "text-[var(--text-on-dark)]/80"}`}>
              {isFiltered ? contact.filteredNote : contact.unfilteredNote}
            </p>

            <div className="space-y-3">
              {/* Unfiltered Socials: Instagram + X */}
              {!isFiltered ? (
                <>
                  <a
                    href={contact.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-base)]/10 border border-[var(--accent-gold)]/25 hover:border-[var(--accent-gold)] transition-colors text-xs text-[var(--text-on-dark)] group"
                  >
                    <InstagramIcon className="w-4 h-4 text-[var(--accent-gold)] group-hover:scale-110 transition-all" />
                    <span className="text-[var(--text-on-dark)] group-hover:text-[var(--accent-gold)] transition-colors">Instagram • @samritha.s</span>
                  </a>
                  <a
                    href={contact.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-base)]/10 border border-[var(--accent-gold)]/25 hover:border-[var(--accent-gold)] transition-colors text-xs text-[var(--text-on-dark)] group"
                  >
                    <TwitterIcon className="w-4 h-4 text-[var(--accent-gold)] group-hover:scale-110 transition-all" />
                    <span className="text-[var(--text-on-dark)] group-hover:text-[var(--accent-gold)] transition-colors">X (Twitter) • @samritha_s</span>
                  </a>
                </>
              ) : (
                /* Filtered Channels: Email, LinkedIn, GitHub */
                <>
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-base)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] transition-colors text-xs text-[var(--accent-primary)] hover:text-[var(--accent-gold)] group"
                  >
                    <Mail className="w-4 h-4 text-[var(--accent-primary)] group-hover:text-[var(--accent-gold)] group-hover:scale-110 transition-all" />
                    <span className="text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">Email • {contact.email}</span>
                  </a>
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-base)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] transition-colors text-xs text-[var(--accent-primary)] hover:text-[var(--accent-gold)] group"
                  >
                    <LinkedinIcon className="w-4 h-4 text-[var(--accent-primary)] group-hover:text-[var(--accent-gold)] group-hover:scale-110 transition-all" />
                    <span className="text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">LinkedIn • in/samritha-s</span>
                  </a>
                  <a
                    href={contact.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-base)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] transition-colors text-xs text-[var(--accent-primary)] hover:text-[var(--accent-gold)] group"
                  >
                    <GithubIcon className="w-4 h-4 text-[var(--accent-primary)] group-hover:text-[var(--accent-gold)] group-hover:scale-110 transition-all" />
                    <span className="text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">GitHub • Samritha-S</span>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Message Form: Warm Ivory panel on unfiltered with Deep Purple heading, Blue Noir on filtered */}
        <div className="md:col-span-7">
          <div className={`p-6 sm:p-8 rounded-2xl border shadow-md ${
            isFiltered ? "bg-[#011627] border-[var(--accent-gold)]/40" : "bg-[var(--bg-base)] border-[var(--border-subtle)] text-[var(--text-primary)]"
          }`}>
            <h3 className={`font-serif text-xl font-medium mb-4 ${isFiltered ? "text-[var(--text-primary)]" : "text-[var(--surface-plum)]"}`}>
              Send a Direct Message
            </h3>

            {submitted ? (
              <div className={`p-6 rounded-xl text-center border ${
                isFiltered ? "bg-[var(--bg-base)] border-[var(--accent-gold)]/50" : "bg-[var(--bg-elevated)] border-[var(--accent-gold)]/50 text-[var(--text-primary)]"
              }`}>
                <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-[var(--accent-gold)]" />
                <h4 className={`font-serif text-lg font-medium ${isFiltered ? "" : "text-[var(--surface-plum)]"}`}>
                  Message Sent
                </h4>
                <p className="text-xs mt-1 text-[var(--text-primary)]/80">
                  Thank you for reaching out. I&apos;ll get back to you as soon as I can!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  suppressHydrationWarning
                  className={`mt-4 text-xs underline cursor-pointer ${isFiltered ? "text-[var(--accent-gold)]" : "text-[var(--surface-plum)] font-medium"}`}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={`block text-xs font-medium mb-1 ${isFiltered ? "text-[var(--text-primary)]/80" : "text-[var(--surface-plum)]"}`}>
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
                        : "bg-[var(--bg-elevated)]/70 text-[var(--text-primary)] placeholder-[var(--text-primary)]/45 focus:outline-none focus:border-[var(--surface-plum)]"
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-1 ${isFiltered ? "text-[var(--text-primary)]/80" : "text-[var(--surface-plum)]"}`}>
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
                        : "bg-[var(--bg-elevated)]/70 text-[var(--text-primary)] placeholder-[var(--text-primary)]/45 focus:outline-none focus:border-[var(--surface-plum)]"
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-1 ${isFiltered ? "text-[var(--text-primary)]/80" : "text-[var(--surface-plum)]"}`}>
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
                        : "bg-[var(--bg-elevated)]/70 text-[var(--text-primary)] placeholder-[var(--text-primary)]/45 focus:outline-none focus:border-[var(--surface-plum)]"
                    }`}
                  />
                </div>

                {submitError && (
                  <p className="text-xs text-red-400 bg-red-950/30 border border-red-400/30 rounded-lg px-3 py-2">
                    {submitError}
                  </p>
                )}

                <ParticleButton
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full ${isFiltered ? "" : "bg-[var(--surface-forest)] text-[var(--text-on-dark)] border-none hover:brightness-110"}`}
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
