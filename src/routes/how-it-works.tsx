import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/site/InfoPages";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "FindBack — how-it-works" },
      { name: "description", content: "FindBack lost & found, St. John's." },
    ],
  }),
  component: () => <InfoPage page="how" />,
});
