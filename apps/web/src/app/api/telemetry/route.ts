import { NextRequest, NextResponse } from "next/server";
import { readContentStore } from "@/lib/data-store";
import { mergeWithDefaults } from "@/lib/portfolio-defaults";

export const dynamic = "force-dynamic";

export interface HeatmapCell {
  date: string;
  count: number;
}

export interface VelocityPoint {
  label: string;
  value: number;
}

export interface GitHubTelemetry {
  source: "live" | "fallback";
  username: string;
  totalContributions: number;
  publicRepos: number;
  totalStars: number;
  currentStreak: number;
  followers: number;
  heatmapWeeks: HeatmapCell[][];
  weeklyVelocity: VelocityPoint[];
}

export interface LeetCodeTelemetry {
  source: "live" | "fallback";
  username: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number | null;
  streak: number;
  totalActiveDays: number;
  heatmapWeeks: HeatmapCell[][];
  weeklyVelocity: VelocityPoint[];
}

function buildEmptyWeeks(weeks = 24): HeatmapCell[][] {
  const today = new Date();
  const totalDays = weeks * 7;
  const start = new Date(today);
  start.setUTCDate(today.getUTCDate() - totalDays + 1);

  const result: HeatmapCell[][] = [];
  for (let w = 0; w < weeks; w++) {
    const week: HeatmapCell[] = [];
    for (let d = 0; d < 7; d++) {
      const cur = new Date(start);
      cur.setUTCDate(start.getUTCDate() + w * 7 + d);
      week.push({
        date: cur.toISOString().slice(0, 10),
        count: 0,
      });
    }
    result.push(week);
  }
  return result;
}

function mapDailyCountsToWeeks(dailyMap: Map<string, number>, weeks = 24): HeatmapCell[][] {
  const grid = buildEmptyWeeks(weeks);
  for (const week of grid) {
    for (const cell of week) {
      cell.count = dailyMap.get(cell.date) ?? 0;
    }
  }
  return grid;
}

function computeWeeklyVelocity(heatmapWeeks: HeatmapCell[][], count = 12): VelocityPoint[] {
  const slice = heatmapWeeks.slice(-count);
  return slice.map((week, idx) => ({
    label: `W${idx + 1}`,
    value: week.reduce((sum, cell) => sum + cell.count, 0),
  }));
}

function computeStreak(dailyMap: Map<string, number>): number {
  const today = new Date();
  let streak = 0;
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setUTCDate(today.getUTCDate() - i);
    const key = d.toISOString().slice(0, 10);
    const val = dailyMap.get(key) ?? 0;
    if (val > 0) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }
  return streak;
}

async function fetchGitHubTelemetry(username: string): Promise<GitHubTelemetry> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "samritha-portfolio-telemetry",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const [userRes, reposRes, contribRes] = await Promise.all([
      fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
        headers,
        cache: "no-store",
      }),
      fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100`, {
        headers,
        cache: "no-store",
      }),
      fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`, {
        cache: "no-store",
      }),
    ]);

    if (!userRes.ok) throw new Error(`GitHub user fetch failed: ${userRes.status}`);

    const userJson = (await userRes.json()) as { public_repos?: number; followers?: number };
    const reposJson = reposRes.ok
      ? ((await reposRes.json()) as Array<{ stargazers_count?: number }>)
      : [];
    const totalStars = Array.isArray(reposJson)
      ? reposJson.reduce((acc, r) => acc + (r.stargazers_count ?? 0), 0)
      : 0;

    const dailyMap = new Map<string, number>();
    let totalContributions = 0;

    if (contribRes.ok) {
      const contribJson = (await contribRes.json()) as {
        total?: { lastYear?: number };
        contributions?: Array<{ date: string; count: number }>;
      };
      if (Array.isArray(contribJson.contributions)) {
        for (const entry of contribJson.contributions) {
          dailyMap.set(entry.date, entry.count);
        }
        totalContributions =
          contribJson.total?.lastYear ??
          contribJson.contributions.reduce((acc, c) => acc + c.count, 0);
      }
    }

    const heatmapWeeks = mapDailyCountsToWeeks(dailyMap, 24);
    const weeklyVelocity = computeWeeklyVelocity(heatmapWeeks, 12);
    const currentStreak = computeStreak(dailyMap);

    return {
      source: "live",
      username,
      totalContributions,
      publicRepos: userJson.public_repos ?? 0,
      totalStars,
      currentStreak,
      followers: userJson.followers ?? 0,
      heatmapWeeks,
      weeklyVelocity,
    };
  } catch {
    const fallbackWeeks = buildEmptyWeeks(24);
    return {
      source: "fallback",
      username,
      totalContributions: 0,
      publicRepos: 0,
      totalStars: 0,
      currentStreak: 0,
      followers: 0,
      heatmapWeeks: fallbackWeeks,
      weeklyVelocity: computeWeeklyVelocity(fallbackWeeks, 12),
    };
  }
}

async function fetchLeetCodeTelemetry(username: string): Promise<LeetCodeTelemetry> {
  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        profile {
          ranking
        }
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
        userCalendar {
          streak
          totalActiveDays
          submissionCalendar
        }
      }
    }
  `;

  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
        "User-Agent": "Mozilla/5.0",
      },
      body: JSON.stringify({ query, variables: { username } }),
      cache: "no-store",
    });

    if (res.ok) {
      const json = (await res.json()) as {
        data?: {
          matchedUser?: {
            profile?: { ranking?: number };
            submitStatsGlobal?: { acSubmissionNum?: Array<{ difficulty: string; count: number }> };
            userCalendar?: {
              streak?: number;
              totalActiveDays?: number;
              submissionCalendar?: string;
            };
          } | null;
        };
      };

      const user = json.data?.matchedUser;
      if (user) {
        const stats = user.submitStatsGlobal?.acSubmissionNum ?? [];
        const getCount = (diff: string) => stats.find((s) => s.difficulty === diff)?.count ?? 0;

        const dailyMap = new Map<string, number>();
        if (user.userCalendar?.submissionCalendar) {
          const parsed = JSON.parse(user.userCalendar.submissionCalendar) as Record<string, number>;
          for (const [ts, count] of Object.entries(parsed)) {
            const date = new Date(Number(ts) * 1000).toISOString().slice(0, 10);
            dailyMap.set(date, (dailyMap.get(date) ?? 0) + count);
          }
        }

        const heatmapWeeks = mapDailyCountsToWeeks(dailyMap, 24);
        const weeklyVelocity = computeWeeklyVelocity(heatmapWeeks, 12);

        return {
          source: "live",
          username,
          totalSolved: getCount("All"),
          easySolved: getCount("Easy"),
          mediumSolved: getCount("Medium"),
          hardSolved: getCount("Hard"),
          ranking: user.profile?.ranking ?? null,
          streak: user.userCalendar?.streak ?? 0,
          totalActiveDays: user.userCalendar?.totalActiveDays ?? 0,
          heatmapWeeks,
          weeklyVelocity,
        };
      }
    }
  } catch {
    // Fall through to secondary public LeetCode stats API
  }

  try {
    const altRes = await fetch(
      `https://leetcode-api-faisalshohag.vercel.app/${encodeURIComponent(username)}`,
      { cache: "no-store" }
    );
    if (!altRes.ok) throw new Error(`LeetCode alt API failed: ${altRes.status}`);

    const altJson = (await altRes.json()) as {
      totalSolved?: number;
      easySolved?: number;
      mediumSolved?: number;
      hardSolved?: number;
      ranking?: number;
      submissionCalendar?: Record<string, number>;
    };

    const dailyMap = new Map<string, number>();
    if (altJson.submissionCalendar) {
      for (const [ts, count] of Object.entries(altJson.submissionCalendar)) {
        const date = new Date(Number(ts) * 1000).toISOString().slice(0, 10);
        dailyMap.set(date, (dailyMap.get(date) ?? 0) + count);
      }
    }

    const heatmapWeeks = mapDailyCountsToWeeks(dailyMap, 24);
    const weeklyVelocity = computeWeeklyVelocity(heatmapWeeks, 12);

    return {
      source: "live",
      username,
      totalSolved: altJson.totalSolved ?? 0,
      easySolved: altJson.easySolved ?? 0,
      mediumSolved: altJson.mediumSolved ?? 0,
      hardSolved: altJson.hardSolved ?? 0,
      ranking: altJson.ranking ?? null,
      streak: computeStreak(dailyMap),
      totalActiveDays: dailyMap.size,
      heatmapWeeks,
      weeklyVelocity,
    };
  } catch {
    const fallbackWeeks = buildEmptyWeeks(24);
    return {
      source: "fallback",
      username,
      totalSolved: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
      ranking: null,
      streak: 0,
      totalActiveDays: 0,
      heatmapWeeks: fallbackWeeks,
      weeklyVelocity: computeWeeklyVelocity(fallbackWeeks, 12),
    };
  }
}

export async function GET(req: NextRequest) {
  const store = readContentStore();
  const sections = mergeWithDefaults(store);

  const githubUsername =
    req.nextUrl.searchParams.get("github")?.trim() || sections.github.username || "Samritha-S";
  const leetcodeUsername =
    req.nextUrl.searchParams.get("leetcode")?.trim() ||
    sections.github.leetcodeUsername ||
    "sam0mega404";

  const [github, leetcode] = await Promise.all([
    fetchGitHubTelemetry(githubUsername),
    fetchLeetCodeTelemetry(leetcodeUsername),
  ]);

  return NextResponse.json(
    {
      github,
      leetcode,
      fetchedAt: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}
