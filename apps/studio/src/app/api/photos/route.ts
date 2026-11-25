import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { readContentStore, writeContentStore } from "@/lib/data-store";

export async function GET() {
  try {
    const { data } = await supabaseAdmin
      .from("photos")
      .select("*")
      .order("display_order", { ascending: true });

    if (data && data.length > 0) return NextResponse.json(data);
  } catch (err) {
    console.warn("Supabase photos offline, using local store:", err);
  }

  const store = readContentStore();
  return NextResponse.json(store.photos || []);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const id = body.id || `photo_${Date.now()}`;
  const newPhoto = { ...body, id };

  writeContentStore((store) => {
    store.photos = store.photos || [];
    store.photos.push(newPhoto);
    return store;
  });

  try {
    const { data } = await supabaseAdmin.from("photos").insert(newPhoto).select().single();
    if (data) return NextResponse.json(data);
  } catch (err) {
    console.warn("Supabase photos sync skipped (offline):", err);
  }

  return NextResponse.json(newPhoto);
}

export async function PATCH(req: NextRequest) {
  const { id, ...updates } = await req.json();

  let updatedPhoto: any = null;

  writeContentStore((store) => {
    store.photos = (store.photos || []).map((p: any) => {
      if (p.id === id) {
        updatedPhoto = { ...p, ...updates };
        return updatedPhoto;
      }
      return p;
    });
    return store;
  });

  try {
    const { data } = await supabaseAdmin.from("photos").update(updates).eq("id", id).select().single();
    if (data) return NextResponse.json(data);
  } catch (err) {
    console.warn("Supabase photos sync skipped (offline):", err);
  }

  return NextResponse.json(updatedPhoto || { id, ...updates });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  writeContentStore((store) => {
    store.photos = (store.photos || []).filter((p: any) => p.id !== id);
    return store;
  });

  try {
    await supabaseAdmin.from("photos").delete().eq("id", id);
  } catch (err) {
    console.warn("Supabase photos sync skipped (offline):", err);
  }

  return NextResponse.json({ ok: true });
}
