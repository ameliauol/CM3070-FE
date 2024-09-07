import React, { useState, useContext } from "react";
import Snackbar from "../Snackbar";
import { AuthContext } from "../../context/AuthContext";

const RegistrationForm = ({
  onSwitchToLogin,
  setShowSnackbar,
  setSnackbarMessage,
  setSnackbarType,
}) => {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setShowSnackbar(false);

    const errors = {};

    if (!name) {
      errors.name = "Name is required.";
    } else if (name.length < 6) {
      errors.name = "Name must be at least 6 characters long.";
    }

    if (!email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid.";
    }

    if (!username) {
      errors.username = "Username is required.";
    } else if (username.length < 6) {
      errors.username = "Username must be at least 6 characters long.";
    }

    if (!password) {
      errors.password = "Password is required.";
    } else if (!/^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/.test(password)) {
      errors.password =
        "Password must be at least 6 characters and contain both letters and numbers.";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    try {
      await register({ name, email, username, password });
      setSnackbarMessage(
        "Successfully registered! Redirecting to the login page now."
      );
      setSnackbarType("success");
      setShowSnackbar(true);

      onSwitchToLogin();
      setTimeout(() => {
        setShowSnackbar(false);
      }, 10000);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setSnackbarMessage(
          "An error has occurred: Account with this username or email already exists."
        );
        setSnackbarType("error");
        setShowSnackbar(true);
      } else {
        setSnackbarMessage(
          "An error occurred during registration, please try again later."
        );
        setSnackbarType("error");
        setShowSnackbar(true);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        {/* Name field */}
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              htmlFor="name"
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            >
              Name
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="name"
              type="text"
              placeholder="Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {error && error.name && (
              <p className="text-red-500 text-xs italic">{error.name}</p>
            )}
          </div>
        </div>

        {/* Email field */}
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              htmlFor="email"
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            >
              Email
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="email"
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && error.email && (
              <p className="text-red-500 text-xs italic">{error.email}</p>
            )}
          </div>
        </div>

        {/* Username field */}
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
              placeholder="johndoe123"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {error && error.username && (
              <p className="text-red-500 text-xs italic">{error.username}</p>
            )}
          </div>
        </div>

        {/* Password field */}
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
            {error && error.password && (
              <p className="text-red-500 text-xs italic">{error.password}</p>
            )}
          </div>
        </div>

        {/* Confirm Password field */}
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              htmlFor="confirm-password"
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            >
              Confirm Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="confirm-password"
              type="password"
              placeholder="******************"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && error.confirmPassword && (
              <p className="text-red-500 text-xs italic">
                {error.confirmPassword}
              </p>
            )}
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="text-gray-400 text-sm">
            Already have an account?{" "}
            <span
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={onSwitchToLogin}
            >
              Login here
            </span>
          </p>
        </div>
        <div className="md:flex md:items-center mt-4">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
