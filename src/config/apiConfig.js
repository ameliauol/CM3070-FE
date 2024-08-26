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
    GET_ALL: "/programmes",
    GET_BY_ID: "/programmes",
  },
  EXERCISES: {
    GET_ALL: "/exercises/get/all",
  },
  EXERCISE_INSTRUCTIONS: {
    GET_ALL: "/exercise/instructions/get/all",
    GET_BY_EXERCISE_ID: "/exercise/instructions/get/id",
  },
  PROGRAMME_EXERCISES: {
    GET_BY_PROGRAMME_ID: "/programme-exercises/programme", // programme ID will be appended
  },
  USER_PROGRAMMES: {
    GET_ALL: "/user-programmes",
    GET_BY_ID: "/user-programmes",
    GET_BY_USER_ID: "/user-programmes/user",
    JOIN: "/user-programmes/programme",
    UPDATE: "/user-programmes",
    DELETE: "/user-programmes",
  },
  USER_EXERCISES: {
    GET_ALL: "/user-exercises",
    GET_BY_USER_PROGRAMME_ID: "/user-exercises/programme", // user programme ID will be appended
    GET_BY_ID: "/user-exercises",
    ADD: "/user-exercises/programme", // user programme ID will be appended
    DELETE: "/user-exercises",
  },
  EXERCISE_RECORDS: {
    GET_ALL: "/exercise-records",
    GET_BY_USER_EXERCISE_ID: "/exercise-records/user-exercise", // user exercise ID will be appended
    ADD: "/exercise-records/user-exercise", // user exercise ID will be appended
    DELETE: "/exercise-records",
  },
};

export { API_BASE_URL, API_ENDPOINTS };
