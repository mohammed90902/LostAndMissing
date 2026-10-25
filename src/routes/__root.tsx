import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { MobileNav } from "@/components/site/MobileNav";
import { Toaster } from "sonner";
import { useAppState } from "@/lib/store";
import { translate, useI18n } from "@/lib/i18n";

function NotFoundComponent() {
  const { t } = useI18n();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">{t("Page not found")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("The page you're looking for doesn't exist or has been moved.")}
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("Go home")}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  const { t } = useI18n();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {t("This page didn't load")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("Something went wrong on our end. You can try refreshing or head back home.")}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("Try again")}
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            {t("Go home")}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "FindBack | Lost & Found" },
      {
        name: "description",
        content: "A community lost-and-found for St. John's, Newfoundland and Labrador.",
      },
      { name: "author", content: "FindBack" },
      { property: "og:title", content: "FindBack | Lost & Found" },
      {
        property: "og:description",
        content: "A community lost-and-found for St. John's, Newfoundland and Labrador.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.svg?v=2", type: "image/svg+xml" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { preferences } = useAppState();
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    document.documentElement.classList.toggle("large-text", preferences.largeText);
    document.documentElement.classList.toggle("dark", preferences.theme === "dark");
    document.documentElement.lang = preferences.language;
    const pageTitle: Record<string, string> = {
      "/": "Lost & Found",
      "/about": "About FindBack",
      "/admin": "Moderation demo",
      "/browse": "Browse",
      "/contact": "Contact",
      "/faq": "Questions & answers",
      "/help": "FindBack help",
      "/how-it-works": "How FindBack works",
      "/matches": "Matches",
      "/messages": "Messages",
      "/my-reports": "My reports",
      "/privacy": "Privacy notes",
      "/profile": "Profile",
      "/report": "Report an item",
      "/report/found": "Report a found item",
      "/report/lost": "Report a lost item",
      "/safety": "Safety guidelines",
      "/saved": "Saved reports",
      "/settings": "Settings",
      "/signin": "Sign in to FindBack",
    };
    const title =
      pageTitle[pathname] ?? (pathname.startsWith("/items/") ? "Item details" : "FindBack");
    document.title =
      pathname === "/" && preferences.language === "en"
        ? "FindBack | Lost & Found"
        : `FindBack — ${translate(title, preferences.language)}`;
  }, [pathname, preferences.largeText, preferences.language, preferences.theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      <main id="main" className="min-h-[60vh]">
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      <SiteFooter />
      <MobileNav />
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  );
}
