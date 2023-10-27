import React from "react";
import { Routes, Route } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import SignUp from "./components/SignUp";
import Movies from "./components/Movies"
import Pricing from "./components/Pricing"
import Trends from "./components/Trends"
import TvShows from "./components/TvShows"



function App() {
  return (
    <div>
      <NavBar>
        <Routes>

          <Route path="/Movies" element={<Movies />} />
          <Route path="/TvShows" element={<TvShows />} />
          <Route path="/Trending" element={<Trends />} />
          <Route path="/Pricing" element={<Pricing />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/RegistrationForm" element={<RegistrationForm />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </NavBar>
    </div>
  );
}

export default App;
