import { createFileRoute } from "@tanstack/react-router";
import { Outlet, useRouterState } from "@tanstack/react-router";
import { ReportLandingPage } from "@/components/site/ReportWizard";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "FindBack — report" },
      { name: "description", content: "FindBack lost & found, St. John's." },
    ],
  }),
  component: ReportRoutePage,
});

function ReportRoutePage() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return pathname === "/report" ? <ReportLandingPage /> : <Outlet />;
}
