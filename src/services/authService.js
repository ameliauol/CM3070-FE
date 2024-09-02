import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "../config/apiConfig";
import authHeader from "./authHeader";

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
    localStorage.setItem("userToken", JSON.stringify(response.data.token));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getUserInfo = async (username) => {
  const response = await axios.get(
    `${API_BASE_URL}${API_ENDPOINTS.USERS.GET_BY_USERNAME}/${username}`,
    { headers: authHeader() }
  );
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const updateUser = async (currUsername, newUserData) => {
  const response = await axios.put(
    `${API_BASE_URL}${API_ENDPOINTS.USERS.UPDATE_BY_USERNAME}/${currUsername}`,
    newUserData,
    { headers: authHeader() }
  );
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  getUserInfo,
  updateUser,
};

export default authService;
