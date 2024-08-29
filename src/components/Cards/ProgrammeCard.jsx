import React from "react";
import {
  getDurationUnit,
  printProgrammeDifficultyLevel,
} from "../../utils/printingHelpers";

const ProgrammeCard = ({ programme }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-md">
      {/* Image */}
      <img
        src={programme.image_url || "https://via.placeholder.com/300x200"}
        alt={programme.name}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <div>
        <h3 className="text-lg font-medium text-white mb-2">
          {programme.name}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-3 min-h-8">
          {programme.description}
        </p>
        <p className="text-gray-400 text-sm mt-2">
          {printProgrammeDifficultyLevel(programme.difficulty_level)} |{" "}
          {programme.exercises.length} Exercises
        </p>
        <p className="text-gray-400 text-sm mt-2">
          Est: ~{getDurationUnit(programme.est_duration)}
        </p>
      </div>
    </div>
  );
};

export default ProgrammeCard;
