import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "../config/apiConfig";

const getAllExercises = async () => {
  const response = await axios.get(
    `${API_BASE_URL}${API_ENDPOINTS.EXERCISES.GET_ALL}`
  );
  return response.data;
};

const exerciseService = {
  getAllExercises,
};

export default exerciseService;
