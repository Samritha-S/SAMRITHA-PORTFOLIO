import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("site_settings")
      .select("*")
      .eq("id", "global")
      .single();

    if (data) return NextResponse.json(data);
  } catch (err) {
    console.error("Supabase settings error:", err);
  }

  // Graceful default fallback
  return NextResponse.json({
    id: "global",
    default_view: "unfiltered",
    allow_toggle: true,
    site_title: "Samritha S",
    unfiltered_hero_title: "Hi, I'm Samritha.",
    unfiltered_hero_subtitle: "A little curious, a little chaotic, and always finding something new to love.",
    unfiltered_hero_bio: "Here, you'll find the things that make me me — the songs I replay too much, places I want to wander through, stories I want to write, movies I can quote by heart, and all the little things that make ordinary days feel special.",
    filtered_hero_title: "Hi, I'm Samritha.",
    filtered_hero_subtitle: "I build technology that turns ideas into useful, tangible experiences.",
    filtered_hero_bio: "From full-stack applications and AI-powered platforms to hackathon prototypes and digital-twin solutions, I enjoy taking a problem from 'what if?' to 'it works.'",
    resume_url: "/resume.pdf",
  });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { data, error } = await supabaseAdmin
    .from("site_settings")
    .upsert({ id: "global", ...body, updated_at: new Date().toISOString() })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
