import React from "react";
import './App.css';
import LandingPage from "./pages/Landing/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
       <BrowserRouter>
       <Routes>
       <Route path="/"  element={<LandingPage />} />

       </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;