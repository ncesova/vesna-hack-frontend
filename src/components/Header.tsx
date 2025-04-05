import { Link } from "@tanstack/react-router";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Home, Menu, User, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="border-b bg-secondary">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link to="/" className="font-bold text-xl text-primary">
            <span className="whitespace-nowrap">Система проверки ТЗ</span>
          </Link>

          <nav className="flex flex-wrap items-center gap-2 md:gap-4 [@media(max-width:430px)]:hidden md:flex">
            <Link to="/">
              <Button
                variant="ghost"
                size="sm"
                className="cursor-pointer flex items-center justify-center text-primary hover:bg-secondary/80"
              >
                <Home className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Главная</span>
              </Button>
            </Link>
            <Link to="/my-documents">
              <Button
                variant="ghost"
                size="sm"
                className="cursor-pointer flex items-center justify-center text-primary hover:bg-secondary/80"
              >
                <FileText className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Мои документы</span>
              </Button>
            </Link>
            <Link to="/knowledge-base">
              <Button
                variant="ghost"
                size="sm"
                className="cursor-pointer flex items-center justify-center text-primary hover:bg-secondary/80"
              >
                <BookOpen className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">База знаний</span>
              </Button>
            </Link>
            <Button
              variant="outline"
              size="icon"
              className="cursor-pointer border-primary text-primary hover:bg-secondary/80"
            >
              <User className="h-4 w-4" />
            </Button>
          </nav>

          {/* Мобильное меню */}
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

          {/* Мобильное меню (выпадающий список) */}
          <div
            className={`absolute top-16 right-4 w-48 bg-white rounded-lg shadow-lg border border-primary z-50 [@media(max-width:430px)]:block hidden transition-all duration-300 transform ${
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
                  className="w-full justify-start text-primary hover:bg-secondary/80 transition-colors duration-200"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Главная
                </Button>
              </Link>
              <Link to="/my-documents" onClick={handleLinkClick}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-primary hover:bg-secondary/80 transition-colors duration-200"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Мои документы
                </Button>
              </Link>
              <Link to="/knowledge-base" onClick={handleLinkClick}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-primary hover:bg-secondary/80 transition-colors duration-200"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  База знаний
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="cursor-pointer w-full justify-start text-primary hover:bg-secondary/80 transition-colors duration-200"
                onClick={handleLinkClick}
              >
                <User className="h-4 w-4 mr-2" />
                Профиль
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
