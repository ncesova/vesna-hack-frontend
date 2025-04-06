import MyDocuments from "@/components/myDocuments/MyDocuments";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_mainLayout/my-documents")({
  component: RouteComponent,
});

function RouteComponent() {
  return <MyDocuments />;
}
