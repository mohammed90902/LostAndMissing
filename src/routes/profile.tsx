import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@/components/site/AccountPages";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "FindBack — profile" },
      { name: "description", content: "FindBack lost & found, St. John's." },
    ],
  }),
  component: ProfilePage,
});
