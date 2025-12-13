import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = ({ themeColor = 'text-indigo-800' }) => {
    const navigate = useNavigate();

    // Home Page par wapas jaane ke liye
    const handleGoHome = () => {
        navigate("/");
    };

    // Pichle page par wapas jaane ke liye
    const handleGoBack = () => {
        navigate(-1); // React Router ka feature jo history mein pichle page par le jata hai
    };

    return (
        <div className="absolute top-0 left-0 w-full p-6 z-20">
            <div className="flex justify-between items-center">
                
                {/* Left Side: Back Icon */}
                <button
                    onClick={handleGoBack}
                    className={`p-3 rounded-full bg-white/70 backdrop-blur-sm shadow-lg ${themeColor} hover:bg-white transition duration-150 transform hover:scale-105 active:scale-95`}
                    aria-label="Go Back"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>

                {/* Right Side: Home Icon */}
                <button
                    onClick={handleGoHome}
                    className={`p-3 rounded-full bg-white/70 backdrop-blur-sm shadow-lg ${themeColor} hover:bg-white transition duration-150 transform hover:scale-105 active:scale-95`}
                    aria-label="Go to Home"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default NavBar;