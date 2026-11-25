import { NextRequest, NextResponse } from "next/server";
import { readContentStore, writeContentStore } from "@/lib/data-store";
import { mergeWithDefaults } from "@/lib/portfolio-defaults";

export async function GET() {
  const store = readContentStore();
  const sections = mergeWithDefaults(store);
  return NextResponse.json({
    ...store,
    ...sections,
  });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const updated = writeContentStore((store) => ({
    ...store,
    ...body,
  }));
  const sections = mergeWithDefaults(updated);
  return NextResponse.json({
    ...updated,
    ...sections,
  });
}
