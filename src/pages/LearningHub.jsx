import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/Navbar';

export default function LearningHub() {
    const navigate = useNavigate();

    const learningModes = [
        { id: 'english', name: 'Alphabets', icon: 'ABC', color: 'from-blue-400 to-blue-600', path: '/learning/alphabets' },
        { id: 'numbers', name: 'Counting', icon: '123', color: 'from-green-400 to-green-600', path: '/learning/numbers' },
        { id: 'urdu', name: 'Urdu', icon: 'ا ب ج', color: 'from-orange-400 to-orange-600', path: '/urdu' },
    ];

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-200 via-cyan-100 to-purple-200 p-4 md:p-8">
            <NavBar themeColor="text-indigo-900" backPath="/" />
            
            <header className="text-center mt-6 mb-10">
                <h1 className="text-5xl md:text-7xl font-extrabold text-indigo-900 tracking-tight drop-shadow-md">
                    Learning Hub
                </h1>
                <p className="text-xl text-indigo-700 font-semibold mt-3">
                    Listen and learn the sounds!
                </p>
            </header>

            {/* Main Glassy Container */}
            <div className="bg-white/30 backdrop-blur-xl p-8 md:p-12 rounded-[50px] shadow-2xl max-w-6xl w-full border border-white/40">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {learningModes.map((mode) => (
                        <div 
                            key={mode.id}
                            onClick={() => navigate(mode.path)}
                            className="bg-white/60 backdrop-blur-lg p-6 rounded-[40px] shadow-xl flex flex-col items-center border border-white/60 cursor-pointer hover:scale-105 transition-all duration-300 group"
                        >
                            <div className="mb-4 bg-white rounded-full p-6 shadow-inner group-hover:rotate-12 transition-transform">
                                <span className={`text-5xl font-black bg-gradient-to-r ${mode.color} bg-clip-text text-transparent inline-block`}>
                                    {mode.icon}
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold text-indigo-900 mb-4">{mode.name}</h2>
                            <button className={`w-full py-4 bg-gradient-to-r ${mode.color} text-white font-bold text-lg rounded-2xl shadow-lg border-b-4 border-black/20 uppercase`}>
                                Start {mode.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}