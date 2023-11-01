import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext"; // Zamijenite sa pravilnim putem do AuthContext.js
import RegistrationForm from "./components/RegistrationForm";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import SignUp from "./components/SignUp";
import Movies from "./components/Movies";
import Pricing from "./components/Pricing";
import Trends from "./components/Trends";
import TvShows from "./components/TvShows";
import ContactUs from "./components/ContactUs";



function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <NavBar>
            <Routes>
              <Route path="/Movies" element={<Movies />} />
              <Route path="/TvShows" element={<TvShows />} />
              <Route path="/Trending" element={<Trends />} />
              <Route path="/Pricing" element={<Pricing />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/RegistrationForm" element={<RegistrationForm />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/ContactUs" element={<ContactUs />} />
            </Routes>
          </NavBar>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
