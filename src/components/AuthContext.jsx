import React, { useContext, createContext, useState, useEffect } from "react";

// Creating a context for authentication
const AuthContext = createContext();

// AuthProvider component to manage authentication state
export const AuthProvider = ({ children }) => {
  // State to track whether the user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect to check if there's a logged-in user in local storage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // If token is present, set isLoggedIn to true
      setIsLoggedIn(true);
    }
  }, []);

  // Function to handle user login
  const login = (token) => {
    // Save the token in local storage
    localStorage.setItem("token", token);
    // Set isLoggedIn to true
    setIsLoggedIn(true);
  };

  // Function to handle user logout
  const logout = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");
    // Set isLoggedIn to false
    setIsLoggedIn(false);
  };

  // Providing the authentication context with values
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};
