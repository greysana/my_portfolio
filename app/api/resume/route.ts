import fs from "node:fs/promises";
import { NextResponse } from "next/server";
import { content } from "@/lib/content";
import { RESUME_MAX_BYTES, RESUME_PATH, resumeAvailable } from "@/lib/resume";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const filename = `${content.profile.name.replace(/[^\w]+/g, "_")}_Resume.pdf`;

/** Serves exactly one fixed file. There is no filename in the URL, so there is nothing to tamper with. */
export async function GET() {
  if (!resumeAvailable()) {
    return NextResponse.json({ message: "Resume not available" }, { status: 404, headers: { "Cache-Control": "no-store" } });
  }
  const file = await fs.readFile(RESUME_PATH);
  if (file.byteLength > RESUME_MAX_BYTES) {
    return NextResponse.json({ message: "Resume not available" }, { status: 404 });
  }
  return new NextResponse(new Uint8Array(file), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Length": String(file.byteLength),
      "Cache-Control": "public, max-age=3600",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
