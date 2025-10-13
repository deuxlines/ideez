import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import './App.css'
import { useState, useEffect } from "react";

import type { User } from "../lib/api";
import { apiService } from "../lib/api";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import ProfilePage from "./pages/ProfilePage";
import AddVideo from "./pages/AddVideo";


function App() {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const location = useLocation();

  useEffect(() => {
    async function loadUser() {
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
          <Route path="/" element={loggedIn ? <Home /> : <Navigate to="/sign-in" />} />
          <Route path="/about" element={<About />}/>
          <Route path="/sign-in" element={loggedIn ? <Navigate to="/"/> : <SignIn />}/>
          <Route path="/logout" element={<Logout />}/>
          <Route path="/profile" element={loggedIn ? <ProfilePage /> : <Navigate to="/sign-in"/>} />
          <Route path="/videos/add" element={loggedIn ? <AddVideo /> : <Navigate to="/sign-in"/>} />
          <Route path="/login" element={loggedIn ? <Navigate to="/"/> : <Login />}></Route>
          <Route path="/register" element={loggedIn ? <Navigate to="/"/> : <Register />}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App