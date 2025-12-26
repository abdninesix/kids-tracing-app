import { useRef, useState } from "react";

const LETTER_PATH = "M50 150 L100 50 L150 150 M75 100 L125 100";

export default function LetterTracer() {
    const svgRef = useRef(null);
    const [drawing, setDrawing] = useState(false);
    const [points, setPoints] = useState([]);

    const getPoint = (e) => {
        const svg = svgRef.current;
        const rect = svg.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    };

    const handleDown = (e) => {
        setDrawing(true);
        setPoints([getPoint(e)]);
    };

    const handleMove = (e) => {
        if (!drawing) return;
        setPoints((prev) => [...prev, getPoint(e)]);
    };

    const handleUp = () => setDrawing(false);

    return (
        <div className="flex flex-col items-center gap-4">
            <svg
                ref={svgRef}
                width="200"
                height="200"
                className="border bg-white"
                onMouseDown={handleDown}
                onMouseMove={handleMove}
                onMouseUp={handleUp}
            >
                {/* Dotted Letter */}
                <path
                    d={LETTER_PATH}
                    fill="none"
                    stroke="#aaa"
                    strokeWidth="6"
                    strokeDasharray="5 8"
                />

                {/* User Drawing */}
                <polyline
                    points={points.map((p) => `${p.x},${p.y}`).join(" ")}
                    fill="none"
                    stroke="blue"
                    strokeWidth="5"
                    strokeLinecap="round"
                />
            </svg>

            <button
                onClick={() => setPoints([])}
                className="px-4 py-2 bg-red-500 text-white rounded"
            >
                Reset
            </button>
        </div>
    );
}
