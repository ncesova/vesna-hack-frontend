import AuthForm from "@/components/auth/AuthTabs";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/auth")({
  component: Auth,
});

function Auth() {
  return <AuthForm />;
}
