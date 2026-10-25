import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Plus, Search, ShieldCheck, Sparkles } from "lucide-react";
import { ItemGrid } from "@/components/items/ItemBits";
import { buttonVariants } from "@/components/ui/button";
import { PageHeader, Section } from "@/components/site/Common";
import { CITY } from "@/lib/catalog";
import { useAppState } from "@/lib/store";
import { useI18n } from "@/lib/i18n";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { t } = useI18n();
  const { listings } = useAppState();
  const openListings = listings.filter((listing) => listing.status === "open");
  const recentListings = openListings.slice(0, 4);
  const lostCount = openListings.filter((listing) => listing.kind === "lost").length;
  const foundCount = openListings.filter((listing) => listing.kind === "found").length;

  return (
    <>
      <section className="overflow-hidden bg-ink text-ink-foreground">
        <div className="container-app grid gap-10 py-12 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-20">
          <div className="max-w-2xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-ink-foreground/20 px-3 py-1 text-sm font-bold text-ink-foreground/80">
              <MapPin className="size-4" aria-hidden="true" /> {t(CITY)}
            </p>
            <h1 className="max-w-xl text-4xl font-extrabold leading-tight sm:text-5xl">
              {t("Lost something?")}{" "}
              <span className="text-warning">{t("Let's bring it back.")}</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink-foreground/75">
              {t(
                "A community lost-and-found for the things that matter. Search recent reports or post what you lost or found.",
              )}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/browse"
                className={buttonVariants({
                  size: "lg",
                  className: "bg-warning text-warning-foreground hover:bg-warning/90",
                })}
              >
                <Search /> {t("Browse items")}
              </Link>
              <Link
                to="/report"
                className={buttonVariants({
                  size: "lg",
                  variant: "outline",
                  className:
                    "border-ink-foreground/35 bg-transparent text-ink-foreground hover:bg-ink-foreground/10",
                })}
              >
                <Plus /> {t("Report an item")}
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-foreground/70">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="size-4 text-success" /> {t("Private contact")}
              </span>
              <span className="inline-flex items-center gap-2">
                <Sparkles className="size-4 text-warning" /> {t("Possible matches")}
              </span>
            </div>
          </div>
          <div
            className="relative grid grid-cols-2 gap-3 md:gap-4"
            aria-label={t("Community listing activity")}
          >
            <div className="col-span-2 flex items-center justify-between border-b border-ink-foreground/20 pb-3">
              <p className="font-display text-lg font-bold">{t("A little closer to home")}</p>
              <span className="text-sm text-ink-foreground/65">{t("Community board")}</span>
            </div>
            <div className="bg-ink-foreground/10 p-5">
              <p className="text-sm text-ink-foreground/65">{t("Still looking")}</p>
              <p className="mt-2 font-display text-4xl font-extrabold">{lostCount}</p>
              <p className="mt-1 text-sm text-ink-foreground/65">{t("open lost reports")}</p>
            </div>
            <div className="bg-ink-foreground/10 p-5">
              <p className="text-sm text-ink-foreground/65">{t("Found nearby")}</p>
              <p className="mt-2 font-display text-4xl font-extrabold">{foundCount}</p>
              <p className="mt-1 text-sm text-ink-foreground/65">{t("open found reports")}</p>
            </div>
            <Link
              to="/matches"
              className="col-span-2 flex items-center justify-between gap-4 border border-warning/50 bg-warning/10 p-4 transition-colors hover:bg-warning/15"
            >
              <span>
                <span className="block font-bold">{t("See possible matches")}</span>
                <span className="text-sm text-ink-foreground/65">
                  {t("Compare details and locations")}
                </span>
              </span>
              <ArrowRight className="size-5 shrink-0 text-warning" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <section className="border-b bg-card">
        <div className="container-app flex flex-col gap-4 py-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-bold uppercase text-primary">
              {t("FindBack community board")}
            </p>
            <h2 className="text-3xl font-extrabold">{t("Recently reported")}</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              {t(
                "A few recent reports from around St. John's. Keep identifying details private when you reach out.",
              )}
            </p>
          </div>
          <Link to="/browse" className={buttonVariants({ variant: "outline" })}>
            {t("View all items")} <ArrowRight />
          </Link>
        </div>
      </section>
      <Section title={t("Latest reports")} className="pt-8">
        <ItemGrid listings={recentListings} />
      </Section>
    </>
  );
}
