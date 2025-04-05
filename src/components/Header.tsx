import { Link } from "@tanstack/react-router";

export default function Header() {
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
    <header className="p-2 flex gap-2 bg-white text-black justify-between">
      <nav className="flex flex-row">
        <ul className="flex flex-row gap-2">
          {links.map(link => (
            <li key={link.to} className="px-2 font-bold">
              <Link to={link.to}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
