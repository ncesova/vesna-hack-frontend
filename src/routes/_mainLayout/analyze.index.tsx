import AnalyzePage from "@/components/analyze/analyze-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_mainLayout/analyze/")({
  component: AnalyzePage,
});
