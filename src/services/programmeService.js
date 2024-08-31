import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "../config/apiConfig";

const getAllProgrammes = async () => {
  const response = await axios.get(
    `${API_BASE_URL}${API_ENDPOINTS.PROGRAMMES.GET_ALL}`
  );
  return response.data;
};

const getProgrammeById = async (programmeId) => {
  const response = await axios.get(
    `${API_BASE_URL}${API_ENDPOINTS.PROGRAMMES.GET_BY_ID}/${programmeId}`
  );
  console.log(response);
  return response.data;
};

const programmeService = {
  getAllProgrammes,
  getProgrammeById,
};

export default programmeService;
