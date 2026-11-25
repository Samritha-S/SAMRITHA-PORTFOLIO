import fs from "fs";
import path from "path";

function getDataFilePath() {
  const candidates = [
    path.resolve(process.cwd(), "data/portfolio-content.json"),
    path.resolve(process.cwd(), "../../data/portfolio-content.json"),
    path.resolve(process.cwd(), "../data/portfolio-content.json"),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return candidates[1];
}

export function readContentStore() {
  try {
    const filePath = getDataFilePath();
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error("Error reading portfolio-content.json in web:", err);
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
