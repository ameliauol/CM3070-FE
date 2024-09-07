import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const EditProfile = ({
  setShowSnackbar,
  setSnackbarMessage,
  setSnackbarType,
}) => {
  const { user, editProfile } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({});

  useEffect(() => {
    setFormData({
      name: user.name || "",
      username: user.username || "",
      email: user.email || "",
      password: "",
      confirmPassword: "",
    });
    setIsLoading(false);
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {}; // Object to store field-specific errors

    // Validation logic
    if (!formData.name) {
      errors.name = "Name is required.";
    } else if (formData.name.length < 6) {
      errors.name = "Name must be at least 6 characters long.";
    }

    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid.";
    }

    if (!formData.username) {
      errors.username = "Username is required.";
    } else if (formData.username.length < 6) {
      errors.username = "Username must be at least 6 characters long.";
    }

    if (formData.password) {
      // Only validate if the user is attempting to change the password
      if (!/^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/.test(formData.password)) {
        errors.password =
          "Password must be at least 6 characters and contain both letters and numbers.";
        setFormData({ ...formData, password: "", confirmPassword: "" });
      }

      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords don't match.";
        setFormData({ ...formData, password: "", confirmPassword: "" });
      }
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    setIsLoading(true);
    try {
      const updatedData = {};
      for (const key in formData) {
        if (formData[key] !== "") {
          updatedData[key] = formData[key];
        }
      }

      const updatedUser = await editProfile(user.username, updatedData);

      setSnackbarType("success");
      setSnackbarMessage("Profile updated successfully!");
      setShowSnackbar(true);
      setFormData({ ...formData, password: "", confirmPassword: "" });
      setTimeout(() => {
        setShowSnackbar(false);
      }, 3000);
    } catch (error) {
      setSnackbarMessage("Error updating profile:", error);
      setSnackbarType("error");
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="container mx-auto p-4 text-center">Loading...</div>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex-grow p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>

        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          {/* Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-400 text-sm font-medium mb-2"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-gray-700 text-white border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            {error && error.username && (
              <p className="text-red-500 text-xs italic mt-1">{error.name}</p>
            )}
          </div>

          {/* Username */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-400 text-sm font-medium mb-2"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="bg-gray-700 text-white border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            {error && error.username && (
              <p className="text-red-500 text-xs italic mt-1">
                {error.username}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-400 text-sm font-medium mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-700 text-white border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            {error && error.email && (
              <p className="text-red-500 text-xs italic mt-1">{error.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-400 text-sm font-medium mb-2"
            >
              Password: (Leave blank if you don't want to change it)
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-gray-700 text-white border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            {error && error.password && (
              <p className="text-red-500 text-xs italic mt-1">
                {error.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-400 text-sm font-medium mb-2"
            >
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="bg-gray-700 text-white border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            {error && error.confirmPassword && (
              <p className="text-red-500 text-xs italic mt-1">
                {error.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
