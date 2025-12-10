import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    // Main Container: Soft Pastel Gradient Background (Using your provided colors)
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#d3c8ff] via-[#d8f3ff] to-[#e8e1ff] p-4">
      
      <header className="mb-12 text-center">
        {/* H1: Dark Violet/Indigo Text for contrast against light background */}
        <h1 className="text-7xl font-extrabold text-indigo-900 mb-2 tracking-wide drop-shadow-md">
          Fun Tracing World!
        </h1>
        {/* Subtext: Deep color for good readability */}
        <p className="text-2xl font-medium text-violet-700">
          Let's learn and trace!
        </p>
      </header>

      {/* Main Content Card: Warm White (bg-white/90) with Deep Shadow */}
      <div className="bg-white/90 backdrop-blur-sm p-10 rounded-3xl shadow-2xl shadow-indigo-300 max-w-lg w-full text-center">
        
        <div className="mb-6">
          {/* Icon: Deep Violet for visibility */}
          <span className="text-8xl text-indigo-700" role="img" aria-label="Pencil and Ruler">
            ✍️
          </span>
        </div>

        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Ready to Start?
        </h2>

        {/* Start Button: Soft Cyan button with Dark Indigo Text */}
        <button
          onClick={() => navigate("/categories")}
          className="w-full px-8 py-4 text-2xl font-bold bg-indigo-900 text-white rounded-xl shadow-lg shadow-cyan-300/70 
                     hover:bg-indigo-900 transition duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#c4f6ff]"
        >
          Start Tracing!     
        </button>
      </div>

      {/* Footer: Dark Indigo Text on light background for readability */}
      <footer className="mt-8 text-indigo-800 text-lg opacity-80">
        Trace Letters, Numbers, and More!
      </footer>
      
    </div>
  );
}