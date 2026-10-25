import { createFileRoute } from "@tanstack/react-router";
import { MatchesPage } from "@/components/site/MarketplacePages";

export const Route = createFileRoute("/matches")({
  head: () => ({
    meta: [
      { title: "FindBack — matches" },
      { name: "description", content: "FindBack lost & found, St. John's." },
    ],
  }),
  component: MatchesPage,
});
