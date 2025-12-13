import React from 'react';

// Card for Category Selection (e.g., Alphabets, Numbers)
export default function TracingCard({ title, icon, onClick, colorClass }) {
    
  return (
    <div
      onClick={onClick}
      // Card Container: Center Align aur proper padding/margin
      className={`relative w-48 h-48 flex flex-col items-center justify-center 
              ${colorClass} text-white rounded-2xl shadow-xl m-4 
              transform transition-all duration-300 ease-in-out 
              hover:scale-105 hover:shadow-2xl active:scale-95 cursor-pointer border-4 border-white/30 p-2`} // p-2 added for internal padding
    >
      
      {/* Icon/Display Text */}
      {/* Font size ko 7xl se 6xl kar diya gaya hai aur mx-2 add kiya gaya hai taaki content cut na ho */}
      <span className="text-5xl md:text-6xl font-black drop-shadow-md mb-2 text-center mx-2"> 
        {icon}
      </span>
      
      {/* Title */}
      <span className="text-xl md:text-2xl font-bold drop-shadow-sm mt-1 pb-1 px-1 text-center">
        {title}
      </span>
      
    </div>
  );
}