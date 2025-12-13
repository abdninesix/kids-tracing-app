// src/data/TracingData.js

const generateRange = (start, end) => 
    Array.from({ length: end - start + 1 }, (_, i) => String(start + i));

// --- Huroof-e-Tahajji ki list ---
const URDU_ALPHABETS = [
    'الف', 'ب', 'پ', 'ت', 'ٹ', 'ث', 'ج', 'چ', 'ح', 'خ', 
    'د', 'ڈ', 'ذ', 'ر', 'ڑ', 'ز', 'ژ', 'س', 'ش', 'ص', 
    'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ک', 'گ', 'ل', 
    'م', 'ن', 'و', 'ھ', 'ی', 'ے'
];


export const TRACING_ITEMS = {
    letters: {
        title: 'Letter',
        items: generateRange(65, 90).map(code => String.fromCharCode(code)), // A-Z (Uppercase)
        backPath: '/letters'
    },
    numbers: {
        title: 'Number',
        items: generateRange(1, 100).map(String), // 1-100 (Strings)
        backPath: '/counting'
    },
    shapes: {
        title: 'Shape',
        items: ['Circle', 'Square', 'Triangle', 'Star', 'Diamond'], // (Proper Case)
        backPath: '/shapes'
    },
    // --- NEW URDU CATEGORY ADDED ---
    urdu: {
        title: 'Huroof',
        items: URDU_ALPHABETS, // Items already in correct case
        backPath: '/urdu'
    }
};

export const getTracingData = (categoryId, item) => {
    const categoryData = TRACING_ITEMS[categoryId];
    if (!categoryData) return null;

    let currentItem;
    
    // FIX: Category ke hisab se item ko format karein
    if (categoryId === 'letters') {
        // Letters hamesha TRACING_ITEMS mein uppercase mein hain
        currentItem = item.toUpperCase(); 
    } else if (categoryId === 'numbers') {
        // Numbers as a string hi aate hain, koi change zaroori nahi
        currentItem = item;
    } else if (categoryId === 'shapes') {
        // Shapes TRACING_ITEMS mein Proper Case (e.g., Circle) mein hain.
        currentItem = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase(); 
    } else if (categoryId === 'urdu') {
        // Urdu Huroof ko jaisa hai waise hi rakhein (no case change)
        currentItem = item;
    } else {
        // Default fallback (though unnecessary if all categories are listed above)
        currentItem = item;
    }
    
    const itemsList = categoryData.items;
    // currentIndex ko find karne ke liye currentItem ka istemal karein jo format ho chuka hai.
    const currentIndex = itemsList.indexOf(currentItem); 

    if (currentIndex === -1) return null;

    // Next aur Previous item find karein (Circular navigation)
    const nextItem = itemsList[(currentIndex + 1) % itemsList.length];
    const prevItem = itemsList[(currentIndex - 1 + itemsList.length) % itemsList.length];

    return {
        categoryTitle: categoryData.title,
        currentItem,
        // Next aur Prev item ko bhi waise hi bhej rahe hain jaisa woh list mein hain 
        // (jo URL ke format se match honge agar hum TRACING_ITEMS ko hi URL mein use karein)
        nextItem: nextItem, 
        prevItem: prevItem,
        backPath: categoryData.backPath
    };
};