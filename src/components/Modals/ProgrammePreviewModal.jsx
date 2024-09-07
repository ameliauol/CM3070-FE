import React, { useState, useEffect, useContext } from "react";
import {
  getDurationUnit,
  printProgrammeDifficultyLevel,
} from "../../utils/printingHelpers";
import programmeExercisesService from "../../services/programmeExercisesService";
import exerciseService from "../../services/exerciseService";
import ExerciseCard from "../Cards/ExerciseCard";
import JoinProgrammeModal from "./JoinProgrammeModal";
import { AuthContext } from "../../context/AuthContext";

const ProgrammePreviewModal = ({
  isOpen,
  onClose,
  programme,
  setShowSnackbar,
  setSnackbarMessage,
  setSnackbarType,
}) => {
  if (!isOpen) return null;

  const { user } = useContext(AuthContext);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [showExercises, setShowExercises] = useState(false);
  const [execisesInProgramme, setExercisesInProgramme] = useState([]);
  const handleOpenJoinModal = () => {
    setIsJoinModalOpen(true);
  };

  const handleCloseJoinModal = () => {
    setIsJoinModalOpen(false);
  };

  const handleJoinSuccess = () => {
    setSnackbarMessage(
      "Successfully joined the programme! Let's get fit together!"
    );
    setSnackbarType("success");
    setShowSnackbar(true);
    setTimeout(() => {
      setShowSnackbar(false);
    }, 3000);
    handleCloseJoinModal();
    onClose(); // Close the preview modal
  };

  useEffect(() => {
    const fetchExercisesInProgramme = async () => {
      try {
        let programmeExercises =
          await programmeExercisesService.getExercisesByProgrammeId(
            programme.id
          );
        for (let i = 0; i < programmeExercises.length; i++) {
          await exerciseService
            .getExerciseById(programmeExercises[i].exercise_id)
            .then((response) => {
              const exercise = response[0];
              programmeExercises[i].name = exercise.name;
              programmeExercises[i].description = exercise.description;
              programmeExercises[i].category = exercise.category;
              programmeExercises[i].image_url = exercise.image_url;
            });
        }
        setExercisesInProgramme(programmeExercises);
      } catch (error) {
        console.error("Error fetching exercises:", error);
        setSnackbarMessage(
          "An error occurred while fetching exercises in programme. Please refresh the page or try again later."
        );
        setSnackbarType("error");
        setShowSnackbar(true);
        setTimeout(() => {
          setShowSnackbar(false);
        }, 3000);
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
      <div
        className={`bg-gray-800 p-8 rounded-lg shadow-md md:w-2/3 lg:w-2/3 ${
          showExercises ? "h-2/3" : "h-auto"
        } text-white relative max-w-full overflow-y-auto`}
      >
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
        <div className="relative flex-grow">
          {/* Container for swipe functionality */}
          {/* Programme Details */}
          <div
            className={`grid grid-cols-1 gap-4 transition-transform duration-300 ease-in-out 
               ${showExercises ? "-translate-x-full hidden" : ""} `}
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
                Difficulty:{" "}
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
              showExercises ? "translate-x-0" : "-translate-x-full hidden"
            }`}
          >
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-xl font-medium text-white mb-2">
                Exercises Included
              </h2>
              <ul className="text-gray-400 text-center w-full">
                {execisesInProgramme &&
                  execisesInProgramme.map((exercise) => (
                    <li key={exercise.id} className="flex justify-center mb-8">
                      <ExerciseCard exercise={exercise} />
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        {/* Swipe Arrow */}
        {showExercises ? (
          <button
            onClick={() => handleSwipe(showExercises ? "left" : "right")}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white rounded-full p-2"
          >
            {"<"}
          </button>
        ) : (
          <button
            onClick={() => handleSwipe(showExercises ? "left" : "right")}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white rounded-full p-2"
          >
            {">"}
          </button>
        )}
        {!showExercises && user ? (
          <button
            onClick={handleOpenJoinModal}
            className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Join Programme
          </button>
        ) : (
          !showExercises &&
          !user && (
            // Show locked for unauthenticated users
            <div className="mt-15 flex items-center justify-center p-6 bg-gray-700 rounded-lg shadow-md">
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
                Sign up or log in now to join programmes!
              </p>
            </div>
          )
        )}
        {/* Join Programme Modal */}
        <JoinProgrammeModal
          isOpen={isJoinModalOpen}
          onClose={handleCloseJoinModal}
          programme={programme}
          onJoinSuccess={handleJoinSuccess}
        />
      </div>
    </div>
  );
};

export default ProgrammePreviewModal;
