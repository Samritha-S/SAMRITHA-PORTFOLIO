"use client";

import React, { useState, useEffect } from "react";
import { useView } from "@/context/view-context";
import { FilterToggle } from "@/components/kokonutui/filter-toggle";
import { Menu, X, Sparkles, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function Navbar() {
  const { isFiltered } = useView();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("#about");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active link spy
      const sections = isFiltered
        ? ["about", "journey-tech", "projects", "skills", "competitive", "github", "resume", "blog", "contact"]
        : ["about", "journey", "interests", "wall", "blog", "gallery", "contact"];

      for (const sectionId of [...sections].reverse()) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(`#${sectionId}`);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFiltered]);

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
          ? "bg-[var(--bg-base)]/90 backdrop-blur-md border-b border-[var(--border-subtle)] shadow-sm"
          : "bg-[var(--bg-base)]/40 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className={`w-8 h-8 rounded-md border flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${
            isFiltered
              ? "border-[var(--accent-gold)]/60 bg-[var(--bg-elevated)] text-[var(--accent-gold)]"
              : "border-[#607785] bg-[#607785] text-[#F7F4D5]"
          }`}>
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
            <span className={`hidden sm:block text-[9px] uppercase tracking-widest font-mono ${
              isFiltered ? "text-[var(--accent-gold)]" : "text-[#607785] font-bold"
            }`}>
              {isFiltered ? "Engineering & Systems" : "Personal Archive"}
            </span>
          </div>
        </a>

        {/* Desktop Morphic Navigation Links */}
        <nav className={`hidden lg:flex items-center gap-1 p-1 rounded-full ${
          isFiltered ? "bg-[var(--bg-base)]/60 border border-[var(--border-subtle)]" : "bg-transparent"
        }`}>
          {currentLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActiveSection(link.href)}
                className={`relative px-3.5 py-1.5 text-xs font-medium transition-colors duration-200 rounded-full ${
                  isActive
                    ? isFiltered ? "text-[var(--text-primary)] font-semibold" : "text-[#F7F4D5] font-semibold"
                    : isFiltered ? "text-[var(--text-primary)]/70 hover:text-[var(--text-primary)]" : "text-[#554466]/80 hover:text-[#554466] font-medium"
                }`}
              >
                {/* Morphic Pill on Active */}
                {isActive && (
                  <motion.div
                    layoutId="morphic-nav-pill"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className={`absolute inset-0 rounded-full border -z-10 shadow-sm ${
                      isFiltered ? "bg-[var(--bg-elevated)] border-[var(--border-subtle)]" : "bg-[#607785] border-[#607785]"
                    }`}
                  >
                    {/* Underline on active item */}
                    <span className={`absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full ${
                      isFiltered ? "bg-[var(--accent-gold)]" : "bg-[#D8A7A0]"
                    }`} />
                  </motion.div>
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Action Right: Filter Toggle + Mobile Menu Button */}
        <div className="flex items-center gap-3">
          <FilterToggle />

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            suppressHydrationWarning
            className="lg:hidden p-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--accent-gold)] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[var(--bg-base)] border-b border-[var(--border-subtle)] px-6 py-4 space-y-2 overflow-hidden"
          >
            {currentLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm text-[var(--text-primary)]/80 hover:text-[var(--accent-gold)] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
