import React from 'react';
import AlphabetCard from '../components/AlphabetsCard';
import NavBar from '../components/Navbar';

export default function LearningNumbers() {
    const numbers = Array.from({ length: 20 }, (_, i) => String(i + 1));

    const playSound = (num) => {
        const utterance = new SpeechSynthesisUtterance(num);
        utterance.lang = 'en-US';
        utterance.rate = 0.8;
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-200 via-cyan-100 to-purple-200 p-4 md:p-8">
            <NavBar themeColor="text-indigo-900" backPath="/learning-hub" />
            
            <header className="text-center mt-3 mb-8">
                <h1 className="text-4xl md:text-6xl font-extrabold text-indigo-900 tracking-tight drop-shadow-md">
                    Learn Numbers
                </h1>
                <p className="text-lg text-indigo-700 font-medium mt-2">
                    Click a number to hear its sound!
                </p>
            </header>

            {/* Glassy Container for Symmetry */}
            <div className="bg-white/30 backdrop-blur-xl p-6 md:p-10 rounded-[40px] shadow-2xl max-w-6xl w-full border border-white/40 mb-10">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    {numbers.map(num => (
                        <AlphabetCard 
                            key={num} 
                            letter={num} 
                            onClick={() => playSound(num)} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}