import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../Styles/Login.css"

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const refreshPage = ()=>{
    window.location.reload();
  } 
  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
        
      });

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem("token", data.token); 
        toast.success("Uspešna prijava", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          onClose: () => {
            login(); 
            navigate("/Movies");
            refreshPage();
          },
        });
      } else {
        const data = await response.json();
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
        });
      }
    } catch (error) {
      console.error("Greška prilikom prijave:", error);
      toast.error("Došlo je do greške prilikom prijave", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  }

  return (
    <div className="wrapperLogin">
      <h2 className="log">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          className="input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login" type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
