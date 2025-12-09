import React from "react";

export default function CategoryCard({ title, description, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white shadow-lg hover:shadow-xl transition rounded-2xl p-6 max-w-xs border border-indigo-100"
    >
      <h2 className="text-xl font-semibold text-indigo-600 mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
