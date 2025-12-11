const generateRange = (start, end) => 
    Array.from({ length: end - start + 1 }, (_, i) => String(start + i));

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
        // Item ko URL se (e.g., 'circle') Proper Case mein convert karein.
        currentItem = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase(); 
    } else {
        // Default fallback
        currentItem = item;
    }
    
    const itemsList = categoryData.items;
    const currentIndex = itemsList.indexOf(currentItem); // Ab 'Circle' aur 'Circle' match ho jayenge

    if (currentIndex === -1) return null;

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