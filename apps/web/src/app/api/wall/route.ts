import { NextResponse } from "next/server";

// In-memory / mock persistent store for local review
export interface StoredWallNote {
  id: string;
  name: string | null;
  message: string;
  createdAt: string;
  approved: boolean;
}

// Global variable in Node context for demo/testing
declare global {
  var __wallNotesStore: StoredWallNote[] | undefined;
}

if (!global.__wallNotesStore) {
  global.__wallNotesStore = [
    {
      id: "1",
      name: "A fellow wanderer",
      message: "Your writing on ordinary afternoons resonated deeply. Keep observing the little things.",
      createdAt: "Yesterday",
      approved: true,
    },
    {
      id: "2",
      name: null,
      message: "Pet every dog you see! That is the single best rule for a happy life.",
      createdAt: "3 days ago",
      approved: true,
    },
    {
      id: "3",
      name: "Kavya",
      message: "The Mystic Amethyst palette is so uniquely you. Loved reading your stories here.",
      createdAt: "Last week",
      approved: true,
    },
  ];
}

export async function GET() {
  // Public site only returns approved notes
  const approvedNotes = (global.__wallNotesStore || []).filter((n) => n.approved);
  return NextResponse.json({ notes: approvedNotes });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, message, honeypot } = body;

    // Honeypot spam protection (FRD §6.4)
    if (honeypot) {
      return NextResponse.json({ success: true, message: "Filtered." });
    }

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const newNote: StoredWallNote = {
      id: Date.now().toString(),
      name: name ? String(name).slice(0, 60) : null,
      message: String(message).slice(0, 600),
      createdAt: "Just now",
      approved: false, // Default unapproved until moderated in studio
    };

    global.__wallNotesStore = [newNote, ...(global.__wallNotesStore || [])];

    return NextResponse.json({
      success: true,
      message: "Note submitted for moderation.",
      note: newNote,
    });
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}
