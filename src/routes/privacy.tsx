import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/site/InfoPages";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "FindBack — privacy" },
      { name: "description", content: "FindBack lost & found, St. John's." },
    ],
  }),
  component: () => <InfoPage page="privacy" />,
});
