import AnalyzePage from "@/components/analyze/analyze-id-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_mainLayout/analyze/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  return <AnalyzePage id={id} />;
}
