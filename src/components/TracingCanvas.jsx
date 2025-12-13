// src/components/TracingCanvas.jsx
import React, { useRef, useState, useEffect, useCallback } from "react";

// --- GLOBAL PATH DATA (A-Z, 1-20, Shapes, Urdu) ---
// Note: Coordinates adjusted for a viewBox of 300x400
const PATH_DATA = {
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
    1: "M150 35 L150 335 M150 35 L100 85",
    2: "M75 80 C75 30 225 30 225 100 L75 330 L225 330",
    3: "M75 80 C225 80 225 180 150 180 C225 180 225 280 75 280",
    4: "M180 35 L180 335 M50 180 H230 M50 35 L180 180",
    5: "M225 35 H75 M75 35 L75 180 M75 180 C225 180 225 335 75 335",
    6: "M225 35 L75 335 C75 250 180 250 180 300 C180 325 125 325 125 300",
    7: "M75 35 H225 L100 335",
    8: "M150 35 C225 35 225 180 150 180 C75 180 75 35 150 35 Z M150 180 C225 180 225 335 150 335 C75 335 75 180 150 180 Z",
    9: "M75 300 L225 35 C225 150 75 150 75 100 C75 75 125 75 125 100",
    10: "M100 35 L100 335 M200 185 C230 185 230 335 200 335 C170 335 170 35 200 35 Z",
    11: "M100 50 L100 300 M200 50 L200 300",
    12: "M100 50 L100 300 M175 100 C175 50 250 50 250 120 L175 300 L250 300",
    13: "M100 50 L100 300 M175 100 C250 100 250 180 200 180 C250 180 250 260 175 260",
    14: "M100 50 L100 300 M225 50 L225 300 M175 180 H250 M175 50 L225 180",
    15: "M100 50 L100 300 M250 50 H175 M175 50 L175 180 M175 180 C250 180 250 300 175 300",
    16: "M100 50 L100 300 M250 50 L175 300 C175 230 230 230 230 280 C230 300 200 300 200 280",
    17: "M100 50 L100 300 M175 50 H250 L200 300",
    18: "M100 50 L100 300 M200 50 C250 50 250 180 200 180 C150 180 150 50 200 50 Z M200 180 C250 180 250 300 200 300 C150 300 150 180 200 180 Z",
    19: "M100 50 L100 300 M200 50 C250 50 250 180 200 180 C150 180 150 50 200 50 Z M175 280 L250 50",
    20: "M75 100 C75 50 150 50 150 120 L75 300 L150 300 M225 185 C255 185 255 335 225 335 C195 335 195 35 225 35 Z",
    // --- URDU (Huroof) ---
    'ا': "M150 35 L150 335",
    'ب': "M50 300 L150 300 C250 300 250 300 150 300 L50 300 Z M150 350 L150 350", 
    'پ': "M30 300 L150 300 C270 300 270 300 150 300 L30 300 Z M150 350 L150 350 M100 350 L100 350 M200 350 L200 350", 
    'ت': "M50 300 L150 300 C250 300 250 300 150 300 L50 300 Z M100 250 L100 250 M200 250 L200 250", 
    'ٹ': "M50 300 L150 300 C250 300 250 300 150 300 L50 300 Z M150 80 A30 30 0 1 1 150 80 Z", 
    'ث': "M50 300 L150 300 C250 300 250 300 150 300 L50 300 Z M150 200 L150 200 M100 250 L100 250 M200 250 L200 250", 
    'ج': "M250 150 C250 50 150 50 150 150 L150 250 C150 350 50 350 50 250",
    'چ': "M250 150 C250 50 150 50 150 150 L150 250 C150 350 50 350 50 250 M150 200 L150 200 M100 250 L100 250 M200 250 L200 250",
    'ح': "M250 150 C250 50 150 50 150 150 L150 250 C150 350 50 350 50 250",
    'خ': "M250 150 C250 50 150 50 150 150 L150 250 C150 350 50 350 50 250 M100 80 L100 80", 
    'د': "M100 35 L100 150 L200 150",
    'ڈ': "M100 35 L100 150 L200 150 M150 10 A10 10 0 1 1 150 10 Z", 
    'ذ': "M100 35 L100 150 L200 150 M100 350 L100 350", 
    'ر': "M100 35 L100 250 L200 250 L200 335",
    'ڑ': "M100 35 L100 250 L200 250 L200 335 M150 50 A10 10 0 1 1 150 50 Z", 
    'ز': "M100 35 L100 250 L200 250 L200 335 M100 300 L100 300", 
    'ژ': "M100 35 L100 250 L200 250 L200 335 M150 200 L150 200 M100 250 L100 250 M200 250 L200 250", 
    'س': "M50 300 C100 250 150 250 200 300 L250 300 L250 350 C200 350 100 350 50 350",
    'ش': "M50 300 C100 250 150 250 200 300 L250 300 L250 350 C200 350 100 350 50 350 M150 100 L150 100 M100 150 L100 150 M200 150 L200 150", 
    'ص': "M50 200 C100 100 200 100 250 200 L250 350 C200 350 100 350 50 350",
    'ض': "M50 200 C100 100 200 100 250 200 L250 350 C200 350 100 350 50 350 M100 100 L100 100", 
    'ط': "M100 50 L100 300 M100 300 H250",
    'ظ': "M100 50 L100 300 M100 300 H250 M150 50 L150 50", 
    'ع': "M200 150 C200 50 100 50 100 150 L100 350",
    'غ': "M200 150 C200 50 100 50 100 150 L100 350 M100 50 L100 50", 
    'ف': "M150 150 C200 150 200 250 150 250 C100 250 100 150 150 150 Z M150 300 L150 350 M150 100 L150 100", 
    'ق': "M150 150 C200 150 200 250 150 250 C100 250 100 150 150 150 Z M150 300 L150 350 M120 100 L120 100 M180 100 L180 100", 
    'ک': "M100 35 L100 335 M100 150 L200 150 M150 100 L200 50", 
    'گ': "M100 35 L100 335 M100 150 L200 150 M150 100 L200 50 M250 150 L250 100", 
    'ل': "M150 35 L150 335 C150 350 100 350 100 335",
    'م': "M150 100 C200 100 200 200 150 200 L150 335",
    'ن': "M150 50 C250 50 250 350 150 350 C50 350 50 50 150 50 Z M150 200 L150 200", 
    'و': "M150 50 C200 50 200 150 150 150 C100 150 100 50 150 50 Z M150 150 L150 335",
    'ھ': "M100 150 C150 150 150 250 100 250 C50 250 50 150 100 150 Z M100 150 L100 335",
    'ی': "M50 300 C150 200 250 200 250 300 M100 350 L100 350 M200 350 L200 350", 
    'ے': "M50 300 C150 200 250 200 250 300", 
    // --- SHAPES ---
    Circle: "M150 35 C225 35 225 335 150 335 C75 335 75 35 150 35 Z",
    Square: "M65 65 H235 V305 H65 Z", // Height adjusted to 305 for better visibility
    Triangle: "M150 35 L65 335 H235 Z",
    Star: "M150 35 L175 135 L275 165 L200 225 L225 325 L150 275 L75 325 L100 225 L25 165 L125 135 Z",
    Diamond: "M150 35 L250 185 L150 335 L50 185 Z",
    Rectangle: "M50 75 H250 V300 H50 Z", // New Shape
    Oval: "M150 75 C250 75 250 300 150 300 C50 300 50 75 150 75 Z", // New Shape
    Arrow: "M75 185 L225 185 M175 135 L225 185 L175 235", // New Shape
};

// --- GET PATH FUNCTION ---
const getPathForItem = (item, categoryId) => {
    if (!item || !categoryId) return null;

    let key;
    if (categoryId === "letters") {
        key = item.toUpperCase();
    } else if (categoryId === "numbers") {
        key = item; 
    } else if (categoryId === 'urdu') {
        key = item; 
    } else if (categoryId === "shapes") {
        // Shapes ko proper case mein convert karke key use karein
        key = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase(); 
    } else {
        return null;
    }
    // PATH_DATA se path nikalna
    return PATH_DATA[key] || null;
};

// --- SOUND FUNCTIONS (No change) ---
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
    width = 350,
    height = 350,
    item = "A",
    categoryId = "letters",
}) {
    const currentPath = getPathForItem(item, categoryId);

    if (!currentPath) {
        return (
            <div
                className="max-w-sm mx-auto p-3 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl shadow-red-300 w-full"
                style={{ maxWidth: `${width + 40}px` }}
            >
                <h2 className="text-center text-3xl font-bold mb-6 text-red-700 drop-shadow-sm">
                    404: Tracing Path Not Found!
                </h2>
                <div className="text-center p-10 border-4 border-red-400 rounded-lg bg-red-50">
                    <span className="text-9xl font-black text-red-300">
                        {item.toUpperCase()}
                    </span>
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
    const successThreshold = 0.9;

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
    }, [currentPath]); // currentPath dependency is crucial

    useEffect(() => {
        if (pathRef.current) {
            resetCanvas();
        }
    }, [currentPath, resetCanvas]);

    // --- POINTER/COORDINATE LOGIC (No change) ---
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

    // --- DRAWING HANDLERS (No change) ---
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

        const updatedStrokes =
            currentStroke.length > 0 ? [...strokes, currentStroke] : strokes;
        setStrokes(updatedStrokes);
        setCurrentStroke([]);
    };

    // --- CHECK ACCURACY LOGIC (No change) ---
    const checkAccuracy = (allStrokes) => {
        if (allStrokes.length === 0) {
            playFailureSound(); 
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
        }
        setTargetPoints(updated);
    };

    // Handler for the Check Button
    const checkMyTrace = () => {
        checkAccuracy(strokes);
    };

    // --- DISPLAY ITEMS (No change) ---
    const getDisplayItem = () => {
        if (categoryId === "shapes") {
            // item ko Proper Case mein format karein jaisa list mein hai
            return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase(); 
        }
        return item.toUpperCase(); // Baaki sab uppercase mein
    };

    // getTitle function bhi update nahi karna
    const getTitle = () => {
        if (categoryId === "letters") return "Letter";
        if (categoryId === "numbers") return "Number";
        if (categoryId === 'urdu') return 'Huroof';
        if (categoryId === "shapes") return "Shape";
        return "Item";
    };

    return (
        <div
            className="max-w-sm mx-auto p-3 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl shadow-indigo-300 w-full"
            style={{ maxWidth: `${width + 40}px` }}
        >
            <div
                className={`relative w-full overflow-hidden ${
                    completed
                        ? "border-green-500 shadow-green-400/70 border-8"
                        : "border-cyan-400 border-4"
                }`}
                style={{
                    height: `${height}px`,
                    width: `${width}px`,
                    margin: "0 auto",
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                }}
            >
                <svg
                    ref={svgRef}
                    // ViewBox ko 350x350 se 300x400 kar diya gaya hai taaki path data align ho
                    viewBox="0 0 300 400" 
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
                        strokeWidth={20} // Width 20 rakha hai takay touch area theek ho
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
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 bg-white/70">
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