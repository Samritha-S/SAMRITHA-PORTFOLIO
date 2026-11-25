import { NextResponse } from "next/server";
import { readContentStore } from "@/lib/data-store";

export async function GET() {
  const store = readContentStore();
  return NextResponse.json({
    status: "ok",
    version: "1.0.0",
    identity: "Samritha S",
    goldHex: "#C9A24B",
    ...store,
  });
}
