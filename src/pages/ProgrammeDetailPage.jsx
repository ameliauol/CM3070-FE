import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import programmeService from "../services/programmeService";
import programmeExercisesService from "../services/programmeExercisesService";

const ProgrammeDetailsPage = () => {
  const { programmeId } = useParams();
  const [programme, setProgramme] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgrammeDetails = async () => {
      setIsLoading(true);
      try {
        const programmeData = await programmeService.getProgrammeById(
          programmeId
        );
        setProgramme(programmeData);
        const exercisesData =
          await programmeExercisesService.getExercisesByProgrammeId(
            programmeId
          );
        setExercises(exercisesData);
      } catch (error) {
        console.error("Error fetching programme details:", error);
        setError("Error fetching programme details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgrammeDetails();
  }, [programmeId]); // Fetch details whenever programmeId changes

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
        <h1 className="text-3xl font-bold mb-4">{programme.name}</h1>

        {/* ... (Rest of your Programme Details content) ... */}
      </div>
    </div>
  );
};

export default ProgrammeDetailsPage;
