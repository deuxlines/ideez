import { Link } from 'react-router-dom';
import { useEffect } from 'react';


export default function Navbar({ loggedIn }: {loggedIn: boolean}) {
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
        // { href: "/login", label: "Sign in" },
      ];

  const storedUser = localStorage.getItem("user");
  const userData = storedUser ? JSON.parse(storedUser) : null;

  const userName = userData?.name
  const userPhoto = userData?.picture
  
  useEffect(() => {
    if (userPhoto) {
      const img = new Image();
      img.src = userPhoto;
    }
  }, [userPhoto]);

  return (
    <nav className="shadow-2xl px-4 py-4 flex justify-between items-center fixed top-0 left-0 w-full z-50 max-h-16">
      <div className="text-2xl font-semibold flex items-center gap-2">
        <Link to={"/"} className="transition px-4 py-2 flex items-center gap-2 logo-name">
          <img src="/vite.svg" alt="Logo" className="logo" />
          <span>Idea Generator</span>
        </Link>
      </div>
      <div className="flex space-x-6">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            to={href}
            className="link transition px-4 py-2 block"
          >
            {label}
          </Link>
          
        ))}
        {loggedIn &&  (
          <Link to="/account">
            <img
              src={userPhoto}
              alt={userName || "My Account"}
              className="w-10 h-10 rounded-full border-1 border-gray-300 link block object-cover"
            />
          </Link>
        )}
      </div>
    </nav>
  );
}