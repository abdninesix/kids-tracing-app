import React from 'react';
import MatchingEngine from "./MatchingEngine";
import NavBar from "../components/Navbar";

export default function UrduMatch() {
    const leftData = [
        { id: 1, content: 'ا' }, { id: 2, content: 'ب' }, { id: 3, content: 'پ' }, 
        { id: 4, content: 'ت' }, { id: 5, content: 'ٹ' }
    ];
    const rightData = [
        { id: 1, match: 'ا' }, { id: 2, match: 'ب' }, { id: 3, match: 'پ' }, 
        { id: 4, match: 'ت' }, { id: 5, match: 'ٹ' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-cyan-100 to-purple-200 p-4">
            <NavBar backPath="/matching-hub" />
            <div className="max-w-5xl mx-auto flex flex-col items-center font-urdu">
                <header className="text-center mb-8">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-900 drop-shadow-md">
                        Urdu Match
                    </h1>
                    <p className="text-xl text-indigo-700 font-semibold mt-2">ایک جیسے حروف ملائیں</p>
                </header>
                <MatchingEngine leftItems={leftData} rightItems={rightData} />
            </div>
        </div>
    );
}