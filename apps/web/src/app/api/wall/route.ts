import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  const { data, error } = await supabase
    .from("wall_notes")
    .select("id, name, message, created_at")
    .eq("approved", true)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ notes: [] });
  return NextResponse.json({ notes: data });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, message, honeypot } = body;

    if (honeypot) return NextResponse.json({ success: true });
    if (!message?.trim()) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    const { error } = await supabase.from("wall_notes").insert({
      name: name ? String(name).slice(0, 60) : null,
      message: String(message).slice(0, 600),
      approved: false,
    });

    if (error) throw error;

    return NextResponse.json({ success: true, message: "Note submitted for moderation." });
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}
