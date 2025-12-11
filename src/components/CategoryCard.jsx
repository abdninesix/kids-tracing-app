import React from 'react';

// Card for Category Selection (e.g., Alphabets, Numbers)
export default function CategoryCard({ title, icon, onClick, colorClass }) {
  // title: Category ka naam (e.g., "Alphabets")
  // icon: Category ko represent karne wala text (e.g., "ABC" ya "123")
  // colorClass: Tailwind CSS class for background color

  return (
    <div
      onClick={onClick}
      className={`relative w-48 h-48 flex flex-col items-center justify-center 
                   ${colorClass} text-white rounded-2xl shadow-xl m-4 
                   transform transition-all duration-300 ease-in-out 
                   hover:scale-105 hover:shadow-2xl active:scale-95 cursor-pointer border-4 border-white/30`}
    >
      
      {/* Icon/Display Text */}
      <span className="text-5xl md:text-7xl font-black drop-shadow-md mb-2">
        {icon}
      </span>
      
      {/* Title */}
      <span className="text-xl md:text-2xl font-bold drop-shadow-sm mt-2">
        {title}
      </span>
      
    </div>
  );
}