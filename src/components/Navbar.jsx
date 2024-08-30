import { React, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = ({ handleOpenModal }) => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="py-4 px-6">
      <div className="container flex items-center justify-between">
        <div className="text-white text-2xl font-bold">Strength Matrix</div>
        <div className="flex items-center bg-opacity-40 bg-stone-950 shadow-md rounded-3xl px-0.2 py-1.5">
          <ul className="flex space-x-10 m-0">
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
          onClick={() => (user ? handleLogout() : handleOpenModal("login"))}
        >
          <span className="text-gray-300 hover:text-white px-3 py-2 rounded-3xl">
            {user ? "Log Out" : "Log In"}
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
