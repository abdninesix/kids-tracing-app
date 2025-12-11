import React from 'react';
import { useNavigate } from 'react-router-dom';
import TracingCard from '../components/TracingCard';
import { TRACING_ITEMS } from '../data/TracingData'; 

const getCompletedItems = () => {
    // Dummy completion status for Shapes
    return ['Circle', 'Star']; 
};

export default function ShapesPage() {
  const navigate = useNavigate();
  const categoryId = 'shapes';
  
  // TRACING_ITEMS se shapes list fetch karein
  const unsortedItems = TRACING_ITEMS[categoryId].items; 
  
  // --- FIX: Items ko Alphabetical order mein sort karein ---
  // A, B, C... sequence (e.g., Circle, Diamond, Square...)
  const items = [...unsortedItems].sort((a, b) => a.localeCompare(b));
  
  const completedItems = getCompletedItems();

  const handleItemClick = (item) => {
    // Sahi trace path par navigate karein: /trace/shapes/circle
    // Items ko lowercase mein bhejna zaroori hai
    navigate(`/trace/${categoryId}/${item.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-indigo-100 p-6">
      <header className="text-center py-6 mb-10">
        <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-800 tracking-tight drop-shadow-md">
          Trace the Shapes!
        </h1>
        <p className="text-xl text-indigo-600 mt-2">
          Click on a shape to start tracing.
        </p>
      </header>
 <div className="text-center mt-12">
        <button
          onClick={() => navigate("/categories")}
          className="px-6 py-3 bg-violet-600 text-white rounded-lg shadow-lg hover:bg-violet-700 transition font-medium"
        >
          ← Back to Categories
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-2 max-w-6xl mx-auto">
        {items.map((item) => (
          <TracingCard
            key={item}
            item={item} 
            onClick={() => handleItemClick(item)}
            isCompleted={completedItems.includes(item)}
          />
        ))}
      </div>

     
    </div>
  );
}