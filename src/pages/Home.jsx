import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-200 via-cyan-100 to-purple-200 p-6">
      <header className="text-center mb-12">
        <h1 className="text-5xl md:text-8xl font-extrabold text-indigo-900 tracking-tight drop-shadow-lg">
          Fun Tracing World!
        </h1>
        <p className="text-2xl text-indigo-700 font-medium mt-5">
          Let's learn and trace!
        </p>
      </header>

      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-sm w-full flex flex-col items-center">
        {/* Pencil Icon (Image reference) */}
        <div className="mb-6">
            <span className="text-8xl">✏️</span>
        </div>
        
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">
          Ready to Start?
        </h2>
        
        <button
          onClick={() => navigate("/categories")}
          className="w-full px-8 py-4 bg-indigo-900 text-white font-bold text-xl rounded-xl shadow-lg shadow-violet-400/50 
                     hover:bg-indigo-600 transition duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Start Tracing!
        </button>
        
        <p className="text-sm text-gray-500 mt-6">
          Trace Letters, Numbers, and More!
        </p>
      </div>
    </div>
  );
}