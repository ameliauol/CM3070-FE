import React, { useState, useEffect } from "react";
import ExerciseCard from "../components/Cards/ExerciseCard";
import Snackbar from "../components/Snackbar";
import { Link } from "react-router-dom";
import exerciseService from "../services/exerciseService";

const ExerciseListingPage = () => {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [filters, setFilters] = useState({
    category: [],
    is_weighted: null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const data = await exerciseService.getAllExercises();
        setExercises(data);
      } catch (error) {
        console.error("Error fetching exercises:", error);
        setSnackbarMessage(
          "An error occurred while fetching exercises. Please refresh the page or try again later."
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
        filters.is_weighted === null ||
        filters.is_weighted === exercise.is_weighted;
      const matchesSearch = exercise.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesWeighted && matchesSearch;
    });
    setFilteredExercises(filtered);
  }, [exercises, filters, searchTerm]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
      if (filterType === "is_weighted") {
        return {
          ...prevFilters,
          is_weighted: prevFilters.is_weighted === value ? null : value,
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

  //  TODO: Consider adding scrolling list of popular exercises
  return (
    <div className="bg-slate-900 text-white flex-grow">
      {/* Optional scrolling list (commented out for now) */}
      {/* <div className="container mx-auto py-8 px-6">
        <h2 className="text-2xl font-semibold mb-4">
          Popular Exercises
        </h2>
        <div className="bg-gray-700 p-4 flex space-x-4 overflow-x-auto">
        </div>
      </div> */}

      {showSnackbar && <Snackbar message={snackbarMessage} type="error" />}

      <div className="container mx-auto py-8 px-6">
        {/* Outer Grid - Search/Filter vs. Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Exercise Cards Grid */}
          <div className="md:col-span-3 order-last md:order-first">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredExercises.length > 0 ? (
                filteredExercises.map((exercise) => (
                  <Link to={`/exercise/${exercise.name}`} state={{ exercise }}>
                    <ExerciseCard key={exercise.id} exercise={exercise} />
                  </Link>
                ))
              ) : (
                <p className="text-gray-400 text-center">
                  No exercises found :(
                </p>
              )}
            </div>
          </div>
          {/* Search and Filter Section (Inner Grid) */}
          <div className="overflow-y-auto">
            {/* Search Bar */}
            <div className="h-12 mb-4">
              <input
                type="text"
                placeholder="Search exercises..."
                className="bg-gray-800 text-white rounded-md py-2 px-4 w-full"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            {/* Filter Sidebar */}
            <div className="bg-gray-800 py-4 px-6 rounded-lg">
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
                  onClick={() => handleFilterChange("is_weighted", true)}
                  className={`
                    inline-block px-3 py-1 rounded-md text-sm font-medium mr-2 mb-2 
                    ${
                      filters.is_weighted === true
                        ? "bg-blue-500 text-white"
                        : "bg-gray-700 hover:bg-gray-600"
                    }
                  `}
                >
                  External Weights
                </button>
                <button
                  onClick={() => handleFilterChange("is_weighted", false)}
                  className={`
                    inline-block px-3 py-1 rounded-md text-sm font-medium 
                    ${
                      filters.is_weighted === false
                        ? "bg-blue-500 text-white"
                        : "bg-gray-700 hover:bg-gray-600"
                    }
                  `}
                >
                  Body Weight
                </button>
              </div>
            </div>
            {/* End of Filter Sidebar */}
          </div>
          {/* End of Search and Filter Section */}
        </div>
        {/* End of Outer Grid */}
      </div>
    </div>
  );
};

export default ExerciseListingPage;
