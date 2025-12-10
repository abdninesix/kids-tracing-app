// src/components/TracingCanvas.jsx
import React, { useRef, useState, useEffect, useCallback } from "react";

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
    const audio = new Audio("/sounds/failure.mp3");
    audio.play().catch((e) => console.error("Failure audio failed:", e));
  } catch (e) {
    console.error("Failure audio API failed:", e);
  }
};
const PATHS = {
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
  S: "M225 35 C75 35 75 155 225 155 C225 155 225 335 75 335",
  T: "M65 35 L235 35 M150 35 L150 335",
  U: "M65 35 L65 275 C65 335 235 335 235 275 L235 35",
  V: "M65 35 L150 335 L235 35",
  W: "M65 35 L100 335 L150 60 L200 335 L235 35",
  X: "M65 35 L235 335 M235 35 L65 335",
  Y: "M65 35 L150 185 L235 35 M150 185 L150 335",
  Z: "M65 35 L235 35 L65 335 L235 335",
};

const getLetterPath = (letter) => {
  return PATHS[letter.toUpperCase()] || PATHS["A"];
};

// ... rest of the component code ...

// Default values updated to 300/400 to match usage in TracePage.jsx
export default function TracingCanvas({
  width = 300,
  height = 400,
  letter = "A",
}) {
  const currentLetterPath = getLetterPath(letter);
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
  const successThreshold = 0.75;

  const resetCanvas = useCallback(() => {
    const svg = svgRef.current;
    const pathEl = pathRef.current;
    if (!svg || !pathEl) return;

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
  }, [currentLetterPath]);

  useEffect(() => {
    resetCanvas();
  }, [currentLetterPath, resetCanvas]);

  const getPointer = (e) => {
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    if (e.touches) {
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
    const updated = [...strokes, currentStroke];
    setStrokes(updated);
    setCurrentStroke([]);
  };

  const checkMyTrace = () => {
    if (strokes.length > 0) {
      checkAccuracy(strokes);
    } else {
      alert("Please draw the letter first!");
    }
  };

  const checkAccuracy = (allStrokes) => {
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

  return (
    <div
      className="max-w-sm mx-auto p-3 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl shadow-indigo-300 w-full"
      style={{ maxWidth: `${width + 40}px` }}
    >
      <h2 className="text-center text-3xl font-bold mb-6 text-indigo-900 drop-shadow-sm">
        Trace the Letter{" "}
        <span className="text-cyan-600">{letter.toUpperCase()}</span>!
      </h2>

      <div
        className="relative w-full"
        style={{ height: `${height}px`, width: `${width}px`, margin: "0 auto" }}
      >
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full border-4 border-cyan-400 rounded-lg bg-white shadow-inner"
          onMouseDown={startDraw}
          onMouseMove={moveDraw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          onTouchStart={startDraw}
          onTouchMove={moveDraw}
          onTouchEnd={endDraw}
        >
          <path
            d={currentLetterPath}
            fill="none"
            stroke="#67e8f9"
            strokeWidth={5}
            strokeDasharray="6,10"
            strokeLinecap="round"
          />

          <path
            ref={pathRef}
            d={currentLetterPath}
            fill="none"
            stroke="transparent"
            strokeWidth={5}
          />

          {strokes.map((s, i) => (
            <polyline
              key={i}
              points={s.map((p) => `${p.x},${p.y}`).join(" ")}
              fill="none"
              stroke="#4F46E5"
              strokeWidth={10}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}

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

        {showSuccessAnimation && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
            <div className="text-8xl animate-pop text-green-500 font-extrabold drop-shadow-lg">
              🎉 Great Job! ⭐
            </div>
          </div>
        )}

        {showFailureAnimation && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
            <div className="text-8xl animate-pop text-red-500 font-extrabold drop-shadow-lg">
              ❌ Oops! Try Again! 😥
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
