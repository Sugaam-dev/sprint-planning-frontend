import React, { useState } from "react";
import './App.css';
import LandingPage from "./pages/Landing/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProjectForm from "./features/project/components/ProjectForm";
import QuestionCard from "./features/human-configuration/components/QuestionCard";
import AnswerInput from "./features/human-configuration/components/AnswerInput";

function TestConfigSection() {
  const [sprintLength, setSprintLength] = useState("2w");
  const [startDay, setStartDay] = useState("monday");
  const [ceremonies, setCeremonies] = useState([true, true, false, true]);

  return (
    <div className="max-w-[640px] mx-auto p-8 bg-[#FAF9F6] min-h-screen">
      <QuestionCard
        number={1}
        title="Sprint & Cadence Setup"
        subtitle="Define how often your team ships and plans work."
        complete={true}
      >
        <div className="flex flex-col gap-5">
          <AnswerInput
            type="pills"
            label="Sprint Length"
            value={sprintLength}
            onChange={setSprintLength}
            options={[
              { v: "1w", l: "1 week" },
              { v: "2w", l: "2 weeks", rec: true },
              { v: "3w", l: "3 weeks" },
              { v: "4w", l: "4 weeks" },
            ]}
          />
          <AnswerInput
            type="select"
            label="Sprint Start Day"
            value={startDay}
            onChange={setStartDay}
            options={[
              { v: "monday", l: "Monday" },
              { v: "tuesday", l: "Tuesday" },
              { v: "wednesday", l: "Wednesday" },
            ]}
          />
          <AnswerInput
            type="checkbox-list"
            label="Ceremonies to include"
            value={ceremonies}
            onChange={setCeremonies}
            options={["Sprint Planning", "Daily Standup", "Backlog Grooming", "Sprint Retro"]}
          />
        </div>
      </QuestionCard>
    </div>
  );
}

function App() {
  return (
    <div>
       <BrowserRouter>
       <Routes>
       <Route path="/"  element={<LandingPage />} />

       <Route path="/test-create-project" element={<div className="max-w-[620px] mx-auto p-8"><ProjectForm /></div>} />
       <Route path="/test-config" element={<TestConfigSection />} />

       </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;