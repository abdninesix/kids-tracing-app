import React from 'react';
import { useNavigate } from 'react-router-dom';
import TracingCard from '../components/TracingCard';
// NavBar component import karein
import NavBar from '../components/Navbar'; 

// Function to generate numbers 1 through 100
const generateNumbers = () => {
    return Array.from({ length: 20 }, (_, i) => String(i + 1)); 
};

export default function CountingPage() {
    const navigate = useNavigate();
    const items = generateNumbers();
    const categoryId = 'numbers';

    const handleItemClick = (item) => {
        // Navigate to the tracing page: /trace/numbers/1
        navigate(`/trace/${categoryId}/${item.toLowerCase()}`); 
    };

    return (
        // relative class for NavBar positioning
        <div className="min-h-screen relative bg-gradient-to-br from-indigo-100 to-cyan-50 p-6">
            
            {/* 1. NavBar Add Karein */}
            <NavBar themeColor="text-indigo-800" />
            
            {/* 2. Content ko NavBar ke neechay dhakelne ke liye div aur pt-20 */}
            <div className="pt-5"> 
                <header className="text-center py-6 mb-10">
                    <h1 className="text-5xl md:text-5xl font-extrabold text-indigo-800 tracking-tight drop-shadow-md">
                        Trace the Numbers (1-20)
                    </h1>
                    <p className="text-xl text-indigo-600 mt-5">
                        Click on a number to start tracing.
                    </p>
                </header>
                
                {/* Number Cards List */}
                <div className="flex flex-wrap justify-center gap-2 max-w-7xl mx-auto"> 
                    {items.map((item) => (
                        <TracingCard
                            key={item}
                            item={item} 
                            onClick={() => handleItemClick(item)}
                          
                        />
                    ))}
                </div>
            </div>
            
        </div>
    );
}