import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/my-documents")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/my-documents"!</div>;
}
