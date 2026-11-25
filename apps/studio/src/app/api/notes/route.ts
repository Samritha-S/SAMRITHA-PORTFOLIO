import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { readContentStore, writeContentStore } from "@/lib/data-store";

export const dynamic = "force-dynamic";

interface StoredNote {
  id: string;
  name: string | null;
  message: string;
  approved: boolean;
  created_at: string;
}

export async function GET() {
  const store = readContentStore();
  const localNotes: StoredNote[] = Array.isArray(store.notes) ? store.notes : [];

  try {
    const { data, error } = await supabaseAdmin
      .from("wall_notes")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && Array.isArray(data)) {
      const seen = new Set(data.map((n) => n.id));
      const merged = [...data, ...localNotes.filter((n) => !seen.has(n.id))];
      return NextResponse.json(merged);
    }
  } catch (err) {
    console.warn("Supabase wall_notes offline, using local store:", err);
  }

  return NextResponse.json(localNotes);
}

export async function PATCH(req: NextRequest) {
  const { id, approved } = await req.json();

  let updatedNote: StoredNote | null = null;

  writeContentStore((store: { notes?: StoredNote[] }) => {
    store.notes = (store.notes || []).map((n) => {
      if (n.id === id) {
        updatedNote = { ...n, approved };
        return updatedNote;
      }
      return n;
    });
    return store;
  });

  try {
    const { data } = await supabaseAdmin
      .from("wall_notes")
      .update({ approved })
      .eq("id", id)
      .select()
      .single();
    if (data) return NextResponse.json(data);
  } catch (err) {
    console.warn("Supabase wall_notes sync skipped (offline):", err);
  }

  return NextResponse.json(updatedNote || { id, approved });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  writeContentStore((store: { notes?: StoredNote[] }) => {
    store.notes = (store.notes || []).filter((n) => n.id !== id);
    return store;
  });

  try {
    await supabaseAdmin.from("wall_notes").delete().eq("id", id);
  } catch (err) {
    console.warn("Supabase wall_notes sync skipped (offline):", err);
  }

  return NextResponse.json({ ok: true });
}
