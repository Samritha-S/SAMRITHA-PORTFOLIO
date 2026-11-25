import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { readContentStore, writeContentStore } from "@/lib/data-store";

export async function GET() {
  try {
    const { data } = await supabaseAdmin
      .from("projects")
      .select("*")
      .order("display_order", { ascending: true });

    if (data && data.length > 0) return NextResponse.json(data);
  } catch (err) {
    console.warn("Supabase projects offline, using local store:", err);
  }

  const store = readContentStore();
  return NextResponse.json(store.projects || []);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const id = body.id || `proj_${Date.now()}`;
  const newProject = { ...body, id };

  // 1. Update local store
  writeContentStore((store) => {
    store.projects = store.projects || [];
    store.projects.push(newProject);
    return store;
  });

  // 2. Try Supabase
  try {
    const { data } = await supabaseAdmin.from("projects").insert(newProject).select().single();
    if (data) return NextResponse.json(data);
  } catch (err) {
    console.warn("Supabase projects sync skipped (offline):", err);
  }

  return NextResponse.json(newProject);
}

export async function PATCH(req: NextRequest) {
  const { id, ...updates } = await req.json();

  let updatedProject: any = null;

  // 1. Update local store
  writeContentStore((store) => {
    store.projects = (store.projects || []).map((p: any) => {
      if (p.id === id) {
        updatedProject = { ...p, ...updates };
        return updatedProject;
      }
      return p;
    });
    return store;
  });

  // 2. Try Supabase
  try {
    const { data } = await supabaseAdmin.from("projects").update(updates).eq("id", id).select().single();
    if (data) return NextResponse.json(data);
  } catch (err) {
    console.warn("Supabase projects sync skipped (offline):", err);
  }

  return NextResponse.json(updatedProject || { id, ...updates });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  // 1. Update local store
  writeContentStore((store) => {
    store.projects = (store.projects || []).filter((p: any) => p.id !== id);
    return store;
  });

  // 2. Try Supabase
  try {
    await supabaseAdmin.from("projects").delete().eq("id", id);
  } catch (err) {
    console.warn("Supabase projects sync skipped (offline):", err);
  }

  return NextResponse.json({ ok: true });
}
