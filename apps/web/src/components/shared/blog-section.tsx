"use client";

import React, { useState } from "react";
import { useView } from "@/context/view-context";
import { Calendar, ArrowRight, X } from "lucide-react";

interface BlogPostItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tag: string;
}

const personalPosts: BlogPostItem[] = [
  {
    id: "p1",
    title: "On Wandering and Quiet Windows",
    excerpt:
      "Why the best stories don't arrive when you're staring at a screen, but when you watch rain wash across afternoon street corners.",
    content:
      "There is an art to not hurrying. In a world calibrated for instant delivery, taking three hours to walk four kilometers feels like quiet rebellion. I notice how the shadows stretch under old banyan trees, how people clutch warm paper cups, and how ordinary conversations carry unintentional poetry. These are the moments that give us back our breath.",
    date: "Sep 2024",
    readTime: "4 min read",
    tag: "Essays",
  },
  {
    id: "p2",
    title: "The Songs We Replay Too Much",
    excerpt:
      "An exploration of acoustic memory and why certain songs feel like small rooms where we kept our favorite versions of ourselves.",
    content:
      "Music has an unfair advantage over visual memory. A single chord progression can resurrect an exact temperature, the smell of roasted coffee, and an old emotion you thought you outgrew. When I keep a song on repeat for forty listens, I'm not just listening to sound — I'm trying to inhabit a particular state of grace.",
    date: "Aug 2024",
    readTime: "3 min read",
    tag: "Soundtracks",
  },
  {
    id: "p3",
    title: "Why Mint Chocolate Chip is Undefeated",
    excerpt:
      "A lighthearted defense of refreshing herbal notes in frozen confectionery and why controversy is the hallmark of great taste.",
    content:
      "People who compare mint chocolate chip to toothpaste have surrendered their palate to convention. The initial herbal chill, followed by the slow melting warmth of dark cocoa shards, creates dynamic contrast. Great flavor, just like great life, requires a touch of contradiction.",
    date: "Jul 2024",
    readTime: "2 min read",
    tag: "Pleasures",
  },
];

const technicalPosts: BlogPostItem[] = [
  {
    id: "t1",
    title: "Building Low-Latency Biometric Pipelines with Vector DBs",
    excerpt:
      "Architectural trade-offs when indexing multi-modal facial embeddings under 150ms roundtrip response times.",
    content:
      "During the development of IdentiMatch, vector dimension reduction and quantization proved crucial. By pairing FAISS IVF-PQ indexing with asynchronous worker queues, we reduced p99 inference latency from 420ms to 85ms while maintaining 98.4% top-k recall accuracy.",
    date: "Sep 2024",
    readTime: "6 min read",
    tag: "AI & Vector Search",
  },
  {
    id: "t2",
    title: "Real-Time Event Streams for Digital Twins in React",
    excerpt:
      "Designing WebSocket backpressure and canvas rendering loops for 10,000+ simulated concurrent arena attendees.",
    content:
      "StadiumPulse required rendering high-density attendee spatial trajectories without dropping below 60fps. By decoupling WebSocket ingestion into an OffscreenCanvas web worker, the main browser thread remained responsive for user interaction and dynamic evacuation route calculations.",
    date: "Aug 2024",
    readTime: "5 min read",
    tag: "Distributed Systems",
  },
  {
    id: "t3",
    title: "Building Resilient Hackathon Prototypes Under 36 Hours",
    excerpt:
      "A playbook for fast API contracts, pragmatic schema design, and knowing what to mock vs what to build.",
    content:
      "Speed is not about typing faster; it is about eliminating architectural ambiguities before writing line one. Designing schema contracts first, using type-safe RPCs, and isolating third-party LLM failovers saves hours of panic before the final demo pitch.",
    date: "Jul 2024",
    readTime: "4 min read",
    tag: "Engineering Practice",
  },
];

export function BlogSection() {
  const { isFiltered } = useView();
  const [selectedPost, setSelectedPost] = useState<BlogPostItem | null>(null);

  const posts = isFiltered ? technicalPosts : personalPosts;

  return (
    <section id="blog" className="py-24 px-4 sm:px-6 lg:px-8 section-base relative">
      <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-widest text-[var(--accent-gold)] font-mono">
          {isFiltered ? "Engineering Logs & Thoughts" : "Stories & Reflections"}
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[var(--text-primary)] mt-3">
          {isFiltered ? "Technical Writing" : "The Written Word"}
        </h2>
        <div className="gold-hairline w-24 mx-auto mt-4" />
        <p className="text-sm text-[var(--text-primary)]/80 max-w-xl mx-auto mt-4 leading-relaxed">
          {isFiltered
            ? "Deep dives into system design, algorithmic efficiency, and real-world software development."
            : "Reflections on art, ordinary afternoons, memory, and finding wonder in daily life."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <div
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className={`flex flex-col justify-between cursor-pointer p-6 sm:p-7 rounded-xl border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] hover:shadow-lg transition-all duration-300 group ${
              isFiltered
                ? index % 2 === 0
                  ? "bg-[var(--surface-dusk)]"
                  : "bg-[var(--surface-amethyst)]"
                : index % 2 === 0
                  ? "bg-[#3D2B52] text-[#F5EFE8]"
                  : "bg-[#352447] text-[#F5EFE8]"
            }`}
          >
            <div>
              <div className="flex justify-between items-center text-xs mb-3">
                <span className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded border ${
                  isFiltered
                    ? "bg-[var(--bg-base)] border-[var(--border-subtle)] text-[var(--accent-gold)]"
                    : "bg-[#2E1F3D] border-[#8B5FBF]/40 text-[#D4AF7A] font-semibold"
                }`}>
                  {post.tag}
                </span>
                <span className={`${isFiltered ? "text-[var(--text-primary)]/60" : "text-[#F5EFE8]/70"} flex items-center gap-1`}>
                  <Calendar className="w-3 h-3 text-[var(--accent-gold)]" />
                  {post.date}
                </span>
              </div>

              <h3 className={`font-serif text-xl font-medium mb-3 transition-colors ${
                isFiltered ? "text-[var(--text-primary)] group-hover:text-[var(--accent-gold)]" : "text-[#F5EFE8] group-hover:text-[#D4AF7A]"
              }`}>
                {post.title}
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                isFiltered ? "text-[var(--text-primary)]/75" : "text-[#F7F4D5]/80"
              }`}>
                {post.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--accent-gold)] font-medium">
              <span>{post.readTime}</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Story <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Reading Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-[var(--bg-elevated)] border border-[var(--accent-gold)]/60 rounded-3xl p-6 sm:p-10 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelectedPost(null)}
              aria-label="Close story modal"
              suppressHydrationWarning
              className="absolute top-6 right-6 p-2 rounded-full bg-[var(--bg-base)] text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 text-xs text-[var(--accent-gold)] mb-4 font-mono">
              <span>{selectedPost.tag}</span>
              <span>•</span>
              <span>{selectedPost.date}</span>
              <span>•</span>
              <span>{selectedPost.readTime}</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-4xl font-normal text-[var(--text-primary)] mb-6">
              {selectedPost.title}
            </h3>

            <div className="gold-hairline w-full mb-6" />

            <div className="text-sm sm:text-base text-[var(--text-primary)]/90 leading-relaxed font-serif space-y-4">
              <p>{selectedPost.content}</p>
            </div>
          </div>
        </div>
      )}
      </div>
    </section>
  );
}
