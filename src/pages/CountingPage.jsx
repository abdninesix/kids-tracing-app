import React from 'react';
import { useNavigate } from 'react-router-dom';
import AlphabetCard from '../components/AlphabetsCard';
import NavBar from '../components/Navbar'; 

const generateNumbers = () => {
    return Array.from({ length: 20 }, (_, i) => String(i + 1)); 
};

export default function CountingPage() {
    const navigate = useNavigate();
    const items = generateNumbers();
    const categoryId = 'numbers';

    const handleItemClick = (item) => {
        navigate(`/trace/${categoryId}/${item}`); 
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-200 via-cyan-100 to-purple-200 p-4 md:p-8">
          <NavBar themeColor="text-indigo-900" backPath="/categories" />

            <header className="text-center mt-3 mb-8">
                <h1 className="text-4xl md:text-6xl font-extrabold text-indigo-900 tracking-tight drop-shadow-md">
                    Trace the Numbers
                </h1>
                <p className="text-lg text-indigo-700 font-semibold mt-2">
                    Pick a number from 1 to 20!
                </p>
            </header>
            
            <div className="bg-white/30 backdrop-blur-xl p-6 md:p-10 rounded-[40px] shadow-2xl max-w-6xl w-full border border-white/40 mb-10">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-4 md:gap-6">
                    {items.map((item) => (
                        <AlphabetCard
                            key={item}
                            letter={item} 
                            onClick={() => handleItemClick(item)}
                        />
                    ))}
                </div>
            </div>

           
        </div>
    );
}