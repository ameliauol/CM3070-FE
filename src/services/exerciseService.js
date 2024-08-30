import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "../config/apiConfig";

const getAllExercises = async () => {
  const response = await axios.get(
    `${API_BASE_URL}${API_ENDPOINTS.EXERCISES.GET_ALL}`
  );
  return response.data;
};

const getExerciseById = async (exerciseId) => {
  const response = await axios.get(
    `${API_BASE_URL}${API_ENDPOINTS.EXERCISES.GET_BY_ID}/${exerciseId}`
  );
  return response.data;
};

const exerciseService = {
  getAllExercises,
  getExerciseById,
};

export default exerciseService;
