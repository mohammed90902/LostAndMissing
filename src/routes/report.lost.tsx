import { createFileRoute } from "@tanstack/react-router";
import { ReportWizard } from "@/components/site/ReportWizard";

export const Route = createFileRoute("/report/lost")({
  head: () => ({
    meta: [
      { title: "FindBack — report/lost" },
      { name: "description", content: "FindBack lost & found, St. John's." },
    ],
  }),
  component: () => <ReportWizard kind="lost" />,
});
