import React, { useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Modal from "./components/Modal";
import LoginForm from "./components/Forms/LoginForm";
import RegistrationForm from "./components/Forms/RegistrationForm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ExerciseListingPage from "./pages/ExerciseListingPage";
import ExerciseDetailPage from "./pages/ExerciseDetailPage";
import ProgrammesPage from "./pages/ProgrammesPage";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleOpenModal = (content) => {
    setIsModalOpen(false);
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
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
        </Routes>
        <div className="container mx-auto p-4">
          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title={modalContent === "login" ? "Log In" : "Sign Up"}
          >
            {modalContent === "login" && (
              <LoginForm
                onLoginSuccess={handleCloseModal}
                onSwitchToRegister={() => handleOpenModal("register")}
              />
            )}
            {modalContent === "register" && (
              <RegistrationForm
                onRegisterSuccess={handleCloseModal}
                onSwitchToLogin={() => handleOpenModal("login")}
              />
            )}
          </Modal>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
