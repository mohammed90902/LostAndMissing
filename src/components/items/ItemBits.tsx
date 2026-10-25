import { Link } from "@tanstack/react-router";
import { Bookmark, BookmarkCheck, CalendarDays, MapPin } from "lucide-react";
import { toast } from "sonner";
import { categoryIcon, categoryLabel } from "@/lib/catalog";
import { formatDate, timeAgo } from "@/lib/format";
import { actions, useAppState } from "@/lib/store";
import type { ItemKind, ItemStatus, Listing } from "@/lib/types";
import { cn } from "@/lib/utils";
import { localizeListing, useI18n } from "@/lib/i18n";

export function KindBadge({ kind, className }: { kind: ItemKind; className?: string }) {
  const { t } = useI18n();
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-sm font-bold",
        kind === "lost" ? "bg-lost-soft text-lost" : "bg-found-soft text-found",
        className,
      )}
    >
      <span
        className={cn("size-2 rounded-full", kind === "lost" ? "bg-lost" : "bg-found")}
        aria-hidden="true"
      />
      {t(kind === "lost" ? "Lost" : "Found")}
    </span>
  );
}

const STATUS: Record<ItemStatus, { label: string; cls: string }> = {
  open: { label: "Open", cls: "bg-secondary text-secondary-foreground" },
  returned: { label: "Returned", cls: "bg-success-soft text-success" },
  closed: { label: "Closed", cls: "bg-muted text-muted-foreground" },
  flagged: { label: "Under review", cls: "bg-warning-soft text-warning-foreground" },
};

export function StatusBadge({ status }: { status: ItemStatus }) {
  const { t } = useI18n();
  const s = STATUS[status];
  return (
    <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-sm font-bold", s.cls)}>
      {t(s.label)}
    </span>
  );
}

export function ItemImage({
  listing,
  className,
  eager,
}: {
  listing: Listing;
  className?: string;
  eager?: boolean;
}) {
  const { language, t } = useI18n();
  const displayListing = localizeListing(listing, language);
  const Icon = categoryIcon(displayListing.category);
  if (displayListing.image) {
    return (
      <img
        src={displayListing.image}
        alt={`${t("Photo of")} ${displayListing.title}`}
        loading={eager ? "eager" : "lazy"}
        width={944}
        height={704}
        className={cn("aspect-4/3 w-full object-cover", className)}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={`${t("No photo —")} ${t(categoryLabel(displayListing.category))}`}
      className={cn(
        "grid aspect-4/3 w-full place-items-center",
        displayListing.kind === "lost" ? "bg-lost-soft text-lost" : "bg-found-soft text-found",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-2">
        <Icon className="size-12" aria-hidden="true" />
        <span className="text-sm font-bold">{t("No photo")}</span>
      </div>
    </div>
  );
}

export function SaveButton({
  id,
  className,
  withLabel,
}: {
  id: string;
  className?: string;
  withLabel?: boolean;
}) {
  const { t } = useI18n();
  const { saved } = useAppState();
  const isSaved = saved.includes(id);
  return (
    <button
      type="button"
      aria-pressed={isSaved}
      aria-label={t(isSaved ? "Remove from saved items" : "Save this item")}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const nowSaved = actions.toggleSaved(id);
        toast.success(t(nowSaved ? "Item saved" : "Removed from saved items"));
      }}
      className={cn(
        "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full border bg-card/95 px-3 font-semibold text-foreground shadow-sm transition-colors hover:bg-secondary",
        isSaved && "border-primary text-primary",
        className,
      )}
    >
      {isSaved ? (
        <BookmarkCheck className="size-5" aria-hidden="true" />
      ) : (
        <Bookmark className="size-5" aria-hidden="true" />
      )}
      {withLabel && <span>{t(isSaved ? "Saved" : "Save item")}</span>}
    </button>
  );
}

export function ItemCard({ listing }: { listing: Listing }) {
  const { language, t } = useI18n();
  const displayListing = localizeListing(listing, language);
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border bg-card shadow-card transition-shadow hover:shadow-lift">
      <div className="relative overflow-hidden">
        <ItemImage
          listing={displayListing}
          className="transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <KindBadge kind={listing.kind} className="absolute left-3 top-3 shadow-sm" />
        <SaveButton id={listing.id} className="absolute right-3 top-3 z-10 px-0" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-lg font-bold leading-snug">
          <Link
            to="/items/$id"
            params={{ id: listing.id }}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {displayListing.title}
          </Link>
        </h3>
        <p className="flex items-center gap-1.5 text-muted-foreground">
          <MapPin className="size-4 shrink-0" aria-hidden="true" />
          <span className="truncate">{t(displayListing.location)}</span>
        </p>
        <p className="flex items-center gap-1.5 text-muted-foreground">
          <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
          <span>
            {t(listing.kind === "lost" ? "Lost" : "Found")}{" "}
            {listing.dateApproximate ? `${t("around")} ` : ""}
            {formatDate(listing.date, language)}
          </span>
        </p>
        <div className="mt-auto flex items-center justify-between pt-2 text-sm text-muted-foreground">
          <span>{t(categoryLabel(listing.category))}</span>
          {listing.status !== "open" ? (
            <StatusBadge status={listing.status} />
          ) : (
            <span>{timeAgo(listing.reportedAt, Date.now(), language)}</span>
          )}
        </div>
      </div>
    </article>
  );
}

export function ItemGrid({ listings }: { listings: Listing[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {listings.map((l) => (
        <li key={l.id} className="flex">
          <div className="w-full">
            <ItemCard listing={l} />
          </div>
        </li>
      ))}
    </ul>
  );
}
