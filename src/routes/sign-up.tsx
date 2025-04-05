import SignUpForm from "@/components/auth/SignUpForm";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sign-up")({
  component: SignUpPage,
});

function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md px-4">
        <h1 className="text-2xl font-bold mb-4">Регистрация</h1>
        <SignUpForm />
      </div>
    </div>
  );
}
