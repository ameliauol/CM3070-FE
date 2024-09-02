// src/pages/Profile.jsx
import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
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
  const [profileData, setProfileData] = useState(user);
  const [joinedProgrammes, setJoinedProgrammes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("error");

  const tips = [
    {
      title: "Insight Tip 01",
      info: "Stay consistent with your workouts for optimal results.",
    },
    {
      title: "Insight Tip 02",
      info: "Remember to stay hydrated throughout the day.",
    },
    {
      title: "Insight Tip 03",
      info: "Don't forget to stretch before and after your workouts.",
    },
    {
      title: "Insight Tip 04",
      info: "Ensure you are getting enough sleep to aid recovery.",
    },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const programmesResponse =
          await userProgrammesService.getUserProgrammesByUserId(user.id);
        setJoinedProgrammes(programmesResponse);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Placeholder data for the graph
  const chartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
    datasets: [
      {
        label: "Progress",
        data: [60, 65, 70, 75, 80], // Placeholder data
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  // Calculate active days per week
  const activeDaysPerWeek = joinedProgrammes.reduce((total, programme) => {
    return total + programme.active_days.length;
  }, 0);

  if (isLoading) {
    return <div className="container mx-auto p-4 text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex-grow p-4">
      {showSnackbar && (
        <Snackbar message={snackbarMessage} type={snackbarType} />
      )}
      <div className="container mx-auto">
        {/* ... (Profile heading and user info) ... */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Profile</h1>
          {profileData && (
            <div>
              <p className="text-lg">Hello, {profileData.username}</p>
              <p className="text-sm text-gray-400">
                Age: {profileData.age} | Height: {profileData.height} | Current
                Weight: {profileData.weight}
              </p>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left Side Menu */}
          <div className="bg-gray-800 p-4 rounded-md">
            <ul>
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
                  My Exercises
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
              {activeSection === "dashboard" && <></>}

              {activeSection === "my-programmes" && <></>}

              {activeSection === "my-exercises" && <></>}

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
