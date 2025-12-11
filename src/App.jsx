import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import all your pages
import Home from './pages/Home';
import CategoriesPage from './pages/CategoriesPage';
// Individual List Pages
import LettersPage from './pages/LettersPage'; 
import CountingPage from './pages/CountingPage'; 
import ShapesPage from './pages/ShapesPage'; 
import TracePage from './pages/TracePage'; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Level 1: Home Page */}
        <Route path="/" element={<Home />} /> 
        
        {/* Level 2: Categories Selection */}
        <Route path="/categories" element={<CategoriesPage />} /> 
        
        {/* Level 3: Dedicated Item Lists */}
        <Route path="/letters" element={<LettersPage />} /> 
        <Route path="/counting" element={<CountingPage />} /> 
        <Route path="/shapes" element={<ShapesPage />} /> 
        
        {/* Level 4: Tracing Canvas (Same structure) */}
        <Route path="/trace/:categoryId/:item" element={<TracePage />} /> 
      </Routes>
    </Router>
  );
}

export default App;