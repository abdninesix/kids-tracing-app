import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-50">
      <button
        onClick={() => navigate("/letters")}
        className="bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg text-xl hover:bg-indigo-700"
      >
        Start Tracing
      </button>
    </div>
  );
}
