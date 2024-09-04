// src/pages/profile/Dashboard.jsx
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import userProgrammesService from "../../services/userProgrammesService";
import userExercisesService from "../../services/userExercisesService";
import exerciseRecordsService from "../../services/exerciseRecordsService";
import { Line } from "react-chartjs-2";
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
import ExerciseCard from "../../components/Cards/ExerciseCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = ({
  setShowSnackbar,
  setSnackbarMessage,
  setSnackbarType,
}) => {
  const { user } = useContext(AuthContext);
  const [joinedProgrammes, setJoinedProgrammes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [numExercisesTried, setNumExercisesTried] = useState(0);
  const [exerciseRecords, setExerciseRecords] = useState([]);
  const [latestExercise, setLatestExercise] = useState(null);

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

        const exerciseCount = await getNumExercisesTried();
        setNumExercisesTried(exerciseCount);

        // Fetch all exercise records for the user
        const exerciseRecordsData =
          await exerciseRecordsService.getExerciseRecordsByUserId(user.id);
        setExerciseRecords(exerciseRecordsData);

        // Find the latest exercise (assuming exerciseRecords are sorted by date_achieved DESC on the backend)
        if (exerciseRecordsData.length > 0) {
          setLatestExercise(exerciseRecordsData[0]);
        }
      } catch (error) {
        if (error.response.status !== 404) {
          console.error("Error fetching user data:", error);
          setError("Error fetching data. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const chartData = {
    labels: exerciseRecords.map((record) => record.date_achieved.slice(0, 10)),
    datasets: [
      {
        label:
          latestExercise && latestExercise.is_weighted
            ? "Weight (kg)"
            : "Reps Completed",
        data:
          latestExercise && latestExercise.is_weighted
            ? exerciseRecords.map((record) => record.weight)
            : exerciseRecords.map((record) => record.reps_completed),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  // Calculate active days per week
  const activeDaysPerWeek = joinedProgrammes.reduce((total, programme) => {
    return total + programme.active_days.split(",").length;
  }, 0);

  const getNumExercisesTried = async () => {
    try {
      const exercisesData = await userExercisesService.getUserExerciseByUserId(
        user.id
      );

      const uniqueExerciseIds = new Set(
        exercisesData.map((exercise) => exercise.exercise_id)
      ); // Create a Set of unique IDs
      return uniqueExerciseIds.size; // Get the count of unique exercises
    } catch (error) {
      if (error.response.status !== 404) {
        setSnackbarType("error");
        setSnackbarMessage("Error fetching user exercises:", error);
        setShowSnackbar(true);
        setTimeout(() => {
          setShowSnackbar(false);
        }, 3000);
      }
      return 0; // Return 0 if there's an error (other than 404)
    }
  };

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
    <div className="container mx-auto">
      {latestExercise &&
      joinedProgrammes &&
      numExercisesTried &&
      exerciseRecords ? (
        <div className="md:col-span-3">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
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
              <p className="text-lg font-medium">{numExercisesTried}</p>
            </div>
          </div>

          {/* Graph and Latest Exercise */}
          <div className="bg-gray-800 p-4 rounded-md mb-8 flex items-center">
            {/* Graph */}
            <div className="w-2/3">
              <h2 className="text-lg font-semibold mb-4">
                {latestExercise
                  ? `[Latest Exercise Logged] ${latestExercise.exercise_name} Progress`
                  : "No Exercise Logged Yet"}
              </h2>
              <Line data={chartData} />
            </div>

            {/* Latest Exercise Name */}
            {latestExercise && (
              <div className="w-1/3 text-center">
                <ExerciseCard
                  exercise={{
                    name: latestExercise.exercise_name,
                    category: latestExercise.exercise_category,
                    image_url: latestExercise.exercise_image,
                  }}
                />
              </div>
            )}
          </div>

          {/* Insight Tips - Placeholder */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {tips.map((tip, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-md">
                <p className="text-sm text-gray-400">{tip.title}</p>
                <p>{tip.info}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-400">
          You have not recorded any exercises data yet :( <br />
          Get started on a programme to view your progress!
        </div>
      )}
    </div>
  );
};

export default Dashboard;
