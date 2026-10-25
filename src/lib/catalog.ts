import {
  Backpack,
  Dog,
  FileText,
  Gem,
  Glasses,
  Headphones,
  Key,
  Package,
  Shirt,
  Smartphone,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import type { Category, ContactMethod } from "./types";

export const CATEGORIES: { value: Category; label: string; icon: LucideIcon }[] = [
  { value: "keys", label: "Keys", icon: Key },
  { value: "wallets", label: "Wallets & purses", icon: Wallet },
  { value: "phones", label: "Phones", icon: Smartphone },
  { value: "electronics", label: "Electronics", icon: Headphones },
  { value: "bags", label: "Bags & backpacks", icon: Backpack },
  { value: "clothing", label: "Clothing & accessories", icon: Shirt },
  { value: "eyewear", label: "Glasses", icon: Glasses },
  { value: "jewellery", label: "Jewellery & watches", icon: Gem },
  { value: "documents", label: "ID & documents", icon: FileText },
  { value: "pets", label: "Pets", icon: Dog },
  { value: "other", label: "Something else", icon: Package },
];

export const categoryLabel = (c: Category) => CATEGORIES.find((x) => x.value === c)?.label ?? c;
export const categoryIcon = (c: Category) => CATEGORIES.find((x) => x.value === c)?.icon ?? Package;

/** General areas in St. John's, NL. Designed to be swapped per city later. */
export const LOCATIONS = [
  "Downtown / Water Street",
  "George Street",
  "Signal Hill",
  "Quidi Vidi",
  "Memorial University",
  "Avalon Mall area",
  "Bowring Park",
  "Churchill Square",
  "Kenmount Road",
  "Metrobus route",
  "St. John's Airport",
  "Mount Pearl",
  "Paradise",
  "Other / not sure",
];

export const CONTACT_METHODS: { value: ContactMethod; label: string; hint: string }[] = [
  { value: "in_app", label: "Message in FindBack", hint: "Safest — your details stay private" },
  { value: "email", label: "Email (shared only when I choose)", hint: "We never show your email publicly" },
  { value: "phone", label: "Phone (shared only when I choose)", hint: "We never show your number publicly" },
];

export const SENSITIVE_CATEGORIES: Category[] = ["wallets", "documents", "keys", "phones", "electronics"];

export const CITY = "St. John's, NL";
