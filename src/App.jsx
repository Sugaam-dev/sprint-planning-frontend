import React from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReleasePlanningPage from "./pages/ReleasePlanning/ReleasePlanningPage";
import LandingPage from "./pages/Landing/LandingPage";
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import Projects from "./pages/Projects/Projects";
import ProjectDetails from "./pages/Projects/ProjectDetails";
import NotFound from "./pages/Error/NotFound";
import FeatureReview from "./pages/Workflow/FeatureReview";
import UserStoryReview from "./pages/Workflow/UserStoryReview";




function App() {
  return (
    <div>
       <BrowserRouter>
       <Routes>
       <Route path="/"  element={<LandingPage />} />
       <Route path="/release-planning" element={<ReleasePlanningPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="*" element={<NotFound />} />

          <Route path="/workflow/features" element={<FeatureReview />} />
          <Route path="/workflow/user-stories" element={<UserStoryReview />} />   
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
