import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "../config/apiConfig";

const register = async (userData) => {
  const response = await axios.post(
    `${API_BASE_URL}${API_ENDPOINTS.USERS.REGISTER}`,
    userData
  );
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(
    `${API_BASE_URL}${API_ENDPOINTS.USERS.LOGIN}`,
    userData
  );
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default authService;
