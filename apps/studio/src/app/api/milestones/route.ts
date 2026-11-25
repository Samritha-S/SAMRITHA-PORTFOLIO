import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { readContentStore, writeContentStore } from "@/lib/data-store";

export async function GET() {
  try {
    const { data } = await supabaseAdmin
      .from("milestones")
      .select("*")
      .order("display_order", { ascending: true });

    if (data && data.length > 0) return NextResponse.json(data);
  } catch (err) {
    console.warn("Supabase milestones offline, using local store:", err);
  }

  const store = readContentStore();
  return NextResponse.json(store.milestones || []);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const id = body.id || `m_${Date.now()}`;
  const newMilestone = { ...body, id };

  // 1. Update local store
  writeContentStore((store) => {
    store.milestones = store.milestones || [];
    store.milestones.push(newMilestone);
    return store;
  });

  // 2. Try Supabase
  try {
    const { data } = await supabaseAdmin.from("milestones").insert(newMilestone).select().single();
    if (data) return NextResponse.json(data);
  } catch (err) {
    console.warn("Supabase milestones sync skipped (offline):", err);
  }

  return NextResponse.json(newMilestone);
}

export async function PATCH(req: NextRequest) {
  const { id, ...updates } = await req.json();

  let updatedMilestone: any = null;

  // 1. Update local store
  writeContentStore((store) => {
    store.milestones = (store.milestones || []).map((m: any) => {
      if (m.id === id) {
        updatedMilestone = { ...m, ...updates };
        return updatedMilestone;
      }
      return m;
    });
    return store;
  });

  // 2. Try Supabase
  try {
    const { data } = await supabaseAdmin.from("milestones").update(updates).eq("id", id).select().single();
    if (data) return NextResponse.json(data);
  } catch (err) {
    console.warn("Supabase milestones sync skipped (offline):", err);
  }

  return NextResponse.json(updatedMilestone || { id, ...updates });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  // 1. Update local store
  writeContentStore((store) => {
    store.milestones = (store.milestones || []).filter((m: any) => m.id !== id);
    return store;
  });

  // 2. Try Supabase
  try {
    await supabaseAdmin.from("milestones").delete().eq("id", id);
  } catch (err) {
    console.warn("Supabase milestones sync skipped (offline):", err);
  }

  return NextResponse.json({ ok: true });
}
