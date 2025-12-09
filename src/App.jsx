import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LettersPage from "./pages/LettersPage";
import TracePage from "./pages/TracePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/letters" element={<LettersPage />} />
        <Route path="/trace/:letter" element={<TracePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
