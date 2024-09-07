import { React, useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Snackbar from "./Snackbar";

const Navbar = ({ handleOpenModal }) => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");

  const handleLogout = () => {
    logout();
    setShowSnackbar(true);
    setSnackbarMessage(
      "Successfully logged out, navigating back to home page..."
    );
    setSnackbarType("success");
    setTimeout(() => {
      setShowSnackbar(false);
      navigate("/");
    }, 3000);
  };

  return (
    <nav className="py-4 px-6">
      <div className="w-full justify-between flex items-center px-10">
        <div className="text-white text-2xl font-bold">Strength Matrix</div>
        <div className="flex items-center bg-opacity-40 bg-stone-950 shadow-md rounded-3xl py-1.5">
          <ul className="flex justify-between px-1">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-gray-300 hover:text-white px-5 py-2 rounded-3xl
                   ${isActive ? "bg-blue-500 text-white font-bold" : ""}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/programmes"
                className={({ isActive }) =>
                  `text-gray-300 hover:text-white px-5 py-2 rounded-3xl
                   ${isActive ? "bg-blue-500 text-white font-bold" : ""}`
                }
              >
                Programmes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/exercises"
                className={({ isActive }) =>
                  `text-gray-300 hover:text-white px-5 py-2 rounded-3xl
                   ${isActive ? "bg-blue-500 text-white font-bold" : ""}`
                }
              >
                Exercises
              </NavLink>
            </li>
            <li>
              {user && (
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `text-gray-300 hover:text-white px-3 py-2 rounded-3xl
                 ${isActive ? "bg-blue-500 text-white font-bold" : ""}`
                  }
                >
                  Profile
                </NavLink>
              )}
            </li>
          </ul>
        </div>
        <button
          className="text-gray-300 hover:text-white px-3rounded-3xl"
          onClick={() => (user ? handleLogout() : handleOpenModal("login"))}
        >
          <span>{user ? "Log Out" : "Log In"}</span>
        </button>
      </div>
      {showSnackbar && (
        <Snackbar message={snackbarMessage} type={snackbarType} />
      )}
    </nav>
  );
};

export default Navbar;
