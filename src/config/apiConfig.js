const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log("API_BASE_URL", API_BASE_URL);
const API_ENDPOINTS = {
  USERS: {
    REGISTER: "/users/register",
    LOGIN: "/users/login",
    GET_BY_USERNAME: "/users/get",
    UPDATE_BY_USERNAME: "/users/update",
    DELETE: "/users/delete",
  },
  PROGRAMMES: {
    GET_ALL: "/programmes/get/all",
    GET_BY_ID: "/programmes/get",
  },
  EXERCISES: {
    GET_ALL: "/exercises/get/all",
    GET_BY_ID: "/exercises/get/id",
  },
  EXERCISE_INSTRUCTIONS: {
    GET_ALL: "/exercise/instructions/get/all",
    GET_BY_EXERCISE_ID: "/exercise/instructions/get/id",
  },
  PROGRAMME_EXERCISES: {
    GET_BY_PROGRAMME_ID: "/programme/exercises/get/id", // programme ID will be appended
  },
  USER_PROGRAMMES: {
    GET_ALL: "/user/programmes/get/all",
    GET_BY_ID: "/user/programmes/get",
    GET_BY_USER_ID: "/user/programmes/get/user",
    JOIN_BY_ID: "/user/programmes/join",
    UPDATE_BY_ID: "/user/programmes/update",
    DELETE_BY_ID: "/user/programmes/delete",
  },
  USER_EXERCISES: {
    GET_ALL: "/user/exercises/get/all",
    GET_BY_ID: "/user/exercises/get",
    GET_BY_USER_PROGRAMME_ID: "/user/exercises/get/filter/user-programme", // user programme ID will be appended
    GET_BY_USER_ID: "/user/exercises/get/filter/user", // user ID will be appended
    ADD_BY_USER_PROGRAMME_ID: "/user/exercises/add/new", // user programme ID will be appended
    UPDATE_BY_USER_EXERCISE_ID: "/user/exercises/update", // user exercise ID will be appended
    DELETE_BY_ID: "/user/exercises/delete",
  },
  EXERCISE_RECORDS: {
    GET_ALL: "/exercises/records/get/all",
    GET_BY_USER_EXERCISE_ID: "/exercises/records/get/filter/user-exercise", // user exercise ID will be appended
    GET_BY_USER_ID: "/exercises/records/get/filter/user", // user ID will be appended
    GET_BY_PROGRAMME_ID: "/exercises/records/get/filter/programme", // programme ID will be appended
    ADD_BY_ID: "/exercises/records/add/new/user-exercise", // user exercise ID will be appended
    ADD_BY_PROGRAMME_ID: "/exercises/records/add/new/programme", // programme ID will be appended
    DELETE: "/exercises/records/delete",
  },
};

export { API_BASE_URL, API_ENDPOINTS };
