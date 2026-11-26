import fs from "fs";
import path from "path";

function getDataFilePath() {
  const candidates = [
    path.resolve(process.cwd(), "data/portfolio-content.json"),
    path.resolve(process.cwd(), "../../data/portfolio-content.json"),
    path.resolve(process.cwd(), "../data/portfolio-content.json"),
  ];
  for (const c of candidates) {
    if (fs.existsSync(/*turbopackIgnore: true*/ c)) return c;
  }
  return candidates[1];
}

export function readContentStore() {
  try {
    const filePath = getDataFilePath();
    if (fs.existsSync(/*turbopackIgnore: true*/ filePath)) {
      const raw = fs.readFileSync(/*turbopackIgnore: true*/ filePath, "utf-8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error("Error reading portfolio-content.json:", err);
  }
  return {
    settings: null,
    milestones: [],
    projects: [],
    notes: [],
    posts: [],
    photos: [],
  };
}

export function writeContentStore(updater: (data: any) => any) {
  try {
    const filePath = getDataFilePath();
    const current = readContentStore();
    const updated = updater(current);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), "utf-8");
    return updated;
  } catch (err) {
    console.error("Error writing portfolio-content.json:", err);
  }
}
