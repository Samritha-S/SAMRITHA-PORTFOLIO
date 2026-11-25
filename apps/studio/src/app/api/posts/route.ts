import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { readContentStore, writeContentStore } from "@/lib/data-store";

export async function GET() {
  try {
    const { data } = await supabaseAdmin
      .from("posts")
      .select("*")
      .order("display_order", { ascending: true });

    if (data && data.length > 0) return NextResponse.json(data);
  } catch (err) {
    console.warn("Supabase posts offline, using local store:", err);
  }

  const store = readContentStore();
  return NextResponse.json(store.posts || []);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const id = body.id || `post_${Date.now()}`;
  const newPost = { ...body, id };

  writeContentStore((store) => {
    store.posts = store.posts || [];
    store.posts.push(newPost);
    return store;
  });

  try {
    const { data } = await supabaseAdmin.from("posts").insert(newPost).select().single();
    if (data) return NextResponse.json(data);
  } catch (err) {
    console.warn("Supabase posts sync skipped (offline):", err);
  }

  return NextResponse.json(newPost);
}

export async function PATCH(req: NextRequest) {
  const { id, ...updates } = await req.json();
  let updatedPost: any = null;

  writeContentStore((store) => {
    store.posts = (store.posts || []).map((p: any) => {
      if (p.id === id) {
        updatedPost = { ...p, ...updates };
        return updatedPost;
      }
      return p;
    });
    return store;
  });

  try {
    const { data } = await supabaseAdmin.from("posts").update(updates).eq("id", id).select().single();
    if (data) return NextResponse.json(data);
  } catch (err) {
    console.warn("Supabase posts sync skipped (offline):", err);
  }

  return NextResponse.json(updatedPost || { id, ...updates });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  writeContentStore((store) => {
    store.posts = (store.posts || []).filter((p: any) => p.id !== id);
    return store;
  });

  try {
    await supabaseAdmin.from("posts").delete().eq("id", id);
  } catch (err) {
    console.warn("Supabase posts sync skipped (offline):", err);
  }

  return NextResponse.json({ ok: true });
}
