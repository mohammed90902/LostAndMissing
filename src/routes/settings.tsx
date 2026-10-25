import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "@/components/site/AccountPages";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "FindBack — settings" },
      { name: "description", content: "FindBack lost & found, St. John's." },
    ],
  }),
  component: SettingsPage,
});
