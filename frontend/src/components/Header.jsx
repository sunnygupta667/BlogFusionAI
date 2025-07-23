import React from 'react';
import gradientBackground from '../assets/gradientBackground.png';
import starIcon from '../assets/star_icon.png'; // Ensure this file exists
import { useAppContext } from '../context/AppContext';

const Header = () => {
  const { input, setInput } = useAppContext();
  const inputRef = React.useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
  };

  const onSearch = () => {
    setInput('');
    inputRef.current.value = '';
  };

  return (
    <div className="relative mx-4 sm:mx-8 xl:mx-16 overflow-hidden">
      {/* Centered Title Section */}
      <div className="text-center mt-12 mb-6">
        <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 mb-3 bg-blue-100 border border-gray-300 text-blue-800 text-sm rounded-2xl shadow-sm">
          <p>AI Featured Blog Content</p>
          <img src={starIcon} alt="Star Icon" className="w-3 h-3" />
        </div>

        <h1 className="text-2xl sm:text-4xl font-semibold text-gray-700 leading-snug">
          Your Best <span className="text-purple-700">Blogging</span><br /> Platform
        </h1>

        <p className="text-gray-500 text-xs sm:text-sm py-4 px-3 max-w-2xl mx-auto">
          BlogFusionAI is an intelligent blogging platform that empowers users to read,
          explore, and comment on a wide variety of blogs. It offers a seamless content
          creation experience for admins, featuring AI-assisted blog writing, image uploads,
          and a powerful dashboard for managing posts and comments.
        </p>

        <form
          onSubmit={onSubmitHandler}
          className="relative flex items-center max-w-md mx-auto border mt-4 border-gray-300 bg-white rounded px-2 py-1 gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for blogs"
            required
            className="w-full outline-none px-2 py-1 text-sm pr-16"
          />

          {input && (
            <button
              type="button"
              onClick={onSearch}
              className="absolute right-24 sm:right-24 md:right-24 lg:right-28 text-gray-400 hover:text-gray-700 text-xs"
            >
              Clear
            </button>
          )}

          <button
            type="submit"
            className="bg-purple-700 text-white px-4 py-1.5 rounded hover:scale-105 transition-all text-sm"
          >
            Search
          </button>
        </form>
      </div>

      {/* Background Image */}
      <img
        src={gradientBackground}
        alt="Gradient Background"
        className="absolute -top-10 -z-10 opacity-40 w-full pointer-events-none"
      />
    </div>
  );
};

export default Header;
