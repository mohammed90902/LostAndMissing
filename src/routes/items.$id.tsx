import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/site/ComingSoon";

export const Route = createFileRoute("/items/$id")({
  head: () => ({ meta: [{ title: "FindBack — items/$id" }, { name: "description", content: "FindBack lost & found, St. John's." }] }),
  component: () => <ComingSoon />,
});
