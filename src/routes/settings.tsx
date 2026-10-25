import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/site/ComingSoon";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "FindBack — settings" }, { name: "description", content: "FindBack lost & found, St. John's." }] }),
  component: () => <ComingSoon />,
});
