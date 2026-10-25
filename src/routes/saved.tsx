import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/site/ComingSoon";

export const Route = createFileRoute("/saved")({
  head: () => ({ meta: [{ title: "FindBack — saved" }, { name: "description", content: "FindBack lost & found, St. John's." }] }),
  component: () => <ComingSoon />,
});
