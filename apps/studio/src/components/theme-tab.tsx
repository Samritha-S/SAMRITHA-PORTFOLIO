"use client";

import React, { useState, useEffect } from "react";
import { Palette, RotateCcw, Save, CheckCircle2, Sparkles, Terminal } from "lucide-react";
import { DEFAULT_THEME, PaletteTheme, ThemeConfig } from "@/lib/portfolio-defaults";

const COLOR_FIELDS: Array<{ key: keyof PaletteTheme; label: string; hint: string }> = [
  { key: "bgBase", label: "Base Background", hint: "Main page & odd sections" },
  { key: "bgElevated", label: "Elevated Surface", hint: "Cards & alternating sections" },
  { key: "accentPrimary", label: "Primary Accent", hint: "Borders, pills & highlights" },
  { key: "accentSecondary", label: "Secondary Accent", hint: "Subtitles, tags & muted tones" },
  { key: "textPrimary", label: "Primary Text", hint: "Body & heading foreground" },
  { key: "accentGold", label: "Gold Thread Accent", hint: "Unifying inlay, spines & CTAs" },
];

export function ThemeTab({
  theme,
  onSave,
}: {
  theme: ThemeConfig;
  onSave: (nextTheme: ThemeConfig) => Promise<void>;
}) {
  const [form, setForm] = useState<ThemeConfig>(theme);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dirtyRef = React.useRef(false);

  useEffect(() => {
    if (!dirtyRef.current) {
      setForm(theme);
    }
  }, [theme]);

  const persistTheme = async (next: ThemeConfig) => {
    setSaving(true);
    setError(null);
    try {
      await onSave(next);
      dirtyRef.current = false;
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save theme colours.");
    } finally {
      setSaving(false);
    }
  };

  const updateColor = (mode: "unfiltered" | "filtered", key: keyof PaletteTheme, value: string) => {
    dirtyRef.current = true;
    const next: ThemeConfig = {
      ...form,
      [mode]: {
        ...form[mode],
        [key]: value,
      },
    };
    setForm(next);
  };

  const handleReset = async (mode: "unfiltered" | "filtered") => {
    dirtyRef.current = true;
    const next: ThemeConfig = {
      ...form,
      [mode]: { ...DEFAULT_THEME[mode] },
    };
    setForm(next);
    await persistTheme(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await persistTheme(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#21262d]">
        <div>
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Palette className="w-5 h-5 text-[#C9A24B]" />
            Theme &amp; Palette Colours
          </h2>
          <p className="text-xs text-[#8b949e] mt-0.5">
            Edit every palette colour for both Unfiltered and Filtered modes. Changes apply live on the portfolio.
          </p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#C9A24B] text-[#0c1117] text-xs font-semibold hover:brightness-110 cursor-pointer disabled:opacity-50"
        >
          <Save className="w-3.5 h-3.5" />
          {saving ? "Saving Colours…" : "Save Colours"}
        </button>
      </div>

      {saved && (
        <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-400 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> Palette colours saved and synced live!
        </div>
      )}

      {error && (
        <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-red-400 text-xs font-mono">
          {error}
        </div>
      )}

      {(["unfiltered", "filtered"] as const).map((mode) => {
        const palette = form[mode];
        const isUnfiltered = mode === "unfiltered";
        return (
          <div key={mode} className="p-5 rounded-xl bg-[#0d1117] border border-[#30363d] space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {isUnfiltered ? (
                  <Sparkles className="w-4 h-4 text-[#D4AF7A]" />
                ) : (
                  <Terminal className="w-4 h-4 text-[#C9A24B]" />
                )}
                <h3 className="text-sm font-semibold text-white">
                  {isUnfiltered ? "Unfiltered Mode (Personal Palette)" : "Filtered Mode (Technical Palette)"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => handleReset(mode)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#161b22] border border-[#30363d] text-xs text-[#8b949e] hover:text-white cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Reset Defaults
              </button>
            </div>

            {/* Live Mini Preview */}
            <div
              className="p-4 rounded-xl border flex flex-wrap items-center justify-between gap-4 transition-colors"
              style={{
                backgroundColor: palette.bgBase,
                borderColor: palette.accentPrimary,
                color: palette.textPrimary,
              }}
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: palette.accentGold }}>
                  Live Preview
                </span>
                <p className="text-sm font-semibold mt-0.5" style={{ color: palette.textPrimary }}>
                  Samritha S — {isUnfiltered ? "Personal Archive" : "Engineering & Systems"}
                </p>
                <p className="text-xs mt-0.5" style={{ color: palette.accentSecondary }}>
                  Secondary accent &amp; subtitle preview
                </p>
              </div>
              <div
                className="px-3 py-1.5 rounded-lg text-xs font-medium border"
                style={{
                  backgroundColor: palette.bgElevated,
                  borderColor: palette.accentGold,
                  color: palette.accentGold,
                }}
              >
                Elevated Card
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {COLOR_FIELDS.map((field) => (
                <div key={field.key} className="p-3 rounded-xl bg-[#161b22] border border-[#30363d] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-white">{field.label}</span>
                    <input
                      type="color"
                      value={palette[field.key]}
                      onChange={(e) => updateColor(mode, field.key, e.target.value)}
                      className="w-7 h-7 rounded border border-[#30363d] bg-transparent cursor-pointer"
                      aria-label={`${mode} ${field.label}`}
                    />
                  </div>
                  <input
                    type="text"
                    value={palette[field.key]}
                    onChange={(e) => updateColor(mode, field.key, e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-[#0d1117] border border-[#30363d] text-xs font-mono text-[#e6edf3] focus:outline-none focus:border-[#C9A24B]"
                  />
                  <p className="text-[10px] text-[#8b949e]">{field.hint}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </form>
  );
}
