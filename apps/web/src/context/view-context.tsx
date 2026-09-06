"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type SiteView = "unfiltered" | "filtered";

interface ViewContextType {
  view: SiteView;
  isFiltered: boolean;
  toggleView: () => void;
  setView: (view: SiteView) => void;
  isTransitioning: boolean;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

const STORAGE_KEY = "samritha_site_view";

export function ViewProvider({ children }: { children: React.ReactNode }) {
  const [view, setViewState] = useState<SiteView>("unfiltered");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY) as SiteView | null;
    if (saved === "filtered" || saved === "unfiltered") {
      setViewState(saved);
      document.documentElement.setAttribute("data-view", saved);
    } else {
      document.documentElement.setAttribute("data-view", "unfiltered");
    }
  }, []);

  const setView = (newView: SiteView) => {
    setIsTransitioning(true);
    setViewState(newView);
    localStorage.setItem(STORAGE_KEY, newView);
    document.documentElement.setAttribute("data-view", newView);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  const toggleView = () => {
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
