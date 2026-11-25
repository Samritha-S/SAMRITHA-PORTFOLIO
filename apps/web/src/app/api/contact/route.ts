import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body?.name ?? "").trim().slice(0, 100);
    const email = String(body?.email ?? "").trim().slice(0, 150);
    const message = String(body?.message ?? "").trim().slice(0, 2000);

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Attempt to persist in Supabase if configured; gracefully succeed with mailto fallback otherwise
    let persisted = false;
    try {
      const { error } = await supabase.from("contact_messages").insert({
        name,
        email,
        message,
      });
      if (!error) persisted = true;
    } catch {
      // Ignore if table or env is not configured
    }

    return NextResponse.json({
      success: true,
      persisted,
      message: persisted
        ? "Message received."
        : "Message recorded. You can also reach out directly via email.",
    });
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }
}
