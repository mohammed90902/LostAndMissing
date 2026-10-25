import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import {
  ItemGrid,
  ItemImage,
  KindBadge,
  SaveButton,
  StatusBadge,
} from "@/components/items/ItemBits";
import { DemoNote, EmptyState, PageHeader } from "@/components/site/Common";
import { Button, buttonVariants } from "@/components/ui/button";
import { CATEGORIES, LOCATIONS, categoryLabel } from "@/lib/catalog";
import { formatDate, timeAgo } from "@/lib/format";
import { findMatches, matchStrength, matchesFor } from "@/lib/matching";
import { searchListings } from "@/lib/search";
import { actions, currentUserId, useAppState } from "@/lib/store";
import type { Category, ItemStatus, Listing } from "@/lib/types";
import { localizeListing, useI18n } from "@/lib/i18n";

export function BrowsePage() {
  const { listings } = useAppState();
  const { language, t } = useI18n();
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<"all" | "lost" | "found">("all");
  const [category, setCategory] = useState<Category | "all">("all");
  const [location, setLocation] = useState("all");
  const [within, setWithin] = useState(0);
  const [showFilters, setShowFilters] = useState(true);
  const results = searchListings(
    listings,
    { q: query, kind, category, location, within },
    Date.now(),
    language,
  );

  return (
    <>
      <PageHeader
        title={t("Browse community reports")}
        intro={t("Search recent lost and found items across St. John's.")}
      />
      <div className="container-app py-8">
        <DemoNote className="mb-6">
          {t(
            "Listings are demo data saved only in this browser. Share only general locations; keep identifying details private.",
          )}
        </DemoNote>
        <section className="surface mb-7 p-4 sm:p-5" aria-label={t("Search and filter listings")}>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="relative flex-1">
              <span className="sr-only">{t("Search items")}</span>
              <Search
                className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t("Try “blue keys” or “Bowring Park”")}
                className="h-12 w-full rounded-md border border-input bg-background pl-11 pr-3"
              />
            </label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowFilters((value) => !value)}
                aria-expanded={showFilters}
              >
                <SlidersHorizontal /> {t("Filters")}
              </Button>
              <Link to="/report" className={buttonVariants()}>
                <span className="hidden sm:inline">{t("Report item")}</span>
                <span className="sm:hidden">{t("Report")}</span>
              </Link>
            </div>
          </div>
          {showFilters && (
            <div className="mt-4 grid gap-3 border-t pt-4 sm:grid-cols-2 lg:grid-cols-4">
              <label className="field-label">
                {t("Report type")}
                <select
                  value={kind}
                  onChange={(event) => setKind(event.target.value as typeof kind)}
                  className="mt-1 block h-11 w-full rounded-md border border-input bg-background px-3 font-normal"
                >
                  <option value="all">{t("Lost and found")}</option>
                  <option value="lost">{t("Lost items")}</option>
                  <option value="found">{t("Found items")}</option>
                </select>
              </label>
              <label className="field-label">
                {t("Category")}
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value as Category | "all")}
                  className="mt-1 block h-11 w-full rounded-md border border-input bg-background px-3 font-normal"
                >
                  <option value="all">{t("All categories")}</option>
                  {CATEGORIES.map((item) => (
                    <option key={item.value} value={item.value}>
                      {t(item.label)}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field-label">
                {t("General area")}
                <select
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  className="mt-1 block h-11 w-full rounded-md border border-input bg-background px-3 font-normal"
                >
                  <option value="all">{t("Everywhere")}</option>
                  {LOCATIONS.map((item) => (
                    <option key={item} value={item}>
                      {t(item)}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field-label">
                {t("Reported within")}
                <select
                  value={within}
                  onChange={(event) => setWithin(Number(event.target.value))}
                  className="mt-1 block h-11 w-full rounded-md border border-input bg-background px-3 font-normal"
                >
                  <option value={0}>{t("Any time")}</option>
                  <option value={2}>{t("2 days")}</option>
                  <option value={7}>{t("7 days")}</option>
                  <option value={30}>{t("30 days")}</option>
                </select>
              </label>
            </div>
          )}
        </section>
        <div className="mb-4 flex items-center justify-between gap-3">
          <p aria-live="polite" className="font-semibold">
            {results.length} {t(results.length === 1 ? "report" : "reports")}
          </p>
          {(query || kind !== "all" || category !== "all" || location !== "all" || within > 0) && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setQuery("");
                setKind("all");
                setCategory("all");
                setLocation("all");
                setWithin(0);
              }}
            >
              {t("Clear filters")}
            </Button>
          )}
        </div>
        {results.length ? (
          <ItemGrid listings={results} />
        ) : (
          <EmptyState
            icon={Search}
            title={t("No reports match those filters")}
            action={
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setQuery("");
                  setKind("all");
                  setCategory("all");
                  setLocation("all");
                  setWithin(0);
                }}
              >
                {t("Clear filters")}
              </Button>
            }
          >
            {t("Try a broader search or check another area.")}
          </EmptyState>
        )}
      </div>
    </>
  );
}

export function ItemDetailPage({ id }: { id: string }) {
  const state = useAppState();
  const { language, t } = useI18n();
  const { listings } = state;
  const navigate = useNavigate();
  const listing = listings.find((item) => item.id === id);
  if (!listing || listing.status === "flagged") {
    return (
      <div className="container-app py-12">
        <EmptyState
          icon={Search}
          title={t("This report isn't available")}
          action={
            <Link to="/browse" className={buttonVariants({ variant: "outline" })}>
              {t("Browse reports")}
            </Link>
          }
        />
      </div>
    );
  }
  const isOwner = listing.ownerId === currentUserId(state);
  const relatedMatches = matchesFor(listing, listings);
  const otherSide = relatedMatches[0]
    ? relatedMatches[0].lost.id === listing.id
      ? relatedMatches[0].found
      : relatedMatches[0].lost
    : null;

  function contactReporter() {
    actions.startConversation(listing);
    navigate({ to: "/messages" });
  }

  return (
    <>
      <PageHeader
        title={localizeListing(listing, language).title}
        intro={`${t(categoryLabel(listing.category))} · ${t("reported by")} ${listing.reporterName}`}
      >
        <Link to="/browse" className={buttonVariants({ variant: "outline" })}>
          <ArrowLeft /> {t("Back to reports")}
        </Link>
      </PageHeader>
      <div className="container-app grid gap-8 py-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <article className="min-w-0">
          <div className="relative overflow-hidden rounded-lg border bg-card">
            <ItemImage listing={listing} className="max-h-136 object-contain" eager />
            <KindBadge kind={listing.kind} className="absolute left-4 top-4" />
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4" />
              {t(localizeListing(listing, language).location)}
            </span>
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="size-4" />
              {t(listing.kind === "lost" ? "Lost" : "Found")}{" "}
              {listing.dateApproximate ? `${t("around")} ` : ""}
              {formatDate(listing.date, language)}
            </span>
          </div>
          <h2 className="mt-7 text-2xl font-extrabold">{t("What happened")}</h2>
          <p className="mt-3 whitespace-pre-wrap text-lg">
            {localizeListing(listing, language).description}
          </p>
          {listing.kind === "found" && listing.heldAt && (
            <div className="mt-6 border-l-4 border-found bg-found-soft p-4">
              <h3 className="font-bold">{t("Where it's being kept")}</h3>
              <p className="mt-1">
                {t(localizeListing(listing, language).heldAt ?? listing.heldAt)}
              </p>
            </div>
          )}
          <DemoNote className="mt-7">
            <ShieldCheck className="mt-0.5 size-4 shrink-0" />{" "}
            {t(
              "Never share passwords, full ID numbers, or exact home addresses. Ask the reporter to verify an identifying detail privately.",
            )}
          </DemoNote>
        </article>
        <aside className="space-y-4">
          <section className="surface p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">{t("Report status")}</p>
                <div className="mt-2">
                  <StatusBadge status={listing.status} />
                </div>
              </div>
              <SaveButton id={listing.id} withLabel />
            </div>
            <p className="mt-4 border-t pt-4 text-sm text-muted-foreground">
              {t("Posted")} {timeAgo(listing.reportedAt, Date.now(), language)} ·{" "}
              {listing.reporterName}
            </p>
            {isOwner ? (
              <p className="mt-4 text-sm font-semibold text-primary">
                {t("This is one of your reports.")}
              </p>
            ) : (
              <Button type="button" className="mt-4 w-full" onClick={contactReporter}>
                <MessageCircle /> {t("Message reporter")}
              </Button>
            )}
          </section>
          {otherSide && (
            <section className="surface p-5">
              <div className="flex items-center gap-2 font-bold">
                <Sparkles className="size-5 text-warning" /> {t("Possible match")}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {relatedMatches[0].score}% {t(matchStrength(relatedMatches[0].score))} {t("match")}
              </p>
              <Link
                to="/items/$id"
                params={{ id: otherSide.id }}
                className="mt-3 flex items-center gap-3 rounded-md border p-3 hover:bg-muted"
              >
                <div className="size-16 shrink-0 overflow-hidden rounded">
                  <ItemImage listing={otherSide} className="h-full" />
                </div>
                <span className="min-w-0">
                  <span className="block truncate font-bold">
                    {localizeListing(otherSide, language).title}
                  </span>
                  <span className="block text-sm text-muted-foreground">
                    {t(localizeListing(otherSide, language).location)}
                  </span>
                </span>
                <ArrowRight className="size-4 shrink-0" />
              </Link>
            </section>
          )}
          <Link
            to="/safety"
            className="inline-flex items-center gap-2 px-1 text-sm font-semibold text-primary underline"
          >
            <ShieldCheck className="size-4" /> {t("Safety guidelines")}
          </Link>
        </aside>
      </div>
    </>
  );
}

export function MatchesPage() {
  const { listings } = useAppState();
  const { language, t } = useI18n();
  const matches = findMatches(listings);
  return (
    <>
      <PageHeader
        eyebrow={t("Community connections")}
        title={t("Possible matches")}
        intro={t(
          "Reports are compared by item type, area, timing, colour, and description. A match is a lead, not a guarantee.",
        )}
      />
      <div className="container-app py-8">
        <DemoNote className="mb-6">
          {t(
            "Matching happens in this browser using a transparent demo score. Verify ownership privately before arranging a return.",
          )}
        </DemoNote>
        {matches.length ? (
          <div className="space-y-5">
            {matches.map((match) => (
              <article key={`${match.lost.id}-${match.found.id}`} className="surface p-4 sm:p-5">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-5 text-warning" />
                    <h2 className="font-display text-xl font-bold">
                      {match.score}% {t(matchStrength(match.score))} {t("match")}
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {match.reasons.map((reason) => (
                      <span
                        key={reason}
                        className="rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground"
                      >
                        {t(reason)}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {[match.lost, match.found].map((item) => {
                    const displayItem = localizeListing(item, language);
                    return (
                      <div key={item.id} className="flex min-w-0 gap-3 border-t pt-4">
                        <div className="size-24 shrink-0 overflow-hidden rounded-md">
                          <ItemImage listing={displayItem} className="h-full" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <KindBadge kind={item.kind} />
                          <Link
                            to="/items/$id"
                            params={{ id: item.id }}
                            className="mt-1 block truncate font-bold text-primary underline-offset-4 hover:underline"
                          >
                            {displayItem.title}
                          </Link>
                          <p className="mt-1 truncate text-sm text-muted-foreground">
                            {t(displayItem.location)} · {formatDate(item.date, language)}
                          </p>
                        </div>
                        <SaveButton id={item.id} className="self-start" />
                      </div>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState icon={Sparkles} title={t("No likely matches yet")}>
            {t("When reports share an item type, your strongest leads will show up here.")}
          </EmptyState>
        )}
      </div>
    </>
  );
}

export function SavedPage() {
  const { listings, saved } = useAppState();
  const { t } = useI18n();
  const savedListings = saved
    .map((id) => listings.find((listing) => listing.id === id))
    .filter((item): item is Listing => Boolean(item && item.status === "open"));
  return (
    <>
      <PageHeader
        title={t("Saved reports")}
        intro={t("Keep useful leads together while you search.")}
      />
      <div className="container-app py-8">
        {savedListings.length ? (
          <ItemGrid listings={savedListings} />
        ) : (
          <EmptyState
            icon={Search}
            title={t("No saved reports yet")}
            action={
              <Link to="/browse" className={buttonVariants()}>
                {t("Browse reports")}
              </Link>
            }
          >
            {t("Save a report from its card to find it here later.")}
          </EmptyState>
        )}
      </div>
    </>
  );
}

export function MyReportsPage() {
  const state = useAppState();
  const { t } = useI18n();
  const mine = state.listings.filter((listing) => listing.ownerId === currentUserId(state));
  return (
    <>
      <PageHeader
        title={t("My reports")}
        intro={t(
          "Review the reports you've posted and update their status when an item is returned.",
        )}
      >
        <Link to="/report" className={buttonVariants()}>
          <ArrowRight /> {t("New report")}
        </Link>
      </PageHeader>
      <div className="container-app py-8">
        {mine.length ? (
          <div className="space-y-4">
            {mine.map((listing) => (
              <ReportRow key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Search}
            title={t("You haven't posted any reports")}
            action={
              <Link to="/report" className={buttonVariants()}>
                {t("Report an item")}
              </Link>
            }
          >
            {t("Your new reports will appear here.")}
          </EmptyState>
        )}
      </div>
    </>
  );
}

function ReportRow({ listing }: { listing: Listing }) {
  const { language, t } = useI18n();
  const displayListing = localizeListing(listing, language);
  return (
    <article className="surface flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
      <div className="size-24 shrink-0 overflow-hidden rounded-md">
        <ItemImage listing={displayListing} className="h-full" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <KindBadge kind={listing.kind} />
          <StatusBadge status={listing.status} />
        </div>
        <Link
          to="/items/$id"
          params={{ id: listing.id }}
          className="mt-2 block truncate text-lg font-bold text-primary hover:underline"
        >
          {displayListing.title}
        </Link>
        <p className="text-sm text-muted-foreground">
          {t(displayListing.location)} · {t("posted")}{" "}
          {timeAgo(listing.reportedAt, Date.now(), language)}
        </p>
      </div>
      <label className="field-label sm:w-48">
        {t("Update status")}
        <select
          value={listing.status}
          onChange={(event) => {
            actions.updateListing(listing.id, { status: event.target.value as ItemStatus });
            toast.success(t("Report status updated"));
          }}
          className="mt-1 block h-11 w-full rounded-md border border-input bg-background px-3 font-normal"
        >
          <option value="open">{t("Open")}</option>
          <option value="returned">{t("Returned")}</option>
          <option value="closed">{t("Closed")}</option>
        </select>
      </label>
    </article>
  );
}

export function AdminPage() {
  const { listings } = useAppState();
  const { language, t } = useI18n();
  const flagged = listings.filter((listing) => listing.status === "flagged");
  return (
    <>
      <PageHeader
        eyebrow={t("Local prototype tools")}
        title={t("Moderation demo")}
        intro={t(
          "Review flagged sample reports in this browser. This screen does not provide real authentication or server-side moderation.",
        )}
      />
      <div className="container-app py-8">
        <DemoNote className="mb-6">
          {t(
            "Anyone using this local prototype can open this page. Do not use it to moderate real reports.",
          )}
        </DemoNote>
        {flagged.length ? (
          <div className="space-y-4">
            {flagged.map((listing) => {
              const displayListing = localizeListing(listing, language);
              return (
                <article
                  key={listing.id}
                  className="surface flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
                >
                  <div className="min-w-0 flex-1">
                    <KindBadge kind={listing.kind} />
                    <h2 className="mt-2 font-bold">{displayListing.title}</h2>
                    <p className="text-sm text-muted-foreground">
                      {listing.reporterName} · {t(displayListing.location)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to="/items/$id"
                      params={{ id: listing.id }}
                      className={buttonVariants({ variant: "outline" })}
                    >
                      {t("Review")}
                    </Link>
                    <Button
                      type="button"
                      onClick={() => {
                        actions.updateListing(listing.id, { status: "open" });
                        toast.success(t("Report restored to open"));
                      }}
                    >
                      {t("Restore report")}
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <EmptyState icon={ShieldCheck} title={t("No flagged reports")}>
            {t("Newly flagged demo reports will be listed here.")}
          </EmptyState>
        )}
      </div>
    </>
  );
}
