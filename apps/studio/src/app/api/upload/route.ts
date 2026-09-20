import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME!;
  const apiKey = process.env.CLOUDINARY_API_KEY!;
  const apiSecret = process.env.CLOUDINARY_API_SECRET!;
  const folder = "samritha-portfolio";

  // Generate Cloudinary signature
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const toSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
  const signature = createHmac("sha256", apiSecret)
    .update(`folder=${folder}&timestamp=${timestamp}`)
    .digest("hex");

  // Actually use SHA1 as Cloudinary requires
  const { createHash } = await import("crypto");
  const sig = createHash("sha1")
    .update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`)
    .digest("hex");

  void toSign; // used above
  void signature;

  // Build multipart form for Cloudinary
  const cloudForm = new FormData();
  cloudForm.append("file", file);
  cloudForm.append("api_key", apiKey);
  cloudForm.append("timestamp", timestamp);
  cloudForm.append("folder", folder);
  cloudForm.append("signature", sig);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: cloudForm }
  );

  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json({ error: err }, { status: 500 });
  }

  const data = await res.json();
  return NextResponse.json({
    url: data.secure_url,
    publicId: data.public_id,
    width: data.width,
    height: data.height,
  });
}
