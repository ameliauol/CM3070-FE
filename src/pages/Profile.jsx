import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import userProgrammesService from "../services/userProgrammesService";
import Snackbar from "../components/Snackbar";
import { Line } from "react-chartjs-2"; // Or any other charting library
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import EditProfile from "./profile/EditProfile";
import MyExercises from "./profile/MyExercises";
import MyProgrammes from "./profile/MyProgrammes";
import Dashboard from "./profile/Dashboard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("dashboard");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("error");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex-grow p-4">
      {showSnackbar && (
        <Snackbar message={snackbarMessage} type={snackbarType} />
      )}
      <div className="container mx-auto">
        {/* ... (Profile heading and user info) ... */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Profile</h1>
          {user && (
            <div className="bg-slate-800 py-2 px-5 rounded-lg">
              <p className="text-lg">Welcome, {user.name}</p>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-6 gap-8">
          {/* Left Side Menu */}
          <div className="bg-gray-800 p-4 rounded-md">
            <ul className="text-left">
              <li className="mb-2">
                <button
                  onClick={() => setActiveSection("dashboard")}
                  className={`text-gray-300 hover:text-white 
                 ${activeSection === "dashboard" ? "font-semibold" : ""}`}
                >
                  Dashboard
                </button>
              </li>
              <li className="mb-2">
                <button
                  onClick={() => setActiveSection("my-programmes")}
                  className={`text-gray-300 hover:text-white 
                 ${activeSection === "dashboard" ? "font-semibold" : ""}`}
                >
                  My Programmes
                </button>
              </li>
              <li className="mb-2">
                <button
                  onClick={() => setActiveSection("my-exercises")}
                  className={`text-gray-300 hover:text-white 
                 ${activeSection === "dashboard" ? "font-semibold" : ""}`}
                >
                  My Exercise Goals
                </button>
              </li>
              <li className="mb-2">
                <button
                  onClick={() => setActiveSection("edit-profile")}
                  className={`text-gray-300 hover:text-white 
                 ${activeSection === "dashboard" ? "font-semibold" : ""}`}
                >
                  Edit Profile
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-white"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>

          {/* Right Side Content */}
          <div className="md:col-span-3">
            <div className="md:col-span-3">
              {activeSection === "dashboard" && (
                <Dashboard
                  setShowSnackbar={setShowSnackbar}
                  setSnackbarMessage={setSnackbarMessage}
                  setSnackbarType={setSnackbarType}
                />
              )}

              {activeSection === "my-programmes" && (
                <MyProgrammes
                  setShowSnackbar={setShowSnackbar}
                  setSnackbarMessage={setSnackbarMessage}
                  setSnackbarType={setSnackbarType}
                />
              )}

              {activeSection === "my-exercises" && (
                <MyExercises
                  setShowSnackbar={setShowSnackbar}
                  setSnackbarMessage={setSnackbarMessage}
                  setSnackbarType={setSnackbarType}
                />
              )}

              {activeSection === "edit-profile" && (
                <EditProfile
                  setShowSnackbar={setShowSnackbar}
                  setSnackbarMessage={setSnackbarMessage}
                  setSnackbarType={setSnackbarType}
                />
              )}
            </div>

            {/* Stats */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-800 p-4 rounded-md">
                <p className="text-sm text-gray-400">Programs Started</p>
                <p className="text-lg font-medium">{joinedProgrammes.length}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-md">
                <p className="text-sm text-gray-400">Active Days Per Week</p>
                <p className="text-lg font-medium">{activeDaysPerWeek}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-md">
                <p className="text-sm text-gray-400">Exercises Tried</p>
                <p className="text-lg font-medium">
                  
                </p>
              </div> 
			  
            </div>

            <div className="bg-gray-800 p-4 rounded-md mb-8">
              <h2 className="text-lg font-semibold mb-4">
                Graph of Pinned Exercise Progress
              </h2>
              <Line data={chartData} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {tips.map((tip, index) => (
                <div key={index - tip} className="bg-gray-800 p-4 rounded-md">
                  <p className="text-sm text-gray-400">{tip.title}</p>
                  <p>{tip.info}</p>
                </div>
              ))}
            </div>
			*/}
            {/* <Outlet /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
