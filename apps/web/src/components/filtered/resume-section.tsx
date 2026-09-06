"use client";

import React from "react";
import { Download, FileText, ArrowRight } from "lucide-react";
import { KokonutCard } from "@/components/kokonutui/card";
import { ParticleButton } from "@/components/kokonutui/particle-button";

export function ResumeSection({
  resumeUrl = "/resume.pdf",
}: {
  resumeUrl?: string;
}) {
  return (
    <section id="resume" className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-widest text-[var(--accent-gold)] font-mono">
          Credentials
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[var(--text-primary)] mt-3">
          Resume & Curriculum Vitae
        </h2>
        <div className="gold-hairline w-24 mx-auto mt-4" />
      </div>

      <KokonutCard glow className="p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-8">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[var(--bg-base)] border border-[var(--accent-gold)]/40 flex items-center justify-center text-[var(--accent-gold)] shrink-0 shadow-[0_0_15px_var(--gold-glow)]">
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent-gold)]">
              Latest Version • Updated 2024
            </span>
            <h3 className="font-serif text-2xl font-medium text-[var(--text-primary)] mt-1">
              Samritha S — Software Engineer CV
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-primary)]/70 mt-2 max-w-md leading-relaxed">
              Complete overview of production systems, hackathon awards, full-stack architecture, and technical competencies.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
          <a
            href={resumeUrl}
            download="Samritha_S_Resume.pdf"
            className="w-full sm:w-auto"
          >
            <ParticleButton className="w-full">
              <Download className="w-4 h-4" />
              Download PDF
            </ParticleButton>
          </a>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-[var(--border-subtle)] hover:border-[var(--accent-gold)]/60 text-xs font-medium text-[var(--text-primary)] transition-colors flex items-center justify-center gap-1.5"
          >
            View in Browser
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </KokonutCard>
    </section>
  );
}
