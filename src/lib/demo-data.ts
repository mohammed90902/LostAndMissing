import keys from "@/assets/items/keys.jpg";
import wallet from "@/assets/items/wallet.jpg";
import phone from "@/assets/items/phone.jpg";
import backpack from "@/assets/items/backpack.jpg";
import gloves from "@/assets/items/gloves.jpg";
import headphones from "@/assets/items/headphones.jpg";
import umbrella from "@/assets/items/umbrella.jpg";
import glasses from "@/assets/items/glasses.jpg";
import type { Conversation, Listing, User } from "./types";

export const DEMO_USER_ID = "u-demo";

export const DEMO_USER: User = {
  id: DEMO_USER_ID,
  name: "Alex M.",
  email: "alex@example.com",
  joinedAt: "2026-09-02T12:00:00Z",
};

const d = (daysAgo: number) => {
  const t = new Date("2026-10-24T15:00:00Z");
  t.setUTCDate(t.getUTCDate() - daysAgo);
  return t.toISOString();
};

export const SEED_LISTINGS: Listing[] = [
  {
    id: "l-keys-1", kind: "lost", title: "House keys with blue lighthouse keychain", category: "keys",
    description: "Three silver keys on a ring with a small blue-and-white lighthouse keychain. Probably dropped walking along the harbourfront.",
    location: "Downtown / Water Street", date: d(1), reportedAt: d(1), image: keys,
    contactMethod: "in_app", status: "open", ownerId: DEMO_USER_ID, reporterName: "Alex M.", isDemo: true,
  },
  {
    id: "f-keys-1", kind: "found", title: "Keys on lighthouse keyring", category: "keys",
    description: "Found a set of keys with a lighthouse keychain near the boardwalk by the harbour. Describe the keys to claim.",
    location: "Downtown / Water Street", date: d(0), reportedAt: d(0), image: keys, heldAt: "Handed in to a local business — details shared privately",
    contactMethod: "in_app", status: "open", ownerId: "u-sam", reporterName: "Sam R.", isDemo: true,
  },
  {
    id: "l-wallet-1", kind: "lost", title: "Brown leather wallet", category: "wallets",
    description: "Worn brown bifold wallet. Lost somewhere around Bowring Park on Sunday afternoon.",
    location: "Bowring Park", date: d(3), reportedAt: d(3), image: wallet,
    contactMethod: "in_app", status: "open", ownerId: "u-priya", reporterName: "Priya K.", isDemo: true,
  },
  {
    id: "f-wallet-1", kind: "found", title: "Leather wallet on park bench", category: "wallets",
    description: "Brown leather wallet left on a bench near the duck pond. I have not opened it beyond checking for a name.",
    location: "Bowring Park", date: d(2), reportedAt: d(2), image: wallet, heldAt: "Kept safe at home — will meet in a public place",
    contactMethod: "in_app", status: "open", ownerId: "u-jordan", reporterName: "Jordan T.", isDemo: true,
  },
  {
    id: "l-phone-1", kind: "lost", title: "Phone in dark green case", category: "phones",
    description: "Smartphone with a matte dark green case. Left at a café table on Water Street.",
    location: "Downtown / Water Street", date: d(4), reportedAt: d(4), image: phone,
    contactMethod: "in_app", status: "open", ownerId: "u-mia", reporterName: "Mia L.", isDemo: true,
  },
  {
    id: "f-phone-1", kind: "found", title: "Green phone found at café", category: "phones",
    description: "Staff found a phone in a green case after closing. It's locked. Owner can describe the lock screen to claim.",
    location: "Downtown / Water Street", date: d(4), reportedAt: d(3), image: phone, heldAt: "Held by café staff",
    contactMethod: "in_app", status: "open", ownerId: "u-cafe", reporterName: "Rosa C.", isDemo: true,
  },
  {
    id: "l-backpack-1", kind: "lost", title: "Red hiking backpack", category: "bags",
    description: "Red daypack with grey straps. Left at a bus shelter on the Metrobus route 10.",
    location: "Metrobus route", date: d(5), reportedAt: d(5), image: backpack,
    contactMethod: "in_app", status: "open", ownerId: DEMO_USER_ID, reporterName: "Alex M.", isDemo: true,
  },
  {
    id: "f-backpack-1", kind: "found", title: "Red backpack at bus shelter", category: "bags",
    description: "Red backpack left at a bus shelter in the rain. Brought it inside to keep it dry.",
    location: "Metrobus route", date: d(5), reportedAt: d(4), image: backpack, heldAt: "Kept safe at home",
    contactMethod: "in_app", status: "open", ownerId: "u-liam", reporterName: "Liam O.", isDemo: true,
  },
  {
    id: "l-gloves-1", kind: "lost", title: "Navy snowflake mittens", category: "clothing",
    description: "Hand-knit navy mittens with white snowflakes. Sentimental — knit by my grandmother.",
    location: "Memorial University", date: d(6), reportedAt: d(6), image: gloves,
    contactMethod: "in_app", status: "open", ownerId: "u-ella", reporterName: "Ella B.", isDemo: true,
  },
  {
    id: "f-headphones-1", kind: "found", title: "Black over-ear headphones", category: "electronics",
    description: "Black wireless headphones left on a study desk at the library.",
    location: "Memorial University", date: d(2), reportedAt: d(2), image: headphones, heldAt: "Given to the library front desk",
    contactMethod: "in_app", status: "open", ownerId: "u-noah", reporterName: "Noah P.", isDemo: true,
  },
  {
    id: "f-umbrella-1", kind: "found", title: "Yellow umbrella with wooden handle", category: "other",
    description: "Bright yellow umbrella with a curved wooden handle, leaning on a house near Signal Hill Road.",
    location: "Signal Hill", date: d(7), reportedAt: d(7), image: umbrella,
    contactMethod: "in_app", status: "open", ownerId: "u-sam", reporterName: "Sam R.", isDemo: true,
  },
  {
    id: "l-glasses-1", kind: "lost", title: "Tortoiseshell glasses in teal case", category: "eyewear",
    description: "Prescription glasses with tortoiseshell frames in a teal hard case. Possibly left at the Avalon Mall food court.",
    location: "Avalon Mall area", date: d(8), dateApproximate: true, reportedAt: d(8), image: glasses,
    contactMethod: "in_app", status: "open", ownerId: "u-george", reporterName: "George W.", isDemo: true,
  },
  {
    id: "f-glasses-1", kind: "found", title: "Glasses in a teal case", category: "eyewear",
    description: "Glasses in a teal case found under a table near the food court.",
    location: "Avalon Mall area", date: d(7), reportedAt: d(6), image: glasses, heldAt: "Handed in to mall customer service",
    contactMethod: "in_app", status: "open", ownerId: "u-hana", reporterName: "Hana S.", isDemo: true,
  },
  {
    id: "l-ring-1", kind: "lost", title: "Silver ring", category: "jewellery",
    description: "Plain silver band. Might have slipped off while walking the trail at Quidi Vidi.",
    location: "Quidi Vidi", date: d(10), reportedAt: d(10),
    contactMethod: "in_app", status: "open", ownerId: "u-maya", reporterName: "Maya D.", isDemo: true,
  },
  {
    id: "f-id-1", kind: "found", title: "Student ID card", category: "documents",
    description: "A university student ID card. Name and photo hidden for privacy — the owner can confirm their details privately.",
    location: "George Street", date: d(1), reportedAt: d(1), heldAt: "Will be returned to campus security if unclaimed",
    contactMethod: "in_app", status: "open", ownerId: "u-ben", reporterName: "Ben A.", isDemo: true,
  },
  {
    id: "l-dog-1", kind: "lost", title: "Small brown terrier named Biscuit", category: "pets",
    description: "Friendly small brown terrier with a red collar. Last seen near Churchill Square.",
    location: "Churchill Square", date: d(2), reportedAt: d(2),
    contactMethod: "in_app", status: "returned", ownerId: "u-claire", reporterName: "Claire F.", isDemo: true,
  },
  {
    id: "f-scarf-1", kind: "found", title: "Grey wool scarf", category: "clothing",
    description: "Long grey wool scarf found on a seat at the airport arrivals area.",
    location: "St. John's Airport", date: d(9), reportedAt: d(9),
    contactMethod: "in_app", status: "flagged", ownerId: "u-owen", reporterName: "Owen G.", isDemo: true,
  },
];

export const SEED_CONVERSATIONS: Conversation[] = [
  {
    id: "c-1", listingId: "f-keys-1", otherName: "Sam R.", unread: 1,
    messages: [
      { id: "m1", fromMe: true, body: "Hi Sam, I think those might be my keys! I lost them yesterday near the harbour.", sentAt: d(0) },
      { id: "m2", fromMe: false, body: "Hi! Could you tell me how many keys are on the ring and anything else about them?", sentAt: d(0) },
    ],
  },
  {
    id: "c-2", listingId: "f-backpack-1", otherName: "Liam O.", unread: 0,
    messages: [
      { id: "m3", fromMe: true, body: "Hello, is the red backpack still with you?", sentAt: d(3) },
      { id: "m4", fromMe: false, body: "Yes, it's dry and safe. What's inside the front pocket?", sentAt: d(3) },
      { id: "m5", fromMe: true, body: "A blue water bottle and a library card.", sentAt: d(2) },
    ],
  },
];
