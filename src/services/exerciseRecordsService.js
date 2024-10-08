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

const getExerciseRecordsByUserId = async (userId) => {
  const response = await axios.get(
    `${API_BASE_URL}${API_ENDPOINTS.EXERCISE_RECORDS.GET_BY_USER_ID}/${userId}`,
    { headers: authHeader() }
  );
  return response.data;
};

const getExerciseRecordsByProgrammeId = async (programmeId) => {
  const response = await axios.get(
    `${API_BASE_URL}${API_ENDPOINTS.EXERCISE_RECORDS.GET_BY_PROGRAMME_ID}/${programmeId}`,
    { headers: authHeader() }
  );
  return response.data;
};

const addExerciseRecord = async (userExerciseId, recordData) => {
  const response = await axios.post(
    `${API_BASE_URL}${API_ENDPOINTS.EXERCISE_RECORDS.ADD_BY_ID}/${userExerciseId}`,
    recordData,
    { headers: authHeader() }
  );
  return response.data;
};

const addExerciseRecordForProgrammeId = async (programmeId, recordData) => {
  const response = await axios.post(
    `${API_BASE_URL}${API_ENDPOINTS.EXERCISE_RECORDS.ADD_BY_PROGRAMME_ID}/${programmeId}`,
    recordData,
    { headers: authHeader() }
  );
  return response.data;
};

const deleteExerciseRecord = async (recordId) => {
  const response = await axios.delete(
    `${API_BASE_URL}${API_ENDPOINTS.EXERCISE_RECORDS.DELETE_BY_ID}/${recordId}`,
    { headers: authHeader() }
  );
  return response.data;
};

const exerciseRecordsService = {
  getAllExerciseRecords,
  getExerciseRecordsByUserExerciseId,
  getExerciseRecordsByUserId,
  getExerciseRecordsByProgrammeId,
  addExerciseRecordForProgrammeId,
  addExerciseRecord,
  deleteExerciseRecord,
};

export default exerciseRecordsService;
