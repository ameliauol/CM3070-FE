import React, { useState, useEffect } from "react";
import ExerciseCard from "../components/Cards/ExerciseCard";
import Snackbar from "../components/Snackbar";
import exerciseService from "../services/exerciseService";

const ExerciseListingPage = () => {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [filters, setFilters] = useState({
    category: [],
    weighted: null,
  });
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const data = await exerciseService.getAllExercises();
        setExercises(data);
      } catch (error) {
        console.error("Error fetching exercises:", error);
        setSnackbarMessage(
          "An error occurred while fetching exercises. Please try again later."
        );
        setShowSnackbar(true);
        setTimeout(() => {
          setShowSnackbar(false);
        }, 3000);
      }
    };

    fetchExercises();
  }, []);

  useEffect(() => {
    const filtered = exercises.filter((exercise) => {
      const matchesCategory =
        filters.category.length === 0 ||
        filters.category.includes(exercise.category);
      const matchesWeighted =
        filters.weighted === null || filters.weighted === exercise.weighted;
      return matchesCategory && matchesWeighted;
    });
    setFilteredExercises(filtered);
  }, [exercises, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
      if (filterType === "weighted") {
        return {
          ...prevFilters,
          weighted: prevFilters.weighted === value ? null : value,
        };
      } else {
        if (prevFilters.category.includes(value)) {
          return {
            ...prevFilters,
            category: prevFilters.category.filter((cat) => cat !== value),
          };
        } else {
          return {
            ...prevFilters,
            category: [...prevFilters.category, value],
          };
        }
      }
    });
  };

  // TODO: consider adding title to the page
  return (
    <div className="bg-gray-900 text-white flex-grow">
      {/*<div className="container mx-auto py-8 px-6">
        <h2 className="text-2xl font-semibold mb-4">
          Popular Exercises
        </h2>
        <div className="bg-gray-700 p-4 flex space-x-4 overflow-x-auto">
        </div>
      </div>*/}
      {showSnackbar && <Snackbar message={snackbarMessage} type="error" />}
      <div className="container mx-auto py-8 px-6">
        {/* Search Bar and Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-3">
            <input
              type="text"
              placeholder="Search exercises..."
              className="bg-gray-800 text-white rounded-md py-2 px-4 w-full"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {filteredExercises.length > 0 ? (
                filteredExercises.map((exercise) => (
                  <ExerciseCard key={exercise.id} exercise={exercise} />
                ))
              ) : (
                <p className="text-gray-400 text-center">
                  No exercises found :(
                </p>
              )}
            </div>
          </div>

          {/* Filter Sidebar */}
          <div className="md:col-span-1 bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Filter List</h3>

            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="text-md font-medium mb-2">Category</h4>
              {[
                "chest",
                "back",
                "arms",
                "legs",
                "core",
                "full body",
                "shoulders",
                "others",
                "cardio",
              ].map((category) => (
                <button
                  key={category}
                  onClick={() => handleFilterChange("category", category)}
                  className={`
                  inline-block px-3 py-1 rounded-md text-sm font-medium mr-2 mb-2 
                  ${
                    filters.category.includes(category)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 hover:bg-gray-600"
                  }
                `}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Weighted Filter */}
            <div>
              <h4 className="text-md font-medium mb-2">Resistance Type</h4>
              <button
                onClick={() => handleFilterChange("weighted", true)}
                className={`
                inline-block px-3 py-1 rounded-md text-sm font-medium mr-2 mb-2 
                ${
                  filters.weighted === true
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 hover:bg-gray-600"
                }
              `}
              >
                External Weights
              </button>
              <button
                onClick={() => handleFilterChange("weighted", false)}
                className={`
                inline-block px-3 py-1 rounded-md text-sm font-medium 
                ${
                  filters.weighted === false
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 hover:bg-gray-600"
                }
              `}
              >
                Body Weight
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseListingPage;
