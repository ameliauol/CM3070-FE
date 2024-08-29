import React, { useState, useEffect } from "react";
import {
  getDurationUnit,
  printProgrammeDifficultyLevel,
} from "../../utils/printingHelpers";
import programmeExercisesService from "../../services/programmeExercisesService";
import exerciseService from "../../services/exerciseService";

const ProgrammePreviewModal = ({ isOpen, onClose, programme }) => {
  if (!isOpen) return null;

  const [showExercises, setShowExercises] = useState(false);
  const [execisesInProgramme, setExercisesInProgramme] = useState([]);

  useEffect(() => {
    const fetchExercisesInProgramme = async () => {
      try {
        const programmeExercises =
          await programmeExercisesService.getExercisesByProgrammeId(
            programme.id
          );
        console.log(programmeExercises);
        setExercisesInProgramme(programmeExercises);
      } catch (error) {
        console.error("Error fetching exercises:", error);
        // setSnackbarMessage(
        //   "An error occurred while fetching exercises in programme. Please refresh the page or try again later."
        // );
        // setShowSnackbar(true);
        // setTimeout(() => {
        //   setShowSnackbar(false);
        // }, 3000);
      }
    };

    fetchExercisesInProgramme();
  }, []);

  const handleSwipe = (direction) => {
    if (direction === "right" && !showExercises) {
      setShowExercises(true);
    } else if (direction === "left" && showExercises) {
      setShowExercises(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 text-center -mb-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-1/2 h-2/3 text-white relative max-w-full overflow-y-auto">
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
        {/* Programme Preview Content */}
        <div className="relative">
          {/* Container for swipe functionality */}
          {/* Programme Details */}
          <div
            className={`grid grid-cols-1 gap-4 transition-transform duration-300 ease-in-out ${
              showExercises ? "-translate-x-full" : ""
            }`}
          >
            <img
              src={programme.image_url || "https://via.placeholder.com/300x200"}
              alt={programme.name}
              className="flex w-full h-70 object-cover rounded-lg mt-5"
            />
            <div>
              <h2 className="text-xl font-medium text-white mb-2">
                {programme.name}
              </h2>
              <p className="text-gray-400 text-sm line-clamp-3">
                {programme.description}
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Difficulty:
                {printProgrammeDifficultyLevel(programme.difficulty_level)}
                -friendly
              </p>
              <p className="text-gray-400 text-sm">
                Duration: {getDurationUnit(programme.est_duration)}
              </p>
            </div>
          </div>

          {/* Exercise List */}
          <div
            className={`grid grid-cols-1 gap-4 transition-transform duration-300 ease-in-out absolute top-0 left-0 w-full ${
              showExercises ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div>
              <h2 className="text-xl font-medium text-white mb-2">
                Exercises Included:
              </h2>
              <ul className="text-gray-400 text-base list-disc pl-6 text-left">
                {execisesInProgramme &&
                  execisesInProgramme.map((exercise) => (
                    <li key={exercise.id}>{exercise.exercise_name}</li>
                  ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Swipe Arrow */}
        <button
          onClick={() => handleSwipe(showExercises ? "left" : "right")}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white rounded-full p-2"
        >
          {showExercises ? "<" : ">"}
        </button>

        <button
          onClick={onClose} // TODO: handle the "Start Program" action (e.g., joinProgramme)
          className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Join Program
        </button>
      </div>
    </div>
  );
};

export default ProgrammePreviewModal;
