import React from 'react';

export default function AlphabetCard({ letter, onClick, isCompleted }) {
  if (!letter) return null;

  const colors = [
    'from-emerald-500 to-emerald-700', 
    'from-orange-500 to-red-600', 
    'from-pink-500 to-rose-700', 
    'from-fuchsia-600 to-purple-800',
    'from-blue-600 to-indigo-800'
  ];
  
  const charCode = typeof letter === 'string' ? letter.charCodeAt(0) : 0;
  const colorIndex = charCode % colors.length;
  const colorClass = colors[colorIndex];

  const textSize = letter.length > 2 ? 'text-lg md:text-xl' : 'text-4xl md:text-6xl';

  return (
    <div
      onClick={onClick}
      className={`group relative aspect-[4/5] flex flex-col items-center justify-center 
                  bg-gradient-to-br ${colorClass} text-white rounded-[2rem] shadow-lg
                  transform transition-all duration-300 ease-out 
                  hover:-translate-y-2 hover:shadow-xl active:scale-95 cursor-pointer 
                  border-t-2 border-t-white/30 
                  border-b-8 border-b-black/20 p-2`}
    >
      <span className={`${textSize} font-black drop-shadow-lg uppercase text-center break-words w-full`}>
        {letter}
      </span>
      
      {isCompleted && (
        <span className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1 border-2 border-white text-xs">
          ⭐
        </span>
      )}
      {/* Black line div removed from here */}
    </div>
  );
}