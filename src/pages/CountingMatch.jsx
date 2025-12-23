import React from 'react';
import MatchingEngine from "./MatchingEngine";
import NavBar from "../components/Navbar";

export default function CountingMatch() {
    const leftData = [
        { id: 1, content: '1' }, { id: 2, content: '2' }, { id: 3, content: '3' }, 
        { id: 4, content: '4' }, { id: 5, content: '5' }, { id: 6, content: '6' }
    ];
    const rightData = [
        { id: 1, match: '1' }, { id: 2, match: '2' }, { id: 3, match: '3' }, 
        { id: 4, match: '4' }, { id: 5, match: '5' }, { id: 6, match: '6' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-cyan-100 to-purple-200 p-4 flex flex-col items-center">
            <NavBar backPath="/matching-hub" />
            <header className="text-center mb-6">
                <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-900 drop-shadow-sm">
                    Number Match
                </h1>
                <p className="text-lg text-indigo-700 font-semibold mt-2">Match the same numbers!</p>
            </header>
            <MatchingEngine leftItems={leftData} rightItems={rightData} />
        </div>
    );
}