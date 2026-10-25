import { createFileRoute } from "@tanstack/react-router";
import { ReportWizard } from "@/components/site/ReportWizard";

export const Route = createFileRoute("/report/found")({
  head: () => ({
    meta: [
      { title: "FindBack — report/found" },
      { name: "description", content: "FindBack lost & found, St. John's." },
    ],
  }),
  component: () => <ReportWizard kind="found" />,
});
