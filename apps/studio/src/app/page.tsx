"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Compass, CheckCircle2, Trash2, Plus, ShieldCheck, Clock,
  Layers, FileText, MessageSquare, Sparkles, Terminal, ExternalLink,
  Edit2, Save, X, Image, BookOpen, LogOut, Upload, Eye, EyeOff,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Milestone { id: string; view: "unfiltered" | "filtered"; year: string; title: string; story: string; }
interface WallNote   { id: string; name: string | null; message: string; approved: boolean; created_at: string; }
interface Post       { id: string; title: string; excerpt: string; content: string; tag: string; date_label: string; read_time: string; view: string; published: boolean; }
interface Photo      { id: string; url: string; title: string; caption: string; story: string; tag: string; date_label: string; view: string; }

type Tab = "milestones" | "wall" | "posts" | "photos" | "resume";

// ─── Helper fetch ─────────────────────────────────────────────────────────────
async function api(path: string, opts?: RequestInit) {
  const res = await fetch(path, opts);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function StudioDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("milestones");
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [notes, setNotes]           = useState<WallNote[]>([]);
  const [posts, setPosts]           = useState<Post[]>([]);
  const [photos, setPhotos]         = useState<Photo[]>([]);

  // Load data
  const loadAll = useCallback(async () => {
    const [m, n, p, ph] = await Promise.all([
      api("/api/milestones"),
      api("/api/notes"),
      api("/api/posts"),
      api("/api/photos"),
    ]);
    setMilestones(m); setNotes(n); setPosts(p); setPhotos(ph);
  }, []);

  useEffect(() => { loadAll(); }, [loadAll]);

  const pendingCount = notes.filter((n) => !n.approved).length;

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-[#090d13] text-[#e6edf3] flex flex-col font-sans">
      {/* Top Nav */}
      <header className="border-b border-[#21262d] bg-[#0d1117]/95 backdrop-blur px-4 sm:px-6 py-3 sm:py-4 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-30">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#C9A24B]/20 border border-[#C9A24B] flex items-center justify-center text-[#C9A24B] font-bold text-sm">S</div>
          <div>
            <h1 className="font-semibold text-xs sm:text-sm tracking-wide text-white">Samritha Portfolio Studio</h1>
            <span className="text-[10px] text-[#8b949e] font-mono hidden xs:inline">Private Content Management</span>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 font-mono">
            <ShieldCheck className="w-3.5 h-3.5" /> Authenticated
          </span>
          <a href="https://samritha.vercel.app" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-[#161b22] border border-[#30363d] text-[#8b949e] hover:text-white transition-colors">
            <ExternalLink className="w-3 h-3" /> <span className="hidden sm:inline">View Site</span>
          </a>
          <button onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-red-950/40 border border-red-500/30 text-red-400 hover:bg-red-950/70 transition-colors cursor-pointer">
            <LogOut className="w-3 h-3" /> Logout
          </button>
        </div>
      </header>

      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
        {/* Navigation: Horizontal scroll on mobile, vertical sidebar on desktop */}
        <aside className="md:col-span-3 space-y-1">
          <div className="flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {([
              { id: "milestones", icon: Compass,       label: "Journey Milestones", count: milestones.length, badge: false },
              { id: "wall",       icon: MessageSquare,  label: "Wall Moderation",    count: pendingCount, badge: pendingCount > 0 },
              { id: "posts",      icon: BookOpen,       label: "Blog & Stories",     count: posts.length, badge: false },
              { id: "photos",     icon: Image,          label: "Photo Gallery",      count: photos.length, badge: false },
              { id: "resume",     icon: FileText,       label: "Resume File",        count: null, badge: false },
            ]).map(({ id, icon: Icon, label, count, badge }) => (
              <button key={id} onClick={() => setActiveTab(id as Tab)}
                className={`flex items-center justify-between gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer shrink-0 md:shrink md:w-full ${
                  activeTab === id
                    ? "bg-[#C9A24B]/15 text-[#C9A24B] border border-[#C9A24B]/40"
                    : "text-[#8b949e] hover:bg-[#161b22] hover:text-white border border-transparent"
                }`}>
                <span className="flex items-center gap-2 sm:gap-2.5"><Icon className="w-4 h-4" />{label}</span>
                {count !== null && (
                  <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                    badge ? "bg-amber-500 text-black font-semibold animate-pulse" : "bg-[#21262d] text-white"
                  }`}>{count}</span>
                )}
              </button>
            ))}
          </div>

          <div className="hidden md:block pt-4 border-t border-[#21262d] mt-4">
            <div className="flex items-center gap-2 text-[10px] text-[#8b949e] font-mono px-2">
              <Clock className="w-3 h-3" /> Last sync: just now
            </div>
            <div className="flex items-center gap-2 text-[10px] text-[#8b949e] font-mono px-2 mt-1">
              <Sparkles className="w-3 h-3 text-[#C9A24B]" /> Powered by Supabase + Cloudinary
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="md:col-span-9 bg-[#161b22] border border-[#21262d] rounded-2xl p-6 sm:p-8 overflow-auto">
          {activeTab === "milestones" && <MilestonesTab milestones={milestones} onRefresh={loadAll} />}
          {activeTab === "wall"       && <WallTab notes={notes} onRefresh={loadAll} />}
          {activeTab === "posts"      && <PostsTab posts={posts} onRefresh={loadAll} />}
          {activeTab === "photos"     && <PhotosTab photos={photos} onRefresh={loadAll} />}
          {activeTab === "resume"     && <ResumeTab />}
        </main>
      </div>
    </div>
  );
}

// ─── Milestones Tab ───────────────────────────────────────────────────────────
function MilestonesTab({ milestones, onRefresh }: { milestones: Milestone[]; onRefresh: () => void }) {
  const [adding, setAdding] = useState(false);
  const [view, setView]     = useState<"unfiltered" | "filtered">("unfiltered");
  const [year, setYear]     = useState("");
  const [title, setTitle]   = useState("");
  const [story, setStory]   = useState("");
  const [saving, setSaving] = useState(false);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await api("/api/milestones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ view, year, title, story }),
    });
    setSaving(false); setAdding(false); setYear(""); setTitle(""); setStory("");
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    await api("/api/milestones", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    onRefresh();
  };

  const filter = (v: string) => milestones.filter((m) => m.view === v);

  return (
    <div>
      <div className="flex items-center justify-between pb-5 border-b border-[#21262d] mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white">Journey Milestones</h2>
          <p className="text-xs text-[#8b949e] mt-0.5">Add milestones for Unfiltered (personal) and Filtered (tech) timelines.</p>
        </div>
        <button onClick={() => setAdding(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#C9A24B] text-[#0c1117] text-xs font-semibold hover:brightness-110 cursor-pointer">
          <Plus className="w-3.5 h-3.5" /> Add Milestone
        </button>
      </div>

      {adding && (
        <form onSubmit={handleAdd} className="mb-6 p-5 rounded-xl bg-[#0d1117] border border-[#30363d] space-y-3">
          <div className="flex gap-2">
            {(["unfiltered", "filtered"] as const).map((v) => (
              <button key={v} type="button" onClick={() => setView(v)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono border cursor-pointer transition-colors ${
                  view === v ? "bg-[#C9A24B]/15 border-[#C9A24B]/50 text-[#C9A24B]" : "border-[#30363d] text-[#8b949e]"
                }`}>{v}</button>
            ))}
          </div>
          <input required value={year} onChange={(e) => setYear(e.target.value)}
            placeholder="Year (e.g. 2024)" className={inputCls} />
          <input required value={title} onChange={(e) => setTitle(e.target.value)}
            placeholder="Milestone Title" className={inputCls} />
          <textarea required value={story} onChange={(e) => setStory(e.target.value)}
            placeholder="Story / Description" rows={3} className={inputCls} />
          <div className="flex gap-2">
            <button type="submit" disabled={saving}
              className="px-4 py-2 rounded-lg bg-[#C9A24B] text-[#0c1117] text-xs font-semibold hover:brightness-110 cursor-pointer disabled:opacity-50">
              {saving ? "Saving…" : "Save"}
            </button>
            <button type="button" onClick={() => setAdding(false)}
              className="px-4 py-2 rounded-lg bg-[#21262d] text-[#8b949e] text-xs cursor-pointer">Cancel</button>
          </div>
        </form>
      )}

      {(["unfiltered", "filtered"] as const).map((v) => (
        <div key={v} className="mb-8">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#C9A24B] mb-3">{v} Timeline</h3>
          <div className="space-y-3">
            {filter(v).map((m) => (
              <div key={m.id} className="flex items-start justify-between gap-4 p-4 rounded-xl bg-[#0d1117] border border-[#21262d]">
                <div>
                  <span className="text-xs font-mono text-[#C9A24B]">{m.year}</span>
                  <p className="text-sm font-medium text-white mt-0.5">{m.title}</p>
                  <p className="text-xs text-[#8b949e] mt-1 leading-relaxed">{m.story}</p>
                </div>
                <button onClick={() => handleDelete(m.id)}
                  className="text-[#8b949e] hover:text-red-400 transition-colors cursor-pointer shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {filter(v).length === 0 && (
              <p className="text-xs text-[#8b949e] italic">No {v} milestones yet.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Wall Tab ─────────────────────────────────────────────────────────────────
function WallTab({ notes, onRefresh }: { notes: WallNote[]; onRefresh: () => void }) {
  const handleApprove = async (id: string, approved: boolean) => {
    await api("/api/notes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, approved }),
    });
    onRefresh();
  };
  const handleDelete = async (id: string) => {
    await api("/api/notes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    onRefresh();
  };

  const pending  = notes.filter((n) => !n.approved);
  const approved = notes.filter((n) => n.approved);

  return (
    <div>
      <div className="pb-5 border-b border-[#21262d] mb-6">
        <h2 className="text-lg font-semibold text-white">Wall Moderation</h2>
        <p className="text-xs text-[#8b949e] mt-0.5">Approve visitor notes before they appear on the public wall.</p>
      </div>

      {pending.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-3">
            Pending ({pending.length})
          </h3>
          <div className="space-y-3">
            {pending.map((n) => (
              <div key={n.id} className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30">
                <p className="text-xs font-mono text-amber-400 mb-1">{n.name ?? "Anonymous"}</p>
                <p className="text-sm text-white">{n.message}</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => handleApprove(n.id, true)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-950/50 border border-emerald-500/40 text-emerald-400 text-xs cursor-pointer hover:bg-emerald-950">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                  </button>
                  <button onClick={() => handleDelete(n.id)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-500/30 text-red-400 text-xs cursor-pointer hover:bg-red-950">
                    <Trash2 className="w-3.5 h-3.5" /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-3">
          Approved ({approved.length})
        </h3>
        <div className="space-y-2">
          {approved.map((n) => (
            <div key={n.id} className="flex items-start justify-between gap-4 p-3 rounded-xl bg-[#0d1117] border border-[#21262d]">
              <div>
                <p className="text-xs font-mono text-[#C9A24B]">{n.name ?? "Anonymous"}</p>
                <p className="text-sm text-[#e6edf3] mt-0.5">{n.message}</p>
              </div>
              <button onClick={() => handleDelete(n.id)}
                className="text-[#8b949e] hover:text-red-400 transition-colors cursor-pointer shrink-0">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {approved.length === 0 && <p className="text-xs text-[#8b949e] italic">No approved notes yet.</p>}
        </div>
      </div>
    </div>
  );
}

// ─── Posts Tab ────────────────────────────────────────────────────────────────
function PostsTab({ posts, onRefresh }: { posts: Post[]; onRefresh: () => void }) {
  const [adding, setAdding]   = useState(false);
  const [editing, setEditing] = useState<Post | null>(null);
  const [form, setForm]       = useState({ title: "", excerpt: "", content: "", tag: "", date_label: "", read_time: "3 min read", view: "unfiltered", published: false });
  const [saving, setSaving]   = useState(false);

  const resetForm = () => setForm({ title: "", excerpt: "", content: "", tag: "", date_label: "", read_time: "3 min read", view: "unfiltered", published: false });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    if (editing) {
      await api("/api/posts", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editing.id, ...form }) });
      setEditing(null);
    } else {
      await api("/api/posts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      setAdding(false);
    }
    setSaving(false); resetForm(); onRefresh();
  };

  const handleDelete = async (id: string) => {
    await api("/api/posts", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    onRefresh();
  };

  const startEdit = (p: Post) => { setEditing(p); setForm({ title: p.title, excerpt: p.excerpt, content: p.content, tag: p.tag, date_label: p.date_label, read_time: p.read_time, view: p.view, published: p.published }); };

  const isFormOpen = adding || !!editing;

  return (
    <div>
      <div className="flex items-center justify-between pb-5 border-b border-[#21262d] mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white">Blog & Stories</h2>
          <p className="text-xs text-[#8b949e] mt-0.5">Write posts for the Unfiltered (personal) or Filtered (tech) view.</p>
        </div>
        {!isFormOpen && (
          <button onClick={() => setAdding(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#C9A24B] text-[#0c1117] text-xs font-semibold hover:brightness-110 cursor-pointer">
            <Plus className="w-3.5 h-3.5" /> New Post
          </button>
        )}
      </div>

      {isFormOpen && (
        <form onSubmit={handleSave} className="mb-6 p-5 rounded-xl bg-[#0d1117] border border-[#30363d] space-y-3">
          <h3 className="text-sm font-semibold text-white">{editing ? "Edit Post" : "New Post"}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" className={inputCls} />
            <input required value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} placeholder="Tag (e.g. Essays)" className={inputCls} />
            <input value={form.date_label} onChange={(e) => setForm({ ...form, date_label: e.target.value })} placeholder="Date label (e.g. Sep 2024)" className={inputCls} />
            <input value={form.read_time} onChange={(e) => setForm({ ...form, read_time: e.target.value })} placeholder="Read time (e.g. 4 min read)" className={inputCls} />
          </div>
          <textarea required value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="Short excerpt (shown on cards)" rows={2} className={inputCls} />
          <textarea required value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Full post content" rows={6} className={inputCls} />
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {["unfiltered", "filtered"].map((v) => (
                <button key={v} type="button" onClick={() => setForm({ ...form, view: v })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono border cursor-pointer transition-colors ${
                    form.view === v ? "bg-[#C9A24B]/15 border-[#C9A24B]/50 text-[#C9A24B]" : "border-[#30363d] text-[#8b949e]"
                  }`}>{v}</button>
              ))}
            </div>
            <label className="flex items-center gap-2 text-xs text-[#8b949e] cursor-pointer">
              <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="rounded" />
              Published
            </label>
          </div>
          <div className="flex gap-2">
            <button type="submit" disabled={saving}
              className="px-4 py-2 rounded-lg bg-[#C9A24B] text-[#0c1117] text-xs font-semibold hover:brightness-110 cursor-pointer disabled:opacity-50 flex items-center gap-1">
              <Save className="w-3.5 h-3.5" />{saving ? "Saving…" : "Save Post"}
            </button>
            <button type="button" onClick={() => { setAdding(false); setEditing(null); resetForm(); }}
              className="px-4 py-2 rounded-lg bg-[#21262d] text-[#8b949e] text-xs cursor-pointer">Cancel</button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {posts.map((p) => (
          <div key={p.id} className="flex items-start justify-between gap-4 p-4 rounded-xl bg-[#0d1117] border border-[#21262d]">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#21262d] text-[#C9A24B]">{p.tag}</span>
                <span className="text-xs font-mono text-[#8b949e]">{p.view}</span>
                {p.published
                  ? <span className="text-xs text-emerald-400 flex items-center gap-0.5"><Eye className="w-3 h-3" /> Published</span>
                  : <span className="text-xs text-amber-400 flex items-center gap-0.5"><EyeOff className="w-3 h-3" /> Draft</span>
                }
              </div>
              <p className="text-sm font-medium text-white truncate">{p.title}</p>
              <p className="text-xs text-[#8b949e] mt-0.5 line-clamp-1">{p.excerpt}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => startEdit(p)} className="text-[#8b949e] hover:text-[#C9A24B] transition-colors cursor-pointer"><Edit2 className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(p.id)} className="text-[#8b949e] hover:text-red-400 transition-colors cursor-pointer"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
        {posts.length === 0 && <p className="text-xs text-[#8b949e] italic">No posts yet. Create your first one above.</p>}
      </div>
    </div>
  );
}

// ─── Photos Tab ───────────────────────────────────────────────────────────────
function PhotosTab({ photos, onRefresh }: { photos: Photo[]; onRefresh: () => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({ title: "", caption: "", story: "", tag: "", date_label: "", view: "unfiltered" });
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview]     = useState<string | null>(null);
  const [file, setFile]           = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);

    // 1. Upload to Cloudinary via our server route
    const fd = new FormData();
    fd.append("file", file);
    const { url } = await api("/api/upload", { method: "POST", body: fd });

    // 2. Save metadata to Supabase
    await api("/api/photos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, ...form }),
    });

    setUploading(false);
    setFile(null); setPreview(null);
    setForm({ title: "", caption: "", story: "", tag: "", date_label: "", view: "unfiltered" });
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    await api("/api/photos", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    onRefresh();
  };

  return (
    <div>
      <div className="pb-5 border-b border-[#21262d] mb-6">
        <h2 className="text-lg font-semibold text-white">Photo Gallery</h2>
        <p className="text-xs text-[#8b949e] mt-0.5">Upload photos to Cloudinary and they appear in the portfolio gallery instantly.</p>
      </div>

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="mb-8 p-5 rounded-xl bg-[#0d1117] border border-[#30363d] space-y-4">
        <h3 className="text-sm font-semibold text-white">Upload New Photo</h3>

        {/* Drop Zone */}
        <div
          onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed border-[#30363d] rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#C9A24B]/50 transition-colors"
        >
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="Preview" className="max-h-40 rounded-lg object-contain" />
          ) : (
            <>
              <Upload className="w-8 h-8 text-[#8b949e] mb-2" />
              <p className="text-xs text-[#8b949e]">Click to select a photo</p>
            </>
          )}
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" className={inputCls} />
          <input value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} placeholder="Tag (e.g. Atmosphere)" className={inputCls} />
          <input value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} placeholder="Short caption" className={inputCls} />
          <input value={form.date_label} onChange={(e) => setForm({ ...form, date_label: e.target.value })} placeholder="Date label (e.g. Autumn 2024)" className={inputCls} />
        </div>
        <textarea value={form.story} onChange={(e) => setForm({ ...form, story: e.target.value })} placeholder="Full story (shown in lightbox)" rows={3} className={inputCls} />
        <div className="flex gap-2">
          {["unfiltered", "filtered"].map((v) => (
            <button key={v} type="button" onClick={() => setForm({ ...form, view: v })}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono border cursor-pointer transition-colors ${
                form.view === v ? "bg-[#C9A24B]/15 border-[#C9A24B]/50 text-[#C9A24B]" : "border-[#30363d] text-[#8b949e]"
              }`}>{v}</button>
          ))}
        </div>
        <button type="submit" disabled={uploading || !file}
          className="px-4 py-2 rounded-lg bg-[#C9A24B] text-[#0c1117] text-xs font-semibold hover:brightness-110 cursor-pointer disabled:opacity-50 flex items-center gap-1.5">
          <Upload className="w-3.5 h-3.5" />{uploading ? "Uploading…" : "Upload Photo"}
        </button>
      </form>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {photos.map((ph) => (
          <div key={ph.id} className="relative group rounded-xl overflow-hidden border border-[#21262d] bg-[#0d1117]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ph.url} alt={ph.title} className="w-full h-32 object-cover" />
            <div className="p-2">
              <p className="text-xs font-medium text-white truncate">{ph.title}</p>
              <p className="text-[10px] text-[#8b949e]">{ph.view} · {ph.tag}</p>
            </div>
            <button
              onClick={() => handleDelete(ph.id)}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-[#8b949e] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
        {photos.length === 0 && <p className="col-span-3 text-xs text-[#8b949e] italic">No photos uploaded yet.</p>}
      </div>
    </div>
  );
}

// ─── Resume Tab ───────────────────────────────────────────────────────────────
function ResumeTab() {
  const fileRef  = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [url, setUrl]             = useState("");
  const [saved, setSaved]         = useState(false);

  const handleUpload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await api("/api/upload", { method: "POST", body: fd });
    setUrl(res.url);
    setUploading(false);
    setSaved(true);
  };

  return (
    <div>
      <div className="pb-5 border-b border-[#21262d] mb-6">
        <h2 className="text-lg font-semibold text-white">Resume / CV</h2>
        <p className="text-xs text-[#8b949e] mt-0.5">Upload your PDF to Cloudinary and copy the URL to use in the Filtered view.</p>
      </div>
      <div className="p-6 rounded-xl bg-[#0d1117] border border-[#30363d] space-y-4 max-w-lg">
        <div>
          <label className="block text-xs text-[#8b949e] mb-1.5">Upload PDF Resume</label>
          <input ref={fileRef} type="file" accept=".pdf" className={inputCls} />
        </div>
        <button onClick={handleUpload} disabled={uploading}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#C9A24B] text-[#0c1117] text-xs font-semibold hover:brightness-110 cursor-pointer disabled:opacity-50">
          <Upload className="w-3.5 h-3.5" />{uploading ? "Uploading…" : "Upload to Cloudinary"}
        </button>
        {saved && url && (
          <div className="space-y-2">
            <p className="text-xs text-emerald-400">✓ Uploaded! Copy this URL into your Resume section component:</p>
            <code className="block text-xs text-white bg-[#21262d] p-3 rounded-lg break-all font-mono">{url}</code>
          </div>
        )}
        <p className="text-[11px] text-[#8b949e]">
          After uploading, update <code className="text-[#C9A24B]">resumeUrl</code> in your resume section component with the URL above.
        </p>
        <div className="flex gap-2">
          <Terminal className="w-3.5 h-3.5 text-[#8b949e] mt-0.5" />
          <div className="flex flex-col gap-1">
            <a href="https://cloudinary.com/console/media_library" target="_blank" rel="noopener noreferrer"
              className="text-xs text-[#C9A24B] hover:underline flex items-center gap-1">
              Open Cloudinary Media Library <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Shared ───────────────────────────────────────────────────────────────────
const inputCls = "w-full px-3 py-2 rounded-lg bg-[#161b22] border border-[#30363d] text-sm text-white font-sans placeholder-[#484f58] focus:outline-none focus:border-[#C9A24B]/60 transition-colors";
