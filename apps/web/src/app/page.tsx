"use client";

import React from "react";
import { useView } from "@/context/view-context";
import { motion, AnimatePresence } from "motion/react";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { BlogSection } from "@/components/shared/blog-section";
import { PhotoGallery } from "@/components/shared/photo-gallery";
import { ContactSection } from "@/components/shared/contact-section";

// Unfiltered Components
import { UnfilteredHeroAbout } from "@/components/unfiltered/hero-about";
import { UnfilteredJourneyTimeline } from "@/components/unfiltered/journey-timeline";
import { InterestsSection } from "@/components/unfiltered/interests-section";
import { WallSection } from "@/components/unfiltered/wall-section";

// Filtered Components
import { FilteredHeroAbout } from "@/components/filtered/hero-about";
import { FilteredJourneyTimeline } from "@/components/filtered/journey-timeline";
import { ExperienceProjects } from "@/components/filtered/experience-projects";
import { SkillsSection } from "@/components/filtered/skills-section";
import { CompetitiveProgrammingSection } from "@/components/filtered/competitive-programming";
import { GitHubSection } from "@/components/filtered/github-section";
import { ResumeSection } from "@/components/filtered/resume-section";

export default function Home() {
  const { isFiltered } = useView();

  return (
    <div className="relative min-h-screen selection:bg-[var(--accent-gold)] selection:text-[#011627]">
      {/* Top Fixed Header with Filter Toggle */}
      <Navbar />

      {/* Main Content Region with Signature Morph Transition */}
      <main className="relative">
        <AnimatePresence mode="wait">
          {!isFiltered ? (
            <motion.div
              key="unfiltered-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            >
              {/* 1. Hero & 2. About Samritha */}
              <UnfilteredHeroAbout />

              {/* 3. Journey */}
              <div className="gold-hairline max-w-4xl mx-auto my-12" />
              <UnfilteredJourneyTimeline />

              {/* 4. Interests & Hobbies (Bespoke Interactive Modules) */}
              <div className="gold-hairline max-w-5xl mx-auto my-12" />
              <InterestsSection />

              {/* 5. Personal Blog */}
              <div className="gold-hairline max-w-5xl mx-auto my-12" />
              <BlogSection />

              {/* 6. Wall / Post a Note */}
              <div className="gold-hairline max-w-5xl mx-auto my-12" />
              <WallSection />

              {/* 7. Photo Gallery */}
              <div className="gold-hairline max-w-5xl mx-auto my-12" />
              <PhotoGallery />

              {/* 8. Get in Touch */}
              <div className="gold-hairline max-w-5xl mx-auto my-12" />
              <ContactSection />
            </motion.div>
          ) : (
            <motion.div
              key="filtered-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            >
              {/* 1. Hero & 2. About Samritha */}
              <FilteredHeroAbout />

              {/* 3. Technical Milestones Journey */}
              <div className="gold-hairline max-w-4xl mx-auto my-12" />
              <FilteredJourneyTimeline />

              {/* 4. Experience, Projects & Hackathons */}
              <div className="gold-hairline max-w-5xl mx-auto my-12" />
              <ExperienceProjects />

              {/* 5. Currently Learning / What I Know / What I Want to Learn */}
              <div className="gold-hairline max-w-5xl mx-auto my-12" />
              <SkillsSection />

              {/* 6. Competitive Programming */}
              <div className="gold-hairline max-w-5xl mx-auto my-12" />
              <CompetitiveProgrammingSection />

              {/* 7. GitHub & Data Visualizations (Bklit UI) */}
              <div className="gold-hairline max-w-5xl mx-auto my-12" />
              <GitHubSection />

              {/* 8. Resume */}
              <div className="gold-hairline max-w-5xl mx-auto my-12" />
              <ResumeSection />

              {/* 9. Technical Blog */}
              <div className="gold-hairline max-w-5xl mx-auto my-12" />
              <BlogSection />

              {/* 10. Technical Photo Gallery */}
              <div className="gold-hairline max-w-5xl mx-auto my-12" />
              <PhotoGallery />

              {/* 11. Get in Touch */}
              <div className="gold-hairline max-w-5xl mx-auto my-12" />
              <ContactSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
