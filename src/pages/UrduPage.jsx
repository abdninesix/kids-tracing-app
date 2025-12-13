import React from 'react';
import { useNavigate } from 'react-router-dom';
import TracingCard from '../components/TracingCard';
// TRACING_ITEMS ko import karein jo Urdu Huroof ki list rakhta hai
import { TRACING_ITEMS } from '../data/TracingData'; 

// Huroof-e-Tahajji ki list aur category details TRACING_ITEMS se nikalen
const URDU_DATA = TRACING_ITEMS.urdu;
const URDU_ALPHABETS = URDU_DATA.items; // ['الف', 'ب', 'پ', ...]
const CATEGORY_ID = 'urdu';

export default function UrduPage() {
    const navigate = useNavigate();

    // Huroof par click hone par tracing page par navigate karein
    const handleItemClick = (item) => {
        // TracePage ka path: /trace/:categoryId/:item
        // Item jaisa hai waise hi bhej rahe hain (e.g., 'الف')
        navigate(`/trace/${CATEGORY_ID}/${item}`);
    };

    return (
        <div className="min-h-screen flex flex-col items-center pt-12 pb-20 bg-gradient-to-br from-green-50 to-teal-100 p-6">
            <header className="text-center py-6 mb-10">
                <h1 className="text-5xl md:text-6xl font-extrabold text-green-800 tracking-tight drop-shadow-md">
                    حروف تہجی (Huroof-e-Tahajji)
                </h1>
                <p className="text-xl text-green-600 mt-3 font-medium">
                    Select an Urdu letter to start tracing.
                </p>
            </header>

            {/* Urdu Huroof Cards */}
            <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
                {URDU_ALPHABETS.map((huroof) => (
                    <TracingCard
                        key={huroof}
                        item={huroof} // Display the Urdu letter
                        title={huroof} // Title bhi Urdu letter
                        colorClass="bg-teal-600 hover:bg-teal-700" // Teal/Green theme
                        // Styling for Urdu Font (optional, adjust based on your project)
                        itemStyle={{ fontFamily: 'Jameel Noori Nastaleeq, Tahoma, serif', fontSize: '3rem' }}
                        // Click Handler
                        onClick={() => handleItemClick(huroof)}
                    />
                ))}
            </div>

            <div className="text-center mt-12">
                <button
                    onClick={() => navigate("/categories")}
                    className="px-6 py-3 bg-violet-600 text-white rounded-lg shadow-lg hover:bg-violet-700 transition font-medium"
                >
                    ← Back to Categories
                </button>
            </div>
        </div>
    );
}