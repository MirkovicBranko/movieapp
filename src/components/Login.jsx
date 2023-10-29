import React, { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/toastify.css";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css"
// import "../Styles/NavBarStyle.css"
// import { Container } from "./NavBar";



function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const {toggle} = useContext(Container)


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
        toast.success("Uspešna prijava!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          onClose: () => {
            navigate("/Movies");
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
      toast.error("Došlo je do greške prilikom prijave.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };

  return (
    <div className="wrapperLogin">
        <h2 className="login">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          className="input"
          type="text"
          placeholder="Korisničko ime"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        
        <input
          className="input"
          type="password"
          placeholder="Lozinka"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <span>forgot your password?</span> <NavLink to={}></NavLink> ZAVRSI POSLE!!!*/} 
        <button type="submit" className="button">Prijavi se</button>
    
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
