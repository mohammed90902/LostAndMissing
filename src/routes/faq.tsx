import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/site/InfoPages";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FindBack — faq" },
      { name: "description", content: "FindBack lost & found, St. John's." },
    ],
  }),
  component: () => <InfoPage page="faq" />,
});
