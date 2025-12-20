import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = ({
  themeColor = "text-indigo-800",
  backPath = "/",
  homePath = "/",
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(backPath, { replace: true });
  };

  const handleHome = () => {
    navigate(homePath, { replace: true });
  };

  return (
    /* 1. 'absolute' ko 'fixed' kiya taake scroll pe upar na jaye */
    /* 2. 'h-20' aur flex layout diya taake ye background cover kare */
    <div className="fixed top-0 left-0 w-full px-4 py-2 md:p-6 z-50 bg-gradient-to-b from-white/20 to-transparent ">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Back Button */}
        <button
          onClick={handleBack}
          className={`p-2 md:p-3 rounded-full bg-white/80 backdrop-blur-md shadow-lg ${themeColor}
            hover:bg-white transition duration-200 transform hover:scale-110 active:scale-90 border border-white/50`}
          aria-label="Go Back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 md:h-7 md:w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Home Button */}
        <button
          onClick={handleHome}
          className={`p-2 md:p-3 rounded-full bg-white/80 backdrop-blur-md shadow-lg ${themeColor}
            hover:bg-white transition duration-200 transform hover:scale-110 active:scale-90 border border-white/50`}
          aria-label="Go Home"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 md:h-7 md:w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3"
            />
          </svg>
        </button>

      </div>
    </div>
  );
};

export default NavBar;