import { Link } from "@tanstack/react-router";
import { HomeIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function NotFound() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-6 text-center">
      <div className="rounded-full bg-muted p-6">
        <HomeIcon className="h-16 w-16 text-muted-foreground" strokeWidth={1.5} />
      </div>
      <div className="space-y-2">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-xl text-muted-foreground">Страница не найдена</p>
      </div>
      <Button asChild className="mt-4">
        <Link to="/">На главную</Link>
      </Button>
    </div>
  );
}
