import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import userExercisesService from "../../services/userExercisesService";
import MyExerciseCard from "../../components/Cards/MyExerciseCard";

const MyExercises = ({
  setShowSnackbar,
  setSnackbarMessage,
  setSnackbarType,
}) => {
  const { user } = useContext(AuthContext);
  const [userExercises, setUserExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUserExercises = async () => {
    setIsLoading(true);
    try {
      const exercisesData = await userExercisesService.getUserExerciseByUserId(
        user.id
      );
      setUserExercises(exercisesData);
    } catch (error) {
      if (error.response.status !== 404) {
        setSnackbarType("error");
        setSnackbarMessage("Error fetching user exercises:", error);
        setShowSnackbar(true);
        setTimeout(() => {
          setShowSnackbar(false);
        }, 3000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserExercises();
    }
  }, [user]);

  // Group exercises by exercise ID, preserving program information
  const groupedExercises = userExercises.reduce((acc, exercise) => {
    const exerciseId = exercise.exercise_id;
    const existingExercise = acc.find((ex) => ex.exercise_id === exerciseId);

    if (existingExercise) {
      existingExercise.programmes.push({
        userProgrammeId: exercise.user_programme_id,
        programme: exercise.programme,
        goal_reps: exercise.goal_reps,
        goal_weight: exercise.exercise_is_weighted
          ? exercise.goal_weight
          : null, // Only include goal_weight if is_weighted is true
        current_reps: exercise.current_reps,
        current_weight: exercise.exercise_is_weighted
          ? exercise.current_weight
          : null, // Only include current_weight if is_weighted is true
        created_at: exercise.created_at,
        updated_at: exercise.updated_at,
      });
    } else {
      acc.push({
        exercise_id: exerciseId,
        exercise_name: exercise.exercise_name,
        exercise_description: exercise.exercise_description,
        exercise_image: exercise.exercise_image,
        exercise_category: exercise.exercise_category,
        exercise_is_weighted: exercise.exercise_is_weighted,
        programmes: [
          {
            userProgrammeId: exercise.user_programme_id,
            userExerciseId: exercise.id,
            programme_name: exercise.programme_name,
            goal_reps: exercise.goal_reps,
            goal_weight: exercise.exercise_is_weighted
              ? exercise.goal_weight
              : null,
            start_reps: exercise.start_reps,
            start_weight: exercise.exercise_is_weighted
              ? exercise.start_weight
              : null,
            created_at: exercise.created_at,
            updated_at: exercise.updated_at,
          },
        ],
      });
    }
    return acc;
  }, []);

  const exercisesArray = Object.values(groupedExercises);

  // Sorting Logic (fixed to handle null sortBy)
  const sortedExercises =
    sortBy === "descendedDateAdded"
      ? [...exercisesArray].sort(
          (a, b) =>
            new Date(b.programmes[0].created_at) -
            new Date(a.programmes[0].created_at)
        )
      : sortBy === "ascendingDateAdded"
      ? [...exercisesArray].sort(
          (a, b) =>
            new Date(a.programmes[0].created_at) -
            new Date(b.programmes[0].created_at)
        )
      : exercisesArray; // Return original array if no sorting

  // Filtering Logic (corrected to use searchTerm)
  const filteredExercises = sortedExercises.filter((exercise) =>
    exercise.exercise_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

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
        <h1 className="text-3xl font-bold mb-8">My Exercise Goals</h1>

        {/* Search and Sorting */}
        <div className="grid col-span-1 lg:grid-cols-3 justify-between gap-4 grid-cols-1 items-center mb-6">
          <input
            type="text"
            placeholder="Search exercises..."
            className="bg-gray-700 text-white rounded-md py-2 px-4 w-2/3 lg:col-span-2"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div>
            <label htmlFor="sort" className="mr-2 text-gray-400">
              Sort By:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={handleSortChange}
              className="bg-gray-700 text-white rounded-md py-2 px-4"
            >
              <option value={null}>None</option>
              <option value="descendedDateAdded">Date Added: Descending</option>
              <option value="ascendingDateAdded">Date Added: Ascending</option>
            </select>
          </div>
        </div>

        {/* Exercise Cards Grid */}
        <div className="grid grid-cols-1 gap-10">
          {filteredExercises.length !== 0 && (
            <p className="text-gray-400 text-left">
              <i>
                Tip: Click an exercise's dropdown icon to view programmes that
                include the exercise or to edit your goals.
              </i>
            </p>
          )}
          {filteredExercises.length === 0 ? (
            <div className="text-center text-red-400 mt-5 md:col-span-3 lg:col-span-4">
              No exercises found.
            </div>
          ) : (
            filteredExercises.map((exercise) => (
              <MyExerciseCard
                key={exercise.exercise_id}
                userExerciseLogs={exercise}
                onGoalUpdate={fetchUserExercises}
                setShowSnackbar={setShowSnackbar}
                setSnackbarMessage={setSnackbarMessage}
                setSnackbarType={setSnackbarType}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyExercises;
