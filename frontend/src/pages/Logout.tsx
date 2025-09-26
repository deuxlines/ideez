import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { apiService } from "../../lib/api";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    apiService.logout();
    navigate("/login");
  }, []);

  return null;
}