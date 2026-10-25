import { createFileRoute } from "@tanstack/react-router";
import { MyReportsPage } from "@/components/site/MarketplacePages";

export const Route = createFileRoute("/my-reports")({
  head: () => ({
    meta: [
      { title: "FindBack — my-reports" },
      { name: "description", content: "FindBack lost & found, St. John's." },
    ],
  }),
  component: MyReportsPage,
});
