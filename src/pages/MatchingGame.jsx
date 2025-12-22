import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/Navbar';

// Sab categories ka data yahan hai
const MATCHING_DATA = {
    alphabets: { left: ['A', 'B', 'C', 'D'], right: ['C', 'A', 'D', 'B'] },
    numbers: { left: ['1', '2', '3', '4'], right: ['3', '4', '1', '2'] },
    urdu: { left: ['ا', 'ب', 'ت', 'ج'], right: ['ت', 'ج', 'ا', 'ب'] },
    shapes: { left: ['★', '●', '■', '▲'], right: ['●', '▲', '★', '■'] }
};

export default function MatchingGame() {
    const { type } = useParams();
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lines, setLines] = useState([]);
    const [currentLine, setCurrentLine] = useState(null);

    const data = MATCHING_DATA[type] || MATCHING_DATA.alphabets;

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.lineCap = 'round';
        ctx.lineWidth = 6;
        ctx.strokeStyle = '#4F46E5'; // Indigo color line

        // Purani lines draw karna
        lines.forEach(line => {
            ctx.beginPath();
            ctx.moveTo(line.x1, line.y1);
            ctx.lineTo(line.x2, line.y2);
            ctx.stroke();
        });

        // Jo line abhi draw ho rahi hai
        if (currentLine) {
            ctx.beginPath();
            ctx.moveTo(currentLine.x1, currentLine.y1);
            ctx.lineTo(currentLine.x2, currentLine.y2);
            ctx.stroke();
        }
    }, [lines, currentLine]);

    const handleMouseDown = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        setIsDrawing(true);
        setCurrentLine({
            x1: e.clientX - rect.left,
            y1: e.clientY - rect.top,
            x2: e.clientX - rect.left,
            y2: e.clientY - rect.top
        });
    };

    const handleMouseMove = (e) => {
        if (!isDrawing) return;
        const rect = canvasRef.current.getBoundingClientRect();
        setCurrentLine(prev => ({
            ...prev,
            x2: e.clientX - rect.left,
            y2: e.clientY - rect.top
        }));
    };

    const handleMouseUp = () => {
        if (currentLine) setLines([...lines, currentLine]);
        setIsDrawing(false);
        setCurrentLine(null);
    };

    return (
        <div className="min-h-screen bg-blue-50 flex flex-col items-center p-4">
            <NavBar themeColor="text-indigo-900" backPath="/matching-hub" />
            
            <h1 className="text-4xl font-black text-indigo-900 my-8 uppercase italic">
                Match {type}!
            </h1>

            <div className="relative bg-white rounded-[40px] shadow-2xl p-12 flex justify-between w-full max-w-4xl h-[550px] border-8 border-white">
                {/* Left Column */}
                <div className="flex flex-col justify-around z-10">
                    {data.left.map(item => (
                        <div key={item} className="w-20 h-20 bg-indigo-500 rounded-full flex items-center justify-center text-4xl text-white font-bold shadow-lg border-4 border-white">
                            {item}
                        </div>
                    ))}
                </div>

                {/* Draw Canvas (In ke darmiyan line khinchne ke liye) */}
                <canvas 
                    ref={canvasRef}
                    width={500}
                    height={450}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    className="absolute inset-0 mx-auto z-20 cursor-crosshair"
                />

                {/* Right Column */}
                <div className="flex flex-col justify-around z-10">
                    {data.right.map(item => (
                        <div key={item} className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center text-4xl text-white font-bold shadow-lg border-4 border-white">
                            {item}
                        </div>
                    ))}
                </div>
            </div>

            <button 
                onClick={() => setLines([])}
                className="mt-8 bg-red-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-red-600 transition-all"
            >
                CLEAR BOARD
            </button>
        </div>
    );
}