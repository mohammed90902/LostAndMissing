import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/site/ComingSoon";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "FindBack — privacy" }, { name: "description", content: "FindBack lost & found, St. John's." }] }),
  component: () => <ComingSoon />,
});
