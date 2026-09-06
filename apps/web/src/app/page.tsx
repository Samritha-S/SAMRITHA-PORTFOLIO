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
    <div className="relative min-h-screen selection:bg-[var(--accent-gold)] selection:text-[#011627] bg-[var(--bg-base)]">
      {/* Top Fixed Header with Filter Toggle */}
      <Navbar />

      {/* Main Content Region with Signature Morph Transition */}
      <main className="relative">
        <AnimatePresence mode="wait">
          {!isFiltered ? (
            <motion.div
              key="unfiltered-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            >
              {/* 1. Hero (section-base) & 2. About Samritha (section-elevated) */}
              <UnfilteredHeroAbout />

              {/* 3. Journey (section-base with luminous gold spine) */}
              <UnfilteredJourneyTimeline />

              {/* 4. Interests & Hobbies (section-elevated with bespoke module containers) */}
              <InterestsSection />

              {/* 5. Wall / Post a Note (section-base with organic staggered pinboard) */}
              <WallSection />

              {/* 6. Photo Gallery (section-elevated with masonry grid & Lightbox modal) */}
              <PhotoGallery />

              {/* 7. Personal Stories / Blog (section-base) */}
              <BlogSection />

              {/* 8. Get in Touch (section-base) */}
              <ContactSection />
            </motion.div>
          ) : (
            <motion.div
              key="filtered-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            >
              {/* 1. Hero (section-base) & 2. About Samritha (section-elevated) */}
              <FilteredHeroAbout />

              {/* 3. Technical Milestones Journey (section-base with gold spine) */}
              <FilteredJourneyTimeline />

              {/* 4. Experience, Projects & Hackathons (section-elevated) */}
              <ExperienceProjects />

              {/* 5. Knowledge Inventory / Skills (section-base) */}
              <SkillsSection />

              {/* 6. Competitive Programming (section-elevated) */}
              <CompetitiveProgrammingSection />

              {/* 7. GitHub & Data Visualizations (section-base with Bklit UI) */}
              <GitHubSection />

              {/* 8. Resume / CV (section-elevated) */}
              <ResumeSection />

              {/* 9. Technical Photo Gallery (section-elevated with Lightbox modal) */}
              <PhotoGallery />

              {/* 10. Technical Blog (section-base) */}
              <BlogSection />

              {/* 11. Get in Touch (section-base) */}
              <ContactSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Shared Footer (section-base with hairline gold rule) */}
      <Footer />
    </div>
  );
}
