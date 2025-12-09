import React from "react";

export default function LetterBox({ letter }) {
  return (
    <div className="w-20 h-20 flex items-center justify-center bg-white border-2 border-indigo-200 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer">
      <span className="text-4xl font-bold text-indigo-500"
        style={{
          fontFamily: "Arial",
          background: "repeating-linear-gradient(90deg, transparent 0 8px, rgba(0,0,0,0.1) 8px 10px)",
          WebkitBackgroundClip: "text",
          color: "transparent"
        }}
      >
        {letter}
      </span>
    </div>
  );
}
