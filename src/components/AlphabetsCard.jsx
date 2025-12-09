import React from "react";

export default function AlphabetCard({ letter = "A", onClick }) {
  return (
    <div
      onClick={onClick}
      className="w-24 h-24 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-xl shadow-lg flex items-center justify-center cursor-pointer transform hover:scale-105 transition duration-300"
    >
      <span className="text-white font-extrabold text-4xl select-none">{letter}</span>
    </div>
  );
}
