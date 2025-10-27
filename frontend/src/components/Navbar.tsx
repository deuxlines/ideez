import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function Navbar() {
  const { user } = useAuthStore();
  const loggedIn = !!user;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        { href: "/sign-in", label: "Sign in" },
      ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-[1280px] mx-auto p-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-semibold">
          <img src="/vite.svg" alt="Logo" className="w-8 h-8" />
          <span>Idea Generator</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              to={href}
              className="transition hover:text-purple-600"
            >
              {label}
            </Link>
          ))}
          {loggedIn && (
            <Link to="/profile">
              <img
                src={user?.picture || "/avatar.jpg"}
                alt={user?.name || "My Account"}
                className="w-10 h-10 rounded-full border border-gray-300 object-cover"
              />
            </Link>
          )}
        </div>

        <button
          className="md:hidden p-2 rounded-md focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Slide-in menu */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 max-w-xs bg-gradient-to-b from-[#7e5bfc] to-[#9745c3] shadow-lg transform transition-transform duration-300 z-40 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center flex-col gap-6 p-6 mt-16 overflow-y-auto h-full text-white">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              to={href}
              className="text-lg font-medium hover:text-purple-200 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          {loggedIn && (
            <Link
              to="/profile"
              className="flex items-center gap-2 mt-4 hover:opacity-90 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              <img
                src={user?.picture || "/avatar.jpg"}
                alt={user?.name || "My Account"}
                className="w-10 h-10 rounded-full border border-white object-cover"
              />
              <span className="font-semibold">{user?.name}</span>
            </Link>
          )}
        </div>
      </div>


      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
}
