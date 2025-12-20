import React, { useRef, useState, useEffect, useCallback } from "react";
const PATH_DATA = {
  A: "M85 315 L150 55 L215 315 M105 215 L195 215",
  B: "M75 55 L75 315 M75 55 L165 55 A80 85 0 0 1 165 185 L75 185 M165 185 A80 85 0 0 1 165 315 L75 315",
  C: "M215 95 C215 55 165 55 135 55 C85 55 85 95 85 185 C85 275 85 315 135 315 C165 315 215 315 215 275",
  D: "M75 55 L75 315 M75 55 L135 55 C195 55 215 85 215 185 C215 285 195 315 135 315 L75 315",
  E: "M215 55 L75 55 L75 315 L215 315 M75 185 L185 185",
  F: "M75 55 L75 315 M215 55 L75 55 M75 185 L185 185",
  G: "M215 95 C215 55 165 55 135 55 C85 55 85 95 85 185 C85 275 85 315 135 315 C165 315 215 315 215 255 L215 185 L165 185",
  H: "M75 55 L75 315 M225 55 L225 315 M75 185 L225 185",
  I: "M85 55 L215 55 M150 55 L150 315 M85 315 L215 315",
  J: "M75 275 C75 315 105 315 135 315 C185 315 215 285 215 245 L215 55",
  K: "M75 55 L75 315 M215 55 L95 185 L215 315",
  L: "M75 55 L75 315 L215 315",
  M: "M75 315 L75 55 L150 185 L225 55 L225 315",
  N: "M75 315 L75 55 L225 315 L225 55",
  O: "M150 55 C85 55 85 185 85 185 C85 315 150 315 150 315 C215 315 215 185 215 185 C215 55 150 55 150 55 Z",
  P: "M75 315 L75 55 L165 55 C215 55 215 155 165 155 L75 155",
  Q: "M150 55 C85 55 85 185 85 185 C85 315 150 315 150 315 C215 315 215 185 215 185 C215 55 150 55 150 55 Z M175 255 L225 315",
  R: "M75 315 L75 55 L165 55 C215 55 215 155 165 155 L75 155 M165 155 L225 315",
  S: "M205 75 C205 55 185 55 165 75 C145 95 145 155 175 175 C205 195 205 255 175 275 C145 295 105 295 105 275",

  T: "M75 55 L225 55 M150 55 L150 315",
  U: "M75 55 L75 265 C75 315 135 315 150 315 C165 315 225 315 225 265 L225 55",
  V: "M75 55 L150 315 L225 55",
  W: "M75 55 L105 315 L150 135 L195 315 L225 55",
  X: "M75 55 L225 315 M225 55 L75 315",
  Y: "M75 55 L150 185 L225 55 M150 185 L150 315",
  Z: "M75 55 L225 55 L75 315 L225 315",

  // --- NUMBERS (1-20) - Corrected ---
  1: "M150 55 L150 315 M120 85 L150 55",
  2: "M85 85 C85 55 125 55 150 55 C185 55 215 75 215 105 C215 145 185 185 150 215 L85 285 L85 315 L215 315",
  3: "M105 75 C105 55 145 50 175 60 C200 70 210 90 210 115 C210 140 195 155 175 160 L160 160 M160 160 C175 160 195 165 210 180 C225 195 225 220 225 245 C225 275 215 305 190 320 C165 335 130 335 105 320 C90 310 85 295 90 280",
  4: "M175 55 L85 215 L215 215 M175 55 L175 290",
  5: "M215 55 L85 55 L85 155 L165 155 C215 155 215 245 165 285 C135 305 85 295 85 275",
  6: "M185 75 C175 55 115 55 95 85 C75 125 75 235 85 265 C95 295 135 305 165 285 C195 265 195 215 165 195 C135 175 105 185 95 205",
  7: "M85 55 L215 55 L125 315",
  8: "M150 55 C185 55 195 75 195 95 C195 125 175 135 150 145 C125 135 105 125 105 95 C105 75 115 55 150 55 Z M150 145 C185 155 195 175 195 205 C195 245 175 265 150 275 C125 265 105 245 105 205 C105 175 115 155 150 145 Z M150 275 C115 265 105 235 105 205 M195 205 C195 235 185 265 150 275",
  9: "M175 185 C215 145 215 85 175 45 C135 5 85 55 85 115 C85 175 135 205 175 185 Z M175 185 L145 315",
  10: "M100 65 L100 250 M180 55 C220 55 230 85 230 145 C230 205 220 235 180 235 C140 235 130 205 130 145 C130 85 140 55 180 55 Z",
  11: "M100 55 L100 315 M110 85 L100 55 M200 55 L200 315 M210 85 L200 55",
  12: "M90 55 L90 315 M100 85 L90 55 M160 85 C160 55 200 55 220 65 C240 75 240 105 230 125 L170 285 L170 315 L240 315",
  13: "M90 55 L90 315 M100 85 L90 55 M160 75 C160 55 200 55 220 75 C230 85 230 115 210 125 C200 135 190 135 185 135 M185 135 C200 135 240 145 240 185 C240 235 220 285 160 285 C150 285 150 275 150 265",
  14: "M90 55 L90 315 M100 85 L90 55 M210 55 L140 215 L250 215 M210 55 L210 315",
  15: "M90 55 L90 315 M100 85 L90 55 M250 55 L160 55 L160 155 L210 155 C250 155 250 245 210 285 C180 305 150 295 150 275",
  16: "M90 55 L90 315 M100 85 L90 55 M220 75 C210 55 170 55 150 85 C130 125 130 235 140 265 C150 295 190 305 220 285 C250 265 250 215 220 195 C190 175 160 185 150 205",
  17: "M90 55 L90 315 M100 85 L90 55 M150 55 L250 55 L180 315",
  18: "M90 55 L90 315 M100 85 L90 55 M195 55 C230 55 240 75 240 95 C240 125 220 135 195 145 C170 135 150 125 150 95 C150 75 160 55 195 55 Z M195 145 C230 155 240 175 240 205 C240 245 220 265 195 275 C170 265 150 245 150 205 C150 175 160 155 195 145 Z",
  19: "M90 55 L90 315 M100 85 L90 55 M190 185 C230 145 230 85 190 45 C150 5 100 55 100 115 C100 175 150 205 190 185 Z M190 185 L160 315",

  20: "M75 95 C75 65 115 55 135 65 C155 75 155 105 145 125 L105 295 L105 315 L165 315 M220 155 C220 225 200 255 170 255 C140 255 120 225 120 155 C120 85 140 55 170 55 C200 55 220 85 220 155 Z",
  // --- SHAPES ---
  Circle:
    "M150 85 C215 85 235 135 235 185 C235 235 215 285 150 285 C85 285 65 235 65 185 C65 135 85 85 150 85 Z",
  Square: "M75 75 L235 75 L235 235 L75 235 Z",
  Triangle: "M150 65 L225 295 L75 295 Z",
  Star: "M150 65 L170 135 L245 145 L190 195 L205 270 L150 235 L95 270 L110 195 L55 145 L130 135 Z",
  Diamond: "M150 65 L225 185 L150 305 L75 185 Z",
  Rectangle: "M50 100 L270 100 L270 220 L50 220 Z",
  Oval: "M150 65 C215 65 215 305 150 305 C85 305 85 65 150 65 Z",
  Arrow: "M85 185 L215 185 M175 145 L215 185 L175 225",
  Heart:
    "M150 255 C120 285 85 265 75 235 C65 205 75 175 105 165 C125 155 145 165 150 185 C155 165 175 155 195 165 C225 175 235 205 225 235 C215 265 180 285 150 255 Z",
};

// --- GET PATH FUNCTION ---
const getPathForItem = (item, categoryId) => {
  if (!item || !categoryId) return null;

  let key;
  if (categoryId === "letters") {
    key = item.toUpperCase();
  } else if (categoryId === "numbers") {
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
    const audio = new Audio("/sounds/tryagain.mp3");
    audio.play().catch((e) => console.error("Failure audio failed:", e));
  } catch (e) {
    console.error("Failure audio API failed:", e);
  }
};

// --- TRACING CANVAS COMPONENT ---
export default function TracingCanvas({
  width = 360,
  height = 360,
  item = "A",
  categoryId = "letters",
}) {
  const currentPath = getPathForItem(item, categoryId);

  if (!currentPath) {
    return (
      <div
        className="max-w-sm mx-auto p-4 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl shadow-red-300 w-full"
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

    if (categoryId === "shapes") return "Shape";
    return "Item";
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mx-auto">
      <div
        className={`relative w-full max-w-4xl mx-auto aspect-[300/330] bg-white/90 rounded-3xl  overflow-hidden ${
          completed
            ? "border-green-500 border-8"
            : "border-cyan-400 border-4"
        } `}
      >
        <svg
          ref={svgRef}
          viewBox="30 30 260 330"
          className="absolute inset-0 w-full h-full cursor-crosshair"
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

      <div className="flex justify-between w-full mt-4 mb-2">
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
          Check
        </button>
      </div>
    </div>
  );
}
