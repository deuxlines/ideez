import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import './App.css'
import { useState, useEffect } from "react";
import { apiService } from "../lib/api";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login"
import Logout from "./pages/Logout";
import AccountPage from "./pages/AccountPage";


function App() {
  const [loggedIn, setLoggedIn] = useState(() => apiService.isAuthenticated());
  const location = useLocation();

  useEffect(() => {
    setLoggedIn(apiService.isAuthenticated());
  }, [location]);
  
  return (
    <>
      <Navbar loggedIn={loggedIn} />
      <Routes>
        <Route path="/" element={loggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path="/about" element={loggedIn ? <About /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/logout" element={<Logout />}/>
        <Route path="/account" element={loggedIn ? <AccountPage /> : <Navigate to="/login"/>} />
      </Routes>
    </>
  )
}

export default App