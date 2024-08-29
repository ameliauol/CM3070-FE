import axios from "axios";
import authHeader from "./authHeader";
import { API_BASE_URL, API_ENDPOINTS } from "../config/apiConfig";

const getAllUserProgrammes = async () => {
  const response = await axios.get(
    `${API_BASE_URL}${API_ENDPOINTS.USER_PROGRAMMES.GET_ALL}`,
    { headers: authHeader() }
  );
  return response.data;
};

const getUserProgrammeById = async (userProgrammeId) => {
  const response = await axios.get(
    `${API_BASE_URL}${API_ENDPOINTS.USER_PROGRAMMES.GET_BY_ID}/${userProgrammeId}`,
    { headers: authHeader() }
  );
  return response.data;
};

const getUserProgrammesByUserId = async (userId) => {
  const response = await axios.get(
    `${API_BASE_URL}${API_ENDPOINTS.USER_PROGRAMMES.GET_BY_USER_ID}/${userId}`,
    { headers: authHeader() }
  );
  return response.data;
};

const joinProgramme = async (programmeId, activeDays) => {
  // Adjust parameter names if needed
  const response = await axios.post(
    `${API_BASE_URL}${API_ENDPOINTS.USER_PROGRAMMES.JOIN}/${programmeId}`,
    { active_days: activeDays },
    { headers: authHeader() }
  );
  return response.data;
};

const updateUserProgramme = async (userProgrammeId, updatedData) => {
  const response = await axios.put(
    `${API_BASE_URL}${API_ENDPOINTS.USER_PROGRAMMES.UPDATE}/${userProgrammeId}`,
    updatedData,
    { headers: authHeader() }
  );
  return response.data;
};

const deleteUserProgramme = async (userProgrammeId) => {
  const response = await axios.delete(
    `${API_BASE_URL}${API_ENDPOINTS.USER_PROGRAMMES.DELETE}/${userProgrammeId}`,
    { headers: authHeader() }
  );
  return response.data;
};

const userProgrammesService = {
  getAllUserProgrammes,
  getUserProgrammeById,
  getUserProgrammesByUserId,
  joinProgramme,
  updateUserProgramme,
  deleteUserProgramme,
};

export default userProgrammesService;
