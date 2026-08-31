import React from "react";
import './App.css';
import LandingPage from "./pages/Landing/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import CreateProject from "./pages/Projects/CreateProject";
import HumanConfiguration from "./pages/Workflow/HumanConfiguration";

function App() {
  return (
    <div>
       <BrowserRouter>
       <Routes>
       <Route path="/"  element={<LandingPage />} />
       <Route path="/create-project" element={<CreateProject />} />
       <Route path="/human-configuration" element={<HumanConfiguration />} />
       </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;