import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import programmeService from "../services/programmeService";
import programmeExercisesService from "../services/programmeExercisesService"; // Import to get exercise count

const ProgrammesPage = () => {
  const [programmes, setProgrammes] = useState([]);
  const [filteredProgrammes, setFilteredProgrammes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProgrammesAndExercises = async () => {
      setIsLoading(true);
      try {
        const programmesData = await programmeService.getAllProgrammes();

        // Fetch exercises for multiple programmes concurrently
        const exercisePromises = programmesData.map((programme) =>
          programmeExercisesService.getExercisesByProgrammeId(programme.id)
        );
        const exercisesResults = await Promise.all(exercisePromises);

        // Combine programmes and exercises
        const programmesWithExercises = programmesData.map(
          (programme, index) => ({
            ...programme,
            exercises: exercisesResults[index], // Associate exercises with the corresponding programme
          })
        );

        setProgrammes(programmesWithExercises);
        setFilteredProgrammes(programmesWithExercises);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgrammesAndExercises();
  }, []);

  useEffect(() => {
    const filterProgrammes = () => {
      let filtered = programmes;

      if (searchTerm) {
        filtered = filtered.filter((programme) =>
          programme.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredProgrammes(filtered);
    };

    filterProgrammes();
  }, [searchTerm, programmes]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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
    <div className="bg-gray-900 text-white min-h-screen flex-grow p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">Programmes</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Filter Sidebar */}
          <div className="py-4 rounded-lg col-span-full">
            <input
              type="text"
              placeholder="Search programmes..."
              className="bg-gray-700 text-white rounded-md py-2 px-4 w-1/2"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          {/* Programme Cards Grid */}
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 gap-4">
              {filteredProgrammes.map((programme) => (
                <Link key={programme.id} to={`/programme/${programme.id}`}>
                  <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                    {/* Image */}
                    <img
                      src={
                        programme.image_url ||
                        "https://via.placeholder.com/300x200"
                      }
                      alt={programme.name}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <div>
                      <h3 className="text-lg font-medium text-white mb-2">
                        {programme.name}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-3 min-h-8">
                        {programme.description}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {programme.exercises.length} Exercises
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgrammesPage;
