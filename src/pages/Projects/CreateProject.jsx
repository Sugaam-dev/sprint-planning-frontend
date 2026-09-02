import { useState } from "react";
import ProjectForm from "../../features/project/components/ProjectForm";
import ConfigurationForm from "../../features/human-configuration/components/ConfigurationForm";
import WorkflowHeader from "../../workflow/WorkflowHeader";

export default function CreateProject() {
  const [showConfig, setShowConfig] = useState(false);
  const [configMode, setConfigMode] = useState("essential");

  function handleBeforeResources() {
    setConfigMode("essential");
    setShowConfig(true);
  }

  function handleCreated() {
    setConfigMode("full");
    setShowConfig(true);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF0FE] via-[#F5EEFC] to-[#F8F9FE]">
      <WorkflowHeader activeStep="new-project" />

      <div className="py-10 px-4">
        <div className="max-w-[620px] mx-auto">
          <button className="flex items-center gap-1 text-[13px] text-[#767085] hover:text-[#1B1730] mb-4">
            ‹ Back
          </button>

          <h1 className="text-[28px] font-extrabold bg-gradient-to-r from-[#6D5EF5] to-[#9333EA] bg-clip-text text-transparent mb-2">
            Create New Project
          </h1>
          <p className="text-[13.5px] text-[#767085] mb-6 max-w-[520px]">
            Give Agent 1 a business requirements document and it will extract a structured feature list for you to review.
          </p>

          <ProjectForm onBeforeResources={handleBeforeResources} onCreated={handleCreated} />
        </div>

        {showConfig && (
          <div className="mt-10">
            <ConfigurationForm initialMode={configMode} />
          </div>
        )}
      </div>
    </div>
  );
}