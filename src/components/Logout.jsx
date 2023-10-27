import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // brisanje tokena iz localStorage-a
    localStorage.removeItem("token");
    // Preusmeri korisnika na željenu rutu
    navigate("/login");
  }, []);

  return null;
}

export default Logout;
