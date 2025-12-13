import React from 'react';
import { useNavigate } from 'react-router-dom';
import TracingCard from '../components/TracingCard';
import { TRACING_ITEMS } from '../data/TracingData'; 
import NavBar from '../components/Navbar'; // NavBar component import karein

// Huroof-e-Tahajji ki list aur category details TRACING_ITEMS se nikalen
const URDU_DATA = TRACING_ITEMS.urdu;
const URDU_ALPHABETS = URDU_DATA.items;
const CATEGORY_ID = 'urdu';

export default function UrduPage() {
    const navigate = useNavigate()

    const handleItemClick = (item) => {
        // TracePage ka path: /trace/:categoryId/:item
        navigate(`/trace/${CATEGORY_ID}/${item}`);
    };

    return (
        // relative class for NavBar positioning
        <div className="min-h-screen relative flex flex-col items-center bg-gradient-to-br from-green-50 to-teal-100 p-6">
            
            {/* 1. NavBar Add Karein (Theme Green ke mutabiq) */}
            <NavBar themeColor="text-green-800" />
            
            {/* 2. Content ko NavBar ke neechay dhakelne ke liye div aur pt-20 */}
            <div className="pt-5 w-full max-w-7xl">
                <header className="text-center py-6 mb-10">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-800 tracking-tight drop-shadow-md">
                        حروف تہجی 
                    </h1>
                    <p className="text-xl text-indigo-600 mt-5 font-medium">
                        Select an Urdu letter to start tracing.
                    </p>
                </header>

                {/* 3. Urdu Huroof Cards Container (RTL Layout) */}
                <div 
                    className="flex flex-wrap justify-end gap-4 max-w-7xl mx-auto" 
                    dir="rtl" // Yeh sabse ahem hai: Right-to-Left direction set karein
                >
                    {URDU_ALPHABETS.map((huroof) => (
                        <TracingCard
                            key={huroof}
                            item={huroof} 
                            // Title ko remove kar diya gaya hai kyunki item hi title hai
                            colorClass="bg-teal-600 hover:bg-teal-700"
                            // Styling for Urdu Font
                            itemStyle={{ fontFamily: 'Jameel Noori Nastaleeq, Tahoma, serif', fontSize: '3rem' }}
                            onClick={() => handleItemClick(huroof)}
                        />
                    ))}
                </div>
            </div>
            
        </div>
    );
}