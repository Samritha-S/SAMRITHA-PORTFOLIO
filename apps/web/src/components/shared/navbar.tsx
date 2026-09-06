"use client";

import React, { useState, useEffect } from "react";
import { useView } from "@/context/view-context";
import { FilterToggle } from "@/components/kokonutui/filter-toggle";
import { Menu, X, Sparkles, Terminal } from "lucide-react";

export function Navbar() {
  const { isFiltered } = useView();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const unfilteredNavLinks = [
    { label: "About", href: "#about" },
    { label: "Journey", href: "#journey" },
    { label: "Interests", href: "#interests" },
    { label: "Notes Wall", href: "#wall" },
    { label: "Stories", href: "#blog" },
    { label: "Gallery", href: "#gallery" },
    { label: "Connect", href: "#contact" },
  ];

  const filteredNavLinks = [
    { label: "About", href: "#about" },
    { label: "Milestones", href: "#journey-tech" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Algorithms", href: "#competitive" },
    { label: "GitHub", href: "#github" },
    { label: "Resume", href: "#resume" },
    { label: "Tech Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ];

  const currentLinks = isFiltered ? filteredNavLinks : unfilteredNavLinks;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--bg-base)]/85 backdrop-blur-md border-b border-[var(--border-subtle)] shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand / Name */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full border border-[var(--accent-gold)]/60 bg-[var(--bg-elevated)] flex items-center justify-center text-[var(--accent-gold)] transition-transform duration-300 group-hover:scale-105">
            {isFiltered ? (
              <Terminal className="w-4 h-4" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
          </div>
          <div>
            <span className="font-serif text-lg sm:text-xl font-medium tracking-wide text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">
              Samritha S
            </span>
            <span className="hidden sm:block text-[10px] uppercase tracking-widest text-[var(--accent-gold)] font-mono">
              {isFiltered ? "Engineering & Systems" : "Personal Archive"}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-[var(--text-primary)]/80">
          {currentLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[var(--accent-gold)] transition-colors relative py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Right: Filter Toggle + Mobile Menu Trigger */}
        <div className="flex items-center gap-3">
          <FilterToggle />

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            suppressHydrationWarning
            className="lg:hidden p-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--accent-gold)] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[var(--bg-base)]/95 backdrop-blur-xl border-b border-[var(--border-subtle)] px-6 py-6 space-y-4">
          <div className="flex flex-col gap-3 text-sm font-medium">
            {currentLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
