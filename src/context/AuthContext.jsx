import React, { createContext, useContext, useState } from "react";
import axios from "axios";
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const setLoggedInUser = (username, token) => {
    setLoggedIn(true);
    setUsername(username);
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setLoggedIn(false);
    setUsername("");
    setToken("");
    localStorage.removeItem("token");
  };

  const register = async (username, email, password) => {
    try {
      // TODO: Replace with actual deployed API endpoint for registration
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setLoggedInUser(username, data.token);
        return { success: true };
      } else {
        return { error: data.message };
      }
    } catch (error) {
      console.error("Error registering user:", error);
      return {
        error: "An error occurred while registering. Please try again later.",
      };
    }
  };

  const login = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        userData
      );
      const { username, token } = response.data;
      setLoggedInUser(username, token);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const authValues = {
    loggedIn,
    username,
    token,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
};
