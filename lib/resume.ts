import "server-only";
import fs from "node:fs";
import path from "node:path";

/** Fixed location. Never built from user input, so there is nothing to traverse. */
export const RESUME_PATH = path.join(process.cwd(), "private", "resume.pdf");
export const RESUME_MAX_BYTES = 10 * 1024 * 1024;

export function resumeAvailable() {
  try {
    const s = fs.statSync(RESUME_PATH);
    return s.isFile() && s.size > 0 && s.size <= RESUME_MAX_BYTES;
  } catch {
    return false;
  }
}
