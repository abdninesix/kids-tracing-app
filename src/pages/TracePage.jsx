import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import TracingCanvas from "../components/TracingCanvas";
import { getTracingData } from "../data/TracingData";
import NavBar from "../components/Navbar";

export default function TracePage() {
  // Nayi routing se parameters fetch karein
  const { categoryId, item } = useParams();
  const navigate = useNavigate();

  // Data fetch karein
  const tracingData = getTracingData(categoryId, item);

  if (!tracingData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        404: Tracing Item Not Found!
      </div>
    );
  }

  const { categoryTitle, currentItem, nextItem, prevItem, backPath } =
    tracingData;

  const formatItemForUrl = (itemToFormat) => {
    // 'numbers' aur 'urdu' ko jaisa hai waise hi rakhein (no case change)
    if (categoryId === "numbers" || categoryId === "urdu") {
      return itemToFormat;
    }
    return itemToFormat.toLowerCase();
  };


  const handleNavigation = (newItem) => {
    const urlItem = formatItemForUrl(newItem);
    // Naye item aur category ke saath navigate karein
    navigate(`/trace/${categoryId}/${urlItem}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#d3c8ff] via-[#d8f3ff] to-[#e8e1ff] p-4">
      <NavBar themeColor="text-indigo-800" backPath={backPath} />
      <h1 className="text-4xl font-extrabold text-indigo-800 tracking-tight drop-shadow-md mt-4 mb-4">
        Trace the {categoryTitle} {currentItem}
      </h1>
      <TracingCanvas
        item={currentItem}
        categoryId={categoryId}
        width={350}
        height={350}
      />
      <div className="flex justify-between w-full max-w-sm mt-8">
        <button
          onClick={() => handleNavigation(prevItem)}
          className="flex items-center justify-center px-4 py-3 bg-pink-500 text-white font-extrabold rounded-xl shadow-lg shadow-pink-300/70 hover:bg-pink-600 transition duration-150 transform hover:scale-105 active:scale-95 flex-1 mr-3 min-w-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="truncate">{prevItem}</span>
        </button>

        <button
          onClick={() => handleNavigation(nextItem)}
          className="flex items-center justify-center px-4 py-3 bg-cyan-500 text-white font-extrabold rounded-xl shadow-lg shadow-cyan-300/70 hover:bg-cyan-600 transition duration-150 transform hover:scale-105 active:scale-95 flex-1 ml-3 min-w-0"
        >
          <span className="truncate">{nextItem}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
