// File: src/components/TracingCanvas.jsx
import React, { useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function TracingCanvas({ width = 350, height = 450 }) {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [strokes, setStrokes] = useState([]);
  const [currentStroke, setCurrentStroke] = useState([]);
  const [targetPoints, setTargetPoints] = useState([]);
  const [completed, setCompleted] = useState(false);
  const tolerance = 18;
  const successThreshold = 0.75; // 75% hit for success

  const letterPath = "M90 360 L175 60 L260 360 M120 200 L220 200";

  useEffect(() => {
    const svg = svgRef.current;
    const pathEl = pathRef.current;
    if (!svg || !pathEl) return;

    const length = pathEl.getTotalLength();
    const samples = 150;
    const points = [];
    for (let i = 0; i <= samples; i++) {
      const pt = pathEl.getPointAtLength((i / samples) * length);
      points.push({ x: pt.x, y: pt.y, hit: false });
    }
    setTargetPoints(points);
    setStrokes([]);
    setCurrentStroke([]);
    setCompleted(false);
  }, [letterPath]);

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
    const ctm = svg.getScreenCTM().inverse();
    return pt.matrixTransform(ctm);
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
    setCurrentStroke((s) => [...s, { x: p.x, y: p.y }]);
  };

  const endDraw = () => {
    if (!drawing) return;
    setDrawing(false);
    setStrokes((s) => [...s, currentStroke]);

    // Check tracing accuracy only after full stroke
    checkAccuracy([...strokes, currentStroke]);
    setCurrentStroke([]);
  };

  const checkAccuracy = (allStrokes) => {
    // Mark hits
    const newTargets = targetPoints.map((p) => ({ ...p, hit: false }));

    allStrokes.forEach((stroke) => {
      stroke.forEach((pt) => {
        newTargets.forEach((target) => {
          const dx = target.x - pt.x;
          const dy = target.y - pt.y;
          if (dx * dx + dy * dy <= tolerance * tolerance) {
            target.hit = true;
          }
        });
      });
    });

    const hits = newTargets.filter((p) => p.hit).length;
    const accuracy = hits / newTargets.length;

    if (accuracy >= successThreshold) {
      Swal.fire({
        icon: "success",
        title: "Well done!",
        text: `Accuracy: ${(accuracy * 100).toFixed(0)}%`,
        confirmButtonColor: "#4ade80",
      });
      setCompleted(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "Nahi theek!",
        text: `Accuracy: ${(accuracy * 100).toFixed(0)}%`,
        confirmButtonColor: "#f87171",
      });
    }

    setTargetPoints(newTargets);
  };

  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-xl shadow-lg">
      <h2 className="text-center text-2xl font-bold mb-2">Trace Letter A</h2>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full touch-none border rounded-lg bg-gray-50"
        onMouseDown={startDraw}
        onMouseMove={moveDraw}
        onMouseUp={endDraw}
        onMouseLeave={endDraw}
        onTouchStart={startDraw}
        onTouchMove={moveDraw}
        onTouchEnd={endDraw}
      >
        {/* Dotted guide */}
        <path
          d={letterPath}
          fill="none"
          stroke="#93C5FD"
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray="6,8"
        />
        {/* Actual path invisible for hit detection */}
        <path ref={pathRef} d={letterPath} fill="none" stroke="transparent" strokeWidth={8} />
        {/* Drawn strokes */}
        {strokes.map((s, idx) => (
          <polyline
            key={idx}
            points={s.map((pt) => `${pt.x},${pt.y}`).join(" ")}
            fill="none"
            stroke="#1E3A8A"
            strokeWidth={8}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
        {currentStroke.length > 0 && (
          <polyline
            points={currentStroke.map((pt) => `${pt.x},${pt.y}`).join(" ")}
            fill="none"
            stroke="#1E40AF"
            strokeWidth={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </div>
  );
}
