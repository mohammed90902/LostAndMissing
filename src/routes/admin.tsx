import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/components/site/MarketplacePages";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "FindBack — admin" },
      { name: "description", content: "FindBack lost & found, St. John's." },
    ],
  }),
  component: AdminPage,
});
