import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "../config/apiConfig";

const getAllExerciseInstructions = async () => {
  const response = await axios.get(
    `${API_BASE_URL}${API_ENDPOINTS.EXERCISE_INSTRUCTIONS.GET_ALL}`
  );
  return response.data;
};

const getExerciseInstructionsByExerciseId = async (exerciseId) => {
  const response = await axios.get(
    `${API_BASE_URL}${API_ENDPOINTS.EXERCISE_INSTRUCTIONS.GET_BY_EXERCISE_ID}/${exerciseId}`
  );
  return response.data;
};

const exerciseInstructionsService = {
  getAllExerciseInstructions,
  getExerciseInstructionsByExerciseId,
};

export default exerciseInstructionsService;
