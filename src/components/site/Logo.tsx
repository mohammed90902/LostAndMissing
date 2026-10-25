import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-8", className)}>
      <rect width="32" height="32" rx="9" className="fill-primary" />
      <path
        d="M10 17.5a6 6 0 1 1 6 6"
        fill="none"
        strokeWidth="2.6"
        strokeLinecap="round"
        className="stroke-primary-foreground"
      />
      <path
        d="M12.5 21l3.5 2.5-2.5 3.5"
        fill="none"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-accent"
      />
      <circle cx="16" cy="17.5" r="2" className="fill-accent" />
    </svg>
  );
}

export function Logo({
  className,
  tone = "default",
}: {
  className?: string;
  tone?: "default" | "inverse";
}) {
  const { t } = useI18n();
  return (
    <Link
      to="/"
      className={cn("inline-flex items-center gap-2 rounded-md", className)}
      aria-label={t("FindBack home")}
    >
      <LogoMark />
      <span
        className={cn(
          "font-display text-xl font-extrabold tracking-tight",
          tone === "inverse" ? "text-ink-foreground" : "text-foreground",
        )}
      >
        FindBack
      </span>
    </Link>
  );
}
