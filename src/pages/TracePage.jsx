import React, { useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function TracePage({ letter, goBack }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    drawDottedLetter();
  }, [letter]);

  const getPosition = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();

    if (e.touches) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    const pos = getPosition(e);
    setPoints([{ x: pos.x, y: pos.y }]);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const ctx = canvasRef.current.getContext("2d");
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#6366F1";

    const newPos = getPosition(e);
    const newPoints = [...points, newPos];
    setPoints(newPoints);

    ctx.beginPath();
    ctx.moveTo(points[points.length - 1].x, points[points.length - 1].y);
    ctx.lineTo(newPos.x, newPos.y);
    ctx.stroke();
  };

  const drawDottedLetter = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "250px Arial";
    ctx.lineWidth = 4;
    ctx.setLineDash([12, 20]);
    ctx.strokeStyle = "gray";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeText(letter, canvas.width / 2, canvas.height / 2);
    ctx.setLineDash([]);
  };

  const checkDrawing = () => {
    if (points.length < 50) {
      Swal.fire("Too short", "Trace properly", "error");
      return;
    }

    Swal.fire("Great!", "Nice tracing!", "success");
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-indigo-600 mb-4">Trace {letter}</h1>

      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="bg-white shadow-xl rounded-3xl touch-none"
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />

      <div className="flex gap-4 mt-6">
        <button
          onClick={checkDrawing}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Check
        </button>

        <button
          onClick={goBack}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg"
        >
          Back
        </button>
      </div>
    </div>
  );
}
