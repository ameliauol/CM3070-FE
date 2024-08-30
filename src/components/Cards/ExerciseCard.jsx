import React from "react";

const ExerciseCard = ({ exercise }) => {
  const { name, category, description, imageUrl } = exercise;
  return (
    <div
      className={`bg-gray-800 rounded-lg p-4 shadow-md relative ${
        exercise.programme_id ? "text-center drop-shadow-xl w-140" : ""
      }`}
    >
      {/* Image */}
      <img
        src={imageUrl}
        alt={name}
        className={`w-full object-cover rounded-lg ${
          exercise.programme_id ? "h-30" : "h-48"
        }`}
      />

      {/* Category Label */}
      {category && (
        <div className="absolute top-4 right-4 bg-slate-900 bg-opacity-50 text-white px-2 py-1 rounded-md text-sm font-medium">
          {category}
        </div>
      )}

      {/* Content */}
      <div className="mt-4">
        <h4 className="text-lg font-medium text-white mb-2">{name}</h4>
        <p className="text-gray-400 text-sm line-clamp-3 min-h-16">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ExerciseCard;
