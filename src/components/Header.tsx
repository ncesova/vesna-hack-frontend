import { Link } from "@tanstack/react-router";
import { useState } from "react";

import { useUpdateUserAuth } from "@/api/UserAuth/UserAuthApi";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BarChart, BookOpen, FileText, Home, LogOut, Menu, User, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };
  const userName = "John Doe";
  const email = "john.doe@example.com";

  const { logoutUserMutation } = useUpdateUserAuth();

  const handleLogout = () => {
    logoutUserMutation.mutate();
  };

  return (
    <header className="border-border bg-secondary">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link to="/" className="font-bold text-xl text-primary">
            <span className="whitespace-nowrap">Система проверки ТЗ</span>
          </Link>

          <nav className="flex flex-wrap items-center gap-2 md:gap-4 [@media(max-width:430px)]:hidden md:flex ">
            <Link to="/my-documents">
              <Button
                variant="ghost"
                size="sm"
                className="cursor-pointer flex items-center justify-center text-primary hover:bg-secondary/80 p-0"
              >
                <FileText className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Мои документы</span>
              </Button>
            </Link>
            <Link to="/analyze">
              <Button
                variant="ghost"
                size="sm"
                className="cursor-pointer flex items-center justify-center text-primary hover:bg-secondary/80 p-0"
              >
                <BarChart className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Анализ</span>
              </Button>
            </Link>
            <Link to="/knowledge-base">
              <Button
                variant="ghost"
                size="sm"
                className="cursor-pointer flex items-center justify-center text-primary hover:bg-secondary/80 p-0"
              >
                <BookOpen className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">База знаний</span>
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-primary text-primary hover:bg-secondary-foreground/10"
                >
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-background border-border">
                <DropdownMenuLabel className="font-medium py-2 text-primary">
                  {userName}
                </DropdownMenuLabel>
                <div className="px-2 pb-2 text-xs text-muted-foreground truncate">{email}</div>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={handleLogout}
                  disabled={logoutUserMutation.isPending}
                  className="mt-1 py-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {logoutUserMutation.isPending ? "Выход..." : "Выйти"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <div className="[@media(max-width:430px)]:block hidden">
            <Button
              variant="outline"
              size="icon"
              className="cursor-pointer border-primary text-primary hover:bg-secondary/80 transition-transform duration-300 hover:scale-110"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="relative w-4 h-4">
                <Menu
                  className={`absolute inset-0 w-4 h-4 transition-all duration-300 ${isMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"}`}
                />
                <X
                  className={`absolute inset-0 w-4 h-4 transition-all duration-300 ${isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
                />
              </div>
            </Button>
          </div>

          <div
            className={`absolute top-16 right-4 w-48 bg-background text-foreground rounded-lg shadow-lg border border-border z-50 [@media(max-width:430px)]:block hidden transition-all duration-300 transform ${
              isMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            <div className="flex flex-col p-2 gap-1">
              <Link to="/" onClick={handleLinkClick}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-primary hover:bg-secondary-foreground/10 transition-colors duration-200"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Главная
                </Button>
              </Link>
              <Link to="/my-documents" onClick={handleLinkClick}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-primary hover:bg-secondary-foreground/10 transition-colors duration-200"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Мои документы
                </Button>
              </Link>
              <Link to="/analyze" onClick={handleLinkClick}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-primary hover:bg-secondary-foreground/10 transition-colors duration-200"
                >
                  <BarChart className="h-4 w-4 mr-2" />
                  Анализ
                </Button>
              </Link>
              <Link to="/knowledge-base" onClick={handleLinkClick}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-primary hover:bg-secondary-foreground/10 transition-colors duration-200"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  База знаний
                </Button>
              </Link>

              <div className="flex flex-col">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-primary hover:bg-secondary-foreground/10 transition-colors duration-200 mt-1"
                >
                  <User className="h-4 w-4 mr-2" />
                  {userName || "Профиль"}
                </Button>
                {email && (
                  <div className="px-4 py-2 text-xs text-muted-foreground truncate">{email}</div>
                )}
                <div className="h-px my-1 bg-border"></div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-destructive hover:bg-destructive/10 transition-colors duration-200 py-2 mt-1"
                  onClick={handleLogout}
                  disabled={logoutUserMutation.isPending}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {logoutUserMutation.isPending ? "Выход..." : "Выйти"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
