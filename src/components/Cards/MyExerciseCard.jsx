import React, { useState, useEffect } from "react";
import userExercisesService from "../../services/userExercisesService";

const MyExerciseCard = ({
  userExerciseLogs,
  onGoalUpdate,
  setShowSnackbar,
  setSnackbarType,
  setSnackbarMessage,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoals, setEditedGoals] = useState({});

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (isExpanded) {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isExpanded || isEditing) {
      setEditedGoals(
        userExerciseLogs.programmes.reduce((acc, userExercise) => {
          acc[userExercise.userExerciseId] = {
            goal_reps: userExercise.goal_reps,
            goal_weight: userExercise.goal_weight,
            start_reps: userExercise.start_reps,
            start_weight: userExercise.start_weight,
          };
          return acc;
        }, {})
      );
    }
  }, [isExpanded, isEditing, userExerciseLogs.programmes]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e, userProgrammeId, field) => {
    setEditedGoals((prevGoals) => ({
      ...prevGoals,
      [userProgrammeId]: {
        ...prevGoals[userProgrammeId],
        [field]: e.target.value,
      },
    }));
  };

  const handleUpdateGoals = async (userExerciseId, exercise_is_weighted) => {
    try {
      if (
        editedGoals[userExerciseId].goal_reps === "" ||
        editedGoals[userExerciseId].goal_reps < 0 ||
        editedGoals[userExerciseId].start_reps === "" ||
        editedGoals[userExerciseId].start_reps < 0
      ) {
        setSnackbarMessage(
          "Please enter a valid number for your repetition goals."
        );
        setSnackbarType("error");
        setShowSnackbar(true);
        setTimeout(() => {
          setShowSnackbar(false);
        }, 3000);
        return;
      }

      let updatedGoals = {
        goal_reps: parseInt(editedGoals[userExerciseId].goal_reps) || null,
        start_reps: parseInt(editedGoals[userExerciseId].start_reps) || null,
      };
      if (exercise_is_weighted) {
        if (
          editedGoals[userExerciseId].goal_weight === "" ||
          editedGoals[userExerciseId].goal_weight < 0 ||
          editedGoals[userExerciseId].start_weight === "" ||
          editedGoals[userExerciseId].start_weight < 0
        ) {
          setSnackbarMessage(
            "Please enter a valid number for your weight goals."
          );
          setSnackbarType("error");
          setShowSnackbar(true);
          setTimeout(() => {
            setShowSnackbar(false);
          }, 3000);
          return;
        }

        updatedGoals.goal_weight =
          parseInt(editedGoals[userExerciseId].goal_weight) || null;
        updatedGoals.start_weight =
          parseInt(editedGoals[userExerciseId].start_weight) || null;
      }

      await userExercisesService.updateUserExerciseById(
        userExerciseId,
        updatedGoals
      );

      setSnackbarMessage("Exercise goals updated successfully!");
      setSnackbarType("success");
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
      }, 3000);
      onGoalUpdate();
      setIsEditing(false);
    } catch (error) {
      setSnackbarMessage("Error updating exercise goals:", error);
      setSnackbarType("error");
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
      }, 3000);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-md relative">
      <img
        src={userExerciseLogs.exercise_image}
        alt={userExerciseLogs.exercise_name}
        className="w-full h-36 object-cover rounded-md mb-4"
      />

      {/* Expandable Section */}
      <div>
        {/* Expand/Collapse Button (including exercise name) */}
        <button
          onClick={toggleExpand}
          className="hover:text-white flex flex-row items-center justify-between w-full text-gray-400 "
        >
          {/* Exercise Name */}
          <h3 className="text-lg font-medium text-white mb-2">
            {userExerciseLogs.exercise_name}
          </h3>
          {isExpanded ? "▲" : "▼"}
        </button>
        {isExpanded && (
          <div>
            <ul>
              {userExerciseLogs.programmes.map((userExercise) => (
                <li key={userExercise.userExerciseId}>
                  <div className="bg-gray-700 p-3 rounded-md mb-2">
                    <div className="flex justify-between">
                      <p className="text-sm text-white font-medium">
                        {userExercise.programme_name}
                      </p>
                      {/* Edit Goals Button (Pencil Icon) */}
                      {isExpanded && !isEditing ? ( // Only show pencil icon when not editing
                        <button
                          onClick={handleEditClick}
                          className="relative text-gray-400 hover:text-white" // Adjusted styling
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                      ) : (
                        isExpanded &&
                        isEditing && (
                          <button
                            onClick={() =>
                              handleUpdateGoals(
                                userExercise.userExerciseId,
                                userExerciseLogs.exercise_is_weighted
                              )
                            }
                            className="relative text-gray-400 hover:text-green-600" // Adjusted styling and positioning
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        )
                      )}
                    </div>
                    {/* Display or Edit Goals based on isEditing state */}
                    {isEditing ? (
                      // Editable Input Fields
                      <div className="text-xs text-gray-400 mt-2 grid grid-cols-2">
                        <div className="mb-2">
                          <label className="mr-2 ">Starting Reps:</label>
                          <input
                            type="number"
                            value={
                              editedGoals[userExercise.userExerciseId]
                                .start_reps || ""
                            }
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                userExercise.userExerciseId,
                                "start_reps"
                              )
                            }
                            className="bg-gray-600 text-white border border-gray-500 rounded-md py-1 px-2 w-16 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="mr-2">Goal Reps:</label>
                          <input
                            type="number"
                            value={
                              editedGoals[userExercise.userExerciseId]
                                .goal_reps || ""
                            }
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                userExercise.userExerciseId,
                                "goal_reps"
                              )
                            }
                            className="bg-gray-600 text-white border border-gray-500 rounded-md py-1 px-2 w-16 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        {userExerciseLogs.exercise_is_weighted && (
                          <>
                            <div>
                              <label className="mr-2">Starting Weight:</label>
                              <input
                                type="number"
                                value={
                                  editedGoals[userExercise.userExerciseId]
                                    .start_weight || ""
                                }
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    userExercise.userExerciseId,
                                    "start_weight"
                                  )
                                }
                                className="bg-gray-600 text-white border border-gray-500 rounded-md py-1 px-2 w-16 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />{" "}
                              kg
                            </div>
                            <div>
                              <label className="mr-2">Goal Weight:</label>
                              <input
                                type="number"
                                value={
                                  editedGoals[userExercise.userExerciseId]
                                    .goal_weight || ""
                                }
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    userExercise.userExerciseId,
                                    "goal_weight"
                                  )
                                }
                                className="bg-gray-600 text-white border border-gray-500 rounded-md py-1 px-2 w-16 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />{" "}
                              kg
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      // Display Goals
                      <div className="text-xs text-gray-400 mt-2">
                        <p>
                          Starting Reps: {userExercise.start_reps} | Goal Reps:{" "}
                          {userExercise.goal_reps}
                        </p>
                        {userExerciseLogs.exercise_is_weighted && (
                          <p>
                            Starting Weight: {userExercise.start_weight} kg |
                            Goal Weight: {userExercise.goal_weight} kg
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyExerciseCard;
