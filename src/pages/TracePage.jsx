import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import TracingCanvas from "../components/TracingCanvas";

const ALPHABETS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function TracePage() {
    const { letter: currentLetterParam } = useParams();
    const navigate = useNavigate();

    const currentLetter = currentLetterParam ? currentLetterParam.toUpperCase() : 'A';
    const currentIndex = ALPHABETS.indexOf(currentLetter);

    const handleNavigation = (direction) => {
        let newIndex;
        if (direction === 'next') {
            newIndex = (currentIndex + 1) % ALPHABETS.length;
        } else if (direction === 'prev') {
            newIndex = (currentIndex - 1 + ALPHABETS.length) % ALPHABETS.length; 
        } else {
            return;
        }
        
        const nextLetter = ALPHABETS[newIndex];
        navigate(`/trace/${nextLetter}`);
    };

    const handleBack = () => {
        // Path changed to /categories to match Home page logic
        navigate('/categories'); 
    };

    return (
        // Consistent Gradient Background
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#d3c8ff] via-[#d8f3ff] to-[#e8e1ff] p-4">
            
            {/* Back to Letters Button - Elegant White/Indigo Styling */}
            <div className="w-full max-w-sm mb-6 flex justify-between">
                <button
                    onClick={handleBack}
                    className="flex items-center text-indigo-700 hover:text-indigo-900 font-semibold bg-white p-3 rounded-xl shadow-md transition duration-150 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Letters
                </button>
            </div>

            {/* Tracing Canvas */}
            <TracingCanvas letter={currentLetter} width={350} height={350} />

            {/* Navigation Buttons */}
            <div className="flex justify-between w-full max-w-sm mt-4">
                
                {/* Previous Button - Theme: Bright Pink */}
                <button
                    onClick={() => handleNavigation('prev')}
                    className="px-4 py-3 bg-pink-500 text-white font-extrabold rounded-xl shadow-lg shadow-pink-300/70 hover:bg-pink-600 transition duration-150 transform hover:scale-105 active:scale-95 flex-grow mr-3"
                >
                    &larr; Previous
                </button>
                
                {/* Next Button - Theme: Bright Cyan */}
                <button
                    onClick={() => handleNavigation('next')}
                    className="px-6 py-3 bg-cyan-500 text-white font-extrabold rounded-xl shadow-lg shadow-cyan-300/70 hover:bg-cyan-600 transition duration-150 transform hover:scale-105 active:scale-95 flex-grow ml-3"
                >
                    Next &rarr;
                </button>
            </div>
        </div>
    );
}