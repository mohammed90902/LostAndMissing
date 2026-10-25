import { Link } from "@tanstack/react-router";
import { LogOut, Plus, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { actions, useAppState } from "@/lib/store";
import { Logo } from "./Logo";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/browse", label: "Browse Items" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/help", label: "Help" },
] as const;

export function SiteHeader() {
  const { user, conversations } = useAppState();
  const unread = conversations.reduce((n, c) => n + c.unread, 0);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">
        Skip to main content
      </a>
      <div className="container-app flex h-16 items-center gap-4">
        <Logo />
        <nav aria-label="Main" className="ml-6 hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="rounded-md px-3 py-2 font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground data-[status=active]:text-primary data-[status=active]:bg-secondary"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 px-2 sm:px-3" aria-label={`Account menu for ${user.name}`}>
                  <span className="grid size-8 place-items-center rounded-full bg-secondary font-bold text-secondary-foreground">
                    {user.name.charAt(0)}
                  </span>
                  <span className="hidden sm:inline">{user.name}</span>
                  {unread > 0 && <span className="rounded-full bg-lost px-2 text-xs text-lost-foreground">{unread} new</span>}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Demo account</DropdownMenuLabel>
                <DropdownMenuItem asChild><Link to="/profile">Profile</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/my-reports">My reports</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/saved">Saved items</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/messages">Messages {unread > 0 && `(${unread})`}</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/matches">Matches</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/settings">Settings</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => actions.signOut()}>
                  <LogOut className="size-4" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="ghost">
              <Link to="/signin"><UserIcon /> <span>Sign In</span></Link>
            </Button>
          )}
          <Button asChild className="hidden md:inline-flex">
            <Link to="/report"><Plus /> Report an Item</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
