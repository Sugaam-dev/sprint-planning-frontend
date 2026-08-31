import React from "react";
import { useParams, Link } from "react-router-dom";

// Placeholder for the single-project detail/workflow page reached by
// "Open Project" on a card. Wire this up to fetchProjectById + the actual
// workflow steps (Feature Review, User Story Review, etc.) next.
const ProjectDetails = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-[#eef0f7] p-6 md:p-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8">
        <Link to="/projects" className="text-sm text-indigo-600 font-semibold">
          ← Back to Projects
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 mt-4">
          Project: {id}
        </h1>
        <p className="text-slate-500 mt-2">
          Project detail / workflow view coming soon.
        </p>
      </div>
    </div>
  );
};

export default ProjectDetails;