import React, { createContext, useState, useEffect } from "react";
import authService from "../services/authService";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = authService.getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (userData) => {
    setIsLoading(true);
    try {
      const response = await authService.login(userData);
      setUserToken(response.token); // Update user token in context
      const userInfo = await authService.getUserInfo(userData.username);
      setUser(userInfo); // Update user info in context

      // Set a timeout for 1 hour (3600000 milliseconds)
      const logoutTimer = setTimeout(() => {
        logout();
      }, 3600000);
      localStorage.setItem("logoutTimer", logoutTimer);
    } catch (error) {
      console.error("Error logging in:", error);
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUserToken(null);
    setUser(null); // Update user in context
    const timerId = localStorage.getItem("logoutTimer");
    if (timerId) {
      clearTimeout(parseInt(timerId, 10));
      localStorage.removeItem("logoutTimer");
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    try {
      const response = await authService.register(userData);
    } catch (error) {
      console.error("Error registering:", error);
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  const editProfile = async (currUsername, newUserData) => {
    setIsLoading(true);
    try {
      const response = await authService.updateUser(currUsername, newUserData);
      setUser(response);
    } catch (error) {
      console.error("Error updating user:", error);
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue = {
    user,
    userToken,
    isLoading,
    login,
    logout,
    register,
    editProfile,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
