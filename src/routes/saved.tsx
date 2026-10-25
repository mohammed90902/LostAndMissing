import { createFileRoute } from "@tanstack/react-router";
import { SavedPage } from "@/components/site/MarketplacePages";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "FindBack — saved" },
      { name: "description", content: "FindBack lost & found, St. John's." },
    ],
  }),
  component: SavedPage,
});
