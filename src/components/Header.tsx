import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { FileText, Home, Settings, User } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b bg-secondary">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl text-primary">
          <span>Система проверки ТЗ</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link to="/">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center text-primary hover:bg-secondary/80"
            >
              <Home className="mr-2 h-4 w-4" />
              <span>Главная</span>
            </Button>
          </Link>
          <Link to="/my-documents">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center text-primary hover:bg-secondary/80"
            >
              <FileText className="mr-2 h-4 w-4" />
              <span>Мои документы</span>
            </Button>
          </Link>
          <Link to="/knowledge-base">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center text-primary hover:bg-secondary/80"
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>База знаний</span>
            </Button>
          </Link>
          <Button
            variant="outline"
            size="icon"
            className="border-primary text-primary hover:bg-secondary/80"
          >
            <User className="h-4 w-4" />
          </Button>
        </nav>
      </div>
    </header>
  );
}
