const API_BASE_URL = "https://cm3070-be.onrender.com";
// TODO: Fix this to use the environment variable
//   process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";
const API_ENDPOINTS = {
  USERS: {
    REGISTER: "/users/register",
    LOGIN: "/users/login",
    GET_BY_USERNAME: "/users/get",
    UPDATE: "/users/update",
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
    ADD_BY_USER_PROGRAMME_ID: "/user/exercises/add/new", // user programme ID will be appended
    DELETE_BY_ID: "/user/exercises/delete",
  },
  EXERCISE_RECORDS: {
    GET_ALL: "/exercise-records/get/all",
    GET_BY_USER_EXERCISE_ID: "/exercise-records/get/filter/user-exercise", // user exercise ID will be appended
    ADD: "/exercise-records/add/new", // user exercise ID will be appended
    DELETE: "/exercise-records/delete",
  },
};

export { API_BASE_URL, API_ENDPOINTS };
