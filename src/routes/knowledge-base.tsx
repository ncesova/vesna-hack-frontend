import KnowlageBase from "@/components/knowlageBase/KnowlageBase";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/knowledge-base")({
  component: RouteComponent,
});

function RouteComponent() {
  return <KnowlageBase />;
}
