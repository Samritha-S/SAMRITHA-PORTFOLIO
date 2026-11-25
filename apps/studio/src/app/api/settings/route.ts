import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { readContentStore, writeContentStore } from "@/lib/data-store";

export async function GET() {
  try {
    const { data } = await supabaseAdmin
      .from("site_settings")
      .select("*")
      .eq("id", "global")
      .single();

    if (data) return NextResponse.json(data);
  } catch (err) {
    console.warn("Supabase settings offline, using local store:", err);
  }

  const store = readContentStore();
  if (store.settings) return NextResponse.json(store.settings);

  return NextResponse.json({
    id: "global",
    default_view: "unfiltered",
    allow_toggle: true,
    site_title: "Samritha S",
    unfiltered_hero_title: "Hi, I'm Samritha.",
    unfiltered_hero_subtitle: "A little curious, a little chaotic, and always finding something new to love.",
    unfiltered_hero_bio: "Here, you'll find the things that make me me — the songs I replay too much, places I want to wander through, stories I want to write, movies I can quote by heart, and all the little things that make ordinary days feel special.",
    filtered_hero_title: "Samritha S",
    filtered_hero_subtitle: "Computer Science Engineering student at Sona College of Technology, Salem, Tamil Nadu. Expected graduation 2029.",
    filtered_hero_bio: "Builds GenAI, web and data projects, mostly at hackathons, using Antigravity, Next.js/React, FastAPI and Gemini. Interested in entrepreneurship around MSME-scale problems. GSSoC Campus Ambassador, Google Student Ambassador.",
    resume_url: "/Samritha_S_Resume.pdf",
  });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();

  // 1. Update local store
  writeContentStore((store) => {
    store.settings = { ...store.settings, ...body };
    return store;
  });

  // 2. Try Supabase
  try {
    const { data } = await supabaseAdmin
      .from("site_settings")
      .upsert({ id: "global", ...body, updated_at: new Date().toISOString() })
      .select()
      .single();
    if (data) return NextResponse.json(data);
  } catch (err) {
    console.warn("Supabase settings sync skipped (offline):", err);
  }

  const store = readContentStore();
  return NextResponse.json(store.settings);
}
