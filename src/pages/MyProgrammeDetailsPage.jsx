// src/pages/profile/MyProgrammeDetailsPage.jsx
import React, { useState, useEffect, useContext } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import programmeService from "../services/programmeService";
import programmeExercisesService from "../services/programmeExercisesService";
import exerciseService from "../services/exerciseService";
import exerciseRecordsService from "../services/exerciseRecordsService";
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
import ExerciseCard from "../components/Cards/ExerciseCard";
import {
  printProgrammeDifficultyLevel,
  getDurationUnit,
  formatActiveDaysRaw,
} from "../utils/printingHelpers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MyProgrammeDetailsPage = () => {
  const { programmeId } = useParams();
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const [programme, setProgramme] = useState(location.state?.programme);
  const [exerciseRecords, setExerciseRecords] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgrammeDetails = async () => {
      setIsLoading(true);
      try {
        if (!programme) {
          const programmeData = await programmeService.getProgrammeById(
            programmeId
          );
          setProgramme(programmeData);
        }
        const programmeExercisesData =
          await programmeExercisesService.getExercisesByProgrammeId(
            programmeId
          );
        const exercisesData = await Promise.all(
          programmeExercisesData.map((pe) =>
            exerciseService.getExerciseById(pe.exercise_id)
          )
        );
        const combinedExercises = exercisesData
          .flat()
          .map((exercise) => {
            // Find matching programmeExercisesData based on exercise_id
            const matchingProgrammeExercises = programmeExercisesData.filter(
              (pe) => pe.exercise_id === exercise.id
            );

            // Create an array of flat objects by mapping over the matchingProgrammeExercises
            return matchingProgrammeExercises.map((programmeExercise) => ({
              ...exercise, // Include all exercise data
              ...programmeExercise, // Spread programmeExercise properties into the same object
            }));
          })
          .flat();
        setExercises(combinedExercises);
        const exerciseRecordsData =
          await exerciseRecordsService.getExerciseRecordsByProgrammeId(
            programmeId
          );
        setExerciseRecords(exerciseRecordsData);
      } catch (error) {
        console.error("Error fetching programme details:", error);
        setError("Error fetching programme details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchProgrammeDetails();
    }
  }, [programmeId, user, programme]);

  const activeDaysPerWeek = programme.active_days.split(",").length;

  // Group exercise records by exercise_id
  const groupedExerciseRecords = exerciseRecords.reduce((acc, record) => {
    if (!acc[record.exercise_name]) {
      acc[record.exercise_name] = [];
    }
    acc[record.exercise_name].push(record);
    return acc;
  }, {});

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

  if (!programme) {
    return (
      <div className="container mx-auto p-4 text-center">
        Programme not found.
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex-grow p-4">
      <div className="container mx-auto">
        <div className="relative h-[50vh] rounded-lg overflow-hidden">
          <img
            src={programme.image_url}
            alt={programme.name}
            className="object-cover w-full h-full"
          />
          {/* Programme Description */}
          <div className="absolute text-center bottom-0 left-0 w-full bg-black bg-opacity-50 py-4 px-6">
            <h2 className="text-xl font-bold text-white">{programme.name}</h2>
            <p className="text-gray-400">{programme.description}</p>
          </div>
        </div>

        {/* Programme Settings */}
        <div className="bg-gray-800 p-4 rounded-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Program Settings</h2>
          <p className="text-gray-400">
            Days/week: {activeDaysPerWeek} (
            {formatActiveDaysRaw(programme.active_days)})
          </p>
          <p className="text-gray-400">
            Program Duration:{" "}
            {programme ? getDurationUnit(programme.est_duration) : ""}
          </p>
          <p className="text-gray-400">
            Difficult Level:{" "}
            {printProgrammeDifficultyLevel(programme.difficulty_level)}-friendly
          </p>
        </div>
        {/* Exercises Section */}
        <h2 className="text-2xl font-semibold mb-4 mt-20">Exercises</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-x-auto align-middle text-center w-full">
          {exercises &&
            exercises.map((exercise) => (
              <Link
                to={`/exercise/${exercise.name}`}
                target="_blank"
                state={{ exercise }}
                className="flex-shrink-0"
              >
                <ExerciseCard key={exercise.id} exercise={exercise} />
              </Link>
            ))}
        </div>

        <h2 className="text-2xl font-semibold mb-4 mt-20">Exercises Records</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exercises.map((exercise) => {
            const exerciseRecordsForExercise =
              groupedExerciseRecords[exercise.name] || [];
            const chartData = {
              labels: exerciseRecordsForExercise.map((record) =>
                record.date_achieved.slice(0, 10)
              ),
              datasets: [
                {
                  label: exercise.is_weighted
                    ? "Weight (kg)"
                    : "Reps Completed",
                  data: exercise.is_weighted
                    ? exerciseRecordsForExercise.map((record) => record.weight)
                    : exerciseRecordsForExercise.map(
                        (record) => record.reps_completed
                      ),
                  fill: false,
                  borderColor: "rgb(75, 192, 192)",
                  tension: 0.1,
                },
              ],
            };

            return (
              <div key={exercise.id} className="bg-gray-800 p-4 rounded-md">
                <Link
                  to={`/exercise/${exercise.name}`}
                  target="_blank"
                  className="flex items-center"
                >
                  <h3 className="text-lg font-medium text-white mb-2">
                    {exercise.name}
                  </h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </Link>

                {/* Display Sets and Reps from programmeExercise */}
                <p className="text-sm text-gray-400">
                  Target Sets: {exercise.sets} | Target Reps: {exercise.reps}
                </p>

                {/* Exercise Data Graph */}
                <div className="mt-4">
                  <Line data={chartData} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyProgrammeDetailsPage;
