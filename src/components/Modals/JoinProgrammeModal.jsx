import React, { useState, useEffect, useContext } from "react";
import programmeExercisesService from "../../services/programmeExercisesService";
import exerciseService from "../../services/exerciseService";
import { AuthContext } from "../../context/AuthContext";
import userProgrammesService from "../../services/userProgrammesService";
import ExerciseCard from "../Cards/ExerciseCard";
import Snackbar from "../Snackbar";

const JoinProgrammeModal = ({ isOpen, onClose, programme, onJoinSuccess }) => {
  const { user } = useContext(AuthContext);
  const [selectedDays, setSelectedDays] = useState([]);
  const [currentWeights, setCurrentWeights] = useState({});
  const [goalWeights, setGoalWeights] = useState({});
  const [currentReps, setCurrentReps] = useState({});
  const [goalReps, setGoalReps] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchExercisesInProgramme = async () => {
      try {
        let programmeExercises =
          await programmeExercisesService.getExercisesByProgrammeId(
            programme.id
          );
        const exercisesData = await Promise.all(
          programmeExercises.map((pe) =>
            exerciseService.getExerciseById(pe.exercise_id)
          )
        );
        setExercises(exercisesData.flat());
      } catch (error) {
        // This catch block handles errors from other parts of the fetching process
        console.error("Error fetching data:", error);
        setSnackbarMessage(error.response?.data?.error || "An error occurred.");
        setShowSnackbar(true);
        setTimeout(() => {
          setShowSnackbar(false);
        }, 3000);
      }
    };

    if (isOpen && programme) {
      fetchExercisesInProgramme();
    }
  }, [isOpen, programme]);

  const handleDaySelection = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleWeightChange = (exerciseId, value, type) => {
    if (type === "current") {
      setCurrentWeights((prev) => ({ ...prev, [exerciseId]: value }));
    } else {
      setGoalWeights((prev) => ({ ...prev, [exerciseId]: value }));
    }
  };

  const handleRepsChange = (exerciseId, value, type) => {
    if (type === "current") {
      setCurrentReps((prev) => ({ ...prev, [exerciseId]: value }));
    } else {
      setGoalReps((prev) => ({ ...prev, [exerciseId]: value }));
    }
  };

  const handleSubmit = async () => {
    if (selectedDays.length === 0) {
      setSnackbarMessage("Please select at least one day.");
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
      }, 3000);
      return;
    }

    const hasMissingGoals = exercises.some((exercise) => {
      if (exercise.is_weighted) {
        return !currentWeights[exercise.id] || !goalWeights[exercise.id];
      } else {
        return !currentReps[exercise.id] || !goalReps[exercise.id];
      }
    });

    if (hasMissingGoals) {
      setError("Please fill in all goal fields.");
      return;
    }

    try {
      const allUserProgrammes =
        await userProgrammesService.getAllUserProgrammes();
      const totalActiveDays = allUserProgrammes.reduce(
        (sum, program) => sum + program.active_days.length,
        0
      );

      if (totalActiveDays + selectedDays.length > 5) {
        setError("Total active days across all programs cannot exceed 5.");
        return;
      }

      if (allUserProgrammes.length === 0 && selectedDays.length > 3) {
        setError("Your first program can have a maximum of 3 active days.");
        return;
      }

      await userProgrammesService.joinProgramme(programme.id, selectedDays);

      // TODO: Call API to save user goals for each exercise
      // using currentWeights, goalWeights, currentReps, goalReps

      onJoinSuccess();
      onClose();
    } catch (error) {
      console.error("Error joining program:", error);
      setError("Error joining program. Please try again later.");
    }
  };

  const handleOnClose = () => {
    setError(null);
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 text-center">
      <div className="bg-gray-800 py-8 rounded-lg shadow-md w-3/4 text-white relative max-w-full overflow-y-auto">
        {showSnackbar && <Snackbar message={snackbarMessage} type="error" />}
        <button
          onClick={handleOnClose}
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
        <div className="relative py-4 overflow-y-auto max-h-[80vh]">
          {/* Swipeable Content */}
          <div className="relative overflow-y-auto">
            {/* Step 1: Day Selection */}
            <div className="transition-transform duration-300 ease-in-out">
              <div className="bg-slate-900 w-full py-2 mb-8 mt-2">
                <h2 className="text-xl font-medium text-white mb-2">
                  Which Days Should We Run This Programme?
                </h2>
                <p className="text-white text-sm">
                  <i>
                    Please note the constraint on the number of active days you
                    can have across all programs is 5 <br />
                    (i.e. total number of active days = 5)
                  </i>
                </p>
              </div>
              <div className="flex space-x-4 justify-center">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day) => (
                    <button
                      key={day}
                      onClick={() => handleDaySelection(day)}
                      className={`px-4 py-2 rounded-md font-medium ${
                        selectedDays.includes(day)
                          ? "bg-blue-500 text-white"
                          : "bg-gray-700 hover:bg-gray-600"
                      }`}
                    >
                      {day}
                    </button>
                  )
                )}
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            {/* Step 2: Exercise Goal Setting */}
            <div className="transition-transform duration-300 ease-in-out h-full mt-20">
              <div className="flex flex-col items-center justify-center">
                <div className="bg-slate-900 w-full py-2 mb-8 mt-2 mb-5">
                  <h2 className="text-xl font-medium text-white mb-2">
                    Goal Setting
                  </h2>
                  <p className="text-white text-sm">
                    <i>
                      Please set your goals for each exercise. You must fill in
                      all goal fields to proceed.
                    </i>
                  </p>
                </div>
                {exercises.map((exercise) => (
                  <div key={exercise.id} className="mb-4">
                    <ExerciseCard exercise={exercise} />
                    <div className="grid grid-cols-2 gap-4 mt-10 mb-10">
                      {/* Reps Fields (always shown) */}
                      <div className="flex justify-center items-center mb-2 order-1">
                        <label
                          htmlFor={`currentReps-${exercise.id}`}
                          className="block text-sm font-medium mr-2"
                        >
                          Current Reps:
                        </label>
                        <input
                          type="number"
                          id={`currentReps-${exercise.id}`}
                          className="bg-gray-700 text-white border border-gray-600 rounded-md py-2 px-3 w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={currentReps[exercise.id] || ""}
                          onChange={(e) =>
                            handleRepsChange(
                              exercise.id,
                              e.target.value,
                              "current"
                            )
                          }
                        />
                      </div>
                      <div className="flex items-center justify-center order-2">
                        <label
                          htmlFor={`goalReps-${exercise.id}`}
                          className="block text-sm font-medium mr-2"
                        >
                          Goal Reps:
                        </label>
                        <input
                          type="number"
                          id={`goalReps-${exercise.id}`}
                          className="bg-gray-700 text-white border border-gray-600 rounded-md py-2 px-3 w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={goalReps[exercise.id] || ""}
                          onChange={(e) =>
                            handleRepsChange(
                              exercise.id,
                              e.target.value,
                              "goal"
                            )
                          }
                        />
                      </div>
                      {/* Weight Fields (only shown if is_weighted is true) */}
                      {exercise.is_weighted && (
                        <>
                          <div className="flex justify-center items-center mb-2 order-2">
                            <label
                              htmlFor={`currentWeight-${exercise.id}`}
                              className="block text-sm font-medium mr-2"
                            >
                              Current Weight Lifted (kg):
                            </label>
                            <input
                              type="number"
                              id={`currentWeight-${exercise.id}`}
                              className="bg-gray-700 text-white border border-gray-600 rounded-md py-2 px-3 w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={currentWeights[exercise.id] || ""}
                              onChange={(e) =>
                                handleWeightChange(
                                  exercise.id,
                                  e.target.value,
                                  "current"
                                )
                              }
                            />
                          </div>
                          <div className="flex justify-center items-center mb-2 order-4">
                            <label
                              htmlFor={`goalWeight-${exercise.id}`}
                              className="block text-sm font-medium mr-2"
                            >
                              Goal Weight To Lift (kg):
                            </label>
                            <input
                              type="number"
                              id={`goalWeight-${exercise.id}`}
                              className="bg-gray-700 text-white border border-gray-600 rounded-md py-2 px-3 w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={goalWeights[exercise.id] || ""}
                              onChange={(e) =>
                                handleWeightChange(
                                  exercise.id,
                                  e.target.value,
                                  "goal"
                                )
                              }
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Navigation Buttons (Outside Swipeable Content) */}
            <div className="flex justify-between px-8 py-2 z-10">
              <button
                onClick={handleOnClose}
                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded"
              >
                Back
              </button>

              <button
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Complete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinProgrammeModal;
