import { Link } from "@tanstack/react-router";
import { Home, Plus, Search, Sparkles, User } from "lucide-react";

const ITEMS = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/browse", label: "Browse", icon: Search },
  { to: "/report", label: "Report", icon: Plus, primary: true },
  { to: "/matches", label: "Matches", icon: Sparkles },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function MobileNav() {
  return (
    <nav
      aria-label="Mobile"
      className="fixed inset-x-0 bottom-0 z-40 border-t bg-card pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <ul className="grid grid-cols-5">
        {ITEMS.map((it) => (
          <li key={it.to}>
            <Link
              to={it.to}
              activeOptions={{ exact: "exact" in it && it.exact }}
              className="group flex min-h-16 flex-col items-center justify-center gap-0.5 text-xs font-bold text-muted-foreground data-[status=active]:text-primary"
            >
              {"primary" in it ? (
                <span className="-mt-5 grid size-13 place-items-center rounded-full bg-primary text-primary-foreground shadow-lift ring-4 ring-card">
                  <it.icon className="size-6" aria-hidden="true" />
                </span>
              ) : (
                <it.icon className="size-6" aria-hidden="true" />
              )}
              <span>{it.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
