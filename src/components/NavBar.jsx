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

export const Container = React.createContext();

function NavBar() {
  const [inputValue, setInputValue] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  const handleLogin = async (credentials) => {
    setIsLoggedIn(true);
    navigate("/Movies");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/Movies");
  };

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
        toast.success("Uspešna registracija!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          onClose: () => {
            setIsRegistered(true);
            navigate("/Login");
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

  return (
    <Container.Provider value={{ toggle, inputValue, setInputValue }}>
      <Fragment>
        <ToastContainer />
        <nav className={toggle ? "" : "navBarColor"}>
          <div className="nav-options">
            <h1 id={toggle ? "" : "heading"}>VIDEOSITE</h1>
            <NavLink
              to="/Movies"
              style={({ isActive }) => ({
                color: isActive ? `#fff` : `#EE9800`,
              })}
            >
              <span id={toggle ? "Movies" : "MoviesLight"}> Movies </span>
            </NavLink>
            <NavLink
              to="/TvShows"
              style={({ isActive }) => ({
                color: isActive ? `#fff` : `#EE9800`,
              })}
            >
              <span id={toggle ? "Movies" : "MoviesLight"}> Tv Shows </span>
            </NavLink>
            <NavLink
              to="/Trending"
              style={({ isActive }) => ({
                color: isActive ? `#fff` : `#EE9800`,
              })}
            >
              <span id={toggle ? "Movies" : "MoviesLight"}> Trending </span>
            </NavLink>
            <NavLink
              to="/Pricing"
              style={({ isActive }) => ({
                color: isActive ? `#fff` : `#EE9800`,
              })}
            >
              <span id={toggle ? "Movies" : "MoviesLight"}> Pricing </span>
            </NavLink>
            {isLoggedIn ? (
              <NavLink
                to="/Logout"
                style={({ isActive }) => ({
                  color: isActive ? `#fff` : `#EE9800`,
                })}
              >
                <span id={toggle ? "Movies" : "MoviesLight"}>Logout</span>
              </NavLink>
            ) : (
              <Fragment>
                <NavLink
                  to="/Login"
                  style={({ isActive }) => ({
                    color: isActive ? `#fff` : `#EE9800`,
                  })}
                >
                  <span id={toggle ? "Movies" : "MoviesLight"}>Login</span>
                </NavLink>
                <NavLink
                  to="/SignUp"
                  style={({ isActive }) => ({
                    color: isActive ? `#fff` : `#EE9800`,
                  })}
                >
                  <span id={toggle ? "Movies" : "MoviesLight"}>Sign up</span>
                </NavLink>
              </Fragment>
            )}
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Search for movies or shows"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            ></input>
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
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/RegistrationForm" element={<RegistrationForm />} />
          {isLoggedIn && <Route path="/Logout" element={<Logout />} />}
        </Routes>
      </Fragment>
    </Container.Provider>
  );
}

export default NavBar;
