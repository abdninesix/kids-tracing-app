import React from "react";
import { useNavigate } from "react-router-dom";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function LettersPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-blue-100 to-indigo-100">
      <h1 className="text-3xl font-bold text-indigo-700 text-center mb-8">
        Trace Any Letter
      </h1>

      <div className="grid grid-cols-4 gap-6 justify-center">
        {letters.map((l) => (
          <div
            key={l}
            onClick={() => navigate(`/trace/${l}`)}
            className="flex items-center justify-center bg-white shadow-lg rounded-2xl p-8 border border-indigo-200 hover:scale-105 transition cursor-pointer"
          >
            <span className="text-6xl font-extrabold text-indigo-600 tracking-wider opacity-40">
              {l}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
