import React from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReleasePlanningPage from "./pages/ReleasePlanning/ReleasePlanningPage";
import LandingPage from "./pages/Landing/LandingPage";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import Projects from "./pages/Projects/Projects";
import ProjectDetails from "./pages/Projects/ProjectDetails";
import NotFound from "./pages/Error/NotFound";



function App() {
  return (
    <div>
       <BrowserRouter>
       <Routes>
       <Route path="/"  element={<LandingPage />} />
       <Route path="/release-planning" element={<ReleasePlanningPage />} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;