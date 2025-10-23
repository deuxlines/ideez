import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

export default function Logout() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
      logout();
      navigate("/login");
  }, [logout, navigate]);

  return null;
}