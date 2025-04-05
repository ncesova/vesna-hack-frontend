import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/analyze/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  return <div>Hello "/analyze/{id}"!</div>;
}
