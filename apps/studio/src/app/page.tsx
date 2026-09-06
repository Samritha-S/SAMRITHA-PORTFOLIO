"use client";

import React, { useState } from "react";
import {
  Compass,
  CheckCircle2,
  Trash2,
  Plus,
  ShieldCheck,
  Clock,
  Layers,
  FileText,
  MessageSquare,
  Sparkles,
  Terminal,
  ExternalLink,
  Edit2,
  Save,
  X,
} from "lucide-react";

interface Milestone {
  id: string;
  view: "unfiltered" | "filtered";
  year: string;
  title: string;
  story: string;
}

interface WallComment {
  id: string;
  name: string | null;
  message: string;
  createdAt: string;
  approved: boolean;
}

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string;
  demoUrl?: string;
  repoUrl?: string;
  award?: string;
}

const initialMilestones: Milestone[] = [
  {
    id: "u1",
    view: "unfiltered",
    year: "2024",
    title: "Learning to Slow Down & Listen",
    story:
      "Began spending hours taking long walks with no destination, discovering that the thoughts that arrive in stillness are often the ones worth keeping.",
  },
  {
    id: "u2",
    view: "unfiltered",
    year: "2023",
    title: "The Year of Ink & Cinema",
    story:
      "Filled journals with half-written poems, late-night character sketches, and rewatched Marvel phases until I could recite dialogues in rhythm.",
  },
  {
    id: "f1",
    view: "filtered",
    year: "2024",
    title: "AI Systems, Open Source & Production Engineering",
    story:
      "Deepened expertise in LLM agent pipelines, high-throughput vector databases, and real-time event-driven backends.",
  },
  {
    id: "f2",
    view: "filtered",
    year: "2023",
    title: "Hackathons, Team Leadership & Digital Twins",
    story:
      "Led developer squads across intensive 24-48 hour hackathons. Designed and shipped StadiumPulse, CarbonTrace, and IdentiMatch.",
  },
];

const initialComments: WallComment[] = [
  {
    id: "w1",
    name: "Alex M.",
    message: "Loved the personal storytelling on the unfiltered view! Fantastic aesthetic.",
    createdAt: "20 mins ago",
    approved: false, // In moderation queue
  },
  {
    id: "w2",
    name: null,
    message: "Great work on StadiumPulse! What was the latency threshold you achieved?",
    createdAt: "1 hour ago",
    approved: false, // In moderation queue
  },
  {
    id: "w3",
    name: "A fellow wanderer",
    message: "Your writing on ordinary afternoons resonated deeply. Keep observing the little things.",
    createdAt: "Yesterday",
    approved: true,
  },
];

const initialProjects: Project[] = [
  {
    id: "p1",
    title: "CarbonTrace",
    category: "Full-Stack & Sustainability",
    description: "Enterprise carbon footprint analytics platform tracking scope 1, 2, and 3 emissions.",
    tags: "Next.js, TypeScript, PostgreSQL, FastAPI",
    demoUrl: "https://carbontrace.demo",
    repoUrl: "https://github.com/samritha/carbontrace",
    award: "Best Sustainability Hack",
  },
  {
    id: "p2",
    title: "StadiumPulse",
    category: "Real-Time & Digital Twin",
    description: "Digital-twin arena management system aggregating IoT sensor metrics and attendee flow.",
    tags: "React, Node.js, WebSockets, MongoDB",
    demoUrl: "https://stadiumpulse.demo",
    repoUrl: "https://github.com/samritha/stadiumpulse",
    award: "Hackathon 1st Runner Up",
  },
];

export default function StudioDashboard() {
  const [activeTab, setActiveTab] = useState<"milestones" | "wall" | "projects" | "resume">("milestones");

  // State
  const [milestones, setMilestones] = useState<Milestone[]>(initialMilestones);
  const [comments, setComments] = useState<WallComment[]>(initialComments);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [resumeUrl, setResumeUrl] = useState("/resume.pdf");

  // Milestone Form Modal
  const [isAddingMilestone, setIsAddingMilestone] = useState(false);
  const [mView, setMView] = useState<"unfiltered" | "filtered">("unfiltered");
  const [mYear, setMYear] = useState("");
  const [mTitle, setMTitle] = useState("");
  const [mStory, setMStory] = useState("");

  const handleCreateMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mYear || !mTitle || !mStory) return;
    const newEntry: Milestone = {
      id: Date.now().toString(),
      view: mView,
      year: mYear,
      title: mTitle,
      story: mStory,
    };
    setMilestones([newEntry, ...milestones]);
    setIsAddingMilestone(false);
    setMYear("");
    setMTitle("");
    setMStory("");
  };

  const handleDeleteMilestone = (id: string) => {
    setMilestones(milestones.filter((m) => m.id !== id));
  };

  // Wall moderation
  const handleApproveComment = (id: string) => {
    setComments(
      comments.map((c) => (c.id === id ? { ...c, approved: true } : c))
    );
  };

  const handleRejectComment = (id: string) => {
    setComments(comments.filter((c) => c.id !== id));
  };

  const pendingCommentsCount = comments.filter((c) => !c.approved).length;

  return (
    <div className="min-h-screen bg-[#090d13] text-[#e6edf3] flex flex-col font-sans">
      {/* Top Studio Nav */}
      <header className="border-b border-[#21262d] bg-[#0d1117]/90 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#C9A24B]/20 border border-[#C9A24B] flex items-center justify-center text-[#C9A24B] font-bold text-sm">
            S
          </div>
          <div>
            <h1 className="font-semibold text-sm tracking-wide text-white">
              Samritha Portfolio Studio
            </h1>
            <span className="text-[10px] text-[#8b949e] font-mono">
              Private Content Management &amp; Moderation
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            2FA Authorized
          </span>
          <span className="text-xs text-[#8b949e] font-mono hidden sm:inline">
            Port: 3001
          </span>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sidebar Nav */}
        <aside className="md:col-span-3 space-y-2">
          <button
            onClick={() => setActiveTab("milestones")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              activeTab === "milestones"
                ? "bg-[#C9A24B]/15 text-[#C9A24B] border border-[#C9A24B]/40"
                : "text-[#8b949e] hover:bg-[#161b22] hover:text-white"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Compass className="w-4 h-4" />
              Journey Milestones
            </span>
            <span className="text-xs font-mono bg-[#21262d] px-2 py-0.5 rounded-full text-white">
              {milestones.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("wall")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              activeTab === "wall"
                ? "bg-[#C9A24B]/15 text-[#C9A24B] border border-[#C9A24B]/40"
                : "text-[#8b949e] hover:bg-[#161b22] hover:text-white"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <MessageSquare className="w-4 h-4" />
              Wall Moderation
            </span>
            {pendingCommentsCount > 0 ? (
              <span className="text-xs font-mono bg-amber-500 text-black font-semibold px-2 py-0.5 rounded-full animate-pulse">
                {pendingCommentsCount} new
              </span>
            ) : (
              <span className="text-xs font-mono bg-[#21262d] px-2 py-0.5 rounded-full text-[#8b949e]">
                0
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              activeTab === "projects"
                ? "bg-[#C9A24B]/15 text-[#C9A24B] border border-[#C9A24B]/40"
                : "text-[#8b949e] hover:bg-[#161b22] hover:text-white"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Layers className="w-4 h-4" />
              Engineering Projects
            </span>
            <span className="text-xs font-mono bg-[#21262d] px-2 py-0.5 rounded-full text-white">
              {projects.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("resume")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              activeTab === "resume"
                ? "bg-[#C9A24B]/15 text-[#C9A24B] border border-[#C9A24B]/40"
                : "text-[#8b949e] hover:bg-[#161b22] hover:text-white"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <FileText className="w-4 h-4" />
              Resume File Link
            </span>
          </button>
        </aside>

        {/* Content Area */}
        <main className="md:col-span-9 bg-[#161b22] border border-[#21262d] rounded-2xl p-6 sm:p-8">
          {/* TAB 1: MILESTONES */}
          {activeTab === "milestones" && (
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#21262d] mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Journey Milestones Manager
                  </h2>
                  <p className="text-xs text-[#8b949e] mt-0.5">
                    Add real milestones or delete placeholders for Unfiltered and Filtered timelines.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddingMilestone(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#C9A24B] text-[#0c1117] font-semibold text-xs hover:brightness-110 cursor-pointer transition-all shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Milestone
                </button>
              </div>

              {/* Add Milestone Form */}
              {isAddingMilestone && (
                <form
                  onSubmit={handleCreateMilestone}
                  className="p-5 rounded-xl bg-[#0d1117] border border-[#C9A24B]/40 mb-6 space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-[#C9A24B]">
                      Create New Milestone
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsAddingMilestone(false)}
                      className="text-[#8b949e] hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-[#8b949e] mb-1">
                        Timeline View *
                      </label>
                      <select
                        value={mView}
                        onChange={(e) => setMView(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-lg bg-[#161b22] border border-[#30363d] text-xs text-white"
                      >
                        <option value="unfiltered">Unfiltered (Personal)</option>
                        <option value="filtered">Filtered (Technical)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-[#8b949e] mb-1">
                        Year / Period *
                      </label>
                      <input
                        type="text"
                        required
                        value={mYear}
                        onChange={(e) => setMYear(e.target.value)}
                        placeholder="e.g. 2024 or High School"
                        className="w-full px-3 py-2 rounded-lg bg-[#161b22] border border-[#30363d] text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-[#8b949e] mb-1">
                        Milestone Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={mTitle}
                        onChange={(e) => setMTitle(e.target.value)}
                        placeholder="Short descriptive milestone"
                        className="w-full px-3 py-2 rounded-lg bg-[#161b22] border border-[#30363d] text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-[#8b949e] mb-1">
                      Story / Narrative *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={mStory}
                      onChange={(e) => setMStory(e.target.value)}
                      placeholder="The story or technical milestone behind this entry..."
                      className="w-full px-3 py-2 rounded-lg bg-[#161b22] border border-[#30363d] text-xs text-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-[#C9A24B] text-[#0c1117] font-semibold text-xs hover:brightness-110 cursor-pointer"
                  >
                    Save &amp; Publish Milestone
                  </button>
                </form>
              )}

              {/* Milestones List */}
              <div className="space-y-3">
                {milestones.map((m) => (
                  <div
                    key={m.id}
                    className="p-4 rounded-xl bg-[#0d1117] border border-[#21262d] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:border-[#30363d] transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                            m.view === "unfiltered"
                              ? "bg-purple-950/60 text-purple-300 border border-purple-800/40"
                              : "bg-blue-950/60 text-blue-300 border border-blue-800/40"
                          }`}
                        >
                          {m.view}
                        </span>
                        <span className="font-mono text-xs text-[#C9A24B]">
                          {m.year}
                        </span>
                        <h4 className="text-sm font-semibold text-white">
                          {m.title}
                        </h4>
                      </div>
                      <p className="text-xs text-[#8b949e] max-w-2xl leading-relaxed">
                        {m.story}
                      </p>
                    </div>

                    <button
                      onClick={() => handleDeleteMilestone(m.id)}
                      className="p-2 rounded-lg text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors cursor-pointer shrink-0"
                      title="Delete entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: WALL MODERATION QUEUE */}
          {activeTab === "wall" && (
            <div>
              <div className="pb-6 border-b border-[#21262d] mb-6">
                <h2 className="text-lg font-semibold text-white">
                  Wall of Comments Moderation Queue
                </h2>
                <p className="text-xs text-[#8b949e] mt-0.5">
                  Approve visitor submissions before they are shown on the live portfolio wall.
                </p>
              </div>

              <div className="space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors ${
                      comment.approved
                        ? "bg-[#0d1117] border-[#21262d]"
                        : "bg-[#1c1810] border-amber-600/50"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-white">
                          {comment.name ? comment.name : "Anonymous"}
                        </span>
                        <span className="text-[10px] text-[#8b949e]">
                          • {comment.createdAt}
                        </span>
                        {comment.approved ? (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                            Approved &amp; Live
                          </span>
                        ) : (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-700/40">
                            Pending Review
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#c9d1d9] italic">
                        &ldquo;{comment.message}&rdquo;
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {!comment.approved && (
                        <button
                          onClick={() => handleApproveComment(comment.id)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs hover:bg-emerald-500/30 cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => handleRejectComment(comment.id)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 text-xs hover:bg-rose-500/25 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PROJECTS */}
          {activeTab === "projects" && (
            <div>
              <div className="pb-6 border-b border-[#21262d] mb-6 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Projects &amp; Hackathon Prototypes
                  </h2>
                  <p className="text-xs text-[#8b949e] mt-0.5">
                    Manage portfolio projects, tech stacks, and live links.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-5 rounded-xl bg-[#0d1117] border border-[#21262d]"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-mono text-[#C9A24B]">
                          {proj.category}
                        </span>
                        <h3 className="text-base font-semibold text-white mt-0.5">
                          {proj.title}
                        </h3>
                      </div>
                      {proj.award && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950/60 border border-amber-600/40 text-amber-300 font-mono">
                          {proj.award}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#8b949e] mt-2 leading-relaxed">
                      {proj.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between text-xs pt-3 border-t border-[#21262d]">
                      <span className="text-[11px] font-mono text-[#8b949e]">
                        {proj.tags}
                      </span>
                      <div className="flex gap-3 text-[#C9A24B]">
                        {proj.demoUrl && (
                          <a
                            href={proj.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:underline flex items-center gap-1"
                          >
                            Live <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: RESUME */}
          {activeTab === "resume" && (
            <div>
              <div className="pb-6 border-b border-[#21262d] mb-6">
                <h2 className="text-lg font-semibold text-white">
                  Resume File Management
                </h2>
                <p className="text-xs text-[#8b949e] mt-0.5">
                  Update the live download URL served to visitors on the Filtered view.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-[#0d1117] border border-[#21262d] space-y-4 max-w-xl">
                <div>
                  <label className="block text-xs text-[#8b949e] mb-1">
                    Current Resume URL / Path
                  </label>
                  <input
                    type="text"
                    value={resumeUrl}
                    onChange={(e) => setResumeUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#161b22] border border-[#30363d] text-xs text-white font-mono"
                  />
                </div>
                <div className="text-[11px] text-[#8b949e]">
                  Upload PDF to S3/Cloudinary or place directly in public directory.
                </div>
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg bg-[#C9A24B] text-[#0c1117] font-semibold text-xs hover:brightness-110 cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Resume Link
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
