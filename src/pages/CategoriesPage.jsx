import React from 'react';
import { useNavigate } from 'react-router-dom';
import TracingCard from '../components/TracingCard';
import NavBar from '../components/Navbar';

const CATEGORIES = [
  { 
    id: 'letters', 
    title: 'Alphabets', 
    icon: 'abc', 
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
  { 
    id: 'urdu', 
    title: 'حروف تہجی ', 
    icon: 'أبج', 
    colorClass: 'bg-green-600 hover:bg-green-700', 
    path: '/urdu' 
  },
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

  const handleCategoryClick = (category) => {
    navigate(category.path); 
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center pt-16 bg-gradient-to-br from-indigo-100 to-cyan-50 p-6">
      
  
     <NavBar themeColor="text-indigo-800" />
      
      <header className="text-center py-6 mb-8 mt-5"> {/* mb kam ki gayi */}
        <h1 className="text-5xl md:text-5xl font-extrabold text-indigo-800 tracking-tight drop-shadow-md">
          Choose a Category
        </h1>
        <p className="text-xl text-indigo-600 mt-5">
          What would you like to trace first?
        </p>
      </header>

      {/* 2. Main Content Area: Flex-wrap aur Justify-center wapas laya gaya */}
      <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto"> 
        {CATEGORIES.map((category) => (
            <TracingCard
                key={category.id}
                item={category.icon}
                title={category.title}
                colorClass={category.colorClass}
                onClick={() => handleCategoryClick(category)} 
            />
        ))}
      </div>
      
    </div>
  );
}