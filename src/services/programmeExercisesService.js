import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "../config/apiConfig";

const getExercisesByProgrammeId = async (programmeId) => {
  const response = await axios.get(
    `${API_BASE_URL}${API_ENDPOINTS.PROGRAMME_EXERCISES.GET_BY_PROGRAMME_ID}/${programmeId}`
  );
  return response.data;
};

const programmeExercisesService = {
  getExercisesByProgrammeId,
};

export default programmeExercisesService;
