import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import exerciseService from "../services/exerciseService";
import exerciseInstructionsService from "../services/exerciseInstructionsService";
import Snackbar from "../components/Snackbar";

const ExerciseDetailPage = () => {
  const { exerciseName } = useParams();

  const location = useLocation();
  const [exercise, setExercise] = useState(location.state?.exercise || null);
  const [instructions, setInstructions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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

        {/* Description */}
        <p className="text-lg mb-8">{exercise.description}</p>

        {/* Video */}
        <div className="w-full rounded-lg overflow-hidden mb-12">
          <iframe
            width="100%"
            height="500"
            src={exercise.video_url}
            title={exercise.name}
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            style={{ borderRadius: "8px" }}
          />
        </div>

        {/* Instructions */}
        <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
        <ol className="list-decimal list-inside pl-4 mb-12">
          {instructions.map((instruction) => (
            <li key={instruction.id} className="mb-2">
              {instruction.instruction}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default ExerciseDetailPage;
