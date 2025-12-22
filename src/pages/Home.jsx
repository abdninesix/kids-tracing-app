import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  // Categories definition
  const modes = [
 // Home.jsx mein navigate ka path ye hona chahiye:
{ id: 'learning', name: 'Learning', icon: '🔊', color: 'from-green-400 to-green-600', path: '/learning-hub' },
    { id: 'tracing', name: 'Tracing', icon: '✏️', color: 'from-indigo-500 to-indigo-700', path: '/categories' },
    { id: 'matching', name: 'Matching', icon: '🧩', color: 'from-orange-400 to-orange-600', path: '/matching-hub' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-200 via-cyan-100 to-purple-200 p-4">
      
      <header className="text-center mb-8 relative z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold text-indigo-900 tracking-tight drop-shadow-md">
          Kids Fun Hub!
        </h1>
        <p className="text-xl text-indigo-700 font-semibold mt-3">
          Choose a fun way to learn!
        </p>
      </header>

      {/* Main Container for 3 Modes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full px-4">
        {modes.map((mode) => (
          <div 
            key={mode.id}
            onClick={() => navigate(mode.path)}
            className="bg-white/60 backdrop-blur-lg p-6 rounded-[40px] shadow-xl flex flex-col items-center border border-white/60 cursor-pointer hover:scale-105 transition-all duration-300 group"
          >
            <div className="mb-4 bg-white rounded-full p-6 shadow-inner group-hover:rotate-12 transition-transform">
              <span className="text-6xl drop-shadow-lg inline-block">
                {mode.icon}
              </span>
            </div>
            
            <h2 className="text-3xl font-bold text-indigo-900 mb-4">
              {mode.name}
            </h2>
            
            <button
              className={`w-full py-4 bg-gradient-to-r ${mode.color} text-white font-bold text-lg rounded-2xl shadow-lg 
                         hover:shadow-indigo-300/50 transition-all border-b-4 border-black/20 uppercase`}
            >
              Go to {mode.name}
            </button>
          </div>
        ))}
      </div>

     
    </div>
  );
}