import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import './App.css'
import { useState, useEffect } from "react";
import type { User } from "../lib/api";
import { apiService } from "../lib/api";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login"
import Logout from "./pages/Logout";
import AccountPage from "./pages/AccountPage";


function App() {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const location = useLocation();

  useEffect(() => {
    async function loadUser() {
    if (!apiService.isAuthenticated()) {
      setUser(null);
      return;
    }
    try {
      const currentUser = await apiService.me();
      setUser(currentUser);
    } catch {
      setUser(null);
    }
  }

    loadUser();
  }, [location]);

  const loggedIn = !!user;
  
  return (
    <>
      <Navbar loggedIn={loggedIn} />
      <div className="pt-75 md:pt-20">
        <Routes>
          <Route path="/" element={loggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/about" element={<About />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/logout" element={<Logout />}/>
          <Route path="/profile" element={loggedIn ? <AccountPage /> : <Navigate to="/login"/>} />
        </Routes>
      </div>
    </>
  )
}

export default App