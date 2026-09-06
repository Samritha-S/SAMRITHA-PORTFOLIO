"use client";

import React, { useState } from "react";
import { ExternalLink, Trophy } from "lucide-react";
import { GithubIcon } from "@/components/shared/icons";
import { KokonutCard } from "@/components/kokonutui/card";

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
  award?: string;
}

const projects: ProjectItem[] = [
  {
    id: "carbontrace",
    title: "CarbonTrace",
    category: "Full-Stack & Sustainability",
    description:
      "Enterprise carbon footprint analytics platform tracking scope 1, 2, and 3 emissions with automated telemetry and real-time mitigation simulations.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "FastAPI", "Tailwind CSS"],
    demoUrl: "https://carbontrace.demo",
    repoUrl: "https://github.com/samritha/carbontrace",
    award: "Best Sustainability Hack",
  },
  {
    id: "stadiumpulse",
    title: "StadiumPulse",
    category: "Real-Time & Digital Twin",
    description:
      "Digital-twin arena management system aggregating IoT sensor metrics, attendee flow heatmaps, and emergency evacuation routing under dynamic conditions.",
    tags: ["React", "Node.js", "WebSockets", "MongoDB", "Three.js"],
    demoUrl: "https://stadiumpulse.demo",
    repoUrl: "https://github.com/samritha/stadiumpulse",
    award: "Hackathon 1st Runner Up",
  },
  {
    id: "identimatch",
    title: "IdentiMatch",
    category: "AI & Computer Vision",
    description:
      "High-throughput multi-modal biometric matching engine powered by custom vector embeddings, FAISS indexing, and real-time facial feature landmark analysis.",
    tags: ["Python", "FastAPI", "OpenCV", "Pinecone", "PyTorch"],
    repoUrl: "https://github.com/samritha/identimatch",
  },
  {
    id: "clauseclash",
    title: "ClauseClash",
    category: "AI & Legal Tech",
    description:
      "Intelligent contract conflict detection engine comparing conflicting indemnity and liability clauses across 100+ page legal documents using LLMs.",
    tags: ["Next.js", "GPT-4 API", "Claude API", "Python", "Tailwind CSS"],
    demoUrl: "https://clauseclash.demo",
    repoUrl: "https://github.com/samritha/clauseclash",
  },
  {
    id: "imprint",
    title: "Imprint",
    category: "Mobile & Creative Tech",
    description:
      "Cross-platform mobile application enabling micro-journaling, mental resilience tracking, and encrypted local backup sync.",
    tags: ["React Native", "Expo", "Redux Toolkit", "SQLite"],
    repoUrl: "https://github.com/samritha/imprint",
  },
  {
    id: "learnar",
    title: "LearnAR",
    category: "Augmented Reality & EdTech",
    description:
      "Interactive 3D spatial learning application bringing abstract cellular biology and molecular models into browser-based augmented reality viewports.",
    tags: ["WebXR", "Three.js", "JavaScript", "GLTF"],
    demoUrl: "https://learnar.demo",
    repoUrl: "https://github.com/samritha/learnar",
  },
  {
    id: "iplpowerplay",
    title: "IPL Powerplay / MyModel",
    category: "Data Science & Predictive ML",
    description:
      "Ball-by-ball predictive scoring engine using historical match telemetry and environmental factors to forecast cricket match outcomes and player impact.",
    tags: ["Python", "Scikit-Learn", "XGBoost", "Pandas", "Streamlit"],
    repoUrl: "https://github.com/samritha/ipl-powerplay",
  },
  {
    id: "fensesense",
    title: "FenceSense",
    category: "IoT & Edge AI",
    description:
      "Perimeter intrusion detection system integrating edge sensor nodes, Doppler radar filters, and instant low-latency alerting.",
    tags: ["C++", "Python", "MQTT", "Raspberry Pi", "OpenCV"],
    repoUrl: "https://github.com/samritha/fensesense",
    award: "Innovation Finalist",
  },
];

export function ExperienceProjects() {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Full-Stack", "AI & Computer Vision", "Real-Time"];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((p) =>
          p.category.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 section-elevated relative">
      <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-widest text-[var(--accent-gold)] font-mono">
          Engineered Solutions & Hackathons
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[var(--text-primary)] mt-3">
          Featured Engineering & Prototypes
        </h2>
        <div className="gold-hairline w-24 mx-auto mt-4" />
        <p className="text-sm text-[var(--text-primary)]/80 max-w-xl mx-auto mt-4 leading-relaxed">
          From full-stack applications and AI platforms to hackathon prototypes built under tight deadlines.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                filter === c
                  ? "bg-[var(--accent-gold)] text-[#011627] font-semibold shadow-[0_0_12px_var(--gold-glow)]"
                  : "bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)]/70 hover:text-[var(--text-primary)] hover:border-[var(--accent-gold)]/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <KokonutCard
            key={project.id}
            glow
            className="flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--accent-gold)]">
                  {project.category}
                </span>
                {project.award && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[var(--accent-gold)] px-2 py-0.5 rounded-full bg-[var(--bg-base)] border border-[var(--accent-gold)]/30">
                    <Trophy className="w-3 h-3" />
                    {project.award}
                  </span>
                )}
              </div>

              <h3 className="font-serif text-2xl font-medium text-[var(--text-primary)] mb-2">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-primary)]/75 leading-relaxed mb-6">
                {project.description}
              </p>
            </div>

            <div>
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2.5 py-1 rounded-md bg-[var(--bg-base)]/80 text-[var(--text-primary)]/80 border border-[var(--border-subtle)] font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              <div className="flex items-center gap-3 pt-4 border-t border-[var(--border-subtle)]">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[var(--accent-gold)] hover:underline font-medium"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Live System
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[var(--text-primary)]/70 hover:text-[var(--accent-gold)] font-medium transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    Source Code
                  </a>
                )}
              </div>
            </div>
          </KokonutCard>
        ))}
      </div>
      </div>
    </section>
  );
}
