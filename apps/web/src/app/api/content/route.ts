import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    version: "1.0.0",
    identity: "Samritha S",
    views: ["unfiltered", "filtered"],
    goldHex: "#C9A24B",
  });
}
