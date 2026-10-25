import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

const COLS = [
  { title: "Use FindBack", links: [
    { to: "/report/lost", label: "Report a lost item" },
    { to: "/report/found", label: "Report a found item" },
    { to: "/browse", label: "Browse items" },
    { to: "/matches", label: "Possible matches" },
  ] },
  { title: "Help", links: [
    { to: "/how-it-works", label: "How it works" },
    { to: "/faq", label: "Questions & answers" },
    { to: "/safety", label: "Safety guidelines" },
    { to: "/contact", label: "Contact us" },
  ] },
  { title: "FindBack", links: [
    { to: "/about", label: "About" },
    { to: "/privacy", label: "Privacy" },
    { to: "/admin", label: "Admin demo" },
  ] },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-ink pb-24 text-ink-foreground md:pb-0">
      <div className="container-app grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="space-y-3">
          <Logo tone="inverse" />
          <p className="max-w-xs text-ink-foreground/75">Lost something? Let's bring it back. Starting in St. John's, Newfoundland and Labrador.</p>
        </div>
        {COLS.map((c) => (
          <div key={c.title}>
            <h2 className="mb-3 text-base font-bold">{c.title}</h2>
            <ul className="space-y-1">
              {c.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="inline-block py-1.5 text-ink-foreground/80 underline-offset-4 hover:text-ink-foreground hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-ink-foreground/15">
        <p className="container-app py-5 text-sm text-ink-foreground/70">
          © 2026 FindBack · Prototype — listings, accounts and messages are demo data stored only in this browser.
        </p>
      </div>
    </footer>
  );
}
