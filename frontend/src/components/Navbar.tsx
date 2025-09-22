import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import { apiService } from '../../lib/api';

// interface LinkItem {
//   href: string;
//   label: string;
// }

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(apiService.isAuthenticated()); // only runs client-side
  }, []);

  const links = loggedIn
    ? [
        { href: "/", label: "Home" },
        { href: "/chat", label: "Chat" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
        { href: "/logout", label: "Logout" },
      ]
    : [
        { href: "/", label: "Home" },
        { href: "/chat", label: "Chat" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
        { href: "/login", label: "Sign in" },
      ];

  return (
    <nav className="shadow-2xl px-4 py-4 flex justify-between items-center fixed top-0 left-0 w-full z-50 max-h-16">
      <div className="text-2xl font-semibold flex items-center gap-2">
        <a
          href="/"
          className="transition px-4 py-2 flex items-center gap-2 logo-name"
        >
          <img src="/vite.svg" alt="Logo" className="logo" />
          <span>Idea Generator</span>
        </a>
      </div>
      <div className="flex space-x-6">
        {links.map(({ href, label }) => (
          <Link
            to={href}
            className="link transition px-4 py-2 block"
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}