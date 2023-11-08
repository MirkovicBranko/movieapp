import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/toastify.css";
import { useNavigate } from "react-router-dom";
import "../Styles/Registration.css";

function RegistrationForm() {
  // Define state variables to store user input and status
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle user registration
  const handleRegister = async (e) => {
    e.preventDefault();

    // Create an object containing registration data (email, password, and username)
    const registrationData = {
      email: email.toLowerCase().trim(),
      password: password,
      username: username.toLowerCase().trim(),
    };

    try {
      // Send a POST request to the server for user registration
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      if (response.status === 200) {
        // If registration is successful, show a success message and navigate to login
        const data = await response.json();
        toast.success(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          onClose: () => {
            navigate("/login");
          },
        });
      } else {
        // If registration is not successful, show an error message from the server
        const data = await response.json();
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
        });
      }
    } catch (error) {
      // Handle errors that may occur during the registration process
      console.error("Error during registration:", error);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };

  // Function to check the user's login status using an HTTP request to the backend
  useEffect(() => {
    async function checkLoginStatus() {
      if (!isLoggedIn) {
        try {
          const response = await fetch(
            "http://localhost:5000/api/check-login",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          if (response.status === 200) {
            setIsLoggedIn(true);
          }
        } catch (error) {
          console.error("Error during status application check:", error);
        }
      }
    }
    checkLoginStatus();
  }, [isLoggedIn]);

  return (
    <div className="wrapperReg">
      <h2 className="registration">Registration</h2>

      {/* Display registration form only if the user is not logged in */}
      {!isLoggedIn && (
        <form onSubmit={handleRegister}>
          <input
            className="input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="input"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="button">
            Register
          </button>
        </form>
      )}
      <ToastContainer />
    </div>
  );
}

export default RegistrationForm;
