import React from "react";
import './App.css';
import LandingPage from "./pages/Landing/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReleasePlanningPage from "./pages/ReleasePlanning/ReleasePlanningPage";

function App() {
  return (
    <div>
       <BrowserRouter>
       <Routes>
       <Route path="/"  element={<LandingPage />} />
       <Route path="/release-planning" element={<ReleasePlanningPage />} />

       </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;