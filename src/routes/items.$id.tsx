import { createFileRoute } from "@tanstack/react-router";
import { ItemDetailPage } from "@/components/site/MarketplacePages";

export const Route = createFileRoute("/items/$id")({
  head: () => ({
    meta: [
      { title: "FindBack — items/$id" },
      { name: "description", content: "FindBack lost & found, St. John's." },
    ],
  }),
  component: ItemDetailRoute,
});

function ItemDetailRoute() {
  const { id } = Route.useParams();
  return <ItemDetailPage id={id} />;
}
