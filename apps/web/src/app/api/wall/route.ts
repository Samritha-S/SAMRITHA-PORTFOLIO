import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { readContentStore, writeContentStore } from "@/lib/data-store";

export const dynamic = "force-dynamic";

interface StoredNote {
  id: string;
  name: string | null;
  message: string;
  approved?: boolean;
  created_at?: string;
}

export async function GET() {
  const localNotes = ((readContentStore().notes as StoredNote[] | undefined) ?? []).filter(
    (n) => n.approved === true
  );

  try {
    const { data, error } = await supabase
      .from("wall_notes")
      .select("id, name, message, created_at")
      .eq("approved", true)
      .order("created_at", { ascending: false });

    if (!error && Array.isArray(data) && data.length > 0) {
      const seen = new Set(data.map((n) => n.id));
      const merged = [...data, ...localNotes.filter((n) => !seen.has(n.id))];
      return NextResponse.json({ notes: merged });
    }
  } catch {
    // Fall back to local store
  }

  return NextResponse.json({ notes: localNotes });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, message, honeypot } = body;

    if (honeypot) return NextResponse.json({ success: true });
    if (!message?.trim()) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    const cleanName = name ? String(name).trim().slice(0, 60) || null : null;
    const cleanMessage = String(message).trim().slice(0, 600);
    const createdAt = new Date().toISOString();
    const insertedId = `note_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

    let savedToSupabase = false;
    try {
      const { error } = await supabase
        .from("wall_notes")
        .insert({
          name: cleanName,
          message: cleanMessage,
          approved: false,
        });
      if (!error) {
        savedToSupabase = true;
      }
    } catch {
      // Continue to local store fallback
    }

    writeContentStore<{ notes?: StoredNote[] }>((store) => ({
      ...store,
      notes: [
        {
          id: insertedId,
          name: cleanName,
          message: cleanMessage,
          approved: false,
          created_at: createdAt,
        },
        ...(store.notes ?? []),
      ],
    }));

    return NextResponse.json({
      success: true,
      persisted: savedToSupabase,
      message: "Note submitted for moderation.",
    });
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}
