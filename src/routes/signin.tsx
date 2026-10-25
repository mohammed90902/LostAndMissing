import { createFileRoute } from "@tanstack/react-router";
import { SignInPage } from "@/components/site/AccountPages";

export const Route = createFileRoute("/signin")({
  head: () => ({
    meta: [
      { title: "FindBack — signin" },
      { name: "description", content: "FindBack lost & found, St. John's." },
    ],
  }),
  component: SignInPage,
});
