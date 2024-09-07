import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import exerciseRecordsService from "../../services/exerciseRecordsService";
import programmeExercisesService from "../../services/programmeExercisesService";
import exerciseService from "../../services/exerciseService";
import Snackbar from "../Snackbar";
import ExerciseCard from "../Cards/ExerciseCard";
import { Link } from "react-router-dom";

const LogExercisesModal = ({ isOpen, onClose, programmeId, onLogSuccess }) => {
  const { user } = useContext(AuthContext);
  const [loggedExercises, setLoggedExercises] = useState({});
  const [exercises, setExercises] = useState([]);
  const [programmeExercises, setProgrammeExercises] = useState([]);
  const [error, setError] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("error");

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        // Fetch programmeExercises along with exercise details
        const programmeExercisesData =
          await programmeExercisesService.getExercisesByProgrammeId(
            programmeId
          );
        setProgrammeExercises(programmeExercisesData);

        const exercisesData = await Promise.all(
          programmeExercisesData.map((pe) =>
            exerciseService.getExerciseById(pe.exercise_id)
          )
        );
        setExercises(exercisesData.flat());

        // Initialize loggedExercises state
        const initialLogData = {};
        exercisesData.flat().forEach((exercise) => {
          initialLogData[exercise.id] = {
            weight: "",
            repsCompleted: "",
            setsCompleted: "1",
            logDate: "",
          };
        });
        setLoggedExercises(initialLogData);
      } catch (error) {
        console.error("Error fetching exercises:", error);
        throwSnackbarError("Error fetching exercises. Please try again later.");
      }
    };

    if (isOpen && programmeId) {
      fetchExercises();
    }
  }, [isOpen, programmeId]);

  const handleInputChange = (e, exerciseId, field) => {
    setLoggedExercises((prevLogs) => ({
      ...prevLogs,
      [exerciseId]: { ...prevLogs[exerciseId], [field]: e.target.value },
    }));
  };

  const throwSnackbarError = (message) => {
    setSnackbarType("error");
    setSnackbarMessage(message);
    setShowSnackbar(true);
    setTimeout(() => {
      setShowSnackbar(false);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const hasMissingFields = Object.values(loggedExercises).some(
      (exerciseLog) => {
        return !exerciseLog.repsCompleted || !exerciseLog.setsCompleted;
      }
    );

    if (hasMissingFields) {
      throwSnackbarError("Please fill in all required fields.");
      return;
    }

    if (
      Object.values(loggedExercises).some((exerciseLog) => {
        return (
          parseInt(exerciseLog.repsCompleted) < 0 ||
          parseInt(exerciseLog.setsCompleted) < 0
        );
      })
    ) {
      throwSnackbarError("Reps and sets completed must be positive numbers.");
      return;
    }

    if (
      Object.values(loggedExercises).some((exerciseLog) => {
        return exerciseLog.weight != null && parseInt(exerciseLog.weight) < 0;
      })
    ) {
      throwSnackbarError("Weight must be a positive number.");
      return;
    }

    try {
      // Send log entries to the backend one by one
      await Promise.all(
        Object.entries(loggedExercises).map(async ([exerciseId, logData]) => {
          const requestData = {
            exercise_id: exerciseId,
            weight: parseFloat(logData.weight) || null,
            reps_completed: parseInt(logData.repsCompleted),
            sets_completed: parseInt(logData.setsCompleted),
          };

          await exerciseRecordsService.addExerciseRecordForProgrammeId(
            programmeId,
            requestData
          );
        })
      );

      onLogSuccess();
      onClose();
    } catch (error) {
      console.error("Error logging exercise records:", error);
      throwSnackbarError("Error logging records. Please try again later.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 text-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-2/3 h-auto text-white relative max-w-full overflow-y-auto">
        {showSnackbar && (
          <Snackbar message={snackbarMessage} type={snackbarType} />
        )}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-xl font-medium text-white mb-4">
          Log Records for Programme
        </h2>

        {/* Form for logging exercise records */}
        <form
          onSubmit={handleSubmit}
          className="w-full px-5 mx-auto overflow-y-auto max-h-[70vh]"
        >
          {exercises.map((exercise) => {
            // Find the corresponding programmeExercise data
            const programmeExercise = programmeExercises.find(
              (pe) => pe.exercise_id === exercise.id
            );

            return (
              <div key={exercise.id} className="mb-6">
                <Link
                  to={`/exercise/${exercise.name}`}
                  target="_blank"
                  state={{ exercise }}
                >
                  <ExerciseCard key={exercise.id} exercise={exercise} />
                </Link>
                {/* Subheader for Sets and Reps */}
                {programmeExercise && ( // Only display if programmeExercise is found
                  <p className="text-sm text-gray-500 mb-3 mt-5">
                    Target: {programmeExercise.sets} sets of{" "}
                    {programmeExercise.reps} reps
                  </p>
                )}
                {/* Weight Input (conditional) */}
                {exercise.is_weighted && (
                  <div className="mb-4">
                    <label
                      htmlFor={`weight-${exercise.id}`}
                      className="block text-gray-400 text-sm font-medium mb-2"
                    >
                      Weight Used (kg):
                    </label>
                    <input
                      type="number"
                      id={`weight-${exercise.id}`}
                      value={loggedExercises[exercise.id].weight}
                      onChange={(e) =>
                        handleInputChange(e, exercise.id, "weight")
                      }
                      className="bg-gray-700 text-white border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                      required
                    />
                  </div>
                )}

                {/* Reps Completed */}
                <div className="mb-4">
                  <label
                    htmlFor={`repsCompleted-${exercise.id}`}
                    className="block text-gray-400 text-sm font-medium mb-2"
                  >
                    Reps Completed:
                  </label>
                  <input
                    type="number"
                    id={`repsCompleted-${exercise.id}`}
                    value={loggedExercises[exercise.id].repsCompleted}
                    onChange={(e) =>
                      handleInputChange(e, exercise.id, "repsCompleted")
                    }
                    className="bg-gray-700 text-white border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    required
                  />
                </div>

                {/* Sets Completed */}
                <div className="mb-4">
                  <label
                    htmlFor={`setsCompleted-${exercise.id}`}
                    className="block text-gray-400 text-sm font-medium mb-2"
                  >
                    Sets Completed:
                  </label>
                  <input
                    type="number"
                    id={`setsCompleted-${exercise.id}`}
                    value={loggedExercises[exercise.id].setsCompleted}
                    onChange={(e) =>
                      handleInputChange(e, exercise.id, "setsCompleted")
                    }
                    className="bg-gray-700 text-white border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  />
                </div>
              </div>
            );
          })}

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Complete
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogExercisesModal;
