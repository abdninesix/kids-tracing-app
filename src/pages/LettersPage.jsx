import React from 'react';
import { useNavigate } from 'react-router-dom';
import TracingCard from '../components/TracingCard';
import { TRACING_ITEMS } from '../data/TracingData';
import NavBar from '../components/Navbar';

export default function LettersPage() {
    const navigate = useNavigate();
    const categoryId = 'letters';
    const items = TRACING_ITEMS[categoryId].items; 

    const handleItemClick = (item) => {
        // Navigate to the correct, modern trace path: /trace/letters/a
        navigate(`/trace/${categoryId}/${item.toLowerCase()}`);
    };

    return (
        <div className="min-h-screen relative bg-gradient-to-br from-indigo-100 to-cyan-50 p-6">
            <NavBar themeColor="text-indigo-800" />
            
            {/* pt-20 added to make space for fixed NavBar */}
            <div className="pt-5"> 
                <header className="text-center py-4 mb-10">
                    <h1 className="text-5xl md:text-5xl font-extrabold text-indigo-800 tracking-tight drop-shadow-md">
                        Trace the Alphabets
                    </h1>
                    <p className="text-xl text-indigo-600 mt-5">
                        Click on a letter to start tracing.
                    </p>
                </header>
                
                {/* Item List Container */}
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
            
            {/* The previous Back to Categories button is removed, 
                as NavBar already provides a Back button. */}
            
        </div>
    );
}