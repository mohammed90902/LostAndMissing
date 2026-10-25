import { createFileRoute } from "@tanstack/react-router";
import { BrowsePage } from "@/components/site/MarketplacePages";

export const Route = createFileRoute("/browse")({
  head: () => ({
    meta: [
      { title: "FindBack — browse" },
      { name: "description", content: "FindBack lost & found, St. John's." },
    ],
  }),
  component: BrowsePage,
});
