import { createFileRoute } from "@tanstack/react-router";
import { MessagesPage } from "@/components/site/AccountPages";

export const Route = createFileRoute("/messages")({
  head: () => ({
    meta: [
      { title: "FindBack — messages" },
      { name: "description", content: "FindBack lost & found, St. John's." },
    ],
  }),
  component: MessagesPage,
});
