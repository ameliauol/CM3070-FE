import React, { useState, useEffect, useContext } from "react";
import ExerciseCard from "../components/Cards/ExerciseCard";
import Snackbar from "../components/Snackbar";
import { Link } from "react-router-dom";
import exerciseService from "../services/exerciseService";
import { AuthContext } from "../context/AuthContext";
import MyExercises from "./profile/MyExercises";

const ExerciseListingPage = () => {
  const { user } = useContext(AuthContext);
  const [viewMode, setViewMode] = useState("all");

  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [filters, setFilters] = useState({
    category: [],
    is_weighted: null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("error");
  const [curatedExercises, setCuratedExercises] = useState([]);
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX && touchEndX) {
      const difference = touchStartX - touchEndX;
      if (difference > 50) {
        setActiveBannerIndex((prevIndex) => (prevIndex + 1) % 3);
      } else if (difference < -50) {
        setActiveBannerIndex((prevIndex) => (prevIndex - 1 + 3) % 3);
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const handlePrev = () => {
    setActiveBannerIndex((prevIndex) => (prevIndex - 1 + 3) % 3);
  };

  const handleNext = () => {
    setActiveBannerIndex((prevIndex) => (prevIndex + 1) % 3);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBannerIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchExercises = async () => {
      setIsLoading(true);
      try {
        const data = await exerciseService.getAllExercises();
        setExercises(data);

        for (const exercise of data) {
          if (
            ["Bench Press", "Deadlift", "Squats"].indexOf(exercise.name) != -1
          ) {
            setCuratedExercises((prev) => [...prev, exercise]);
          }
        }
      } catch (error) {
        console.error("Error fetching exercises:", error);
        setSnackbarMessage(
          "An error occurred while fetching exercises. Please refresh the page or try again later."
        );
        setSnackbarType("error");
        setShowSnackbar(true);
        setTimeout(() => {
          setShowSnackbar(false);
        }, 3000);
      } finally {
        setIsLoading(false);
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

  if (isLoading) {
    return <div className="container mx-auto p-4 text-center">Loading...</div>;
  }

  return (
    <div className="bg-slate-900 text-white flex-grow">
      {showSnackbar && (
        <Snackbar message={snackbarMessage} type={snackbarType} />
      )}

      <div className="container mx-auto py-8 px-6">
        <div className="md:col-span-3 flex justify-start mb-4">
          {/* All Programmes Button (show only if user is logged in) */}
          {user && (
            <button
              onClick={() => setViewMode("all")}
              className={`px-4 py-2 rounded-l-md font-medium text-gray-700
                     ${
                       viewMode === "all"
                         ? "bg-gray-800 text-white"
                         : "bg-gray-600 text-gray-200 opacity-50"
                     }`}
            >
              All Exercises
            </button>
          )}

          {/* My Programmes Button (show only if user is logged in) */}
          {user && (
            <button
              onClick={() => setViewMode("my")}
              className={`px-4 py-2 rounded-r-md font-medium text-gray-700 
                       ${
                         viewMode === "my"
                           ? "bg-gray-800 text-white"
                           : "bg-gray-600 text-gray-200 opacity-50"
                       }`}
            >
              My Exercises
            </button>
          )}
        </div>
        {viewMode === "all" ? (
          <>
            {/* Banner Section */}
            <div className="mb-8 relative">
              <div
                className="relative min-h-[50vh] rounded-lg overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {curatedExercises.map((item, index) => (
                  <div
                    key={item.id}
                    className="absolute w-full h-full transition-transform duration-500 ease-in-out"
                    style={{
                      transform: `translateX(${
                        (index - activeBannerIndex) * 100
                      }%)`,
                    }}
                  >
                    <img
                      src={item.image_url}
                      alt={"Image of " + item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 py-4 px-6">
                      <h2 className="text-xl font-bold text-white">
                        {item.name}
                      </h2>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white rounded-full p-2"
              >
                {"<"}
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white rounded-full p-2"
              >
                {">"}
              </button>
            </div>

            {/* Outer Grid - Search/Filter vs. Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Exercise Cards Grid */}
              <div className="md:col-span-3 order-last md:order-first">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {!filteredExercises ? (
                    exercises.map((exercise) => (
                      <Link
                        to={`/exercise/${exercise.name}`}
                        state={{ exercise }}
                      >
                        <ExerciseCard key={exercise.id} exercise={exercise} />
                      </Link>
                    ))
                  ) : filteredExercises.length > 0 ? (
                    filteredExercises.map((exercise, index) => (
                      <Link
                        to={`/exercise/${exercise.name}`}
                        state={{ exercise }}
                      >
                        <ExerciseCard
                          key={exercise.id + index}
                          exercise={exercise}
                        />
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
                    <h4 className="text-md font-medium mb-2">
                      Resistance Type
                    </h4>
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
          </>
        ) : (
          <MyExercises
            setShowSnackbar={setShowSnackbar}
            setSnackbarMessage={setSnackbarMessage}
            setSnackbarType={setSnackbarType}
          />
        )}
        {/* End of Outer Grid */}
      </div>
    </div>
  );
};

export default ExerciseListingPage;
