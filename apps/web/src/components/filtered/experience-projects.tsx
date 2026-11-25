"use client";

import React, { useState, useEffect } from "react";
import { Briefcase, Building2, ExternalLink, Trophy, ShieldAlert, Compass } from "lucide-react";
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
  badge?: string;
}

const projects: ProjectItem[] = [
  {
    id: "stadiumpulse",
    title: "StadiumPulse",
    category: "GenAI & Web",
    description:
      "For PromptWars Virtual (Google for Developers x H2S). GenAI crowd safety and stadium operations system. Stack: Gemini 2.5 Flash, FastAPI, three role-based frontend portals, deployed on Vercel. Vercel serverless is stateless, so a deterministic simulation was used as the workaround.",
    tags: ["Gemini 2.5 Flash", "FastAPI", "Vercel", "Deterministic Simulation"],
    award: "PromptWars Virtual",
  },
  {
    id: "utsav-planner",
    title: "Utsav Planner",
    category: "GenAI & Web",
    description:
      "Hack2skill PromptWars challenge: GenAI planning assistant for weddings, birthdays and community events/festivals, with an Indian angle. Web application built in Antigravity. Generates budgets, timelines, vendor checklists and personalized ideas. Build: engines, Gemini ideas layer, API, frontend, README, CI. Live Gemini test passed, CI green, multi-screen UI redesign done.",
    tags: ["Antigravity", "Gemini", "Next.js", "React", "FastAPI", "CI/CD"],
    repoUrl: "https://github.com/Samritha-S/UTSAV",
    award: "Hack2skill PromptWars",
  },
  {
    id: "identimatch",
    title: "IdentiMatch",
    category: "Data & ML",
    description:
      "For India.Runs, Track 3. Aadhaar/PAN identity mismatch detection with fuzzy matching and auto-fill correction routing.",
    tags: ["Fuzzy Matching", "India.Runs Track 3", "Identity Verification", "Routing"],
    award: "India.Runs Track 3",
  },
  {
    id: "carbontrace",
    title: "CarbonTrace",
    category: "Hardware & IoT",
    description:
      "HackFusion 2026, Team TypeZ, Samritha was team lead. IoT-enabled household carbon footprint tracker. Prototype used OCR-based bill reading; full hardware integration was planned live during the hackathon.",
    tags: ["HackFusion 2026", "IoT", "OCR", "Team Lead"],
    award: "Team Lead • HackFusion 2026",
  },
  {
    id: "imprint",
    title: "Imprint",
    category: "GenAI & Web",
    description:
      "Carbon footprint awareness web app for a separate hackathon, built using Antigravity. Bill/receipt OCR and hyperlocal leaderboards.",
    tags: ["Antigravity", "OCR", "Leaderboards", "Web App"],
  },
  {
    id: "learnar",
    title: "LearnAR / SONA FORGE",
    category: "GenAI & Web",
    description:
      "Browser-based AR science education platform for Indian school students, Class 8 to 12. Stack: Three.js, AR.js, Gemini AI tutor.",
    tags: ["Three.js", "AR.js", "Gemini AI Tutor", "EdTech"],
  },
  {
    id: "sona-powerpredict",
    title: "Sona PowerPredict",
    category: "Data & ML",
    description:
      "IPL powerplay score prediction competition entry, team 'Byte Bouncers'. Python MyModel class iterated through versions v4 to v11. Constraints: zero hardcoded values, runtime under 10 to 20 seconds, memory under 512 MB (Docker), fully vectorized pandas/numpy. Techniques: era-decay weighting, percentile-based venue/team routing (highway/trap venue detection), five-tier wicket-bracket scoring, player intent signals from delivery data, one unified _norm() string normalization function to prevent key-matching failures.",
    tags: ["Python", "Pandas", "NumPy", "Docker", "Vectorized ML"],
    award: "Team Byte Bouncers",
  },
  {
    id: "fensesense",
    title: "FenceSense",
    category: "Hardware & IoT",
    description:
      "Smart India Hackathon 2026 hardware-track submission. Intelligent electric fence monitoring system targeting Kerala's illegal electric fence crisis.",
    tags: ["Smart India Hackathon 2026", "Hardware Track", "Electric Fence Monitoring"],
    award: "SIH 2026 Hardware Track",
  },
  {
    id: "abtalks-redesign",
    title: "ABTalks Redesign",
    category: "GenAI & Web",
    description:
      "ABTalks Vicodathon: Built solo with Antigravity + Vite/React/Tailwind. Redesigned the ABTalks platform across three mobile-first screens.",
    tags: ["Antigravity", "Vite", "React", "Tailwind CSS", "Vicodathon Solo"],
    award: "Vicodathon",
  },
  {
    id: "clauseclash",
    title: "ClauseClash (Concept)",
    category: "Strategy & Design",
    description:
      "SheBuilds Chennai x CCCL Hack (Code & Challenge 3.0), with teammate Bavadharshana, team 'ctrl+she'. Concept: AI-powered semantic contract conflict detection (Sentence Transformers, FAISS, Neo4j, Llama 3/GPT-4.1). Note: Concept stage exploration; not a working product.",
    tags: ["Concept Only", "SheBuilds Chennai", "CCCL Hack 3.0", "ctrl+she"],
    badge: "Concept Stage Only",
  },
  {
    id: "nextgen-os",
    title: "NextGen OS Pitch Deck",
    category: "Strategy & Design",
    description:
      "15-slide pitch deck, built programmatically, for a unified business OS platform targeting Indian MSMEs.",
    tags: ["MSME Strategy", "Pitch Deck", "Business OS"],
  },
  {
    id: "nit-trichy",
    title: "NIT Tiruchirappalli Hackathon",
    category: "GenAI & Web",
    description:
      "Problem statement: AI-based subjective answer auto-grading, motivated by the CBSE On-Screen Marking re-evaluation crisis. Locked stack: LLM API with prompt caching, FastAPI, Celery, Redis, Supabase, React dashboard.",
    tags: ["LLM API", "FastAPI", "Celery", "Redis", "Supabase", "React"],
    award: "NIT Trichy Hackathon",
  },
  {
    id: "ieee-hb26",
    title: "IEEE CS Hack Battle (HB-26)",
    category: "Data & ML",
    description:
      "36-hour hackathon, team of 4. Track 3: Developer Tooling, subtrack Codebase Intelligence & Navigation. Samritha took the Ingestion & Chunking role. The team used open source libraries and frameworks rather than building everything from scratch.",
    tags: ["Ingestion & Chunking", "Developer Tooling", "36-Hour Hackathon"],
    award: "HB-26 Participant",
  },
  {
    id: "libre-portal",
    title: "Libre (Smart Library Portal)",
    category: "Strategy & Design",
    description:
      "Smart Library Book Availability Portal (design stage). Students search books by title/author/subject and see availability; librarians update records. Four access levels (student, librarian, head librarian, super admin); students pre-imported from the college database and log in with registration id. QR-based issue with student photo and details on the librarian screen; edition grouping with total availability; per-copy status; shelf location and reference-only flag; bulk CSV import with ISBN auto-fill. Fines count working days (Mon to Sat) with holidays set by the head librarian; warning notice and appeal before any letter to the HOD. Note: Design and research only; not built or deployed.",
    tags: ["Design & Research Only", "RBAC", "QR Issue", "System Design"],
    badge: "Design & Research Only",
  },
];

import { useView } from "@/context/view-context";

interface RawProject {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string | string[];
  demo_url?: string | null;
  repo_url?: string | null;
  award?: string | null;
  badge?: string | null;
}

export function ExperienceProjects() {
  const { liveContent } = useView();
  const [filter, setFilter] = useState("All");
  const [projectList, setProjectList] = useState<ProjectItem[]>(projects);

  useEffect(() => {
    if (liveContent.projects.length > 0) {
      setProjectList(
        liveContent.projects.map((p: RawProject) => ({
          id: p.id,
          title: p.title,
          category: p.category,
          description: p.description,
          tags: typeof p.tags === "string" ? p.tags.split(",").map((t: string) => t.trim()) : p.tags,
          demoUrl: p.demo_url || undefined,
          repoUrl: p.repo_url || undefined,
          award: p.award || undefined,
          badge: p.badge || undefined,
        }))
      );
    }
  }, [liveContent.projects]);

  const categories = ["All", "GenAI & Web", "Data & ML", "Hardware & IoT", "Strategy & Design"];

  const filteredProjects =
    filter === "All"
      ? projectList
      : projectList.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 section-elevated relative">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* ================= EXPERIENCE SECTION ================= */}
        <div>
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest text-[var(--accent-gold)] font-mono flex items-center justify-center gap-2">
              <Briefcase className="w-3.5 h-3.5" />
              Professional Experience
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[var(--text-primary)] mt-3">
              Experience
            </h2>
            <div className="gold-hairline w-24 mx-auto mt-4" />
          </div>

          <div className="rounded-2xl p-6 sm:p-8 bg-[var(--surface-dusk)] border border-[var(--border-subtle)] shadow-md space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-[var(--border-subtle)]">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-gold)] font-semibold">
                  June to August 2026
                </span>
                <h3 className="font-serif text-2xl font-medium text-[var(--text-primary)] mt-1">
                  Founder&apos;s Office Intern
                </h3>
                <div className="flex items-center gap-2 text-sm text-[var(--text-primary)]/80 mt-1">
                  <Building2 className="w-4 h-4 text-[var(--accent-gold)]" />
                  <span>Imagivite Technology Pvt. Ltd.</span>
                </div>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono bg-[var(--bg-base)] border border-[var(--accent-gold)]/30 text-[var(--accent-gold)] self-start sm:self-auto">
                Tamil Nadu, India
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Ride-Hailing Venture */}
              <div className="p-5 rounded-xl bg-[var(--bg-base)]/70 border border-[var(--border-subtle)] space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--accent-gold)] font-semibold">
                  <Compass className="w-3.5 h-3.5" />
                  Ride-Hailing Venture (Tamil Nadu)
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-primary)]/85 leading-relaxed list-disc list-inside">
                  <li>Authored Business Requirements Documents (BRDs) and Product Requirements Documents (PRDs).</li>
                  <li>Validated Tiruppur as the lead launch city.</li>
                  <li>Produced comprehensive strategy work: Tiruppur/Erode launch plan, a Rapido-modeled subscription structure, and seven formal strategy documents in total.</li>
                </ul>
              </div>

              {/* Bookymet Platform */}
              <div className="p-5 rounded-xl bg-[var(--bg-base)]/70 border border-[var(--border-subtle)] space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--accent-gold)] font-semibold">
                  <Briefcase className="w-3.5 h-3.5" />
                  Bookymet (Turf-Booking Platform)
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-primary)]/85 leading-relaxed list-disc list-inside">
                  <li>QA testing: identified GPS override errors, mid-checkout state mutation bugs, and paywall blockers.</li>
                  <li>Provided structured QA and UX feedback, including a loyalty tier redesign.</li>
                </ul>
              </div>
            </div>

            {/* Across Both Initiatives */}
            <div className="p-5 rounded-xl bg-[var(--surface-amethyst)]/50 border border-[var(--accent-gold)]/20">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-gold)] font-semibold block mb-2">
                Across Both Ventures
              </span>
              <ul className="space-y-1.5 text-xs sm:text-sm text-[var(--text-primary)]/90 leading-relaxed list-disc list-inside">
                <li>Led user research that surfaced four structural gaps.</li>
                <li>Participated in core business strategy discussions.</li>
                <li>Communicated with an international client in Dubai.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ================= PROJECTS SECTION ================= */}
        <div>
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[var(--accent-gold)] font-mono">
              Engineering & Prototypes
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[var(--text-primary)] mt-3">
              Projects
            </h2>
            <div className="gold-hairline w-24 mx-auto mt-4" />
            <p className="text-sm text-[var(--text-primary)]/80 max-w-xl mx-auto mt-4 leading-relaxed">
              Technical projects, hackathon prototypes, system architectures, and engineering builds.
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
                    {project.badge && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-400 px-2 py-0.5 rounded-full bg-[var(--bg-base)] border border-amber-500/30">
                        <ShieldAlert className="w-3 h-3" />
                        {project.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-2xl font-medium text-[var(--text-primary)] mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-primary)]/80 leading-relaxed mb-6 font-sans">
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
                  {(project.demoUrl || project.repoUrl) && (
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
                  )}
                </div>
              </KokonutCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}