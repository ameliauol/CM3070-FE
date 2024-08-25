import axios from "axios";
import authHeader from "./authHeader";
import { API_BASE_URL, API_ENDPOINTS } from "../config/apiConfig";

const getAllExerciseRecords = async () => {
  const response = await axios.get(
    `${API_BASE_URL}${API_ENDPOINTS.EXERCISE_RECORDS.GET_ALL}`,
    { headers: authHeader() }
  );
  return response.data;
};

const getExerciseRecordsByUserExerciseId = async (userExerciseId) => {
  const response = await axios.get(
    `${API_BASE_URL}${API_ENDPOINTS.EXERCISE_RECORDS.GET_BY_USER_EXERCISE_ID}/${userExerciseId}`,
    { headers: authHeader() }
  );
  return response.data;
};

const addExerciseRecord = async (userExerciseId, recordData) => {
  const response = await axios.post(
    `${API_BASE_URL}${API_ENDPOINTS.EXERCISE_RECORDS.ADD}/${userExerciseId}`,
    recordData,
    { headers: authHeader() }
  );
  return response.data;
};

const deleteExerciseRecord = async (recordId) => {
  const response = await axios.delete(
    `${API_BASE_URL}${API_ENDPOINTS.EXERCISE_RECORDS.DELETE}/${recordId}`,
    { headers: authHeader() }
  );
  return response.data;
};

const exerciseRecordsService = {
  getAllExerciseRecords,
  getExerciseRecordsByUserExerciseId,
  addExerciseRecord,
  deleteExerciseRecord,
};

export default exerciseRecordsService;
