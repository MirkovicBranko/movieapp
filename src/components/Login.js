import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../Styles/Login.css";

function Login() {
  // Access the 'login' function from the authentication context
  const { login } = useAuth();
  const navigate = useNavigate(); // Access the navigation function
  const [username, setUsername] = useState(""); // State for storing the username input
  const [password, setPassword] = useState(""); // State for storing the password input

  // Function to refresh the page
  const refreshPage = () => {
    window.location.reload();
  };

  // Function to handle the login process
  const handleLogin = async (e) => {
    e.preventDefault();

    // Create an object containing the login data (username and password)
    const loginData = {
      username: username,
      password: password,
    };

    try {
      // Send a POST request to the server to log in the user
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.status === 200) {
        // If the login is successful, set the user's token in local storage
        const data = await response.json();
        localStorage.setItem("token", data.token);

        // Show a success toast message and perform actions on close
        toast.success("Successful login", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          onClose: () => {
            login(); // Call the login function to set the user as logged in
            navigate("/Movies"); // Navigate to the Movies page
            refreshPage(); // Refresh the page
          },
        });
      } else {
        // If login is not successful, show an error message from the server
        const data = await response.json();
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
        });
      }
    } catch (error) {
      // Handle errors that may occur during the login process
      console.error("Error during login:", error);
      toast.error("An error occurred during login", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };

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
          autoComplete="current-password"
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        <button className="login" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
