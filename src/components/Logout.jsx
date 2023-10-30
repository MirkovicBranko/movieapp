import React, { useEffect, useRef } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom"; 


function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  

  useEffect(() => {
    localStorage.removeItem("token");
    logout();
    navigate("/login");
  }, []);

  return null;
}

export default Logout;
