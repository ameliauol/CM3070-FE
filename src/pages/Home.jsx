import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import coverImage from "../assets/landing-img.jpg";
import contentImage1 from "../assets/contentImage1.jpg";
import contentImage2 from "../assets/contentImage2.jpg";
import contentImage3 from "../assets/contentImage3.jpg";
import programmeService from "../services/programmeService";

const Home = () => {
  const navigate = useNavigate();
  const [programmes, setProgrammes] = useState([]);

  useEffect(() => {
    const fetchProgrammes = async () => {
      const programmes = await programmeService.getAllProgrammes();
      setProgrammes(programmes);
    };
    fetchProgrammes();
  }, []);

  return (
    <div className="bg-slate-900 text-white flex-grow">
      {/* Hero Section */}
      <section
        className="container mt-10 mx-auto px-6 py-24 text-center bg-cover bg-center relative h-2/3"
        style={{ backgroundImage: `url(${coverImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Hero Content */}
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">
            Achieve Your Fitness Goals
          </h1>
          <p className="text-lg mb-12">
            Join Strength Matrix today and unlock your full potential with
            personalized workouts, with step-by-step instructions, and track
            your progress.
          </p>
          <button
            onClick={() => navigate("/programmes")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-md"
          >
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
                Beginner Workouts: Master the Basics of Barbell Training
              </h3>
              <p className="text-sm">
                Kickstart your fitness journey with Strength Matrix, where novices can thrive! Our platform offers comprehensive beginner programs that teach the essentials of barbell exercises like deadlifts, squats, and presses. Learn proper form and techniques to safely build your strength. Choose from a variety of programs tailored to different body parts, ensuring balanced muscle growth. Whether you're aiming to strengthen your core, legs, or arms, find the perfect routine to boost your fitness confidence and see tangible results.
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
                Advanced Training: Push Your Limits with Intensive Workouts
              </h3>
              <p className="text-sm">
                Take your fitness to the next level with Strength Matrix! Our platform caters to experienced gym enthusiasts looking to intensify their workouts. Dive into our expertly crafted programs designed to optimize strength gains and complement your dietary and hydration efforts. Challenge yourself with a range of intensive exercises and advanced training techniques that ensure you get the most out of every session. It's time to maximize your potential and achieve peak performance with routines that push the boundaries of conventional training.
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
                Physiotherapy for Seniors: Preventing Falls and Building Strength
              </h3>
              <p className="text-sm">
                Explore physiotherapy exercises on Strength Matrix, specifically designed for older adults. These exercises focus on strengthening muscles, enhancing balance, and increasing mobility, which are crucial for preventing common accidents like slips and falls. By engaging in these routines, elderly users can improve their physical stability and maintain their independence. Start your journey towards a safer, more active lifestyle today with our specialized workouts.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-6">
        <div className="md:col-span-1 rounded-lg overflow-hidden">
          <h2 className="text-2xl font-semibold mb-4 px-4 py-3 bg-gray-800">
            Featured Programs
          </h2>
          <div className="bg-gray-700 p-4 px-10 grid gap-5 grid-flow-col space-x-4 overflow-x-auto">
            {programmes.map((programme) => (
              <div key={programme.id} className="flex-shrink-0 w-64 py-6">
                <img
                  src={programme.image_url}
                  alt={programme.name}
                  className="rounded-lg mb-3"
                />
                <h4 className="text-lg font-medium">{programme.name}</h4>
                <p className="text-sm line-clamp-1">{programme.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
