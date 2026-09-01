import { useState } from "react";
import ProjectForm from "../../features/project/components/ProjectForm";
import ConfigurationForm from "../../features/human-configuration/components/ConfigurationForm";

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
    <div className="min-h-screen bg-[#F8F9FE] py-10 px-4">
      <div className="max-w-[620px] mx-auto">
        <h1 className="text-xl font-bold text-[#1A1A2E] mb-6">Create New Project</h1>
        <ProjectForm onBeforeResources={handleBeforeResources} onCreated={handleCreated} />
      </div>

      {showConfig && (
        <div className="mt-10">
          <ConfigurationForm initialMode={configMode} />
        </div>
      )}
    </div>
  );
}