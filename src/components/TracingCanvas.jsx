// src/components/TracingCanvas.jsx
import React, { useRef, useState, useEffect, useCallback } from "react";

// --- GLOBAL PATH DATA (A-Z, 1-20, Shapes) ---
// Note: Coordinates adjusted for a viewBox of 300x400
const PATHS = {
    // --- LETTERS (A-Z) ---
    A: "M65 335 L150 35 L235 335 M95 225 L205 225",
    B: "M45 35 L45 335 M45 35 C175 35 175 155 45 155 M45 155 C175 155 175 335 45 335",
    C: "M225 95 C155 15 55 15 55 175 C55 335 155 335 225 255",
    D: "M65 35 L65 335 C200 335 200 35 65 35",
    E: "M225 35 L65 35 L65 335 L225 335 M65 185 L175 185",
    F: "M65 35 L65 335 M225 35 L65 35 M65 185 L175 185",
    G: "M225 175 C225 335 65 335 65 175 C65 35 225 35 225 125 L160 125",
    H: "M65 35 L65 335 M235 35 L235 335 M65 185 L235 185",
    I: "M65 35 L235 35 M150 35 L150 335 M65 335 L235 335",
    J: "M235 35 L235 275 C235 335 65 335 65 275",
    K: "M65 35 L65 335 M235 35 L65 185 L235 335",
    L: "M65 35 L65 335 L235 335",
    M: "M65 335 L65 35 L150 175 L235 35 L235 335",
    N: "M65 335 L65 35 L235 335 L235 35",
    O: "M150 35 C225 35 225 335 150 335 C75 335 75 35 150 35 Z",
    P: "M65 335 L65 35 L175 35 C225 35 225 155 175 155 L65 155",
    Q: "M150 35 C225 35 225 335 150 335 C75 335 75 35 150 35 Z M170 250 L235 335",
    R: "M65 335 L65 35 L175 35 C225 35 225 155 175 155 L65 155 M175 155 L235 335",
    S: "M75 35 C225 35 225 175 75 175 C225 175 225 315 75 315",
    T: "M65 35 L235 35 M150 35 L150 335",
    U: "M65 35 L65 275 C65 335 235 335 235 275 L235 35",
    V: "M65 35 L150 335 L235 35",
    W: "M65 35 L100 335 L150 60 L200 335 L235 35",
    X: "M65 35 L235 335 M235 35 L65 335",
    Y: "M65 35 L150 185 L235 35 M150 185 L150 335",
    Z: "M65 35 L235 35 L65 335 L235 335",
    // --- NUMBERS (1-20) ---
    '1': "M150 35 L150 335 M150 35 L100 85",
    '2': "M75 80 C75 30 225 30 225 100 L75 330 L225 330",
    '3': "M75 80 C225 80 225 180 150 180 C225 180 225 280 75 280",
    '4': "M180 35 L180 335 M50 180 H230 M50 35 L180 180",
    '5': "M225 35 H75 M75 35 L75 180 M75 180 C225 180 225 335 75 335",
    '6': "M225 35 L75 335 C75 250 180 250 180 300 C180 325 125 325 125 300",
    '7': "M75 35 H225 L100 335",
    '8': "M150 35 C225 35 225 180 150 180 C75 180 75 35 150 35 Z M150 180 C225 180 225 335 150 335 C75 335 75 180 150 180 Z",
    '9': "M75 300 L225 35 C225 150 75 150 75 100 C75 75 125 75 125 100",
    '10': "M100 35 L100 335 M200 185 C230 185 230 335 200 335 C170 335 170 35 200 35 Z",
    '11': "M100 50 L100 300 M200 50 L200 300",
    '12': "M100 50 L100 300 M175 100 C175 50 250 50 250 120 L175 300 L250 300",
    '13': "M100 50 L100 300 M175 100 C250 100 250 180 200 180 C250 180 250 260 175 260",
    '14': "M100 50 L100 300 M225 50 L225 300 M175 180 H250 M175 50 L225 180",
    '15': "M100 50 L100 300 M250 50 H175 M175 50 L175 180 M175 180 C250 180 250 300 175 300",
    '16': "M100 50 L100 300 M250 50 L175 300 C175 230 230 230 230 280 C230 300 200 300 200 280",
    '17': "M100 50 L100 300 M175 50 H250 L200 300",
    '18': "M100 50 L100 300 M200 50 C250 50 250 180 200 180 C150 180 150 50 200 50 Z M200 180 C250 180 250 300 200 300 C150 300 150 180 200 180 Z",
    '19': "M100 50 L100 300 M200 50 C250 50 250 180 200 180 C150 180 150 50 200 50 Z M175 280 L250 50",
    '20': "M75 100 C75 50 150 50 150 120 L75 300 L150 300 M225 185 C255 185 255 335 225 335 C195 335 195 35 225 35 Z",

    // --- SHAPES ---
    'Circle': "M150 35 C225 35 225 335 150 335 C75 335 75 35 150 35 Z",
    'Square': "M65 65 H235 V235 H65 Z",
    'Triangle': "M150 35 L65 335 H235 Z",
    'Star': "M150 35 L175 135 L275 165 L200 225 L225 325 L150 275 L75 325 L100 225 L25 165 L125 135 Z",
    'Diamond': "M150 35 L250 185 L150 335 L50 185 Z",
};

// --- GET PATH FUNCTION ---
const getPathForItem = (item, categoryId) => {
    if (!item || !categoryId) return null;

    if (categoryId === 'letters') {
        return PATHS[item.toUpperCase()] || null;
    } else if (categoryId === 'numbers') {
        return PATHS[item] || null;
    } else if (categoryId === 'shapes') {
        const properCaseItem = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
        return PATHS[properCaseItem] || null;
    }
    return null;
};

// --- SOUND FUNCTIONS ---
const playSuccessSound = () => {
    try {
        const audio = new Audio("/sounds/success.mp3");
        audio.play().catch((e) => console.error("Success audio failed:", e));
    } catch (e) {
        console.error("Success audio API failed:", e);
    }
};

const playFailureSound = () => {
    try {
        const audio = new Audio("/sounds/oops.mp3"); 
        audio.play().catch((e) => console.error("Failure audio failed:", e));
    } catch (e) {
        console.error("Failure audio API failed:", e);
    }
};

// --- TRACING CANVAS COMPONENT ---
export default function TracingCanvas({
    width = 300,
    height = 400,
    item = "A",
    categoryId = "letters"
}) {
    const currentPath = getPathForItem(item, categoryId);

    // If path data is missing, show error display
    if (!currentPath) {
        return (
            <div className="max-w-sm mx-auto p-3 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl shadow-red-300 w-full" style={{ maxWidth: `${width + 40}px` }}>
                <h2 className="text-center text-3xl font-bold mb-6 text-red-700 drop-shadow-sm">
                    404: Tracing Path Not Found!
                </h2>
                <div className="text-center p-10 border-4 border-red-400 rounded-lg bg-red-50">
                    <span className="text-9xl font-black text-red-300">{item.toUpperCase()}</span>
                    <p className="mt-4 text-lg font-semibold text-red-600">
                        Path data is missing for {item} in the '{categoryId}' category.
                    </p>
                </div>
            </div>
        );
    }

    // --- State and Refs ---
    const svgRef = useRef(null);
    const pathRef = useRef(null);
    const [drawing, setDrawing] = useState(false);
    const [strokes, setStrokes] = useState([]);
    const [currentStroke, setCurrentStroke] = useState([]);
    const [targetPoints, setTargetPoints] = useState([]);
    const [completed, setCompleted] = useState(false);
    const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
    const [showFailureAnimation, setShowFailureAnimation] = useState(false);

    const tolerance = 18;
    const successThreshold = 0.90;

    // --- RESET FUNCTION ---
    const resetCanvas = useCallback(() => {
        const pathEl = pathRef.current;
        if (!pathEl) return;

        const length = pathEl.getTotalLength();
        const samples = 150;
        const pts = [];
        for (let i = 0; i <= samples; i++) {
            const p = pathEl.getPointAtLength((i / samples) * length);
            pts.push({ x: p.x, y: p.y, hit: false });
        }

        setTargetPoints(pts);
        setStrokes([]);
        setCurrentStroke([]);
        setCompleted(false);
        setShowSuccessAnimation(false);
        setShowFailureAnimation(false);
    }, [currentPath]);

    useEffect(() => {
        if (pathRef.current) {
            resetCanvas();
        }
    }, [currentPath, resetCanvas]);

    // --- POINTER/COORDINATE LOGIC ---
    const getPointer = (e) => {
        const svg = svgRef.current;
        if (!svg) return { x: 0, y: 0 }; 

        const pt = svg.createSVGPoint();
        
        if (e.touches && e.touches.length > 0) {
            pt.x = e.touches[0].clientX;
            pt.y = e.touches[0].clientY;
        } else {
            pt.x = e.clientX;
            pt.y = e.clientY;
        }

        const ctm = svg.getScreenCTM();
        if (ctm) return pt.matrixTransform(ctm.inverse());
        return pt;
    };

    // --- DRAWING HANDLERS ---
    const startDraw = (e) => {
        if (completed) return; 
        e.preventDefault();
        const p = getPointer(e);
        setCurrentStroke([{ x: p.x, y: p.y }]);
        setDrawing(true);
    };

    const moveDraw = (e) => {
        if (!drawing) return;
        e.preventDefault();
        const p = getPointer(e);
        setCurrentStroke((prev) => [...prev, { x: p.x, y: p.y }]);
    };

    const endDraw = () => {
        if (!drawing) return; 
        setDrawing(false);
        
        // Add the finished current stroke to strokes array
        const updatedStrokes = currentStroke.length > 0 ? [...strokes, currentStroke] : strokes;
        setStrokes(updatedStrokes);
        setCurrentStroke([]);
        
        // IMPORTANT: Accuracy check is MOVED to checkMyTrace function (button click)
    };

    // --- CHECK ACCURACY LOGIC ---
    const checkAccuracy = (allStrokes) => {
        if (allStrokes.length === 0) {
            // Optional: User ko alert de sakte hain
            // alert("Please draw the item first!");
            playFailureSound(); // Sound feedback for empty trace
            setShowFailureAnimation(true);
            setTimeout(() => setShowFailureAnimation(false), 2500);
            return;
        }

        const updated = targetPoints.map((p) => ({ ...p, hit: false }));
        
        allStrokes.forEach((stroke) => {
            stroke.forEach((pt) => {
                updated.forEach((t) => {
                    const dx = t.x - pt.x;
                    const dy = t.y - pt.y;
                    if (dx * dx + dy * dy <= tolerance * tolerance) t.hit = true;
                });
            });
        });

        const hitCount = updated.filter((p) => p.hit).length;
        const accuracy = hitCount / updated.length;

        if (accuracy >= successThreshold) {
            playSuccessSound();
            setShowSuccessAnimation(true);
            setTimeout(() => setShowSuccessAnimation(false), 2500);
            setCompleted(true);
        } else {
            playFailureSound();
            setShowFailureAnimation(true);
            setTimeout(() => setShowFailureAnimation(false), 2500);
            // setStrokes([]); // Optional: Ghalat hone par clear karna
        }
        setTargetPoints(updated);
    };
    
    // Handler for the Check Button
    const checkMyTrace = () => {
        checkAccuracy(strokes);
    };

    // --- DISPLAY ITEMS ---
    const getDisplayItem = () => {
        if (categoryId === 'shapes') {
            return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
        }
        return item.toUpperCase();
    }
    
    const getTitle = () => {
        if (categoryId === 'letters') return 'Letter';
        if (categoryId === 'numbers') return 'Number';
        if (categoryId === 'shapes') return 'Shape';
        return 'Item';
    }


    return (
        <div
            className="max-w-sm mx-auto p-3 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl shadow-indigo-300 w-full"
            style={{ maxWidth: `${width + 40}px` }}
        >
            <h2 className="text-center text-3xl font-bold mb-6 text-indigo-900 drop-shadow-sm">
                Trace the {getTitle()}{" "}
                <span className="text-cyan-600">{getDisplayItem()}</span>!
            </h2>

            <div
                className={`relative w-full overflow-hidden ${completed ? 'border-green-500 shadow-green-400/70 border-8' : 'border-cyan-400 border-4'}`}
                style={{ height: `${height}px`, width: `${width}px`, margin: "0 auto", borderRadius: '8px', transition: 'all 0.3s ease' }}
            >
                <svg
                    ref={svgRef}
                    viewBox={`0 0 ${width} ${height}`}
                    className="w-full h-full bg-white cursor-crosshair"
                    onMouseDown={startDraw}
                    onMouseMove={moveDraw}
                    onMouseUp={endDraw}
                    onMouseLeave={endDraw}
                    onTouchStart={startDraw}
                    onTouchMove={moveDraw}
                    onTouchEnd={endDraw}
                    onTouchCancel={endDraw}
                >
                    {/* 1. Dotted Path (Guide) */}
                    <path
                        d={currentPath}
                        fill="none"
                        stroke="#67e8f9" // Cyan-300
                        strokeWidth={5}
                        strokeDasharray="6,10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* 2. Invisible Path for Measurement */}
                    <path
                        ref={pathRef}
                        d={currentPath}
                        fill="none"
                        stroke="transparent"
                        strokeWidth={5}
                    />

                    {/* 3. User's Drawn Strokes */}
                    {strokes.map((s, i) => (
                        <polyline
                            key={i}
                            points={s.map((p) => `${p.x},${p.y}`).join(" ")}
                            fill="none"
                            stroke="#4F46E5" // Indigo-600
                            strokeWidth={10}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    ))}

                    {/* 4. Currently Drawing Stroke */}
                    {currentStroke.length > 0 && (
                        <polyline
                            points={currentStroke.map((p) => `${p.x},${p.y}`).join(" ")}
                            fill="none"
                            stroke="#4F46E5"
                            strokeWidth={10}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    )}
                </svg>

                {/* --- SUCCESS/FAILURE ANIMATION OVERLAYS --- */}
                {showSuccessAnimation && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 bg-white/70">
                        <div className="text-3xl text-green-500 font-extrabold drop-shadow-lg animate-pop">
                             Great Job! ⭐
                        </div>
                    </div>
                )}

                {showFailureAnimation && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 bg-white/-70">
                        <div className="text-2xl text-red-500 font-extrabold drop-shadow-lg animate-pop">
                            ❌ Oops! Try Again! 
                        </div>
                    </div>
                )}
            </div>

            <div className="flex justify-between w-full mt-6">
                <button
                    onClick={resetCanvas}
                    className="flex items-center justify-center px-4 py-3 bg-red-500 text-white font-bold rounded-xl shadow-lg shadow-red-300/70 hover:bg-red-600 transition duration-150 transform hover:scale-[1.03] flex-grow mr-2 active:scale-[0.98]"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Clear
                </button>
                <button
                    onClick={checkMyTrace}
                    className="flex items-center justify-center px-4 py-3 bg-green-500 text-white font-bold rounded-xl shadow-lg shadow-green-300/70 hover:bg-green-600 transition duration-150 transform hover:scale-[1.03] flex-grow ml-2 active:scale-[0.98]"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                    Check My Trace
                </button>
            </div>
        </div>
    );
}