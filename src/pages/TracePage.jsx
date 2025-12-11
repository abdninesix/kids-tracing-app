import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import TracingCanvas from "../components/TracingCanvas";
import { getTracingData } from "../data/TracingData"; // Import data

export default function TracePage() {
    // Nayi routing se parameters fetch karein
    const { categoryId, item } = useParams();
    const navigate = useNavigate();

    // Data fetch karein
    const tracingData = getTracingData(categoryId, item);

    if (!tracingData) {
        return <div className="min-h-screen flex items-center justify-center text-red-600">404: Tracing Item Not Found!</div>;
    }

    const { categoryTitle, currentItem, nextItem, prevItem, backPath } = tracingData;

    const handleNavigation = (newItem) => {
        // Naye item aur category ke saath navigate karein
        navigate(`/trace/${categoryId}/${newItem.toLowerCase()}`);
    };

    const handleBack = () => {
        // Back to the correct list page (/letters, /counting, etc.)
        navigate(backPath); 
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#d3c8ff] via-[#d8f3ff] to-[#e8e1ff] p-4">
            
            {/* Back Button */}
            <div className="w-full max-w-sm mb-6 flex justify-start">
                <button
                    onClick={handleBack}
                    className="flex items-center text-indigo-700 hover:text-indigo-900 font-semibold bg-white p-3 rounded-xl shadow-md transition duration-150 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to {categoryTitle}s
                </button>
            </div>

            {/* Tracing Canvas */}
            <h1 className="text-4xl font-extrabold text-indigo-800 tracking-tight drop-shadow-md mb-4">
                Trace the {categoryTitle} {currentItem}!
            </h1>
            <TracingCanvas item={currentItem} categoryId={categoryId} width={350} height={350} />

            {/* Navigation Buttons */}
            <div className="flex justify-between w-full max-w-sm mt-4">
                
                <button
                    onClick={() => handleNavigation(prevItem)}
                    className="px-4 py-3 bg-pink-500 text-white font-extrabold rounded-xl shadow-lg shadow-pink-300/70 hover:bg-pink-600 transition duration-150 transform hover:scale-105 active:scale-95 flex-grow mr-3"
                >
                    &larr; {prevItem}
                </button>
                
                <button
                    onClick={() => handleNavigation(nextItem)}
                    className="px-6 py-3 bg-cyan-500 text-white font-extrabold rounded-xl shadow-lg shadow-cyan-300/70 hover:bg-cyan-600 transition duration-150 transform hover:scale-105 active:scale-95 flex-grow ml-3"
                >
                    {nextItem} &rarr;
                </button>
            </div>
        </div>
    );
}