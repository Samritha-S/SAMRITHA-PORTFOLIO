import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { readContentStore, writeContentStore } from "@/lib/data-store";

export async function GET() {
  try {
    const { data } = await supabaseAdmin
      .from("wall_notes")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) return NextResponse.json(data);
  } catch (err) {
    console.warn("Supabase wall_notes offline, using local store:", err);
  }

  const store = readContentStore();
  return NextResponse.json(store.notes || []);
}

export async function PATCH(req: NextRequest) {
  const { id, approved } = await req.json();

  let updatedNote: any = null;

  writeContentStore((store) => {
    store.notes = (store.notes || []).map((n: any) => {
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

  writeContentStore((store) => {
    store.notes = (store.notes || []).filter((n: any) => n.id !== id);
    return store;
  });

  try {
    await supabaseAdmin.from("wall_notes").delete().eq("id", id);
  } catch (err) {
    console.warn("Supabase wall_notes sync skipped (offline):", err);
  }

  return NextResponse.json({ ok: true });
}
