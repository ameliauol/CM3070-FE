import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import userProgrammesService from "../../services/userProgrammesService";
import LogExercisesModal from "../../components/Modals/LogExercisesModal";
import Snackbar from "../../components/Snackbar";
import { useNavigate } from "react-router-dom";
import { formatActiveDaysRaw } from "../../utils/printingHelpers";

const MyProgrammes = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [userProgrammes, setUserProgrammes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [selectedProgramme, setSelectedProgramme] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("error");

  const fetchUserProgrammes = async () => {
    setIsLoading(true);
    try {
      const programmes = await userProgrammesService.getUserProgrammesByUserId(
        user.id
      );
      setUserProgrammes(programmes);
    } catch (error) {
      console.error("Error fetching user programmes:", error);
      setError("Error fetching your programmes. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserProgrammes();
    }
  }, [user]);

  const handleOpenLogModal = (programme) => {
    setSelectedProgramme(programme);
    setIsLogModalOpen(true);
  };

  const handleCloseLogModal = () => {
    setIsLogModalOpen(false);
    setSelectedProgramme(null);
  };

  const handleLogSuccess = () => {
    // Refresh the user's joined programs data after logging
    fetchUserProgrammes();

    setSnackbarType("success");
    setSnackbarMessage("Successfully logged exercise records!");
    setShowSnackbar(true);
    setTimeout(() => {
      setShowSnackbar(false);
    }, 3000);
  };

  if (isLoading) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex-grow p-4">
        <div className="container mx-auto text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex-grow p-4">
      {showSnackbar && (
        <Snackbar message={snackbarMessage} type={snackbarType} />
      )}
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Programmes</h1>
        <div className="grid grid-cols-1 gap-4">
          {userProgrammes.length === 0 ? (
            <div className="text-center text-gray-400">
              You haven't joined any programmes yet.
            </div>
          ) : (
            userProgrammes.map((programme) => (
              <div
                key={programme.id}
                className="bg-gray-800 rounded-lg p-4 shadow-md flex items-center justify-between px-8"
              >
                <div>
                  <h2 className="text-lg font-medium text-white mb-2">
                    {programme.name}
                  </h2>
                  {/* Display other programme details here  */}
                  <p className="text-gray-400 text-sm">
                    Active Days: {formatActiveDaysRaw(programme.active_days)}
                  </p>
                </div>
                {/* Button to open the LogExerciseModal and view programme details */}
                <div className="grid gap-2 grid-flow-col">
                  <button
                    onClick={() => handleOpenLogModal(programme)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Quick Log
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/my-programme/${programme.id}`, {
                        state: { programme },
                      })
                    }
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    View Programme
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <LogExercisesModal
          isOpen={isLogModalOpen}
          onClose={handleCloseLogModal}
          programmeId={selectedProgramme ? selectedProgramme.id : null}
          onLogSuccess={handleLogSuccess}
        />
      </div>
    </div>
  );
};

export default MyProgrammes;
