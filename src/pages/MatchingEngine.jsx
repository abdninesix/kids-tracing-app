import React, { useRef, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function MatchingEngine({ leftItems, rightItems, type }) {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [startNode, setStartNode] = useState(null);
    const [lines, setLines] = useState([]); 
    const [currentPoint, setCurrentPoint] = useState(null);
    const [status, setStatus] = useState(null); // 'success' or 'fail'

    // Resize Canvas
    useEffect(() => {
        const resize = () => {
            if (canvasRef.current && containerRef.current) {
                canvasRef.current.width = containerRef.current.clientWidth;
                canvasRef.current.height = containerRef.current.clientHeight;
            }
        };
        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    // Canvas Drawing Logic
    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        // Draw Matched Lines
        lines.forEach(line => {
            ctx.beginPath();
            ctx.moveTo(line.x1, line.y1);
            ctx.lineTo(line.x2, line.y2);
            ctx.strokeStyle = '#22c55e';
            ctx.lineWidth = 8;
            ctx.lineCap = 'round';
            ctx.stroke();
        });

        // Draw Current Dragging Line
        if (isDrawing && startNode && currentPoint) {
            ctx.beginPath();
            ctx.moveTo(startNode.x, startNode.y);
            ctx.lineTo(currentPoint.x, currentPoint.y);
            ctx.strokeStyle = '#4F46E5';
            ctx.lineWidth = 6;
            ctx.setLineDash([8, 6]);
            ctx.lineCap = 'round';
            ctx.stroke();
            ctx.setLineDash([]);
        }
    }, [lines, isDrawing, currentPoint, startNode]);

    const getCoords = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
        const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
        return { x, y };
    };

    const handleStart = (e, item) => {
        if (status || lines.find(l => l.val === item)) return;
        const p = getCoords(e);
        setStartNode({ val: item, x: p.x, y: p.y });
        setIsDrawing(true);
        setCurrentPoint(p);
    };

    const handleEnd = (e) => {
        if (!isDrawing) return;
        setIsDrawing(false);

        const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
        const endY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
        const targetEl = document.elementFromPoint(endX, endY);
        const targetVal = targetEl?.getAttribute('data-value');

        if (targetVal === startNode.val) {
            // Success Case
            const rect = targetEl.getBoundingClientRect();
            const crect = containerRef.current.getBoundingClientRect();
            const x2 = rect.left - crect.left;
            const y2 = rect.top - crect.top + rect.height/2;

            setLines([...lines, { x1: startNode.x, y1: startNode.y, x2, y2, val: startNode.val }]);
            setStatus('success');
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            setTimeout(() => setStatus(null), 1500);
        } else {
            // Failure Case
            setStatus('fail');
            setTimeout(() => setStatus(null), 1500);
        }
        setStartNode(null);
        setCurrentPoint(null);
    };

    return (
        <div ref={containerRef} 
             className="relative w-full max-w-4xl h-[550px] bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-12 flex justify-between items-center touch-none select-none"
             onMouseMove={(e) => isDrawing && setCurrentPoint(getCoords(e))}
             onMouseUp={handleEnd}
             onTouchMove={(e) => isDrawing && setCurrentPoint(getCoords(e))}
             onTouchEnd={handleEnd}>
            
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

            {/* Left Column (Question) */}
            <div className="flex flex-col justify-between h-full z-10">
                {leftItems.map((item, i) => (
                    <div key={i}
                        onMouseDown={(e) => handleStart(e, item)}
                        onTouchStart={(e) => handleStart(e, item)}
                        className={`w-20 h-20 flex items-center justify-center text-3xl font-bold rounded-full cursor-pointer shadow-lg transition-all active:scale-95
                        ${lines.find(l => l.val === item) ? 'bg-green-500 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
                        {item}
                    </div>
                ))}
            </div>

            {/* Right Column (Target) */}
            <div className="flex flex-col justify-between h-full z-10">
                {rightItems.map((item, i) => (
                    <div key={i}
                        data-value={item}
                        className={`w-20 h-20 flex items-center justify-center text-3xl font-bold rounded-full shadow-md border-4 border-dashed
                        ${lines.find(l => l.val === item) ? 'bg-green-100 border-green-500 text-green-700' : 'bg-pink-500 text-white border-pink-200'}`}>
                        {item}
                    </div>
                ))}
            </div>

            {/* Animation Overlays (Tracing Canvas Style) */}
            {status === 'success' && (
                <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded-[40px] z-50 pointer-events-none">
                    <div className="text-4xl font-black text-green-600 animate-bounce">GREAT JOB! ⭐</div>
                </div>
            )}
            {status === 'fail' && (
                <div className="absolute inset-0 bg-red-50/60 flex items-center justify-center rounded-[40px] z-50 pointer-events-none">
                    <div className="text-3xl font-black text-red-600 animate-shake">TRY AGAIN! ❌</div>
                </div>
            )}
        </div>
    );
}