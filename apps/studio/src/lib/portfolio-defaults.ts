export interface PaletteTheme {
  bgBase: string;
  bgElevated: string;
  accentPrimary: string;
  accentSecondary: string;
  textPrimary: string;
  accentGold: string;
}

export interface ThemeConfig {
  unfiltered: PaletteTheme;
  filtered: PaletteTheme;
}

export interface AboutConfig {
  unfiltered: {
    pill: string;
    tagline: string;
    paragraphs: string[];
    quote: string;
  };
  filtered: {
    pill: string;
    badge: string;
    paragraphs: string[];
  };
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface CourseItem {
  code: string;
  title: string;
}

export interface SkillsConfig {
  currentlyLearning: string[];
  groups: SkillGroup[];
  courseworkTitle: string;
  coursework: CourseItem[];
}

export interface CompetitionItem {
  title: string;
  organization: string;
  status: string;
  participants?: string;
  ranks?: string[];
  note?: string;
}

export interface PublicationConfig {
  label: string;
  title: string;
  year: string;
  conference: string;
  authorship: string;
  topic: string;
}

export interface CompetitionsConfig {
  items: CompetitionItem[];
  publication: PublicationConfig;
}

export interface GitHubCard {
  eyebrow: string;
  badge: string;
  title: string;
  description: string;
}

export interface GitHubConfig {
  username: string;
  leetcodeUsername: string;
  handle: string;
  url: string;
  cards: GitHubCard[];
}

export interface ContactConfig {
  email: string;
  linkedin: string;
  github: string;
  instagram: string;
  twitter: string;
  filteredNote: string;
  unfilteredNote: string;
}

export interface PortfolioSections {
  theme: ThemeConfig;
  about: AboutConfig;
  skills: SkillsConfig;
  competitions: CompetitionsConfig;
  github: GitHubConfig;
  contact: ContactConfig;
}

export const DEFAULT_THEME: ThemeConfig = {
  unfiltered: {
    bgBase: "#F3F1E8",
    bgElevated: "#E1E7DC",
    accentPrimary: "#263B32",
    accentSecondary: "#8986B8",
    textPrimary: "#29372F",
    accentGold: "#B49A68",
  },
  filtered: {
    bgBase: "#1E3152",
    bgElevated: "#263B32",
    accentPrimary: "#496B59",
    accentSecondary: "#A58DB5",
    textPrimary: "#EAE9DF",
    accentGold: "#B49A68",
  },
};

export const DEFAULT_SECTIONS: PortfolioSections = {
  theme: DEFAULT_THEME,
  about: {
    unfiltered: {
      pill: "Unfiltered Personal Space",
      tagline: "I'm Samritha — but Sam works just fine.",
      paragraphs: [
        "I'm someone who's constantly observing, thinking, questioning, and imagining. I tend to notice little details that other people might overlook, and I have a habit of turning random thoughts into entire stories in my head.",
        "I'm drawn to things that have character — people with interesting stories, places that feel different, ideas that make me stop and think, and moments that somehow become memories.",
        "I'm still figuring out who I'm becoming, and I don't think I need to have the whole answer yet. There are plenty of things I want to experience, places I want to see, and versions of myself I haven't met yet.",
        "So this page is a small snapshot of me right now — not a finished version, just a work in progress.",
      ],
      quote: "And honestly, I think that's more interesting.",
    },
    filtered: {
      pill: "Computer Science Engineering • Sona College of Technology (2029)",
      badge: "GSSoC Campus Ambassador • Google Student Ambassador",
      paragraphs: [
        "Samritha S is a Computer Science Engineering student at Sona College of Technology in Salem, Tamil Nadu, with an expected graduation in 2029.",
        "She builds GenAI, web, and data projects—primarily developed during hackathons—working with Antigravity, Next.js/React, FastAPI, and Gemini.",
        "She is actively interested in entrepreneurship around MSME-scale problems and serves as both a GSSoC Campus Ambassador and a Google Student Ambassador.",
      ],
    },
  },
  skills: {
    currentlyLearning: [
      "Java, via IntelliJ IDEA",
      'NPTEL course: "Design Thinking - A Primer"',
    ],
    groups: [
      { category: "Languages", items: ["Java", "Python", "C", "JavaScript", "TypeScript"] },
      { category: "Frontend", items: ["React", "Next.js", "React Native", "Redux Toolkit", "Tailwind CSS"] },
      { category: "Backend", items: ["Node.js", "Express", "Fastify", "FastAPI"] },
      { category: "Databases & Infra", items: ["PostgreSQL", "MongoDB", "AWS S3", "Pinecone"] },
      { category: "AI & CV", items: ["GPT APIs", "Claude", "CLIP", "OpenCV", "FFmpeg"] },
      { category: "Tools", items: ["Git", "GitHub", "VS Code", "REST APIs", "WebSockets"] },
      { category: "Also", items: ["Antigravity", "Vite"] },
    ],
    courseworkTitle: "Coursework (Semester 3)",
    coursework: [
      { code: "U23CS301", title: "Data Structures" },
      { code: "U23CS302", title: "Computer Architecture" },
      { code: "U23CS303", title: "Java" },
      { code: "U23CS304", title: "Operating Systems" },
      { code: "U23CS305", title: "Computer and Information Ethics" },
      { code: "U23MAT301D", title: "Probability and Statistics" },
    ],
  },
  competitions: {
    items: [
      {
        title: "PromptWars Virtual",
        organization: "Google for Developers x H2S",
        status: "4 Challenges Completed",
        participants: "46,286 participants",
        ranks: ["#114", "#604", "#832", "#1265"],
        note: "Invited to PromptWars Exclusive Edition (invite-only, Top 400)",
      },
      {
        title: "CodeWars v3.0",
        organization: "Competitive Coding Championship",
        status: "Grand Finalist",
        ranks: ["Grand Finalist"],
      },
      {
        title: "Zayathon",
        organization: "National Hackathon",
        status: "Consolidation Prize",
        ranks: ["Consolidation Prize"],
      },
      {
        title: "Google Build with AI Bootcamp",
        organization: "Google Developer Groups • Coimbatore",
        status: "Attended",
        ranks: ["Participant"],
      },
    ],
    publication: {
      label: "Accepted & Published Research",
      title: "Research Abstract: Digital Twins in Healthcare",
      year: "2026",
      conference: "ICSHI 2026 (AICTE-sponsored).",
      authorship: "Sole author of research abstract accepted and published at the conference.",
      topic: "Digital Twins in Healthcare.",
    },
  },
  github: {
    username: "Samritha-S",
    leetcodeUsername: "sam0mega404",
    handle: "github.com/Samritha-S",
    url: "https://github.com/Samritha-S",
    cards: [
      {
        eyebrow: "Open Source Program",
        badge: "Campus Ambassador",
        title: "GSSoC Campus Ambassador",
        description:
          "GirlScript Summer of Code (GSSoC) Campus Ambassador. Contributions are focused on issue identification, quality triage, and detailed bug reporting.",
      },
      {
        eyebrow: "Developer Community",
        badge: "Student Ambassador",
        title: "Google Student Ambassador",
        description:
          "Google Student Ambassador representing developer programs, AI initiatives, and student technology community engagement on campus.",
      },
    ],
  },
  contact: {
    email: "samritha.25cse@sonatech.ac.in",
    linkedin: "https://linkedin.com/in/samritha-s/",
    github: "https://github.com/Samritha-S",
    instagram: "https://instagram.com",
    twitter: "https://x.com",
    filteredNote: "Available for software engineering internships, hackathon collaborations, and tech discussions.",
    unfilteredNote: "You can reach out through socials or send a direct note right here.",
  },
};

export function mergeWithDefaults(store: Record<string, unknown> | null | undefined): PortfolioSections {
  const s = store ?? {};
  const theme = (s.theme as Partial<ThemeConfig> | undefined) ?? {};
  const about = (s.about as Partial<AboutConfig> | undefined) ?? {};
  const skills = (s.skills as Partial<SkillsConfig> | undefined) ?? {};
  const competitions = (s.competitions as Partial<CompetitionsConfig> | undefined) ?? {};
  const github = (s.github as Partial<GitHubConfig> | undefined) ?? {};
  const contact = (s.contact as Partial<ContactConfig> | undefined) ?? {};

  return {
    theme: {
      unfiltered: { ...DEFAULT_THEME.unfiltered, ...(theme.unfiltered ?? {}) },
      filtered: { ...DEFAULT_THEME.filtered, ...(theme.filtered ?? {}) },
    },
    about: {
      unfiltered: { ...DEFAULT_SECTIONS.about.unfiltered, ...(about.unfiltered ?? {}) },
      filtered: { ...DEFAULT_SECTIONS.about.filtered, ...(about.filtered ?? {}) },
    },
    skills: {
      ...DEFAULT_SECTIONS.skills,
      ...skills,
    },
    competitions: {
      items: competitions.items ?? DEFAULT_SECTIONS.competitions.items,
      publication: { ...DEFAULT_SECTIONS.competitions.publication, ...(competitions.publication ?? {}) },
    },
    github: {
      ...DEFAULT_SECTIONS.github,
      ...github,
    },
    contact: {
      ...DEFAULT_SECTIONS.contact,
      ...contact,
    },
  };
}
