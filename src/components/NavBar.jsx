import React, { Fragment, useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import "../Styles/NavBarStyle.css";
import "../Styles/Videos.css";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Login from "./Login";
import Movies from "./Movies";
import Pricing from "./Pricing";
import SignUp from "./SignUp";
import Trends from "./Trends";
import TvShows from "./TvShows";
import RegistrationForm from "./RegistrationForm";
import Logout from "./Logout";
import { useAuth } from "./AuthContext";
import { AuthProvider } from "./AuthContext";
import ContactUs from "./ContactUs";

export const Container = React.createContext();

function NavBar() {
  const { isLoggedIn, login, logout } = useAuth();
  const [inputValue, setInputValue] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  // Function to refresh the page
  const refreshPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    // Check for a token in local storage to determine if the user is logged in
    const token = localStorage.getItem("token");
    if (token) {
      login();
    }
  }, [login]);

  // Function to handle the login process
  const handleLogin = async () => {
    login(); // Log the user in
    refreshPage(); // Refresh the page
    navigate("/Movies"); // Navigate to the Movies page
  };

  // Function to handle the logout process
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from local storage
    logout(); // Log the user out
    refreshPage(); // Refresh the page
    navigate("/Movies"); // Navigate to the Movies page
  };

  // Function to handle user registration
  const handleRegister = async (e) => {
    e.preventDefault();

    // Create a data object with registration information
    const registrationData = {
      email: email,
      password: password,
      username: username,
    };

    try {
      // Send a POST request to the server to register the user
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      if (response.status === 200) {
        // Registration successful
        toast.success("Successful registration!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          onClose: () => {
            setIsRegistered(true); // Set the registration flag to true
            navigate("/Login"); // Navigate to the Login page
          },
        });
      } else {
        // Registration failed, display error message
        const data = await response.json();
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("An error occurred during registration.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };

  return (
    <AuthProvider>
      <Container.Provider value={{ toggle, inputValue, setInputValue }}>
        <Fragment>
          <ToastContainer />
          <nav className={toggle ? "" : "navBarColor"}>
            <div className="nav-options">
              <h1 className="" id={toggle ? "" : "heading"}>
                VIDEOSITE
              </h1>
              <NavLink
                to="/Movies"
                style={({ isActive }) => ({
                  color: isActive ? "#fff" : "#EE9800",
                })}
              >
                <span id={toggle ? "Movies" : "MoviesLight"}> Movies </span>
              </NavLink>
              <NavLink
                to="/TvShows"
                style={({ isActive }) => ({
                  color: isActive ? "#fff" : "#EE9800",
                })}
              >
                <span id={toggle ? "Movies" : "MoviesLight"}> Tv Shows </span>
              </NavLink>
              <NavLink
                to="/Trending"
                style={({ isActive }) => ({
                  color: isActive ? "#fff" : "#EE9800",
                })}
              >
                <span id={toggle ? "Movies" : "MoviesLight"}> Trending </span>
              </NavLink>
              <NavLink
                to="/Pricing"
                style={({ isActive }) => ({
                  color: isActive ? "#fff" : "#EE9800",
                })}
              >
                <span id={toggle ? "Movies" : "MoviesLight"}> Pricing </span>
              </NavLink>
              <NavLink
                to="/ContactUs"
                style={({ isActive }) => ({
                  color: isActive ? "#fff" : "#EE9800",
                })}
              >
                <span id={toggle ? "Movies" : "MoviesLight"}> Contact us </span>
              </NavLink>
              {isLoggedIn ? (
                <span
                  onClick={() => {
                    handleLogout(); // Handle the logout process
                    navigate("/Movies"); // Navigate to the Movies page
                  }}
                  style={{ color: "#fff", cursor: "pointer" }}
                >
                  Logout
                </span>
              ) : (
                <Fragment>
                  <NavLink
                    to="/Login"
                    style={({ isActive }) => ({
                      color: isActive ? "#fff" : "#EE9800",
                      display: isLoggedIn ? "none" : "block",
                    })}
                  >
                    <span id={toggle ? "Movies" : "MoviesLight"}>Login</span>
                  </NavLink>
                  <NavLink
                    to="/SignUp"
                    style={({ isActive }) => ({
                      color: isActive ? "#fff" : "#EE9800",
                      display: isLoggedIn ? "none" : "block",
                    })}
                  >
                    <span
                      style={{ display: isLoggedIn ? "none" : "block" }}
                      id={toggle ? "Movies" : "MoviesLight"}
                    >
                      Sign up
                    </span>
                  </NavLink>
                </Fragment>
              )}
            </div>
            <div className="input-group">
              <input
                className="search-input"
                type="text"
                placeholder="Search for movies or shows"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <CiSearch fontSize={21} color="green" id="search" />
              <div id="Color-switcher" onClick={() => setToggle(!toggle)}>
                <div
                  id={toggle ? "Color-switcher-mover" : "Color-switcher-moved"}
                ></div>
              </div>
            </div>
          </nav>

          <Routes>
            <Route path="/" element={<Movies />} />
            <Route path="/Movies" element={<Movies />} />
            <Route path="/TvShows" element={<TvShows />} />
            <Route path="/Trending" element={<Trends />} />
            <Route path="/Pricing" element={<Pricing />} />
            <Route
              path="/Login"
              element={<Login handleLogin={handleLogin} />}
            />
            <Route
              path="/SignUp"
              element={<SignUp handleRegister={handleRegister} />}
            />
            {isLoggedIn && (
              <Route
                path="/Logout"
                element={<Logout handleLogout={handleLogout} />}
              />
            )}
            <Route path="/RegistrationForm" element={<RegistrationForm />} />
            <Route path="/ContactUs" element={<ContactUs />} />
          </Routes>
        </Fragment>
      </Container.Provider>
    </AuthProvider>
  );
}

export default NavBar;
