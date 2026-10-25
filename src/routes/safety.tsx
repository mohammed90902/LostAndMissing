import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/site/InfoPages";

export const Route = createFileRoute("/safety")({
  head: () => ({
    meta: [
      { title: "FindBack — safety" },
      { name: "description", content: "FindBack lost & found, St. John's." },
    ],
  }),
  component: () => <InfoPage page="safety" />,
});
