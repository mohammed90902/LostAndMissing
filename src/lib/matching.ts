import type { Listing, MatchResult } from "./types";

const STOP = new Set(["the", "a", "an", "and", "with", "of", "in", "on", "at", "to", "my", "i", "it", "near", "for", "left", "found", "lost", "was", "is", "or", "by"]);
const COLORS = ["black", "white", "red", "blue", "navy", "green", "yellow", "brown", "grey", "gray", "silver", "gold", "pink", "purple", "orange", "teal", "tortoiseshell"];

export const tokens = (s: string) =>
  new Set(s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w)));

/**
 * Transparent demo scoring (0–100). Each signal adds points and a human reason.
 * Category 35, location 20, date proximity up to 20, shared colour 10, shared words up to 15.
 */
export function scoreMatch(lost: Listing, found: Listing): MatchResult | null {
  if (lost.kind !== "lost" || found.kind !== "found") return null;
  if (lost.category !== found.category) return null;
  let score = 35;
  const reasons = ["Same type of item"];

  if (lost.location === found.location) {
    score += 20;
    reasons.push(`Both in ${lost.location}`);
  }

  const days = (new Date(found.date).getTime() - new Date(lost.date).getTime()) / 86400000;
  if (days >= -2 && days <= 14) {
    const pts = Math.round(20 * (1 - Math.max(0, days) / 14));
    score += pts;
    reasons.push(days <= 2 ? "Found within a couple of days" : "Found within two weeks");
  }

  const lt = tokens(`${lost.title} ${lost.description}`);
  const ft = tokens(`${found.title} ${found.description}`);
  const sharedColor = COLORS.find((c) => lt.has(c) && ft.has(c));
  if (sharedColor) {
    score += 10;
    reasons.push(`Both described as ${sharedColor}`);
  }
  const shared = [...lt].filter((w) => ft.has(w) && !COLORS.includes(w));
  if (shared.length) {
    score += Math.min(15, shared.length * 5);
    reasons.push(`Similar words: ${shared.slice(0, 3).join(", ")}`);
  }

  return { lost, found, score: Math.min(100, score), reasons };
}

export function findMatches(listings: Listing[], minScore = 50): MatchResult[] {
  const open = listings.filter((l) => l.status === "open");
  const lost = open.filter((l) => l.kind === "lost");
  const found = open.filter((l) => l.kind === "found");
  const out: MatchResult[] = [];
  for (const l of lost) for (const f of found) {
    const m = scoreMatch(l, f);
    if (m && m.score >= minScore) out.push(m);
  }
  return out.sort((a, b) => b.score - a.score);
}

export function matchesFor(listing: Listing, listings: Listing[]) {
  return findMatches(listings).filter((m) => m.lost.id === listing.id || m.found.id === listing.id);
}

export const matchStrength = (score: number) => (score >= 80 ? "Strong" : score >= 65 ? "Good" : "Possible");
