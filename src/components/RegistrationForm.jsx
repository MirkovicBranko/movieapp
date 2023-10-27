import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/toastify.css";
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Promenili smo naziv loggedIn na isLoggedIn

  const handleRegister = async (e) => {
    e.preventDefault();

    const registrationData = {
      email: email,
      password: password,
      username: username,
    };

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      if (response.status === 200) {
        // Uspešna registracija
        toast.success("Uspešna registracija!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          onClose: () => {
            navigate("/login");
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
      console.error("Greška prilikom registracije:", error);
      toast.error("Došlo je do greške prilikom registracije.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };

  useEffect(() => {
    // Ovde ćete napraviti zahtev na vaš backend server da proverite da li je korisnik ulogovan
    async function checkLoginStatus() {
      try {
        const response = await fetch("http://localhost:5000/api/check-login", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Šaljemo token
          },
        });

        if (response.status === 200) {
          setIsLoggedIn(true); // Postavljamo isLoggedIn na true ako je korisnik ulogovan
        }
      } catch (error) {
        console.error("Greška prilikom provere statusa prijave:", error);
      }
    }

    checkLoginStatus();
  }, []);

  return (
    <div>
      <h2>Registration</h2>
      {/* Ovde možete prikazivati formu samo ako korisnik nije prijavljen */}
      {!isLoggedIn && (
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>
      )}
      <ToastContainer />
    </div>
  );
}

export default RegistrationForm;
