import { categoryLabel } from "./catalog";
import type { Category, ItemKind, Listing } from "./types";

export interface SearchFilters {
  q?: string;
  kind?: ItemKind | "all";
  category?: Category | "all";
  location?: string;
  /** days back: 0 = any */
  within?: number;
  includeResolved?: boolean;
}

export function searchListings(listings: Listing[], f: SearchFilters, now = Date.now()): Listing[] {
  const words = (f.q ?? "").toLowerCase().split(/\s+/).filter(Boolean);
  return listings
    .filter((l) => l.status !== "flagged" && l.status !== "closed")
    .filter((l) => f.includeResolved || l.status === "open")
    .filter((l) => !f.kind || f.kind === "all" || l.kind === f.kind)
    .filter((l) => !f.category || f.category === "all" || l.category === f.category)
    .filter((l) => !f.location || f.location === "all" || l.location === f.location)
    .filter((l) => !f.within || now - new Date(l.date).getTime() <= f.within * 86400000)
    .filter((l) => {
      if (!words.length) return true;
      const hay = `${l.title} ${l.description} ${categoryLabel(l.category)} ${l.category} ${l.location}`.toLowerCase();
      return words.every((w) => hay.includes(w));
    })
    .sort((a, b) => new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime());
}
