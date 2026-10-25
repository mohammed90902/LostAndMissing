/**
 * Demo data-access layer. Everything lives in the browser (localStorage) so the
 * prototype works with no backend. Replace these functions with API calls later;
 * components only use the hooks/actions exported here.
 */
import { useSyncExternalStore } from "react";
import { DEMO_USER, SEED_CONVERSATIONS, SEED_LISTINGS } from "./demo-data";
import type { Conversation, Listing, Preferences, User } from "./types";

export interface AppState {
  listings: Listing[];
  saved: string[];
  conversations: Conversation[];
  user: User | null;
  preferences: Preferences;
}

const KEY = "findback-demo-v1";

const initialState: AppState = {
  listings: SEED_LISTINGS,
  saved: ["f-wallet-1"],
  conversations: SEED_CONVERSATIONS,
  user: null,
  preferences: {
    emailUpdates: true,
    matchAlerts: true,
    largeText: false,
    language: "en",
    theme: "light",
  },
};

let state: AppState = initialState;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const saved = JSON.parse(raw) as Partial<AppState>;
      state = {
        ...initialState,
        ...saved,
        preferences: { ...initialState.preferences, ...saved.preferences },
      };
    }
  } catch {
    /* ignore corrupt demo data */
  }
}

function persist() {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage full or disabled — demo continues in memory */
  }
}

function set(updater: (s: AppState) => AppState) {
  load();
  state = updater(state);
  persist();
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

function getSnapshot() {
  load();
  return state;
}

export function useAppState(): AppState {
  return useSyncExternalStore(subscribe, getSnapshot, () => initialState);
}

const uid = (p: string) => `${p}-${Math.random().toString(36).slice(2, 9)}`;

export const actions = {
  addListing(input: Omit<Listing, "id" | "reportedAt" | "status" | "ownerId" | "reporterName">) {
    const user = getSnapshot().user ?? DEMO_USER;
    const listing: Listing = {
      ...input,
      id: uid(input.kind === "lost" ? "l" : "f"),
      reportedAt: new Date().toISOString(),
      status: "open",
      ownerId: user.id,
      reporterName: user.name,
    };
    set((s) => ({ ...s, listings: [listing, ...s.listings] }));
    return listing;
  },
  updateListing(id: string, patch: Partial<Listing>) {
    set((s) => ({ ...s, listings: s.listings.map((l) => (l.id === id ? { ...l, ...patch } : l)) }));
  },
  deleteListing(id: string) {
    set((s) => ({
      ...s,
      listings: s.listings.filter((l) => l.id !== id),
      saved: s.saved.filter((x) => x !== id),
    }));
  },
  toggleSaved(id: string): boolean {
    const isSaved = getSnapshot().saved.includes(id);
    set((s) => ({ ...s, saved: isSaved ? s.saved.filter((x) => x !== id) : [...s.saved, id] }));
    return !isSaved;
  },
  startConversation(listing: Listing): string {
    const existing = getSnapshot().conversations.find((c) => c.listingId === listing.id);
    if (existing) return existing.id;
    const c: Conversation = {
      id: uid("c"),
      listingId: listing.id,
      otherName: listing.reporterName,
      messages: [],
      unread: 0,
    };
    set((s) => ({ ...s, conversations: [c, ...s.conversations] }));
    return c.id;
  },
  sendMessage(conversationId: string, body: string) {
    set((s) => ({
      ...s,
      conversations: s.conversations.map((c) =>
        c.id === conversationId
          ? {
              ...c,
              messages: [
                ...c.messages,
                { id: uid("m"), fromMe: true, body, sentAt: new Date().toISOString() },
              ],
            }
          : c,
      ),
    }));
  },
  markRead(conversationId: string) {
    if (!getSnapshot().conversations.find((c) => c.id === conversationId)?.unread) return;
    set((s) => ({
      ...s,
      conversations: s.conversations.map((c) =>
        c.id === conversationId ? { ...c, unread: 0 } : c,
      ),
    }));
  },
  setBlocked(conversationId: string, blocked: boolean) {
    set((s) => ({
      ...s,
      conversations: s.conversations.map((c) => (c.id === conversationId ? { ...c, blocked } : c)),
    }));
  },
  /** Demo sign-in: no password is stored or sent anywhere. */
  signIn(name: string, email: string) {
    set((s) => ({ ...s, user: { ...DEMO_USER, name: name || DEMO_USER.name, email } }));
  },
  signOut() {
    set((s) => ({ ...s, user: null }));
  },
  updatePreferences(p: Partial<Preferences>) {
    set((s) => ({ ...s, preferences: { ...s.preferences, ...p } }));
  },
  updateProfile(p: Partial<User>) {
    set((s) => ({ ...s, user: s.user ? { ...s.user, ...p } : s.user }));
  },
  resetDemo() {
    set(() => initialState);
  },
};

export const currentUserId = (s: AppState) => (s.user ?? DEMO_USER).id;
