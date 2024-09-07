import React, { useState, useEffect, useContext } from "react";
import programmeService from "../services/programmeService";
import programmeExercisesService from "../services/programmeExercisesService";
import ProgrammeCard from "../components/Cards/ProgrammeCard";
import Snackbar from "../components/Snackbar";
import ProgrammePreviewModal from "../components/Modals/ProgrammePreviewModal";
import { AuthContext } from "../context/AuthContext";
import userProgrammesService from "../services/userProgrammesService";
import MyProgrammes from "./profile/MyProgrammes";

const ProgrammesPage = () => {
  const { user } = useContext(AuthContext);
  const [viewMode, setViewMode] = useState("all");

  const [programmes, setProgrammes] = useState([]);
  const [filteredProgrammes, setFilteredProgrammes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState("");
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("error");
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedProgramme, setSelectedProgramme] = useState(null);
  const [featuredProgrammes, setFeaturedProgrammes] = useState([]);

  const handleOpenPreviewModal = (programme) => {
    setSelectedProgramme(programme);
    setIsPreviewModalOpen(true);
  };

  const handleClosePreviewModal = () => {
    setIsPreviewModalOpen(false);
    setSelectedProgramme(null);
    fetchProgrammesAndExercises();
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
    setActiveBannerIndex(
      (prevIndex) =>
        (prevIndex - 1 + featuredProgrammes.length) % featuredProgrammes.length
    );
  };

  const handleNext = () => {
    setActiveBannerIndex(
      (prevIndex) => (prevIndex + 1) % featuredProgrammes.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBannerIndex(
        (prevIndex) => (prevIndex + 1) % featuredProgrammes.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchProgrammesAndExercises = async () => {
    setIsLoading(true);
    try {
      const programmesData = await programmeService.getAllProgrammes();
      const exercisePromises = programmesData.map((programme) =>
        programmeExercisesService.getExercisesByProgrammeId(programme.id)
      );
      const exercisesResults = await Promise.all(exercisePromises);

      const programmesWithExercises = programmesData.map(
        (programme, index) => ({
          ...programme,
          exercises: exercisesResults[index],
        })
      );

      if (user) {
        try {
          const userProgrammes =
            await userProgrammesService.getUserProgrammesByUserId(user.id);
          const joinedProgrammeIds = userProgrammes.map(
            (up) => up.programme_id
          );

          // Filter out programmes the user has already joined
          const filteredProgrammes = programmesWithExercises.filter(
            (programme) => !joinedProgrammeIds.includes(programme.id)
          );

          setProgrammes(filteredProgrammes);
          setFilteredProgrammes(filteredProgrammes);
        } catch (userProgrammeError) {
          if (userProgrammeError.response?.status === 404) {
            // User has not joined any programmes
            setProgrammes(programmesWithExercises);
            setFilteredProgrammes(programmesWithExercises);
          }
        }
      } else {
        setProgrammes(programmesWithExercises);
        setFilteredProgrammes(programmesWithExercises);
      }

      selectRandomPopularProgrammes(programmesWithExercises);
    } catch (error) {
      // This catch block handles errors from other parts of the fetching process
      console.error("Error fetching data:", error);
      setSnackbarMessage(error.response?.data?.error || "An error occurred.");
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProgrammesAndExercises();
  }, [user]);

  function selectRandomPopularProgrammes(programmesArray, numProgrammes = 3) {
    const result = [];
    const usedIndexes = new Set();

    while (result.length < numProgrammes) {
      const randomIndex = Math.floor(Math.random() * programmesArray.length);

      // Ensure the same index isn't picked more than once
      if (!usedIndexes.has(randomIndex)) {
        result.push(programmesArray[randomIndex]);
        usedIndexes.add(randomIndex);
      }
    }

    setFeaturedProgrammes(result);
  }

  useEffect(() => {
    const filterProgrammes = () => {
      let filtered = programmes;

      if (searchTerm) {
        filtered = filtered.filter((programme) =>
          programme.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (difficultyFilter) {
        filtered = filtered.filter(
          (programme) =>
            programme.difficulty_level === difficultyFilter.toLowerCase()
        );
      }

      if (timeFilter) {
        filtered = filtered.filter((programme) => {
          const estimatedTime = programme.est_duration; // Assuming `estimatedTime` is in minutes
          switch (timeFilter) {
            case "<= 30 mins":
              return estimatedTime <= 30;
            case "30 mins - 1 hour":
              return estimatedTime > 30 && estimatedTime <= 60;
            case "1 hour - 1.5 hours":
              return estimatedTime > 60 && estimatedTime <= 90;
            case "1.5 hours <":
              return estimatedTime > 90;
            default:
              return true;
          }
        });
      }

      setFilteredProgrammes(filtered);
    };

    filterProgrammes();
  }, [searchTerm, difficultyFilter, timeFilter, programmes]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDifficultyChange = (e) => {
    setDifficultyFilter(e.target.value);
  };

  const handleTimeFilterChange = (e) => {
    setTimeFilter(e.target.value);
  };

  if (isLoading) {
    return <div className="container mx-auto p-4 text-center">Loading...</div>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex-grow p-4">
      {showSnackbar && (
        <Snackbar message={snackbarMessage} type={snackbarType} />
      )}

      <div className="container mx-auto">
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
              All Programmes
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
              My Programmes
            </button>
          )}
        </div>
        {viewMode === "all" ? (
          <>
            <div className="mb-8 relative">
              <div
                className="relative min-h-[50vh] rounded-lg overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {featuredProgrammes.map((item, index) => (
                  <div
                    key={index}
                    className="absolute w-full h-full transition-transform duration-500 ease-in-out"
                    style={{
                      transform: `translateX(${
                        (index - activeBannerIndex) * 100
                      }%)`,
                    }}
                  >
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute text-center bottom-0 left-0 w-full bg-black bg-opacity-50 py-4 px-6">
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
                className="z-99 absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white rounded-full p-2"
              >
                {"<"}
              </button>
              <button
                onClick={handleNext}
                className="z-99 absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white rounded-full p-2"
              >
                {">"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Programme Cards Grid */}
              <div className="md:col-span-3">
                <div className="grid grid-cols-1 gap-4">
                  {filteredProgrammes.map((programme) => (
                    <button
                      key={programme.id}
                      onClick={() => handleOpenPreviewModal(programme)}
                    >
                      <ProgrammeCard programme={programme} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Programme Preview Modal */}
              <ProgrammePreviewModal
                isOpen={isPreviewModalOpen}
                onClose={handleClosePreviewModal}
                programme={selectedProgramme}
                setShowSnackbar={setShowSnackbar}
                setSnackbarMessage={setSnackbarMessage}
                setSnackbarType={setSnackbarType}
              />

              {/* Search and Filters */}
              <div className="md:col-span-1 bg-gray-800 p-4 rounded-lg">
                <input
                  type="text"
                  placeholder="Search programmes..."
                  className="bg-gray-700 text-white rounded-md py-2 px-4 w-full mb-4"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Difficulty Level
                  </label>
                  <select
                    value={difficultyFilter}
                    onChange={handleDifficultyChange}
                    className="bg-gray-700 text-white rounded-md py-2 px-4 w-full"
                  >
                    <option value="">All</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Estimated Workout Duration
                  </label>
                  <select
                    value={timeFilter}
                    onChange={handleTimeFilterChange}
                    className="bg-gray-700 text-white rounded-md py-2 px-4 w-full"
                  >
                    <option value="">All</option>
                    <option value="<= 30 mins">{"<= 30 mins"}</option>
                    <option value="30 mins - 1 hour">
                      {"30 mins - 1 hour"}
                    </option>
                    <option value="1 hour - 1.5 hours">
                      {"1 hour - 1.5 hours"}
                    </option>
                    <option value="1.5 hours <">{"1.5 hours <"}</option>
                  </select>
                </div>
              </div>
            </div>
          </>
        ) : (
          <MyProgrammes
            setShowSnackbar={setShowSnackbar}
            setSnackbarMessage={setSnackbarMessage}
            setSnackbarType={setSnackbarType}
          />
        )}
      </div>
    </div>
  );
};

export default ProgrammesPage;
