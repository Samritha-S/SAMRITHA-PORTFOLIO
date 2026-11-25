"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

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

interface ViewContextType {
  view: SiteView;
  isFiltered: boolean;
  toggleView: () => void;
  setView: (view: SiteView) => void;
  isTransitioning: boolean;
  settings: SiteSettingsData | null;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

const STORAGE_KEY = "samritha_site_view";

export function ViewProvider({ children }: { children: React.ReactNode }) {
  const [view, setViewState] = useState<SiteView>("unfiltered");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [settings, setSettings] = useState<SiteSettingsData | null>(null);

  useEffect(() => {
    setMounted(true);

    const loadSettings = async () => {
      let data: Partial<SiteSettingsData> | null = null;
      try {
        const res = await supabase
          .from("site_settings")
          .select("*")
          .eq("id", "global")
          .single();
        if (res.data) data = res.data as Partial<SiteSettingsData>;
      } catch {}

      if (!data) {
        try {
          const res = await fetch("/api/content");
          if (res.ok) {
            const json = await res.json();
            if (json.settings) data = json.settings as Partial<SiteSettingsData>;
          }
        } catch {}
      }

      if (data) {
        const defaultView: SiteView = data.default_view === "filtered" ? "filtered" : "unfiltered";
        const allowToggle = data.allow_toggle ?? true;

        setSettings({
          default_view: defaultView,
          allow_toggle: allowToggle,
          unfiltered_hero_title: data.unfiltered_hero_title ?? "",
          unfiltered_hero_subtitle: data.unfiltered_hero_subtitle ?? "",
          unfiltered_hero_bio: data.unfiltered_hero_bio ?? "",
          filtered_hero_title: data.filtered_hero_title ?? "",
          filtered_hero_subtitle: data.filtered_hero_subtitle ?? "",
          filtered_hero_bio: data.filtered_hero_bio ?? "",
          resume_url: data.resume_url ?? "/Samritha_S_Resume.pdf",
        });

        // Support ?view=filtered or ?view=unfiltered for direct recruiter/share links
        const urlView = new URLSearchParams(window.location.search).get("view");
        const paramView = urlView === "filtered" || urlView === "unfiltered" ? urlView : null;

        // If user hasn't manually chosen a mode in this session, or toggle is disabled, follow backend default
        const saved = localStorage.getItem(STORAGE_KEY) as SiteView | null;
        const targetView: SiteView = !allowToggle
          ? defaultView
          : paramView || saved || defaultView;

        setViewState(targetView);
        document.documentElement.setAttribute("data-view", targetView);
      } else {
        const urlView = new URLSearchParams(window.location.search).get("view");
        const paramView = urlView === "filtered" || urlView === "unfiltered" ? urlView : null;
        const saved = localStorage.getItem(STORAGE_KEY) as SiteView | null;
        const targetView = paramView || (saved === "filtered" || saved === "unfiltered" ? saved : null);
        if (targetView) {
          setViewState(targetView);
          document.documentElement.setAttribute("data-view", targetView);
        }
      }
    };

    loadSettings();
  }, []);

  const setView = (newView: SiteView) => {
    if (settings && !settings.allow_toggle) return; // Prevent toggle if locked by backend
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
      }}
    >
      <div
        data-view={mounted ? view : "unfiltered"}
        className="min-h-screen transition-colors duration-500 ease-in-out"
      >
        {children}
      </div>
    </ViewContext.Provider>
  );
}

export function useView() {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error("useView must be used within a ViewProvider");
  }
  return context;
}
