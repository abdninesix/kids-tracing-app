import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import all your pages
import Home from './pages/Home';
import CategoriesPage from './pages/CategoriesPage';
// Individual List Pages
import LettersPage from './pages/LettersPage'; 
import CountingPage from './pages/CountingPage'; 
import ShapesPage from './pages/ShapesPage'; 
// --- Naya Component Import Karein ---
import UrduPage from './pages/UrduPage'; // Assuming you have an UrduPage component
import TracePage from './pages/TracePage'; 
import LearningHub from './pages/LearningHub';
import LearningAlphabets from './pages/LearningAlphabets';
import LearningNumbers from './pages/LearningNumbers';
import MatchingHub from './pages/MatchingHub';
import MatchingGame from './pages/MatchingGame';

function App() {
    return (
        <Router>
            <Routes>
                {/* Level 1: Home Page */}
                <Route path="/" element={<Home />} /> 
                
                {/* Level 2: Categories Selection */}
                <Route path="/categories" element={<CategoriesPage />} /> 
                <Route path="/learning-hub" element={<LearningHub />} />
  <Route path="/learning/alphabets" element={<LearningAlphabets />} />
  <Route path="/learning/numbers" element={<LearningNumbers />} />
                <Route path="/letters" element={<LettersPage />} /> 
                <Route path="/counting" element={<CountingPage />} /> 
                <Route path="/shapes" element={<ShapesPage />} /> 
                {/* --- Naya Route Urdu Huroof ke liye --- */}
                <Route path="/urdu" element={<UrduPage />} /> 
                <Route path="/matching-hub" element={<MatchingHub />} />
<Route path="/matching/:type" element={<MatchingGame />} />
                {/* Level 4: Tracing Canvas (Same structure) */}
                <Route path="/trace/:categoryId/:item" element={<TracePage />} /> 
            </Routes>
        </Router>
    );
}

export default App;