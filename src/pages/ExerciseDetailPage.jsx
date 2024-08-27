import React, { useState, useEffect, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import exerciseService from "../services/exerciseService";
import exerciseInstructionsService from "../services/exerciseInstructionsService";
import Snackbar from "../components/Snackbar";
import { AuthContext } from "../context/AuthContext";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ExerciseDetailPage = () => {
  const { exerciseName } = useParams();
  const location = useLocation();
  const [exercise, setExercise] = useState(location.state?.exercise || null);
  const [instructions, setInstructions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { user } = useContext(AuthContext);
  const [logDate, setLogDate] = useState("");
  const [weightLifted, setWeightLifted] = useState("");
  const [repsCompleted, setRepsCompleted] = useState("");
  const [logFormError, setLogFormError] = useState(null);

  // TODO: Placeholder data for the graph - replace with actual logged data
  const [historicalData, setHistoricalData] = useState([
    { date: "2023-10-20", weight: 60, reps: 10 },
    { date: "2023-10-22", weight: 65, reps: 12 },
    { date: "2023-10-25", weight: 62, reps: 11 },
    { date: "2023-10-27", weight: 70, reps: 15 },
  ]);

  useEffect(() => {
    const fetchExerciseDetails = async () => {
      if (!exercise) {
        setIsLoading(true);
        try {
          const exercisesData = await exerciseService.getAllExercises();
          const foundExercise = exercisesData.find(
            (ex) => ex.name.toLowerCase() === exerciseName.toLowerCase()
          );

          if (foundExercise) {
            setExercise(foundExercise);

            const instructionsData =
              await exerciseInstructionsService.getExerciseInstructionsByExerciseId(
                foundExercise.id
              );
            setInstructions(instructionsData);
          } else {
            setError("Exercise not found");
          }
        } catch (error) {
          console.error("Error fetching exercise details:", error);
          setError("Error fetching exercise details. Please try again later.");
          setSnackbarMessage(
            "Error fetching exercise details. Please try again later."
          );
          setShowSnackbar(true);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(true);
        try {
          const instructionsData =
            await exerciseInstructionsService.getExerciseInstructionsByExerciseId(
              exercise.id
            );
          setInstructions(instructionsData);
        } catch (error) {
          console.error("Error fetching exercise instructions:", error);
          setError(
            "Error fetching exercise instructions. Please try again later."
          );
          setSnackbarMessage(
            "Error fetching exercise instructions. Please try again later."
          );
          setShowSnackbar(true);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchExerciseDetails();
  }, [exerciseName, exercise]);

  // Function to handle log form submission
  const handleLogSubmit = (event) => {
    event.preventDefault();

    if (!logDate || (!weightLifted && exercise.is_weighted) || !repsCompleted) {
      setLogFormError("Please fill in all required fields.");
      return;
    }

    // TODO: Save log data to your backend (add API call here)
    // Update historicalData
    setHistoricalData((prevData) => [
      ...prevData,
      { date: logDate, weight: weightLifted, reps: repsCompleted },
    ]);

    // Clear form fields and error
    setLogDate("");
    setWeightLifted("");
    setRepsCompleted("");
    setLogFormError(null);
  };

  // Plot Data for the graph
  const chartData = {
    labels: historicalData.map((data) => data.date),
    datasets: [
      {
        label: exercise.is_weighted ? "Weight (kg)" : "Reps Completed",
        data: exercise.is_weighted
          ? historicalData.map((data) => data.weight)
          : historicalData.map((data) => data.reps),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
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

  if (!exercise) {
    return (
      <div className="container mx-auto p-4 text-center">
        Exercise not found
      </div>
    );
  }

  return (
    <div className="bg-slate-900 text-white min-h-screen flex-grow p-4">
      {showSnackbar && <Snackbar message={snackbarMessage} type="error" />}
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4">{exercise.name}</h1>

        {/* Video */}
        <div className="aspect-video w-full rounded-lg overflow-hidden mb-6">
          <iframe
            src={exercise.video_url}
            title={exercise.name}
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>

        {/* Description */}
        <p className="text-lg mb-6">{exercise.description}</p>

        {/* Instructions */}
        <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
        <ol className="list-decimal list-inside pl-4">
          {instructions.map((instruction) => (
            <li key={instruction.id} className="mb-2">
              {instruction.instruction}
            </li>
          ))}
        </ol>

        {user ? (
          // Content for logged-in users
          <>
            {/* Log Your Progress Form */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Log Your Progress</h2>
              <form
                onSubmit={handleLogSubmit}
                className="bg-gray-800 p-6 rounded-lg"
              >
                {/* Date Input */}
                <div className="mb-4">
                  <label
                    htmlFor="logDate"
                    className="block text-gray-400 text-sm font-medium mb-2"
                  >
                    Date:
                  </label>
                  <input
                    type="date"
                    id="logDate"
                    className="bg-gray-700 text-white border border-gray-600 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={logDate}
                    onChange={(e) => setLogDate(e.target.value)}
                  />
                </div>

                {/* Weight Input (only if is_weighted is true) */}
                {exercise.is_weighted && (
                  <div className="mb-4">
                    <label
                      htmlFor="weightLifted"
                      className="block text-gray-400 text-sm font-medium mb-2"
                    >
                      Weight Lifted (kg):
                    </label>
                    <input
                      type="number"
                      id="weightLifted"
                      className="bg-gray-700 text-white border border-gray-600 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={weightLifted}
                      onChange={(e) => setWeightLifted(e.target.value)}
                    />
                  </div>
                )}

                {/* Reps Input */}
                <div className="mb-4">
                  <label
                    htmlFor="repsCompleted"
                    className="block text-gray-400 text-sm font-medium mb-2"
                  >
                    Reps Completed:
                  </label>
                  <input
                    type="number"
                    id="repsCompleted"
                    className="bg-gray-700 text-white border border-gray-600 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={repsCompleted}
                    onChange={(e) => setRepsCompleted(e.target.value)}
                  />
                </div>

                {logFormError && (
                  <p className="text-red-500 text-sm">{logFormError}</p>
                )}

                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Log Progress
                </button>
              </form>
            </div>

            {/* Historical Data Graph */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Historical Data</h2>
              {/* Basic Line chart using react-chartjs-2 */}
              <Line data={chartData} />
            </div>
          </>
        ) : (
          // Show locked for unauthenticated users
          <div className="mt-8 flex items-center justify-center p-6 bg-gray-800 rounded-lg shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gray-500 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <p className="text-lg text-gray-400">
              Sign up now to start logging and tracking your progress!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseDetailPage;
