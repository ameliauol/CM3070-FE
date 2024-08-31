import React from "react";

const Snackbar = ({ message, type = "error" }) => {
  const colorClass =
    type === "error"
      ? "bg-red-100 border-red-500 text-red-900"
      : "bg-green-100 border-green-500 text-green-900";

  return (
    <div
      className={`z-9999 fixed top-5 left-1/4 w-1/2 px-4 py-3 border rounded-md ${colorClass}`}
    >
      <p className="text-sm font-medium text-center">{message}</p>
    </div>
  );
};

export default Snackbar;
