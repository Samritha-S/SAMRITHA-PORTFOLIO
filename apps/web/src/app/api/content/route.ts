import { NextResponse } from "next/server";
import { readContentStore } from "@/lib/data-store";
import { mergeWithDefaults } from "@/lib/portfolio-defaults";

export const dynamic = "force-dynamic";

export async function GET() {
  const store = readContentStore();
  const sections = mergeWithDefaults(store);
  return NextResponse.json(
    {
      status: "ok",
      version: "1.1.0",
      identity: "Samritha S",
      goldHex: sections.theme.filtered.accentGold,
      ...store,
      ...sections,
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}
