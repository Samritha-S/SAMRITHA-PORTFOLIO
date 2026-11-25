"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { DEFAULT_SECTIONS, PortfolioSections, PaletteTheme } from "@/lib/portfolio-defaults";

export type SiteView = "unfiltered" | "filtered";

export interface SiteSettingsData {
  default_view: SiteView;
  allow_toggle: boolean;
  unfiltered_hero_title: string;
  unfiltered_hero_subtitle: string;
  unfiltered_hero_bio: string;
  filtered_hero_title: string;
  filtered_hero_subtitle: string;
  filtered_hero_bio: string;
  resume_url: string;
}

export interface LiveContentBundle {
  milestones: Array<{ id: string; view?: string; year: string; title: string; story: string }>;
  projects: Array<{
    id: string;
    title: string;
    category: string;
    description: string;
    tags: string | string[];
    demo_url?: string | null;
    repo_url?: string | null;
    award?: string | null;
    badge?: string | null;
  }>;
  posts: Array<{
    id: string;
    title: string;
    excerpt: string;
    content: string;
    tag: string;
    date_label: string;
    read_time: string;
    view: string;
    published: boolean;
  }>;
  photos: Array<{
    id: string;
    url: string;
    title: string;
    caption: string;
    story: string;
    tag: string;
    date_label: string;
    view: string;
  }>;
}

interface ViewContextType {
  view: SiteView;
  isFiltered: boolean;
  toggleView: () => void;
  setView: (view: SiteView) => void;
  isTransitioning: boolean;
  settings: SiteSettingsData | null;
  sections: PortfolioSections;
  liveContent: LiveContentBundle;
  refreshContent: () => Promise<void>;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

const STORAGE_KEY = "samritha_site_view";

function applyPaletteToRoot(palette: PaletteTheme, mode: SiteView) {
  const root = document.documentElement;
  root.style.setProperty("--bg-base", palette.bgBase);
  root.style.setProperty("--bg-elevated", palette.bgElevated);
  root.style.setProperty("--accent-primary", palette.accentPrimary);
  root.style.setProperty("--accent-secondary", palette.accentSecondary);
  root.style.setProperty("--text-primary", palette.textPrimary);
  root.style.setProperty("--accent-gold", palette.accentGold);

  if (mode === "unfiltered") {
    root.style.setProperty("--surface-amethyst", palette.bgElevated);
    root.style.setProperty("--surface-dusk", palette.bgElevated);
    root.style.setProperty("--card-surface", palette.bgElevated);
  } else {
    root.style.setProperty("--surface-dusk", palette.bgElevated);
    root.style.setProperty("--card-surface", palette.bgElevated);
  }
}

export function ViewProvider({ children }: { children: React.ReactNode }) {
  const [view, setViewState] = useState<SiteView>("unfiltered");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [settings, setSettings] = useState<SiteSettingsData | null>(null);
  const [sections, setSections] = useState<PortfolioSections>(DEFAULT_SECTIONS);
  const [liveContent, setLiveContent] = useState<LiveContentBundle>({
    milestones: [],
    projects: [],
    posts: [],
    photos: [],
  });

  const loadContent = useCallback(async (isInitial = false) => {
    let settingsData: Partial<SiteSettingsData> | null = null;

    try {
      const res = await fetch("/api/content", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json.settings) settingsData = json.settings as Partial<SiteSettingsData>;
        setSections({
          theme: json.theme ?? DEFAULT_SECTIONS.theme,
          about: json.about ?? DEFAULT_SECTIONS.about,
          skills: json.skills ?? DEFAULT_SECTIONS.skills,
          competitions: json.competitions ?? DEFAULT_SECTIONS.competitions,
          github: json.github ?? DEFAULT_SECTIONS.github,
          contact: json.contact ?? DEFAULT_SECTIONS.contact,
        });
        setLiveContent({
          milestones: Array.isArray(json.milestones) ? json.milestones : [],
          projects: Array.isArray(json.projects) ? json.projects : [],
          posts: Array.isArray(json.posts) ? json.posts : [],
          photos: Array.isArray(json.photos) ? json.photos : [],
        });
      }
    } catch {}

    if (!settingsData) {
      try {
        const res = await supabase
          .from("site_settings")
          .select("*")
          .eq("id", "global")
          .single();
        if (res.data) settingsData = res.data as Partial<SiteSettingsData>;
      } catch {}
    }

    if (settingsData) {
      const defaultView: SiteView = settingsData.default_view === "filtered" ? "filtered" : "unfiltered";
      const allowToggle = settingsData.allow_toggle ?? true;

      setSettings({
        default_view: defaultView,
        allow_toggle: allowToggle,
        unfiltered_hero_title: settingsData.unfiltered_hero_title ?? "",
        unfiltered_hero_subtitle: settingsData.unfiltered_hero_subtitle ?? "",
        unfiltered_hero_bio: settingsData.unfiltered_hero_bio ?? "",
        filtered_hero_title: settingsData.filtered_hero_title ?? "",
        filtered_hero_subtitle: settingsData.filtered_hero_subtitle ?? "",
        filtered_hero_bio: settingsData.filtered_hero_bio ?? "",
        resume_url: settingsData.resume_url ?? "/Samritha_S_Resume.pdf",
      });

      if (isInitial) {
        const urlView = new URLSearchParams(window.location.search).get("view");
        const paramView = urlView === "filtered" || urlView === "unfiltered" ? urlView : null;
        const saved = localStorage.getItem(STORAGE_KEY) as SiteView | null;
        const targetView: SiteView = !allowToggle
          ? defaultView
          : paramView || saved || defaultView;

        setViewState(targetView);
        document.documentElement.setAttribute("data-view", targetView);
      } else if (!allowToggle) {
        setViewState(defaultView);
        document.documentElement.setAttribute("data-view", defaultView);
      }
    } else if (isInitial) {
      const urlView = new URLSearchParams(window.location.search).get("view");
      const paramView = urlView === "filtered" || urlView === "unfiltered" ? urlView : null;
      const saved = localStorage.getItem(STORAGE_KEY) as SiteView | null;
      const targetView = paramView || (saved === "filtered" || saved === "unfiltered" ? saved : null);
      if (targetView) {
        setViewState(targetView);
        document.documentElement.setAttribute("data-view", targetView);
      }
    }
  }, []);

  useEffect(() => {
    loadContent(true);

    const handleFocus = () => {
      if (document.visibilityState === "visible") {
        loadContent(false);
      }
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleFocus);

    let channel: BroadcastChannel | null = null;
    if (typeof BroadcastChannel !== "undefined") {
      channel = new BroadcastChannel("samritha_portfolio_sync");
      channel.onmessage = () => {
        loadContent(false);
      };
    }

    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        loadContent(false);
      }
    }, 4000);

    return () => {
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleFocus);
      channel?.close();
      clearInterval(interval);
    };
  }, [loadContent]);

  useEffect(() => {
    const palette = view === "filtered" ? sections.theme.filtered : sections.theme.unfiltered;
    applyPaletteToRoot(palette, view);
  }, [view, sections.theme]);

  const setView = (newView: SiteView) => {
    if (settings && !settings.allow_toggle) return;
    setIsTransitioning(true);
    setViewState(newView);
    localStorage.setItem(STORAGE_KEY, newView);
    document.documentElement.setAttribute("data-view", newView);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  const toggleView = () => {
    if (settings && !settings.allow_toggle) return;
    const next = view === "unfiltered" ? "filtered" : "unfiltered";
    setView(next);
  };

  return (
    <ViewContext.Provider
      value={{
        view,
        isFiltered: view === "filtered",
        toggleView,
        setView,
        isTransitioning,
        settings,
        sections,
        liveContent,
        refreshContent: () => loadContent(false),
      }}
    >
      {children}
    </ViewContext.Provider>
  );
}

export function useView() {
  const ctx = useContext(ViewContext);
  if (!ctx) throw new Error("useView must be used within ViewProvider");
  return ctx;
}
