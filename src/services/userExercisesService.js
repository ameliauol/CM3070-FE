import axios from "axios";
import authHeader from "./authHeader";
import { API_BASE_URL, API_ENDPOINTS } from "../config/apiConfig";

const getUserExerciseById = async (userExerciseId) => {
  const response = await axios.get(
    `${API_BASE_URL}${API_ENDPOINTS.USER_EXERCISES.GET_BY_ID}/${userExerciseId}`,
    { headers: authHeader() }
  );
  return response.data;
};

const getUserExercisesByUserProgrammeId = async (userProgrammeId) => {
  const response = await axios.get(
    `${API_BASE_URL}${API_ENDPOINTS.USER_EXERCISES.GET_BY_USER_PROGRAMME_ID}/${userProgrammeId}`,
    { headers: authHeader() }
  );
  return response.data;
};

const getUserExerciseByUserId = async (userId) => {
  const response = await axios.get(
    `${API_BASE_URL}${API_ENDPOINTS.USER_EXERCISES.GET_BY_USER_ID}/${userId}`,
    { headers: authHeader() }
  );
  return response.data;
};

const addExerciseLogToUserProgramme = async (
  userProgrammeId,
  userExerciseData
) => {
  const response = await axios.post(
    `${API_BASE_URL}${API_ENDPOINTS.USER_EXERCISES.ADD_BY_USER_PROGRAMME_ID}/${userProgrammeId}`,
    userExerciseData,
    { headers: authHeader() }
  );
  return response.data;
};

const updateUserExerciseById = async (userExerciseId, userExerciseData) => {
  const response = await axios.put(
    `${API_BASE_URL}${API_ENDPOINTS.USER_EXERCISES.UPDATE_BY_USER_EXERCISE_ID}/${userExerciseId}`,
    userExerciseData,
    { headers: authHeader() }
  );
  return response.data;
};

const deleteUserExerciseById = async (userProgrammeId) => {
  const response = await axios.delete(
    `${API_BASE_URL}${API_ENDPOINTS.USER_EXERCISES.DELETE_BY_ID}/${userProgrammeId}`,
    { headers: authHeader() }
  );
  return response.data;
};

const userExercisesService = {
  getUserExerciseById,
  getUserExercisesByUserProgrammeId,
  getUserExerciseByUserId,
  addExerciseLogToUserProgramme,
  updateUserExerciseById,
  deleteUserExerciseById,
};

export default userExercisesService;
