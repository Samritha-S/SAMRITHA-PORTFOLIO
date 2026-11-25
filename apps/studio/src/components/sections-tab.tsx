"use client";

import React, { useState, useEffect } from "react";
import { Save, CheckCircle2, Plus, Trash2, User, Cpu, Trophy, Code2, Mail } from "lucide-react";
import { PortfolioSections } from "@/lib/portfolio-defaults";

const inputCls =
  "w-full px-3 py-2 rounded-lg bg-[#161b22] border border-[#30363d] text-xs text-white focus:outline-none focus:border-[#C9A24B]";

export function SectionsTab({
  sections,
  onSave,
}: {
  sections: Omit<PortfolioSections, "theme">;
  onSave: (next: Omit<PortfolioSections, "theme">) => Promise<void>;
}) {
  const [form, setForm] = useState(sections);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(sections);
  }, [sections]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(form);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#21262d]">
        <div>
          <h2 className="text-lg font-semibold text-white">Portfolio Sections</h2>
          <p className="text-xs text-[#8b949e] mt-0.5">
            Edit About copy, Skills, Coursework, Competitions, Research, GitHub &amp; Contact links in real time.
          </p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#C9A24B] text-[#0c1117] text-xs font-semibold hover:brightness-110 cursor-pointer disabled:opacity-50"
        >
          <Save className="w-3.5 h-3.5" />
          {saving ? "Saving…" : "Save All Sections"}
        </button>
      </div>

      {saved && (
        <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-400 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> All portfolio sections saved and synced live!
        </div>
      )}

      {/* 1. About Sections */}
      <div className="p-5 rounded-xl bg-[#0d1117] border border-[#30363d] space-y-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <User className="w-4 h-4 text-[#C9A24B]" /> About Sections (Both Modes)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3 p-4 rounded-xl bg-[#161b22]/60 border border-[#30363d]">
            <span className="text-xs font-mono text-[#D4AF7A]">Unfiltered About</span>
            <div>
              <label className="block text-[11px] text-[#8b949e] mb-1">Hero Pill</label>
              <input
                value={form.about.unfiltered.pill}
                onChange={(e) =>
                  setForm({ ...form, about: { ...form.about, unfiltered: { ...form.about.unfiltered, pill: e.target.value } } })
                }
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-[11px] text-[#8b949e] mb-1">Opening Tagline</label>
              <input
                value={form.about.unfiltered.tagline}
                onChange={(e) =>
                  setForm({ ...form, about: { ...form.about, unfiltered: { ...form.about.unfiltered, tagline: e.target.value } } })
                }
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-[11px] text-[#8b949e] mb-1">Paragraphs (one per line)</label>
              <textarea
                rows={5}
                value={form.about.unfiltered.paragraphs.join("\n\n")}
                onChange={(e) =>
                  setForm({
                    ...form,
                    about: {
                      ...form.about,
                      unfiltered: {
                        ...form.about.unfiltered,
                        paragraphs: e.target.value.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
                      },
                    },
                  })
                }
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-[11px] text-[#8b949e] mb-1">Pull Quote</label>
              <input
                value={form.about.unfiltered.quote}
                onChange={(e) =>
                  setForm({ ...form, about: { ...form.about, unfiltered: { ...form.about.unfiltered, quote: e.target.value } } })
                }
                className={inputCls}
              />
            </div>
          </div>

          <div className="space-y-3 p-4 rounded-xl bg-[#161b22]/60 border border-[#30363d]">
            <span className="text-xs font-mono text-[#C9A24B]">Filtered About</span>
            <div>
              <label className="block text-[11px] text-[#8b949e] mb-1">Engineering Pill</label>
              <input
                value={form.about.filtered.pill}
                onChange={(e) =>
                  setForm({ ...form, about: { ...form.about, filtered: { ...form.about.filtered, pill: e.target.value } } })
                }
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-[11px] text-[#8b949e] mb-1">Community Badge</label>
              <input
                value={form.about.filtered.badge}
                onChange={(e) =>
                  setForm({ ...form, about: { ...form.about, filtered: { ...form.about.filtered, badge: e.target.value } } })
                }
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-[11px] text-[#8b949e] mb-1">About Paragraphs (blank line between)</label>
              <textarea
                rows={7}
                value={form.about.filtered.paragraphs.join("\n\n")}
                onChange={(e) =>
                  setForm({
                    ...form,
                    about: {
                      ...form.about,
                      filtered: {
                        ...form.about.filtered,
                        paragraphs: e.target.value.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
                      },
                    },
                  })
                }
                className={inputCls}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Skills & Coursework */}
      <div className="p-5 rounded-xl bg-[#0d1117] border border-[#30363d] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#C9A24B]" /> Skills, Learning &amp; Coursework
          </h3>
          <button
            type="button"
            onClick={() =>
              setForm({
                ...form,
                skills: { ...form.skills, groups: [...form.skills.groups, { category: "New Group", items: [] }] },
              })
            }
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#161b22] border border-[#30363d] text-xs text-[#C9A24B] cursor-pointer"
          >
            <Plus className="w-3 h-3" /> Add Skill Group
          </button>
        </div>

        <div>
          <label className="block text-[11px] text-[#8b949e] mb-1">Currently Learning (one per line)</label>
          <textarea
            rows={2}
            value={form.skills.currentlyLearning.join("\n")}
            onChange={(e) =>
              setForm({
                ...form,
                skills: {
                  ...form.skills,
                  currentlyLearning: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean),
                },
              })
            }
            className={inputCls}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {form.skills.groups.map((group, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-[#161b22]/60 border border-[#30363d] space-y-2">
              <div className="flex items-center gap-2">
                <input
                  value={group.category}
                  onChange={(e) => {
                    const next = [...form.skills.groups];
                    next[idx] = { ...group, category: e.target.value };
                    setForm({ ...form, skills: { ...form.skills, groups: next } });
                  }}
                  className={inputCls}
                  placeholder="Category"
                />
                <button
                  type="button"
                  onClick={() => {
                    const next = form.skills.groups.filter((_, i) => i !== idx);
                    setForm({ ...form, skills: { ...form.skills, groups: next } });
                  }}
                  className="p-2 text-red-400 hover:bg-red-950/40 rounded-lg cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <input
                value={group.items.join(", ")}
                onChange={(e) => {
                  const next = [...form.skills.groups];
                  next[idx] = {
                    ...group,
                    items: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                  };
                  setForm({ ...form, skills: { ...form.skills, groups: next } });
                }}
                className={inputCls}
                placeholder="Comma-separated skills"
              />
            </div>
          ))}
        </div>

        <div className="pt-2 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[11px] text-[#8b949e]">Coursework Title &amp; Courses</label>
            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  skills: { ...form.skills, coursework: [...form.skills.coursework, { code: "CODE", title: "Course Name" }] },
                })
              }
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#161b22] border border-[#30363d] text-xs text-[#C9A24B] cursor-pointer"
            >
              <Plus className="w-3 h-3" /> Add Course
            </button>
          </div>
          <input
            value={form.skills.courseworkTitle}
            onChange={(e) => setForm({ ...form, skills: { ...form.skills, courseworkTitle: e.target.value } })}
            className={inputCls}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {form.skills.coursework.map((c, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  value={c.code}
                  onChange={(e) => {
                    const next = [...form.skills.coursework];
                    next[idx] = { ...c, code: e.target.value };
                    setForm({ ...form, skills: { ...form.skills, coursework: next } });
                  }}
                  className="w-28 px-2.5 py-2 rounded-lg bg-[#161b22] border border-[#30363d] text-xs font-mono text-[#C9A24B]"
                />
                <input
                  value={c.title}
                  onChange={(e) => {
                    const next = [...form.skills.coursework];
                    next[idx] = { ...c, title: e.target.value };
                    setForm({ ...form, skills: { ...form.skills, coursework: next } });
                  }}
                  className={inputCls}
                />
                <button
                  type="button"
                  onClick={() => {
                    const next = form.skills.coursework.filter((_, i) => i !== idx);
                    setForm({ ...form, skills: { ...form.skills, coursework: next } });
                  }}
                  className="p-2 text-red-400 hover:bg-red-950/40 rounded-lg cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Competitions & Publication */}
      <div className="p-5 rounded-xl bg-[#0d1117] border border-[#30363d] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#C9A24B]" /> Competitions &amp; Research Publication
          </h3>
          <button
            type="button"
            onClick={() =>
              setForm({
                ...form,
                competitions: {
                  ...form.competitions,
                  items: [
                    ...form.competitions.items,
                    { title: "New Competition", organization: "Organizer", status: "Participant", ranks: [] },
                  ],
                },
              })
            }
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#161b22] border border-[#30363d] text-xs text-[#C9A24B] cursor-pointer"
          >
            <Plus className="w-3 h-3" /> Add Competition
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {form.competitions.items.map((item, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-[#161b22]/60 border border-[#30363d] space-y-2">
              <div className="flex items-center gap-2">
                <input
                  value={item.title}
                  onChange={(e) => {
                    const next = [...form.competitions.items];
                    next[idx] = { ...item, title: e.target.value };
                    setForm({ ...form, competitions: { ...form.competitions, items: next } });
                  }}
                  className={inputCls}
                  placeholder="Title"
                />
                <button
                  type="button"
                  onClick={() => {
                    const next = form.competitions.items.filter((_, i) => i !== idx);
                    setForm({ ...form, competitions: { ...form.competitions, items: next } });
                  }}
                  className="p-2 text-red-400 hover:bg-red-950/40 rounded-lg cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  value={item.organization}
                  onChange={(e) => {
                    const next = [...form.competitions.items];
                    next[idx] = { ...item, organization: e.target.value };
                    setForm({ ...form, competitions: { ...form.competitions, items: next } });
                  }}
                  className={inputCls}
                  placeholder="Organization"
                />
                <input
                  value={item.status}
                  onChange={(e) => {
                    const next = [...form.competitions.items];
                    next[idx] = { ...item, status: e.target.value };
                    setForm({ ...form, competitions: { ...form.competitions, items: next } });
                  }}
                  className={inputCls}
                  placeholder="Status"
                />
              </div>
              <input
                value={(item.ranks ?? []).join(", ")}
                onChange={(e) => {
                  const next = [...form.competitions.items];
                  next[idx] = {
                    ...item,
                    ranks: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                  };
                  setForm({ ...form, competitions: { ...form.competitions, items: next } });
                }}
                className={inputCls}
                placeholder="Badges / Ranks (comma-separated)"
              />
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-[#161b22]/60 border border-[#30363d] space-y-2">
          <span className="text-xs font-mono text-[#C9A24B]">Research Publication</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input
              value={form.competitions.publication.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  competitions: {
                    ...form.competitions,
                    publication: { ...form.competitions.publication, title: e.target.value },
                  },
                })
              }
              className="sm:col-span-2 px-3 py-2 rounded-lg bg-[#161b22] border border-[#30363d] text-xs text-white"
              placeholder="Publication Title"
            />
            <input
              value={form.competitions.publication.year}
              onChange={(e) =>
                setForm({
                  ...form,
                  competitions: {
                    ...form.competitions,
                    publication: { ...form.competitions.publication, year: e.target.value },
                  },
                })
              }
              className={inputCls}
              placeholder="Year"
            />
          </div>
          <input
            value={form.competitions.publication.conference}
            onChange={(e) =>
              setForm({
                ...form,
                competitions: {
                  ...form.competitions,
                  publication: { ...form.competitions.publication, conference: e.target.value },
                },
              })
            }
            className={inputCls}
            placeholder="Conference"
          />
          <input
            value={form.competitions.publication.authorship}
            onChange={(e) =>
              setForm({
                ...form,
                competitions: {
                  ...form.competitions,
                  publication: { ...form.competitions.publication, authorship: e.target.value },
                },
              })
            }
            className={inputCls}
            placeholder="Authorship"
          />
        </div>
      </div>

      {/* 4. GitHub & Community + Contact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-xl bg-[#0d1117] border border-[#30363d] space-y-3">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Code2 className="w-4 h-4 text-[#C9A24B]" /> GitHub &amp; Community
          </h3>
          <input
            value={form.github.handle}
            onChange={(e) => setForm({ ...form, github: { ...form.github, handle: e.target.value } })}
            className={inputCls}
            placeholder="github.com/username"
          />
          <input
            value={form.github.url}
            onChange={(e) => setForm({ ...form, github: { ...form.github, url: e.target.value } })}
            className={inputCls}
            placeholder="https://github.com/..."
          />
          {form.github.cards.map((card, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-[#161b22]/60 border border-[#30363d] space-y-2">
              <input
                value={card.title}
                onChange={(e) => {
                  const next = [...form.github.cards];
                  next[idx] = { ...card, title: e.target.value };
                  setForm({ ...form, github: { ...form.github, cards: next } });
                }}
                className={inputCls}
                placeholder="Role Title"
              />
              <textarea
                rows={2}
                value={card.description}
                onChange={(e) => {
                  const next = [...form.github.cards];
                  next[idx] = { ...card, description: e.target.value };
                  setForm({ ...form, github: { ...form.github, cards: next } });
                }}
                className={inputCls}
              />
            </div>
          ))}
        </div>

        <div className="p-5 rounded-xl bg-[#0d1117] border border-[#30363d] space-y-3">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#C9A24B]" /> Contact &amp; Social Links
          </h3>
          <input
            value={form.contact.email}
            onChange={(e) => setForm({ ...form, contact: { ...form.contact, email: e.target.value } })}
            className={inputCls}
            placeholder="Email"
          />
          <input
            value={form.contact.linkedin}
            onChange={(e) => setForm({ ...form, contact: { ...form.contact, linkedin: e.target.value } })}
            className={inputCls}
            placeholder="LinkedIn URL"
          />
          <input
            value={form.contact.github}
            onChange={(e) => setForm({ ...form, contact: { ...form.contact, github: e.target.value } })}
            className={inputCls}
            placeholder="GitHub URL"
          />
          <input
            value={form.contact.instagram}
            onChange={(e) => setForm({ ...form, contact: { ...form.contact, instagram: e.target.value } })}
            className={inputCls}
            placeholder="Instagram URL"
          />
          <input
            value={form.contact.twitter}
            onChange={(e) => setForm({ ...form, contact: { ...form.contact, twitter: e.target.value } })}
            className={inputCls}
            placeholder="X / Twitter URL"
          />
          <textarea
            rows={2}
            value={form.contact.filteredNote}
            onChange={(e) => setForm({ ...form, contact: { ...form.contact, filteredNote: e.target.value } })}
            className={inputCls}
            placeholder="Filtered mode availability note"
          />
        </div>
      </div>
    </form>
  );
}
