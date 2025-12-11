import React from 'react';

export default function TracingCard({ item, title, onClick, colorClass, isCompleted }) {
    
    const isCategory = title !== undefined;
    
    // Card size remains fixed for list items
    const cardSize = isCategory ? 'w-48 h-48 m-4' : 'w-24 h-28 md:w-36 md:h-36 m-2';
    
    // Default size for single letter/digit
    const defaultIconSize = 'text-6xl md:text-8xl';
    
    // Dynamic Font Size Calculation
    let finalIconSize = defaultIconSize;
    if (!isCategory && item) {
        const itemLength = String(item).length;
        if (itemLength > 4) {
            // Very small for very long shape names
            finalIconSize = 'text-lg md:text-xl font-normal pt-2'; 
        } else if (itemLength > 2) {
            // Medium size for 3-4 digits (like 100) or words (like Star)
            finalIconSize = 'text-3xl md:text-5xl'; 
        } else if (itemLength > 1) {
             // Large size for 2 digits (like 10)
            finalIconSize = 'text-4xl md:text-6xl'; 
        } 
        // Single digit/letter remains defaultIconSize
    }


    const completionClass = isCompleted 
        ? 'border-4 border-cyan-400 shadow-inner' 
        : 'border-2 border-white/30';

    let finalColorClass = colorClass;
    if (!isCategory) {
        const colors = [
            'bg-indigo-600', 
            'bg-teal-600', 
            'bg-pink-600', 
            'bg-amber-600', 
            'bg-purple-600'
        ];
        const charCode = typeof item === 'string' ? item.charCodeAt(0) : 0;
        finalColorClass = colors[charCode % colors.length] + ' hover:opacity-90';
    }


    return (
        <div
            onClick={onClick}
            className={`relative flex flex-col items-center justify-center 
                        ${finalColorClass} text-white rounded-2xl shadow-xl 
                        transform transition-all duration-300 ease-in-out 
                        hover:scale-105 hover:shadow-2xl active:scale-95 cursor-pointer 
                        ${cardSize} ${isCategory ? 'border-4 border-white/30' : completionClass}`}
        >
            
            <span className={`${finalIconSize} font-black drop-shadow-md text-center px-1`}>
                {item}
            </span>
            
            {isCategory && (
                <span className="text-xl md:text-2xl font-bold drop-shadow-sm mt-2">
                    {title}
                </span>
            )}
            
            {isCompleted && (
                <span className="absolute top-2 right-2 text-3xl" role="img">
                    ⭐
                </span>
            )}
        </div>
    );
}