import React from 'react';
import { useNavigate } from 'react-router-dom';
import TracingCard from '../components/TracingCard';

const CATEGORIES = [
  { 
    id: 'letters', 
    title: 'Alphabets', 
    icon: 'ABC', 
    colorClass: 'bg-indigo-600 hover:bg-indigo-700',
    path: '/letters' 
  },
  { 
    id: 'numbers', 
    title: 'Numbers', 
    icon: '123', 
    colorClass: 'bg-teal-600 hover:bg-teal-700',
    path: '/counting' 
  },
  // --- NEW CATEGORY ADDED: URDU HUROOF ---
  { 
    id: 'urdu', 
    title: 'حروف تہجی (Urdu)', 
    icon: 'أبج', // Display icon using the first few Urdu/Arabic characters
    colorClass: 'bg-green-600 hover:bg-green-700', // Naya rang diya gaya hai
    path: '/urdu' // Ye path aapki routing mein bhi hona chahiye
  },
  // --- EXISTING CATEGORY ---
  { 
    id: 'shapes', 
    title: 'Shapes', 
    icon: '★', 
    colorClass: 'bg-pink-600 hover:bg-pink-700',
    path: '/shapes' 
  },
];

export default function CategoriesPage() {
  const navigate = useNavigate();

  // Nayi logic: Category object ko receive karein aur uske path par navigate karein
  const handleCategoryClick = (category) => {
    navigate(category.path); 
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-16 bg-gradient-to-br from-indigo-100 to-cyan-50 p-6">
      <header className="text-center py-6 mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-800 tracking-tight drop-shadow-md">
          Choose a Category
        </h1>
        <p className="text-xl text-indigo-600 mt-3">
          What would you like to trace first?
        </p>
      </header>

     <div className="flex flex-nowrap justify-start gap-6 max-w-full mx-auto overflow-x-scroll p-4">
    {CATEGORIES.map((category) => (
        <TracingCard
            key={category.id}
            item={category.icon}
            title={category.title}
            colorClass={category.colorClass}
            // Yahan par hum poora category object pass kar rahe hain
            onClick={() => handleCategoryClick(category)} 
        />
    ))}
</div>
      <div className="text-center mt-12">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-violet-600 text-white rounded-lg shadow-lg hover:bg-violet-700 transition font-medium"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}