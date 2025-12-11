import React from 'react';
import { useNavigate } from 'react-router-dom';
import TracingCard from '../components/TracingCard';

// Function to generate numbers 1 through 100
const generateNumbers = () => {
    // Array.from(length 100) banayein
    // Aur har index (i) mein 1 add karke 1 se 100 tak numbers ki string list banayein
    return Array.from({ length: 100 }, (_, i) => String(i + 1)); 
};

const getCompletedItems = () => {
    // Dummy completion status (aapke hisab se isko update kiya jayega)
    return ['1', '15', '50']; 
};

export default function CountingPage() {
  const navigate = useNavigate();
  const items = generateNumbers(); // Ab yahan 100 items honge
  const completedItems = getCompletedItems();
  const categoryId = 'numbers';

  const handleItemClick = (item) => {
    // Navigate to the tracing page: /trace/numbers/1
    navigate(`/trace/${categoryId}/${item.toLowerCase()}`); 
  };

  return (
    <div className="min-h-screen bg-indigo-100 p-6">
      <header className="text-center py-6 mb-10">
        <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-800 tracking-tight drop-shadow-md">
          Trace the Numbers (1-100)!
        </h1>
        <p className="text-xl text-indigo-600 mt-2">
          Click on a number to start tracing.
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
      <div className="flex flex-wrap justify-center gap-2 max-w-7xl mx-auto">
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