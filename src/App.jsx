import React, { useState, useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Modal from "./components/Modal";
import Snackbar from "./components/Snackbar"; // Ensure Snackbar is properly imported
import LoginForm from "./components/Forms/LoginForm";
import RegistrationForm from "./components/Forms/RegistrationForm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ExerciseListingPage from "./pages/ExerciseListingPage";
import ExerciseDetailPage from "./pages/ExerciseDetailPage";
import ProgrammesPage from "./pages/ProgrammesPage";
import Profile from "./pages/Profile";
import MyProgrammeDetailsPage from "./pages/MyProgrammeDetailsPage";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");

  const handleOpenModal = (content) => {
    setIsModalOpen(false);
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleLoginSuccess = () => {
    setIsModalOpen(false);
    setModalContent(null);
    navigate("/programmes");
  };

  return (
    <div className="flex flex-col bg-slate-900 text-white min-h-screen">
      <Navbar handleOpenModal={handleOpenModal} />
      <div className="flex-grow">
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercises" element={<ExerciseListingPage />} />
          <Route
            path="/exercise/:exerciseName"
            element={<ExerciseDetailPage />}
          />
          <Route path="/programmes" element={<ProgrammesPage />} />
          {user && <Route path="/profile" element={<Profile />} />}
          {user && (
            <Route
              path="/my-programme/:programmeId"
              element={<MyProgrammeDetailsPage />}
            />
          )}
        </Routes>
        <div className="container mx-auto p-4">
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={modalContent === "login" ? "Log In" : "Sign Up"}
          >
            {modalContent === "login" && (
              <LoginForm
                onLoginSuccess={handleLoginSuccess}
                onSwitchToRegister={() => handleOpenModal("register")}
                setShowSnackbar={setShowSnackbar}
                setSnackbarMessage={setSnackbarMessage}
                setSnackbarType={setSnackbarType}
              />
            )}
            {modalContent === "register" && (
              <RegistrationForm
                onSwitchToLogin={() => handleOpenModal("login")}
                setShowSnackbar={setShowSnackbar}
                setSnackbarMessage={setSnackbarMessage}
                setSnackbarType={setSnackbarType}
              />
            )}
          </Modal>
        </div>
      </div>

      {showSnackbar && (
        <Snackbar message={snackbarMessage} type={snackbarType} />
      )}

      <Footer />
    </div>
  );
};

export default App;
