import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import { useEffect } from "react";

import { useAuthStore } from "./store/useAuthStore";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import ProfilePage from "./pages/ProfilePage";
import AddVideo from "./pages/AddVideo";

function App() {
  const { user, setUser, me } = useAuthStore();

  useEffect(() => {
    async function loadUser() {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        try {
          await me();
        } catch {
          setUser(null);
        }
      }
    }
    loadUser();
  }, [setUser]);

  const loggedIn = !!user;

  return (
    <>
      <Navbar />
      <div className="pt-75 md:pt-20">
        <Routes>
          <Route path="/" element={loggedIn ? <Home /> : <Navigate to="/sign-in" />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={loggedIn ? <Navigate to="/" /> : <SignIn />} />
          <Route path="/login" element={loggedIn ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={loggedIn ? <Navigate to="/" /> : <Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={loggedIn ? <ProfilePage /> : <Navigate to="/sign-in" />} />
          <Route path="/videos/add" element={loggedIn ? <AddVideo /> : <Navigate to="/sign-in" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
