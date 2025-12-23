import React from 'react';
import MatchingEngine from "./MatchingEngine";
import NavBar from "../components/Navbar";

export default function AlphabetMatch() {
    const leftData = [
        { id: 1, content: 'A' }, { id: 2, content: 'B' }, { id: 3, content: 'C' }, 
        { id: 4, content: 'D' }, { id: 5, content: 'E' }
    ];
    const rightData = [
        { id: 1, match: 'A' }, { id: 2, match: 'B' }, { id: 3, match: 'C' }, 
        { id: 4, match: 'D' }, { id: 5, match: 'E' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-cyan-100 to-purple-200 p-4">
            <NavBar backPath="/matching-hub" />
            <div className="max-w-5xl mx-auto flex flex-col items-center">
                <header className="text-center mb-8">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-900 drop-shadow-md">
                        Alphabet Match
                    </h1>
                    <p className="text-lg text-indigo-700 font-semibold mt-2">Draw a line to match same letters!</p>
                </header>
                <MatchingEngine leftItems={leftData} rightItems={rightData} />
            </div>
        </div>
    );
}