import SignInForm from "@/components/auth/SignInForm";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sign-in")({
  component: SignInPage,
});

function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md px-4">
        <h1 className="text-2xl font-bold mb-4">Вход в систему</h1>
        <SignInForm />
      </div>
    </div>
  );
}
