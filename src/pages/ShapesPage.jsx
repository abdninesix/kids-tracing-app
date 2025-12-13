import React from 'react';
import { useNavigate } from 'react-router-dom';
import TracingCard from '../components/TracingCard';
import { TRACING_ITEMS } from '../data/TracingData'; 
import NavBar from '../components/Navbar'; // NavBar import karein

// Shapes ke liye multiple colors ka array define karein
// Yeh colors aapki image (Pink, Orange, Purple) se milte julte hain.
const SHAPE_COLORS = [
    "bg-pink-600 hover:bg-pink-700",       // Pink (like Circle)
    "bg-orange-600 hover:bg-orange-700",   // Orange (like Diamond, Square, Star)
    "bg-purple-600 hover:bg-purple-700",   // Purple (like Triangle)
    "bg-fuchsia-600 hover:bg-fuchsia-700", // Extra color for longer lists
];




export default function ShapesPage() {
    const navigate = useNavigate();
    const categoryId = 'shapes';
    
    // TRACING_ITEMS se shapes list fetch karein
    const unsortedItems = TRACING_ITEMS[categoryId].items; 
    
    // Items ko Alphabetical order mein sort karein
    const items = [...unsortedItems].sort((a, b) => a.localeCompare(b));
    
    

    const handleItemClick = (item) => {
        // Sahi trace path par navigate karein: /trace/shapes/circle
        navigate(`/trace/${categoryId}/${item.toLowerCase()}`);
    };

    return (
        // relative class for NavBar positioning
        <div className="min-h-screen relative bg-gradient-to-br from-indigo-100 to-cyan-50 p-6">
            
            {/* 1. NavBar Add Karein */}
            <NavBar themeColor="text-indigo-800" />
            
            {/* 2. Content ko NavBar ke neechay dhakelne ke liye div aur pt-5 */}
            <div className="pt-5"> 
                <header className="text-center py-6 mb-10">
                    <h1 className="text-5xl md:text-5xl font-extrabold text-indigo-800 tracking-tight drop-shadow-md">
                        Trace the Shapes
                    </h1>
                    <p className="text-xl text-indigo-600 mt-5">
                        Click on a shape to start tracing.
                    </p>
                </header>
                
                {/* Shapes Cards List */}
                <div className="flex flex-wrap justify-center gap-2 max-w-7xl mx-auto">
                    {items.map((item, index) => (
                        <TracingCard
                            key={item}
                            item={item} 
                            // 3. Color: index ke mutabiq SHAPE_COLORS array se color uthaya gaya hai
                            colorClass={SHAPE_COLORS[index % SHAPE_COLORS.length]}
                            onClick={() => handleItemClick(item)}
                          
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}