import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// Placeholder image URLs (replace with your actual images)
const heroImage = "https://via.placeholder.com/1500x600";
const program1Image = "https://via.placeholder.com/400x300";
const program2Image = "https://via.placeholder.com/400x300";
const program3Image = "https://via.placeholder.com/400x300";
const contentImage1 = "https://via.placeholder.com/300x200";
const contentImage2 = "https://via.placeholder.com/300x200";
const contentImage3 = "https://via.placeholder.com/300x200";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-slate-900 text-white flex-grow">
      {/* Hero Section */}
      <section
        className="container mx-auto px-6 py-24 text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }} // Using inline styles for background image
      >
        <div className="bg-black bg-opacity-50 p-8 rounded-lg">
          {" "}
          {/* Semi-transparent overlay */}
          <h1 className="text-4xl md:text-6xl font-bold mb-8">
            Achieve Your Fitness Goals
          </h1>
          <p className="text-lg mb-12">
            Join Strength Matrix today and unlock your full potential with
            personalized workouts, expert guidance, and a supportive community.
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-md">
            Start Now
          </button>
        </div>
      </section>

      {/* Content and Scrolling List Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Three Column Content */}
          <div className="md:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Content Box 1 */}
            <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-start">
              <img
                src={contentImage1}
                alt="Content 1"
                className="rounded-lg mb-4 w-full"
              />
              <h3 className="text-xl font-semibold mb-4">
                Unleash Your Potential
              </h3>
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                facilisi. Sed euismod, nisl nec ultricies elementum, nunc leo
                feugiat arcu, eu vulputate lacus sapien vitae ligula.
              </p>
            </div>

            {/* Content Box 2 */}
            <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-start">
              <img
                src={contentImage2}
                alt="Content 2"
                className="rounded-lg mb-4 w-full"
              />
              <h3 className="text-xl font-semibold mb-4">
                Expert Guidance, Every Step of the Way
              </h3>
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                facilisi. Sed euismod, nisl nec ultricies elementum, nunc leo
                feugiat arcu, eu vulputate lacus sapien vitae ligula.
              </p>
            </div>

            {/* Content Box 3 */}
            <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-start">
              <img
                src={contentImage3}
                alt="Content 3"
                className="rounded-lg mb-4 w-full"
              />
              <h3 className="text-xl font-semibold mb-4">
                Track Your Journey, Celebrate Your Success
              </h3>
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                facilisi. Sed euismod, nisl nec ultricies elementum, nunc leo
                feugiat arcu, eu vulputate lacus sapien vitae ligula.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling List (Placeholder) */}
      <section className="container mx-auto px-6 py-6">
        <div className="md:col-span-1 rounded-lg overflow-hidden">
          <h2 className="text-2xl font-semibold mb-4 px-4 py-3 bg-gray-800">
            Featured Programs
          </h2>
          <div className="bg-gray-700 p-4 flex space-x-4 overflow-x-auto">
            {/* Placeholder program items */}
            <div className="flex-shrink-0 w-64">
              <img
                src={program1Image}
                alt="Program 1"
                className="rounded-lg mb-3"
              />
              <h4 className="text-lg font-medium">Program 1</h4>
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur...
              </p>
            </div>
            <div className="flex-shrink-0 w-64">
              <img
                src={program2Image}
                alt="Program 2"
                className="rounded-lg mb-3"
              />
              <h4 className="text-lg font-medium">Program 2</h4>
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur...
              </p>
            </div>
            <div className="flex-shrink-0 w-64">
              <img
                src={program3Image}
                alt="Program 3"
                className="rounded-lg mb-3"
              />
              <h4 className="text-lg font-medium">Program 3</h4>
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur...
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
