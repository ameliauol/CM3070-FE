// src/App.jsx
import React, { useState } from "react";
import Modal from "./components/Modal";
import LoginForm from "./components/Forms/LoginForm";
import RegistrationForm from "./components/Forms/RegistrationForm";

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
    <div className="bg-gray-900 text-white min-h-screen">
      <button onClick={() => handleOpenModal("login")}>Login</button>
      <button onClick={() => handleOpenModal("register")}>Register</button>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={modalContent === "login" ? "Log In" : "Sign Up"}
      >
        {modalContent === "login" && <LoginForm />}
        {modalContent === "register" && <RegistrationForm />}
      </Modal>
    </div>
  );
};

export default App;
