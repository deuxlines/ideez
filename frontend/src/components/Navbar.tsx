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
        { href: "/login", label: "Sign in" },
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
    <nav className="shadow-2xl fixed top-0 left-0 w-full z-50 max-h-75 md:max-h-20  mx-auto flex items-center"> 
      <div className='max-w-[1280[px]] p-2 mx-auto flex justify-center gap-20 items-center'>
        <div className="text-2xl font-semibold ">
          <Link to={"/"} className="transition flex items-center logo-name">
            <img src="/vite.svg" alt="Logo" className="logo" />
            <span>Idea Generator</span>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-center">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              to={href}
              className="link transition block"
            >
              {label}
            </Link>
            
          ))}
          {loggedIn &&  (
            <Link to="/profile">
              <img
                src={userPhoto}
                alt={userName || "My Account"}
                className="w-10 h-10 rounded-full border-1 border-gray-300 link block object-cover"
              />
            </Link>
          )}
        </div>
      </div>
      
    </nav>
  );
}