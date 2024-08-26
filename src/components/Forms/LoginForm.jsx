import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Snackbar from "../Snackbar";

const LoginForm = ({ onLoginSuccess, onSwitchToRegister }) => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("error");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowSnackbar(false);

    try {
      await login({ username, password });

      setSnackbarMessage(
        "Successfully logged in, redirecting you to the homepage now"
      );
      setSnackbarType("success");
      setShowSnackbar(true);
      onLoginSuccess();
      navigate("/");

      setTimeout(() => {
        setShowSnackbar(false);
      }, 10000);
    } catch (error) {
      console.log(error.response.status);
      if (error.response && error.response.status === 404) {
        setSnackbarMessage(
          "An error has occurred: No account found with that username."
        );
      } else if (error.response && error.response.status === 401) {
        setSnackbarMessage(
          "An error has occurred: You have entered the wrong username or password."
        );
      } else {
        setSnackbarMessage(
          "An error occurred during login, please try again later."
        );
      }
      setSnackbarType("error");
      setShowSnackbar(true);
    }
  };

  return (
    <div>
      {showSnackbar && (
        <Snackbar message={snackbarMessage} type={snackbarType} />
      )}
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              htmlFor="username"
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            >
              Username
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              htmlFor="password"
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            >
              Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="text-center mb-4">
          <p className="text-gray-400 text-sm">
            Don't have an account?{" "}
            <span
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={onSwitchToRegister}
            >
              Register here.
            </span>
          </p>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
