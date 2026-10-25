// Shared data models. Kept plain and serialisable so they map 1:1 to Dart classes later.

export type ItemKind = "lost" | "found";
export type ItemStatus = "open" | "returned" | "closed" | "flagged";
export type ContactMethod = "in_app" | "email" | "phone";

export type Category =
  | "keys"
  | "wallets"
  | "phones"
  | "electronics"
  | "bags"
  | "clothing"
  | "eyewear"
  | "jewellery"
  | "documents"
  | "pets"
  | "other";

export interface Listing {
  id: string;
  kind: ItemKind;
  title: string;
  category: Category;
  description: string;
  /** General area only — never an exact address. */
  location: string;
  /** ISO date the item was lost or found. */
  date: string;
  dateApproximate?: boolean;
  /** ISO timestamp the report was created. */
  reportedAt: string;
  image?: string;
  /** Private notes (identifying marks). Not shown publicly. */
  privateDetails?: string;
  /** Found items: where it's being held, in general terms. */
  heldAt?: string;
  contactMethod: ContactMethod;
  status: ItemStatus;
  ownerId: string;
  /** First name + initial only. */
  reporterName: string;
  isDemo?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  joinedAt: string;
  isAdmin?: boolean;
}

export interface Message {
  id: string;
  fromMe: boolean;
  body: string;
  sentAt: string;
}

export interface Conversation {
  id: string;
  listingId: string;
  otherName: string;
  messages: Message[];
  unread: number;
  blocked?: boolean;
}

export interface MatchResult {
  lost: Listing;
  found: Listing;
  score: number;
  reasons: string[];
}

export interface Preferences {
  emailUpdates: boolean;
  matchAlerts: boolean;
  largeText: boolean;
  language: "en" | "fr";
  theme: "light" | "dark";
}
