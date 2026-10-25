import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/site/InfoPages";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "FindBack — contact" },
      { name: "description", content: "FindBack lost & found, St. John's." },
    ],
  }),
  component: () => <InfoPage page="contact" />,
});
