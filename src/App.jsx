import React, { useState } from "react";
import Modal from "./components/Modal";
import LoginForm from "./components/Forms/LoginForm";
import RegistrationForm from "./components/Forms/RegistrationForm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleOpenModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent(null); // Reset modalContent when closing
  };

  return (
    <div className="flex flex-col bg-gray-900 text-white min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <button onClick={() => handleOpenModal("login")}>Login</button>
        <button onClick={() => handleOpenModal("register")}>Register</button>

        <div className="container mx-auto p-4">
          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title={modalContent === "login" ? "Log In" : "Sign Up"}
          >
            {modalContent === "login" && <LoginForm />}
            {modalContent === "register" && <RegistrationForm />}
          </Modal>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
