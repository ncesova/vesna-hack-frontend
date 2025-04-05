import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";

export default function Header() {
  const navigate = useNavigate();

  const links = [
    {
      label: "Главная",
      to: "/",
    },
    {
      label: "Войти",
      to: "/auth",
    },
  ];

  return (
    <header className="border-b border-slate-200 bg-gradient-to-r from-blue-50 via-indigo-50 to-slate-50 backdrop-blur-sm fixed w-full top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent font-bold text-xl hover:opacity-80 transition-opacity"
            >
              ТехАнализ
            </Link>
          </div>

          <nav className="flex items-center space-x-4">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="text-slate-600 hover:text-blue-700 transition-colors px-3 py-2 rounded-md text-sm font-medium hover:bg-white/50"
                activeProps={{ className: "text-blue-700 bg-white/50" }}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/">
              <Button
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white ml-2 transition-all duration-300"
                size="sm"
              >
                Начать анализ
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
