import React from 'react';

export default function TracingCard({ title, icon, onClick, colorClass }) {
  return (
    <div
      onClick={onClick}
      className="bg-white/60 backdrop-blur-lg p-6 rounded-[40px] shadow-xl flex flex-col items-center border border-white/60 cursor-pointer hover:scale-105 transition-all duration-300 group w-full"
    >
      <div className="mb-4 bg-white rounded-full p-6 shadow-inner group-hover:rotate-12 transition-transform text-center">
        <span className={`text-5xl font-black bg-gradient-to-r ${colorClass} bg-clip-text text-transparent`}>
          {icon}
        </span>
      </div>
      <h2 className="text-2xl font-bold text-indigo-900 mb-4">{title}</h2>
      <button className={`w-full py-3 bg-gradient-to-r ${colorClass} text-white font-bold rounded-2xl shadow-md uppercase`}>
        Start
      </button>
    </div>
  );
}