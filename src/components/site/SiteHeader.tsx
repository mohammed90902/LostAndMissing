import { Link, useNavigate } from "@tanstack/react-router";
import { Languages, LogOut, Moon, Plus, Sun, User as UserIcon } from "lucide-react";
import { buttonVariants, Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { actions, useAppState } from "@/lib/store";
import { useI18n } from "@/lib/i18n";
import { Logo } from "./Logo";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/browse", label: "Browse Items" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/help", label: "Help" },
] as const;

export function SiteHeader() {
  const navigate = useNavigate();
  const { user, conversations, preferences } = useAppState();
  const { t } = useI18n();
  const unread = conversations.reduce((n, c) => n + c.unread, 0);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        {t("Skip to main content")}
      </a>
      <div className="container-app flex h-16 items-center gap-4">
        <Logo />
        <nav aria-label={t("Main")} className="ml-6 hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="rounded-md px-3 py-2 font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground data-[status=active]:text-primary data-[status=active]:bg-secondary"
            >
              {t(n.label)}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <label className="inline-flex h-10 items-center gap-1 rounded-md border border-input bg-background px-2 text-sm">
            <Languages className="size-4 text-muted-foreground" aria-hidden="true" />
            <span className="sr-only">{t("Language")}</span>
            <select
              aria-label={t("Language")}
              value={preferences.language}
              onChange={(event) =>
                actions.updatePreferences({ language: event.target.value as "en" | "fr" })
              }
              className="max-w-24 bg-transparent font-semibold outline-none"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
          </label>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={t(
              preferences.theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
            )}
            title={t(preferences.theme === "dark" ? "Light mode" : "Dark mode")}
            onClick={() =>
              actions.updatePreferences({ theme: preferences.theme === "dark" ? "light" : "dark" })
            }
          >
            {preferences.theme === "dark" ? <Sun /> : <Moon />}
          </Button>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                className={buttonVariants({ variant: "ghost", className: "gap-2 px-2 sm:px-3" })}
                aria-label={`${t("Account menu for")} ${user.name}`}
              >
                <span className="grid size-8 place-items-center rounded-full bg-secondary font-bold text-secondary-foreground">
                  {user.name.charAt(0)}
                </span>
                <span className="hidden sm:inline">{user.name}</span>
                {unread > 0 && (
                  <span className="rounded-full bg-lost px-2 text-xs text-lost-foreground">
                    {unread} {t("new")}
                  </span>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>{t("Demo account")}</DropdownMenuLabel>
                <DropdownMenuItem onSelect={() => navigate({ to: "/profile" })}>
                  {t("Profile")}
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => navigate({ to: "/my-reports" })}>
                  {t("My reports")}
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => navigate({ to: "/saved" })}>
                  {t("Saved items")}
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => navigate({ to: "/messages" })}>
                  {t("Messages")} {unread > 0 && `(${unread})`}
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => navigate({ to: "/matches" })}>
                  {t("Matches")}
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => navigate({ to: "/settings" })}>
                  {t("Settings")}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => actions.signOut()}>
                  <LogOut className="size-4" /> {t("Sign out")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              to="/signin"
              className={buttonVariants({
                variant: "ghost",
                size: "icon",
                className: "sm:h-11 sm:w-auto sm:px-5",
              })}
            >
              <UserIcon /> <span className="hidden sm:inline">{t("Sign In")}</span>
            </Link>
          )}
          <Link to="/report" className={buttonVariants({ className: "!hidden md:!inline-flex" })}>
            <Plus /> {t("Report an Item")}
          </Link>
        </div>
      </div>
    </header>
  );
}
