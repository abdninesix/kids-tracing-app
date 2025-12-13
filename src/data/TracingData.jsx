// src/data/TracingData.js

const generateRange = (start, end) => 
    Array.from({ length: end - start + 1 }, (_, i) => String(start + i));

// --- Huroof-e-Tahajji ki list ---
const URDU_ALPHABETS = [
    'ا', 'ب', 'پ', 'ت', 'ٹ', 'ث', 'ج', 'چ', 'ح', 'خ', 
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
        items: ['Circle', 'Square', 'Triangle', 'Star', 'Diamond', 'Rectangle', 'Oval', 'Arrow'], // Naye Shapes
        backPath: '/shapes'
    },
    urdu: {
        title: 'Huroof',
        items: URDU_ALPHABETS, 
        backPath: '/urdu'
    }
};

export const getTracingData = (categoryId, item) => {
    const categoryData = TRACING_ITEMS[categoryId];
    if (!categoryData) return null;

    let currentItem;
    
    // Item ko category ke mutabiq format karein
    if (categoryId === 'letters') {
        currentItem = item.toUpperCase(); 
    } else if (categoryId === 'shapes') {
        currentItem = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase(); 
    } else {
        // 'numbers' aur 'urdu' ke liye jaisa item aaya hai, waisa hi rakhein
        currentItem = item;
    }
    
    const itemsList = categoryData.items;
    const currentIndex = itemsList.indexOf(currentItem); 

    if (currentIndex === -1) return null;

    // Next aur Previous item nikalna (Circular navigation)
    const nextItem = itemsList[(currentIndex + 1) % itemsList.length];
    const prevItem = itemsList[(currentIndex - 1 + itemsList.length) % itemsList.length];

    return {
        categoryTitle: categoryData.title,
        currentItem,
        nextItem, 
        prevItem,
        backPath: categoryData.backPath
    };
};